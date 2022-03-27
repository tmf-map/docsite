---
title: Table Statement
---

## `CREATE TABLE`

The following illustrates the basic syntax of the CREATE TABLE statement:

```sql
CREATE TABLE [IF NOT EXISTS] table_name(
   column_1_definition,
   column_2_definition,
   ...,
   table_constraints
) ENGINE=storage_engine;
```

Let’s examine the syntax in greater detail.

First, you specify the name of the table that you want to create after the CREATE TABLE keywords. The table name must be unique within a database. The IF NOT EXISTS is optional. It allows you to check if the table that you create already exists in the database. If this is the case, MySQL will ignore the whole statement and will not create any new table.

Second, you specify a list of columns of the table in the column_list section, columns are separated by commas.

Third, you can optionally specify the storage engine for the table in the ENGINE clause. You can use any storage engine such as InnoDB and MyISAM. If you don’t explicitly declare a storage engine, MySQL will use InnoDB by default.

InnoDB became the default storage engine since MySQL version 5.5. The InnoDB storage engine brings many benefits of a relational database management system such as ACID transaction, referential integrity, and crash recovery. In the previous versions, MySQL used MyISAM as the default storage engine.

The following shows the syntax for a column’s definition:

```sql
column_name data_type(length) [NOT NULL] [DEFAULT value] [AUTO_INCREMENT] column_constraint;
```

Here are the details:

- Thecolumn_name specifies the name of the column. Each column has a specific data type and optional size e.g.,VARCHAR(255)
- The NOT NULL constraint ensures that the column will not contain NULL. Besides the NOT NULL constraint, a column may have - additional constraint such as CHECK, and UNIQUE.
- The DEFAULT specifies a default value for the column.
- The AUTO_INCREMENT indicates that the value of the column is incremented by one automatically whenever a new row is inserted - into the table. Each table has a maximum one AUTO_INCREMENT column.

After the column list, you can define table constraints such as UNIQUE, CHECK, PRIMARY KEY and FOREIGN KEY.

For example, if you want to set a column or a group of columns as the primary key, you use the following syntax:

```sql
PRIMARY KEY (col1,col2,...)
```

### `AUTO_INCREMENT`

In MySQL, a sequence is a list of integers generated in the ascending order i.e., 1,2,3… Many applications need sequences to generate unique numbers mainly for identification e.g., customer ID in CRM, employee numbers in HR, and equipment numbers in the services management system.

To create a sequence in MySQL automatically, you set the `AUTO_INCREMENT` attribute for a column, which typically is a primary key column.

The following rules are applied when you use the `AUTO_INCREMENT` attribute:

Each table has only one `AUTO_INCREMENT` column whose data type is typically the integer. The `AUTO_INCREMENT` column must be indexed, which means it can be either `PRIMARY` KEY or `UNIQUE` index. The `AUTO_INCREMENT` column must have a `NOT NULL` constraint. When you set the `AUTO_INCREMENT` attribute to a column, MySQL automatically adds the `NOT NULL` constraint to the column implicitly.

The following statement creates a table named employees that has the emp_no column is an AUTO_INCREMENT column:

```sql
CREATE TABLE employees (
    emp_no INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);
```

### `GENERATED ALWAYS AS`

## `CREATE TEMPORARY TABLE`

## `ALTER TABLE`

## `RENAME TABLE`

## `DROP TABLE`

## `TRUNCATE TABLE`

## Reference

1. [Select a Database by mysqltutorial](https://www.mysqltutorial.org/mysql-select-database/)
2. [Create Databases by mysqltutorial](https://www.mysqltutorial.org/mysql-create-database/)
3. [Drop Databases by mysqltutorial](https://www.mysqltutorial.org/mysql-select-database/)
