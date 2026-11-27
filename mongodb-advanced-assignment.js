// Task 1: Schema Validation and Data Creation

// Switch to the fresh company_advanced database
db = db.getSiblingDB("company_advanced");

// Create employees collection with $jsonSchema validation
db.createCollection("employees", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "departmentId", "experience", "active"],
      properties: {
        name: { bsonType: "string" },
        departmentId: { bsonType: "int" },
        experience: { bsonType: "int" },
        active: { bsonType: "bool" }
      }
    }
  }
});

// Insert starting employee documents
db.employees.insertMany([
  {
    _id: 1,
    name: "John",
    departmentId: 10,
    skills: ["Java", "MongoDB"],
    experience: 4,
    active: true,
    certifications: [
      { name: "MongoDB", status: "Expired", expiryYear: 2026 }
    ]
  },
  {
    _id: 2,
    name: "Alice",
    departmentId: 10,
    skills: ["Python", "MongoDB"],
    experience: 6,
    active: true,
    certifications: [
      { name: "MongoDB", status: "Active", expiryYear: 2028 }
    ]
  },
  {
    _id: 3,
    name: "David",
    departmentId: 20,
    skills: ["Communication"],
    experience: 3,
    active: false,
    certifications: [
      { name: "Communication", status: "Active", expiryYear: 2027 }
    ]
  }
]);

// Test validation rule with an invalid document (expected to fail)
try {
  db.employees.insertOne({
    _id: 99,
    name: 123,
    departmentId: "HR",
    experience: "one",
    active: "yes"
  });
} catch (err) {
  print("Expected validation error:", err.message);
}

// Verify valid employee count (should be 3)
db.employees.countDocuments();

// Task 2: Advanced Array Queries and Updates

// 2.1 Find employees with an Active MongoDB certification
db.employees.find({
  certifications: {
    $elemMatch: { name: "MongoDB", status: "Active" }
  }
});

// 2.2 Update John's MongoDB certification status from Expired to Active
db.employees.updateOne(
  { _id: 1, "certifications.name": "MongoDB" },
  { $set: { "certifications.$.status": "Active" } }
);

// 2.3 Set status to "Renewal Due" for certifications expiring before 2027
db.employees.updateMany(
  { "certifications.expiryYear": { $lt: 2027 } },
  { $set: { "certifications.$[c].status": "Renewal Due" } },
  { arrayFilters: [{ "c.expiryYear": { $lt: 2027 } }] }
);

// Verify certification updates
db.employees.find({}, { name: 1, certifications: 1 });

// Task 3: Bulk Write Operations

// Run two updates and one insert in a single bulkWrite
db.employees.bulkWrite([
  {
    updateOne: {
      filter: { name: "John" },
      update: { $inc: { experience: 1 } }
    }
  },
  {
    updateOne: {
      filter: { name: "Alice" },
      update: { $set: { active: false } }
    }
  },
  {
    insertOne: {
      document: {
        _id: 4,
        name: "Emma",
        departmentId: 20,
        skills: ["Excel"],
        experience: 2,
        active: true,
        certifications: [
          { name: "Excel", status: "Active", expiryYear: 2026 }
        ]
      }
    }
  }
]);

// Verify final state after bulkWrite
db.employees.countDocuments();
db.employees.find({}, { name: 1, experience: 1, active: 1, certifications: 1 });

// Task 4: Advanced Aggregation

// Step 1: Create departments collection
db.departments.insertMany([
  { _id: 10, name: "Engineering" },
  { _id: 20, name: "HR" }
]);

// 4.1 Join employees with departments and return name + departmentName sorted ascending
db.employees.aggregate([
  {
    $lookup: {
      from: "departments",
      localField: "departmentId",
      foreignField: "_id",
      as: "department"
    }
  },
  { $unwind: "$department" },
  {
    $project: {
      _id: 0,
      name: 1,
      departmentName: "$department.name"
    }
  },
  { $sort: { name: 1 } }
]);

// 4.2 Count employees per skill (count descending then skill ascending)
db.employees.aggregate([
  { $unwind: "$skills" },
  { $group: { _id: "$skills", employeeCount: { $sum: 1 } } },
  { $sort: { employeeCount: -1, _id: 1 } }
]);

// 4.3 Return active employee names (sorted ascending) and total active count
db.employees.aggregate([
  { $match: { active: true } },
  {
    $facet: {
      activeEmployees: [
        { $sort: { name: 1 } },
        { $project: { _id: 0, name: 1 } }
      ],
      totalCount: [
        { $count: "activeEmployees" }
      ]
    }
  }
]);

// Task 5: Indexing and Query Performance

// 5.1 Create and verify compound index (departmentId_1_name_1)
db.employees.createIndex({ departmentId: 1, name: 1 });
db.employees.getIndexes();

// 5.2 Inspect explain("executionStats") for the indexed query
db.employees
  .find({ departmentId: 10 })
  .sort({ name: 1 })
  .explain("executionStats");

// 5.3 Create sessions collection and TTL index (expiresAt_1)
db.sessions.insertOne({
  _id: 1,
  userName: "John",
  expiresAt: new Date(Date.now() + 600000)
});

db.sessions.createIndex(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

db.sessions.getIndexes();



