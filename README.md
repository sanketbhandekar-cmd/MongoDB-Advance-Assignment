# MongoDB-Advance-Assignment

Completed the MongoDB Advanced assignment locally using `mongosh` on the `company_advanced` database.

## What Was Done

- **Schema Validation & Data Setup (Task 1):** Created `employees` with `$jsonSchema` validation, inserted the 3 starting documents and verified invalid document rejection.
- **Array Queries & Updates (Task 2):** Queried nested certifications with `$elemMatch` and updated array elements using positional `$` and `arrayFilters`.
- **Bulk Writes (Task 3):** Combined two updates and one insert into a single `bulkWrite()` operation.
- **Advanced Aggregation (Task 4):** Added the `departments` collection and built pipelines using `$lookup`, `$unwind`, `$group` and `$facet`.
- **Indexing & Performance (Task 5):** Created the `departmentId_1_name_1` compound index, recorded `explain("executionStats")` metrics (`IXSCAN` with `nReturned: 2`) and set up a TTL index (`expiresAt_1`) on `sessions`.
- **Backup & Restore (Task 6):** Backed up `company_advanced` using `mongodump --gzip`, restored into `company_advanced_restore` via `mongorestore` and verified restored collection counts.
- **Concept Review (Task 7):** Completed all 12 MCQs covering validation, indexing, transactions, consistency, replication, sharding, change streams and security.

## Files

- `mongodb-advanced-assignment.js` — `mongosh` commands for Tasks 1–5
- `backup-restore-commands.txt` — `mongodump` and `mongorestore` commands for Task 6
- `answers.md` — Task 5.2 `explain("executionStats")` metrics and Task 7 MCQ answers
