# MongoDB Advanced Assignment — Answers

## Task 5.2: `explain("executionStats")` Output

Query run on `company_advanced.employees`:

```javascript
db.employees
  .find({ departmentId: 10 })
  .sort({ name: 1 })
  .explain("executionStats")
```

Observed metrics:

- **Winning plan stage:** `IXSCAN` (with parent `FETCH` stage using index `departmentId_1_name_1`)
- **`nReturned`:** `2`
- **`totalDocsExamined`:** `2`
- **`totalKeysExamined`:** `2`

---

## Task 7: MongoDB Advanced Concepts — MCQs

**1. Why is schema validation useful?**
**Q1: B** — It rejects documents that do not follow required fields or data types.
Schema validation enforces predictable structure and field types at write time.

**2. What does `$elemMatch` help verify?**
**Q2: B** — Multiple conditions match the same array object.
Without `$elemMatch`, separate conditions in a query can match different elements of the same array.

**3. What is the purpose of `arrayFilters`?**
**Q3: C** — To update selected array elements that match a condition.
`arrayFilters` lets an update target only the specific array items matching the given filter.

**4. When is `bulkWrite()` useful?**
**Q4: A** — When several write operations should be sent together.
Batching inserts, updates and deletes into one `bulkWrite()` call reduces round trips for bulk jobs.

**5. Which stage joins documents from another collection?**
**Q5: C** — `$lookup`
`$lookup` performs a left outer join from the input collection to a target collection in the same database.

**6. What does `IXSCAN` usually indicate in `explain()` output?**
**Q6: B** — MongoDB used an index.
`IXSCAN` shows MongoDB scanned index keys instead of scanning every document in the collection (`COLLSCAN`).

**7. What happens when `abortTransaction()` is called?**
**Q7: C** — Uncommitted transaction changes are rolled back.
All writes performed inside the active multi-document transaction are discarded.

**8. What does write concern `w: "majority"` mean?**
**Q8: B** — A majority of voting data-bearing replica-set members acknowledge the write.
This ensures the write has been replicated to most voting data nodes before success is reported.

**9. What normally happens when a replica-set Primary fails?**
**Q9: C** — Eligible members hold an election for a new Primary.
Remaining replica-set members detect the failure and automatically elect a Secondary as the new Primary.

**10. Which is the best direction for choosing a shard key?**
**Q10: B** — A high-cardinality field that distributes traffic and matches common queries.
High cardinality avoids hotspots and matching common query filters prevents scatter-gather queries.

**11. What do Change Streams allow an application to do?**
**Q11: A** — Listen for inserts, updates, replacements and deletes.
Change Streams push real-time collection change events over a replica set or sharded cluster without polling.

**12. Which is a good production-security practice?**
**Q12: C** — Use TLS, restricted network access and least-privilege credentials.
Production environments layer encrypted connections, tight network rules and minimal RBAC roles to reduce risk.
