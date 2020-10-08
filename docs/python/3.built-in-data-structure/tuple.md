---
title: Tuple
---

Tuple（元组）与 List 类似，不同之处在于：

- 元组的元素不能修改。
- 元组使用 `()`，列表使用 `[]`。

## 创建

```py
>>> tup1 = ('apple', 'pear', 1997, 2000)
>>> tup2 = (1, 2, 3, 4, 5 )
>>> tup3 = "a", "b", "c", "d"   # 不需要括号也可以
>>> type(tup3)
<class 'tuple'>
```

:::tip

不可变的 tuple 有什么意义？因为 tuple 不可变，所以代码更安全。如果可能，能用 tuple 代替 list 就尽量用 tuple。

:::

创建空元组

```py
tup_empty = ()
```

元组中只包含一个元素时，需要在元素后面添加逗号，否则括号会被当作运算符使用：

```py
>>> tup1 = (50)
>>> type(tup1)     # 不加逗号，类型为整型
<class 'int'>

>>> tup1 = (50,)
>>> type(tup1)     # 加上逗号，类型为元组
<class 'tuple'>
```

## 访问/截取元组

因为元组也是一个序列，所以我们可以通过索引访问元组中的指定位置的元素，下标索引从 `0` 开始，也可以截取索引中的一段元素，如下实例:

```py
tup1 = ('apple', 'pear', 1997, 2000)
```

| Python 表达式 | 结果 | 描述 |
| --- | --- | --- |
| tup1[1] | 'pear' | 读取第二个元素 |
| tup1[-1] | 2000 | 反向读取，读取倒数第一个元素 |
| tup1[1:] | ('pear', 1997, 2000) | 截取元素，从第二个开始后的所有元素 |
| tup1[1:3] | ('pear', 1997) | 截取元素，从第二个开始后的，第四个元素结束，左闭右开 |

## 修改元组

元组中的元素值是不允许修改的，但我们可以对元组进行**连接组合**，如下:

```py
>>> tup1 = (12, 34.56)
>>> tup2 = ('abc', 'xyz')
```

以下修改元组元素操作是非法的。

```py
tup1[0] = 100
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
<ipython-input-65-034a7a67b47e> in <module>
----> 1 tup1[0] = 100

TypeError: 'tuple' object does not support item assignment
```

:::tip

所谓元组的不可变指的是 tup1 所指向的内存中的内容不可变，但 tup1 本身的引用地址是可以改变的：

```py
>>> id(tup1)
140487711824896

>>> tup1 = (1, 2, 3)
>>> id(tup1)
140487712772544
```

:::

```py
>>> tup3 = tup1 + tup2
>>> tup3
(12, 34.56, 'abc', 'xyz')
```

## 删除元组

元组中的元素值是不允许删除的，但我们可以使用 `del` 语句来删除整个元组，元组被删除后，再次输出该变量会有异常信息:

```py
>>> tup = ('apple', 'pear', 1997, 2000)
>>> del tup
>>> tup
---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)
<ipython-input-66-ccfc40456244> in <module>
      1 tup = ('apple', 'pear', 1997, 2000)
      2 del tup
----> 3 tup

NameError: name 'tup' is not defined
```

## 元组运算符

与字符串一样，元组之间可以使用 `+` 号和 `*` 号进行运算。这就意味着它们可以组合和复制，运算后会生成一个新的元组。

| Python 表达式                  | 结果                         | 描述         |
| ------------------------------ | ---------------------------- | ------------ |
| len((1, 2, 3))                 | 3                            | 计算元素个数 |
| (1, 2, 3) + (4, 5, 6)          | (1, 2, 3, 4, 5, 6)           | 连接         |
| ('Hi!',) \* 4                  | ('Hi!', 'Hi!', 'Hi!', 'Hi!') | 复制         |
| 3 in (1, 2, 3)                 | True                         | 元素是否存在 |
| for x in (1, 2, 3): print (x,) | 1 2 3                        | 迭代         |

## 函数

### `len(tuple)`

计算元组元素个数。

```py
>>> tup1 = ('apple', 'pear', 1997, 2000)
>>> len(tup1)
4
```

### `tuple(iterable)`

将可迭代系列转换为元组。

```py
>>> list1 = ['apple', 'pear', 1997, 2000]
>>> tup1 = tuple(list1)
>>> tup1
('apple', 'pear', 1997, 2000)
```

### `max(tuple)`

返回元组中元素最大值。

```py
>>> tup2 = ('5', '4', '8')
>>> max(tup2)
'8'
```

:::caution

当元组中混合有其他类型的时候会报错：

```py
tup1 = ('apple', 'pear', 1997, 2000)
max(tup1)
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
<ipython-input-68-c3495215f812> in <module>
      1 tup1 = ('apple', 'pear', 1997, 2000)
----> 2 max(tup1)

TypeError: '>' not supported between instances of 'int' and 'str'
```

:::

### `min(tuple)`

返回元组中元素最小值。

```py

>>> tup2 = ('5', '4', '8')
>>> min(tup2)
'4'
```

## 参考资料

1. [菜鸟教程：Python3 元组](https://www.runoob.com/python3/python3-tuple.html)
