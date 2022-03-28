---
title: Intro to SQL
sidebar_position: 1
---

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/sql-illustration.png' alt='mysql cover'/>

SQL stands for **Structured Query Language**. SQL is used to query and manipulate the underlying relational databases such as SQL Server, Oracle, MySQL, PostgreSQL, SQLite, etc.

SQL is an ANSI (American National Standards Institute) and ISO (International Organization for Standardization) standard language. However, not all the databases support the same SQL, but there is little variation. Also, most databases include their own addition to SQL.

## SQL History

In 1974, IBM researchers published a paper " [SEQUEL: A Structured English Query Language](https://researcher.watson.ibm.com/researcher/files/us-dchamber/sequel-1974.pdf)", until today, this structured query language has not changed much. Compared with other languages, the half-life of SQL is very long. SQL has two important standards, namely "[SQL92](https://en.wikipedia.org/wiki/SQL-92)" and "[SQL99](https://en.wikipedia.org/wiki/SQL:1999)", which represent the SQL standards promulgated in 1992 and 1999 respectively, and the SQL language we use today still follows these standards. You must know that in 1992 when Windows 3.1 was released, how many people still remember it, but if you are engaged in data analysis or data-related work, you will still use the SQL language.

## SQL Syntax

SQL is not like other languages which require a lot of programming foundation. SQL is more like English, with some simple words. When you use it, it's like talking to the database in English.

SQL includes the following parts:

- **Keywords**: Keywords are reserved or non-reserved words. Reserved keywords in SQL are `SELECT`, `INTO`, `UPDATE`, `DELETE`, `DROP`, `ASC`, `DESC`, etc.
- **Identifiers**: Identifiers are the names of the database objects like table name, schema name, function name, etc.
- **Clauses**: Clauses forms the components of SQL statements and queries such as `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`.
- **Expression**: Expressions in SQL produce either scalar values, or columns and rows of data.
- **Boolean Conditions**: Conditions are the expressions that result in the boolean value `TRUE` or `FALSE`. They are used to limit the effect of statements or queries.
- **Queries**: Queries are the SQL statements that retrieve the data based on specific criteria. Statements that start with the `SELECT` clause are called queries because they retrieve data from the underlying database.
- **Statements**: SQL statements may have a persistent effect on schema and data, or may control transactions, program flow, connections, sessions, or diagnostics. `INSERT`, `UPDATE`, `DROP`, `DELETE` statements are called SQL statements because they modify the underlying database structure or data.

The following figure illustrates the structure of the SQL:

<Img w="480" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/sql-structure-1.png' alt='sql-structure-1'/>

<br />

<Img w="480" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/sql-structure-2.png' alt='sql-structure-2'/>

## SQL Classification

SQL is classified into the following categories. Note that statements mentioned in the following tables may vary in different databases.

| Commands | Description                  |
| -------- | ---------------------------- |
| DDL      | Data Definition Language     |
| DML      | Data Manipulation Language   |
| TCL      | Transaction Control Language |
| DCL      | Data Control Language        |
| SCL      | Session Control Language     |

## DDL – Data Definition Language

Data Definition Language (DDL) statements are used to define the structure of the data in the database such as tables, procedures, functions, views, etc. The following table lists DDL statements:

| Statement | Description |
| --- | --- |
| CREATE | Create a new object(table, procedure, function, view etc.) in the database |
| ALTER | Modify the structure of database table |
| DROP | Delete database Objects |
| RENAME | Rename database Objects (table, view, sequence, private synonym) |
| TRUNCATE | Remove all records of a table |

## DML – Data Manipulation Language

Data Manipulation Language (DML) statements are used to manage data within a database object. It allows manipulation and querying the existing database schema objects. The following table lists DML statements:

| Statement | Description |
| --- | --- |
| SELECT | Retrieve rows/columns from a table. |
| INSERT | Insert new data to a table. |
| UPDATE | Update existing records of table. |
| DELETE | Delete existing records from table. |
| MERGE | INSERT new rows or UPDATE existing rows in a table based on the specified conditions. |
| LOCK TABLE | Lock one or more tables in the specified mode. Based on lock applied table access denied or only real only access given to another user. |

## TCL– Transaction Control Language

Transaction Control Language (TCL) statements are used to finalize the changes in the data made by executing the DML statements.

| Statement | Description |
| --- | --- |
| COMMIT | Permanently save transaction changes to the database. |
| ROLLBACK | Restore the database to its original state since the last COMMIT. |
| SAVEPOINT | Create a SAVEPOINT to be later used by ROLLBACK Command to undo changes up to that point. |
| SET TRANSACTION | Set the transaction properties such as READ WRITE or READ ONLY access. |

## DCL– Data Control Language

Data Control Language (DCL) statements are used to enforce database security by giving privileges to different users to access the database.

| Statement | Description |
| --- | --- |
| GRANT | Gives privileges to the user for accessing data. |
| REVOKE | Take back given privileges from the user. |
| COMMENT | Specify comments on Database tables and columns. |
| ANALYZE | Collect statistics of table, index, partition, cluster, etc. |
| AUDIT | Track occurrence of specific or all SQL statements or operations on some specific Schema object. |

## SCL– Session Control Language

Session Control Language (SCL) statements are used to manage changes made to the database by executing DML statements. The SCL commands vary based on the database. The following table lists the SCL commands for the Oracle database.

| Statement     | Description                                     |
| ------------- | ----------------------------------------------- |
| ALTER SESSION | Modify database parameters for current session. |
| SET ROLE      | To enable or disable roles for current session. |

## Reference

1. [What is SQL? by tutorialsteacher](https://www.tutorialsteacher.com/sql/what-is-sql)
