---
title: 语言语义
---

## 缩进

Python 使用空格（tabs or spaces)来组织代码结构，而不是像 R，C++，Java 那样用括号。

:::tip

建议使用 4 个空格来作为默认的缩进，设置 tab 键为四个空格

:::

另外可以用分号隔开多个语句：

```py
a = 5; b = 6; c = 7
```

## 万物皆对象

在 python 中，number，string，data structure，function，class，module 都有自己的“box”，即可以理解为 Python object（对象）。下面所有的对象直接用 object 来指代。

## 动态参考，强类型

不像 C++，Java 之类的语言，python 中 object reference 是没有自带类型的。但是可以通过 type 来查看类型：

```py
a = 5
type(a) # int
```

类型信息存储在这个对象本身。

而 python 可以看做是强类型，即每一个 object 都有一个明确的类型。所以下面的运算不会成立。但是 JavaScript 会把`5`变为字符串（string）

```py
'5' + 5
```

```py
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
<ipython-input-5-f9dbf5f0b234> in <module>()
----> 1 '5' + 5

TypeError: Can't convert 'int' object to str implicitly
```

不过像是 int 与 float 之间倒是会隐式转换：

```py
a = 4.5
b = 2
print('a is {0}, b is {1}'.format(type(a), type(b))) # a is <class 'float'>, b is <class 'int'>
a / b # 2.25
```

因为知道每个 Object 的类型很重要，我们可以用`isinstance`函数来查看 object 的类型，类似 JavaScript 的 `instanceof` 关键字。

```py
a = 5
isinstance(a, int) # True
```

查看 a、b 是否是 int 或 float 类型

```py
a = 5; b = 4.5
isinstance(a, (int, float)) # True
isinstance(b, (int, float)) # True
```

## 属性和方法

属性（Attributes）指在当前这个 object 里，还有一些其他的 python object。方法（method）指当前这个 object 自带的一些函数，这些函数可以访问 object 里的内部数据。

通过`obj.attribute_name`可以查看：

```py
a = 'foo'
a.<Press Tab>
```

可以通过 `getattr` 函数来访问属性和方法：

```py
getattr(a, 'split') # <function str.split>
```

## Duck typing

在程序设计中，鸭子类型（duck typing）是动态类型的一种风格。在这种风格中，一个对象有效的语义，不是由继承自特定的类或实现特定的接口，而是由"当前方法和属性的集合"决定。这个概念的名字来源于由 James Whitcomb Riley 提出的鸭子测试（见下面的“历史”章节），“鸭子测试”可以这样表述：

> “当看到一只鸟走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子，那么这只鸟就可以被称为鸭子。”

在鸭子类型中，关注的不是对象的类型本身，而是它是如何使用的。

比如，如果一个 object 能够实现迭代原则，那么这个 object 就是可迭代的。我们可以看这个 object 是否有**iter**这个 magic method。或者自己写一个 iter function 来检测：

```py
def isiterable(obj):
    try:
        iter(obj)
        return True
    except TypeError: # not iterable
        return False
```

```py
isiterable('a string') # True
isiterable([1, 2, 3]) # True
isiterable(5) # False
```

这个功能多用于写一些能接受多种类型的函数。比如我们写一个函数，用接收任何序列（list, tuple, ndarray) 甚至一个迭代器。如果接收的不是一个 list，那么我们就人为将其转变为一个 list：

```py
if not isinstance(x, list) and isiterable(x): # 如果x不是list，且x可迭代
    x = list(x) # 转变x为list
```

## Import

比如我创建了一个 `some_module.py` 的文件，里面写着：

```py
# some_module.py PI = 3.14159

def f(x):
    return x + 2

def g(a, b):
    return a + b
```

那么在别的文件里，有多重导入方式：

```py
# 1
import some_module
result = some_module.f(5)
pi = some_module.PI

# 2
from some_module import f, g, PI
result = g(5, PI)

# 3
import some_module as sm
from some_module import PI as pi, g as gf

r1 = sm.f(pi)
r2 = gf(6, pi)
```

## 运算符

用`is`,和`is not`, 检查两个引用（references）是否指同一个 object，

```py
a = [1, 2, 3]
b = a
c = list(a)

a is b # True
a is not c # True
```

因为 `c = list(a)` 中的 list 函数创建了一个新的 list，所以 c 是一个新的 list，不指向原来的 a。

另一个`is`的常用法是用来检查一个 instance 是不是`none`：

```py
a = None
a is None # True
```

---

== 和 is 的区别

另外像是 `+`， `-`，`==`， `<=`, `&`, `|` 等都也算是运算符，这个就不详细说了，可以直接看这个[链接](http://www.runoob.com/python/python-operators.html)

## Mutable and immutable objects

在 python 的 object 中，lists, dicts, NumPy arrays, 以及用户自定义的类型(classes), 都是可以更改的：

```py
a_list = ['foo', 2, [4, 5]]
a_list[2] = (3, 4)
a_list
```

而 string 和 tuple 是不可以更改的：

```py
a_tuple = (3, 5, (4, 5))
a_tuple[1] = 'four'
```
