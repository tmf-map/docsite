---
title: Select a Database
---

## Using the mysql client tool

When you log in to a MySQL database server using the mysql client tool without specifying a database name, MySQL server will set the current database to `NULL`.

First, log in to MySQL using the `root` user account:

```shell
mysql -u root -p
```

MySQL will prompt you for a password:

```shell
Enter password:
```

To log in, you need to provide the correct password of the root user account and press `Enter`.

### `SELECT database()`

To display the current database, you use the following statement:

```shell
SELECT database();
```

It’ll return the following:

```shell
+------------+
| database() |
+------------+
| NULL       |
+------------+
1 row in set (0.00 sec)
```

It means the current database is not set. If you issue a statement, MySQL will issue an error. For example:

```shell
SELECT * FROM t;
```

Error:

```shell
ERROR 1046 (3D000): No database selected
```

### `USE database_name`

To select a database to work with, you use the `USE` statement:

```shell
USE database_name;
```

For example, the following statement uses the `USE` statement to set the current database to `classicmodels`:

```shell
USE classicmodels;
```

If you see the following message, it means that you have changed the database to `classicmodels` successfully:

```shell
Database changed
```

To verify it, you can use the select `database()` statement:

```shell
SELECT database();
```

It’ll return something like:

```shell
+---------------+
| database()    |
+---------------+
| classicmodels |
+---------------+
1 row in set (0.00 sec)
```

If the `classicmodels` database doesn’t exist, you’ll get the following error after executing the `USE` statement:

```shell
ERROR 1049 (42000): Unknown database 'classicmodels'
```

### `SHOW DATABASES`

In above case, you need to find which databases are available on your server by using the show databases statement:

```shell
SHOW DATABASES;
```

The output may look like the following:

```shell
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.02 sec)
```

### Selecting a database when login

If you know which database you want to work with before you log in, you can use the `-D` flag. For example, the following command connects to the `classicmodels` database with the user account `root`:

```shell
mysql -u root -D classicmodels -p
```

In this command, we specify the database `classicmodels` after the `-D` flag.

After entering the password and logging in successfully, you can check the current database:

```shell
SELECT database();
```

Output:

```shell
+---------------+
| database()    |
+---------------+
| classicmodels |
+---------------+
1 row in set (0.00 sec)
```

## Using DataGrip

Doing...
