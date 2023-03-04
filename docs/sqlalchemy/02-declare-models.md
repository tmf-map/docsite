---
title: Declare Models
sidebar_label: 2. Declare Models
---

在 SQLAlchemy 中定义数据模型（表结构）时，先要使用 `declarative_base` 类创建数据模型的基类。在继承类中，定义数据库表与 Python 对象的映射关系。

```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

engine = create_engine(                              # 创建数据库连接引擎
    "sqlite:///./sql_app.db",
    connect_args={"check_same_thread": False}
)
session = sessionmaker(autocommit=False, bind=engine) # 创建本地会话
Base = declarative_base()                             # 创建模型基类

class User(Base):                                     # 定义数据模型类
    __tablename__ = 'user'                            # 数据库中对应的表名
    id = Column('id', Integer, primary_key=True)      # 定义字段id，整型，对应数据库的id列
    name = Column('name', String(50))   # 定义字段name，字符串型，对应数据库中的name列

Base.metadata.create_all(bind=engine)                 # 在数据库中创建表结构
```

以上代码中，先创建了数据库连接引擎，然后创建了数据模型的基类，接着从该基类继承出数据模型类，最后通过 `Base.metadata.create_all()` 方法将数据模型中定义的表和字段，生成到数据库中。

数据模型类（`User`）中，使用 `__tablename__` 属性定义数据库中的表名，用 `Column` 类定义的属性对应于数据库表中的字段。执行以上代码后，会在同级目录下生成一个数据库文件：`sql_app.db`，这个文件就是 SQLite 的数据库文件。

[SQLAlchemy 1.4](https://docs.sqlalchemy.org/en/14/core/type_basics.html#generic-camelcase-types) 中数据类型如下：

1. **BigInteger**: A type for bigger `int` integers.
2. **Boolean**: A bool datatype.
3. **Date**: A type for `datetime.date()` objects.
4. **DateTime**: A type for `datetime.datetime()` objects.
5. **Enum**: Generic Enum Type.
6. **Float**: Type representing floating point types, such as `FLOAT` or `REAL`.
7. **Integer**: A type for `int` integers.
8. **Interval**: A type for `datetime.timedelta()` objects.
9. **LargeBinary**: A type for large binary byte data.
10. **MatchType**: Refers to the return type of the MATCH operator.
11. **Numeric**: Base for non-integer numeric types, such as `NUMERIC`, `FLOAT`, `DECIMAL`, and other variants.
12. **PickleType**: Holds Python objects, which are serialized using pickle.
13. **SchemaType**: Mark a type as possibly requiring schema-level DDL for usage.
14. **SmallInteger**: A type for smaller `int` integers.
15. **String**: The base for all string and character types.
16. **Text**: A variably sized string type.
17. **Time**: A type for `datetime.time()` objects.
18. **Unicode**: A variable length Unicode string type.
19. **UnicodeText**: An unbounded-length Unicode string type.

[SQLAlchemy 2.0](https://docs.sqlalchemy.org/en/20/core/type_basics.html#generic-camelcase-types) 中新增的数据类型如下：

20. **Double**: A type for double `FLOAT` floating point types.
21. **Uuid**: Represent a database agnostic UUID datatype.

这些类型与关系型数据库中的字段类型具有对应关系，比如 String 对应的数据库类型时 varchar，Numeric 对应的数据库类型是 float 或 decimal。

Column 的具体参数定义请阅读：

- https://docs.sqlalchemy.org/en/14/core/metadata.html#sqlalchemy.schema.Column
- https://docs.sqlalchemy.org/en/20/core/metadata.html#sqlalchemy.schema.Column

## References

1. [SQLAlchemy ORM Quick Start: Declare Models](https://docs.sqlalchemy.org/en/20/orm/quickstart.html#declare-models)
