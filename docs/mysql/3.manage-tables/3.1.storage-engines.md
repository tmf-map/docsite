---
title: Storage Engines
---

MySQL provides various storage engines for its tables. It is essential to understand the features of each storage engine in MySQL so that you can use them effectively to maximize the performance of your databases. Such as following:

- MyISAM
- InnoDB
- MERGE
- MEMORY (HEAP)
- ARCHIVE
- CSV
- FEDERATED

Each storage engine has its own advantages and disadvantages. It is crucial to understand each storage engine features and choose the most appropriate one for your tables to maximize the performance of the database. In the following sections, we will discuss each storage engine and its features so that you can decide which one to use.

## MyISAM

MyISAM extends the former ISAM storage engine. The MyISAM tables are optimized for compression and speed. MyISAM tables are also portable between platforms and operating systems.

The size of the MyISAM table can be up to 256TB, which is huge. In addition, MyISAM tables can be compressed into read-only tables to save spaces. At startup, MySQL checks MyISAM tables for corruption and even repairs them in a case of errors. The MyISAM tables are not transaction-safe.

:::info

Before MySQL version 5.5, MyISAM is the default storage engine when you create a table without specifying the storage engine explicitly. From version 5.5, MySQL uses InnoDB as the default storage engine.

:::

## InnoDB

The InnoDB tables fully support ACID-compliant and transactions. They are also optimal for performance. InnoDB table supports foreign keys, commit, rollback, roll-forward operations. The size of an InnoDB table can be up to **64TB**.

Like MyISAM, the InnoDB tables are portable between different platforms and operating systems. MySQL also checks and repairs InnoDB tables, if necessary, at startup.

## MERGE

A MERGE table is a **virtual** table that combines multiple MyISAM tables that have a similar structure to one table. The MERGE storage engine is also known as the `MRG_MyISAM` engine. The MERGE table does not have its own indexes; it uses indexes of the component tables instead.

Using MERGE table, you can speed up performance when joining multiple tables. MySQL only allows you to perform `SELECT`, `DELETE`, `UPDATE` and `INSERT` operations on the MERGE tables. If you use `DROP TABLE` statement on a MERGE table, only MERGE specification is removed. The underlying tables will not be affected.

## Memory

The memory tables are stored in memory and use hash indexes so that they are faster than MyISAM tables. The lifetime of the data of the memory tables depends on the uptime of the database server. The memory storage engine is formerly known as HEAP.

## Archive

The archive storage engine allows you to store a large number of records, which for archiving purpose, into a compressed format to save disk space. The archive storage engine compresses a record when it is inserted and decompress it using the _zlib_ library as it is read.

The archive tables only allow `INSERT` and `SELECT` statements. The ARCHIVE tables do not support indexes, so it is required a full table scanning for reading rows.

## CSV

The CSV storage engine stores data in **comma-separated values** (CSV) file format. A CSV table brings a convenient way to migrate data into non-SQL applications such as spreadsheet software.

CSV table does not support NULL data type. In addition, the read operation requires a full table scan.

## FEDERATED

The FEDERATED storage engine allows you to manage data from a remote MySQL server without using the cluster or replication technology. The local federated table stores no data. When you query data from a local federated table, the data is pulled automatically from the remote federated tables.

## Choosing MySQL Table Types

You can use the following checklist to choose the most appropriate storage engine, or table type, based on various criteria.

<Img w="700" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/WVvMWq.png' legend='Figure: MySQL Storage Engines Feature Summary' origin="https://www.mysqltutorial.org/wp-content/uploads/2018/03/MySQL-Storage-Engines-Feature-Summary.pdf"/>

## Reference

1. [Understanding MySQL Storage Engines by mysqltutorial](https://www.mysqltutorial.org/understand-mysql-table-types-innodb-myisam.aspx)
