---
title: Get Started
sidebar_label: 1. Get Started
---

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/sqlalchemy-cover.png' alt='sqlalchemy-cover'/>

SQLAlchemy 是 Python 下著名的 **ORM** (**Object Relational Mapping**，对象关系映射)工具集，首次发布于 2006 年 2 月，并迅速在 Python 社区中广泛使用，其提供了完整的企业级持久模式，能够与 FastAPI 中的数据模型进行良好的融合，并具有高效的数据库访问特点。

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/071351_HhbE_5430600.jpeg' legend='图：SQLAlchemy Overview'/>

简而言之是将类和对象转成 SQL，然后使用数据 API 执行 SQL 并获取执行结果。它的核心思想在于将关系数据库表中的记录映射成对象，以对象的形式展现，开发者可以把对数据库的操作转化为对对象的操作。

- [SQLAlchemy 1.4 官方文档](https://docs.sqlalchemy.org/en/14/index.html)
- [SQLAlchemy 2.0 官方文档](https://docs.sqlalchemy.org/en/20/index.html)

## 安装和连接

安装 SQLAlchemy:

```bash
pip install sqlalchemy
```

连接 SQLAlchemy:

```py
# 第一步，导入SQLAlchemy组件包
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 第二步，创建数据连接引擎
engine = create_engine("sqlite:///./sql_app.db", connect_args={"check_same_thread": False})
# engine = create_engine("mysql://user:password@hostname:port/db?charset=utf8")
# engine = create_engine("postgresql://user:password@hostname:port/db")

# 第三步，创建本地会话
session = sessionmaker(autocommit=False, bind=engine)
```

:::info

Python 安装包中集成了 SQLite 数据库的驱动，SQLite 是一个轻量级关系型数据库，实现了自给自足、无服务器的、零配置的、事务性的 SQL 数据库引擎，常用在移动端中，以下内容以 SQLite 数据库为例讲解 SQLAlchemy 的基本用法。

:::

程序每次发起对数据库的请求时，都需要创建一个 Session 对象，Session 对象不是用于数据库连接，而是用于事务支持，当创建 `sessionmaker` 的参数为 `autocommit=False` 时，这个 Session 对象会一直保存在内存中，直到该 Session 被关闭，或者 Session 中的事务被回滚、提交。

```py
session.rollback() # 回滚数据
session.commit() # 提交事务
session.close() # 关闭会话
```

:::tip

Session 对象用于操作 SQLAlchemy 数据模型的实例，比如在数据库中增加和删除数据等。

:::
