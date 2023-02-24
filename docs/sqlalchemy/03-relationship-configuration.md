---
title: Relationship Configuration
sidebar_label: 3. Relationship Configuration
---

在 SQLAlchemy 中使用 `relationship` 函数定义关联关系（表关系），常用参数如下：

- **argument**: 设置另外一个用于建立关联关系的数据模型类名称，字符串型，设置时可以省略 argument 参数名，直接在第一个参数位置指定数据模型类名称。
- **uselist**: 是否建立一对多关系，默认 `True`，若设为 `False` 即为一对一关系。
- **backref**: 反向引用，通过指定另外一个数据模型类的关联字段名，在一对多或多对多之间建立双向关系。
- **secondary**: 用于指向多对多的中间表。
- **remote_side**: 当外键是数据模型类自身时使用。
- **back_populates**: 当属性为反向关系时，指定另外一个数据模型类对应的关联字段名。
- **cascade**: 指定级联操作时的可用动作，比如，当删除主数据时，与其关联的子表是否会同步删除对应数据。

### 一对一关系

一对一关系就是表 A 中的一条记录对应表 B 中的唯一一条记录，比如一个用户只有一个账户：

```py
class User(Base):
    __tablename___ = 'user'
    id = Column(Integer, primary_key=True)
    account = relationship('Account', uselist=False, backref='account') # 第一个参数是数据模型类名
```

以上使用 `uselist=False` 给两张表建立了的一对一关系。

### 一对多关系

一个用户可以借阅多本图书，这个就是典型的一对多关系：

```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship

engine = create_engine(                              # 创建数据库连接引擎
    "sqlite:///./sql_app.db",
    connect_args={"check_same_thread": False}
)
session = sessionmaker(autocommit=False, bind=engine) # 创建本地会话

Base = declarative_base()   # 定义数据模型基类

class User(Base):            # 定义数据模型，用户
    __tablename__ = 'user'   # 数据库中的表名
    id = Column(Integer, primary_key=True)  # id列，主键
    name = Column('name', String(50))  # 定义字段name，字符串型，对应数据库中的name列
    bookrecords = relationship('BookRecord', backref='user')  # 图书列表字段，定义一对多关系

class BookRecord(Base):            # 定义数据模型，图书记录
    __tablename__ = 'book_record'   # 数据库中的表名
    id = Column(Integer, primary_key=True)  # id列，主键
    book_name = Column('book_name', String(50))   # 书名
    borrow_time = Column('borrow_time', DateTime)   # 借书时间
    user_id = Column(Integer, ForeignKey('user.id'))   # user_id ，外键

Base.metadata.create_all(bind=engine)                 # 在数据库中创建表结构
```

以上代码中，`backref` 作用是在 BookRecord 类中的每个实例上增加一个 user 字段，指向 User 类的实例。BookRecord 类通过外键的方式与 User 类形成了多对一关系，外键定义在多的那一方。

### 多对多关系

多对多关系一般需要一个中间表，中间表的两个字段分别指向另外两张表中的字段，比如用户权限的设计，一个用户可以有多个行为权限，一个行为权限也有多个用户。

在 SQLAlchemy 使用 **Table** 对象建立中间表数据模型，再关联到另外两张表的字段上，代码如下：

```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, ForeignKey, Table, String
from sqlalchemy.orm import relationship

engine = create_engine(                              # 创建数据库连接引擎
    "sqlite:///./sql_app.db",
    connect_args={"check_same_thread": False}
)
session = sessionmaker(autocommit=False, bind=engine) # 创建本地会话

Base = declarative_base()   # 定义数据模型基类

user_action_rel = Table(      # 定义中间表
    'user_action_rel',        # 数据库中的表名
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),   # 外键，关联到user.id
    Column('action_id', Integer, ForeignKey('action.id'))  # 外键，关联到action.id
)

class User(Base):            # 定义数据模型，用户
    __tablename__ = 'user'   # 数据库中的表名
    id = Column(Integer, primary_key=True)  # id列，主键
    name = Column('name', String(50))
    actions = relationship('Action', secondary=user_action_rel, backref='user')

class Action(Base):            # 定义数据模型，功能点
    __tablename__ = 'action'   # 数据库中的表名
    id = Column(Integer, primary_key=True)
    name = Column('name', String(50))
    users = relationship('User', secondary=user_action_rel, backref='actions')

Base.metadata.create_all(bind=engine)                 # 在数据库中创建表结构
```

User 和 Action 两个数据模型中，都使用 relationship 函数的 `secondary` 参数指定了中间表，最终结果是数据模型 User 和 Action 形成了多对多关系。

## References

1. [SQLAlchemy Relationship Configuration](https://docs.sqlalchemy.org/en/20/orm/relationships.html)
