---
title: Install MySQL
---

All downloads for MySQL are located at MySQL [Downloads](https://dev.mysql.com/downloads/mysql/). Pick the version number of **MySQL Community Server** which is required along with the platform you will be running it on.

## Installation on macOS

<Img w="720" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Z9vzeL.png' />

<Img w="550" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Xnip2020-11-16_22-52-47.jpg' alt='Xnip2020-11-16_22-52-47'/>

<Img w="550" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Xnip2020-11-16_22-53-03.jpg' alt='Xnip2020-11-16_22-53-03'/>

<Img w="550" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Pv6ool.png' />

<Img w="550" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/bRDiN6.png' />

## Configuration

<Img w="550" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/rEW8BT.png' />

## Connect

Let's use [TablePlus](https://tableplus.com/) as the default DB client for the demo, you can choose whatever client you like.

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/table-plus-connect1.png' alt='table-plus-connect1'/>
<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/table-plus-connect2.png' alt='table-plus-connect2'/>
<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/table-plus-connect3.png' alt='table-plus-connect3'/>

:::tip

You can check the connection by clicking `Test` before establishing a formal connection.

:::

You can connect to MySQL via terminal as well, take macOS as an example:

```shell
$ mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 29
Server version: 8.0.22 MySQL Community Server - GPL

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

:::info

If it returns `command not found: mysql` in terminal, you can add `export PATH=${PATH}:/usr/local/mysql/bin/` in `~/.zshrc` and run `. ~/.zshrc` at last.

:::
