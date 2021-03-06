---
title: List
---

List（列表）是一种有序的集合，可以随时添加和删除其中的元素。

## 创建

```py
a = [1, 2, 3]
```

## 访问列表中的值

与字符串的索引一样，可以通过下标访问列表元素，下标从 `0` 开始，比如：

```py
>>> a[0]
1
```

:::caution

通过下标的方式读取元素的时候，索引若超出了范围，Python 会报一个 `IndexError` 错误，所以，要确保索引不要越界。

```py
>>> a[3]
---------------------------------------------------------------------------
IndexError                                Traceback (most recent call last)
<ipython-input-17-1c90a8b28085> in <module>
----> 1 a[3]

IndexError: list index out of range
```

:::

如果要取最后一个元素，除了计算索引位置外，还可以用-1 做索引，直接获取最后一个元素：

```py
>>> a[-1]
3
```

<Img w="650" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/kfdc9j.png' />

使用下标索引来访问列表中的值，同样你也可以使用方括号 `[]` 的形式截取字符，即列表的**切片**，如下所示：

<Img w="650" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/DwbBdX.png' />

那如何截取开头或结尾的元素呢？

```py
a[:2] # 截取开头两个元素
a[:-2] # 截取最后两个元素
```

## 函数

### `len(list)`

获得 list 元素的个数：

```py
>>> len(a)
3
```

### `list(seq)`

将元组转换为列表：

```py
>>> tup1 = (1, 2, 3)
>>> list(tup1)
[1, 2, 3]
```

### `max(list)`

返回列表元素最大值：

```py
>>> max(a)
3
```

### `min(list)`

返回列表元素最小值：

```py
>>> min(a)
1
```

## 方法

假设 a 是初始值如下的 list，且每次代码片段调用后自动恢复成初始值：

```py
a = [1, 2, 3]
```

### `list.append(obj)`

list 是一个可变的有序表，所以，可以往 list 中追加元素到末尾：

```py
>>> a.append(4)
>>> a
[1, 2, 3, 4]
```

### `list.extend(seq)`

在列表末尾一次性追加另一个序列中的多个值（会改变原来列表）

### `list.index(obj)`

从列表中找出某个值第一个匹配项的索引位置：

```py
a.index(1) # 0
```

:::danger

如果没有找到该值会报 ValueError:

```py
>>> a.index('1')
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
<ipython-input-108-01ebeeb36729> in <module>
      1 a = [1,2,3]
----> 2 a.index('1')

ValueError: '1' is not in list
```

比较 `pythonic` way 是将其包在 try-except 中：

```py
try:
    idx = a.index('1') # 0
except ValueError:
    idx = -1
```

也可以使用类似三目运算符的方法：

```py
a.index(1) if 1 in a else -1 # 0
```

:::

### `list.insert(index, obj)`

也可以把元素插入到指定的位置，比如索引号为 1 的位置：

### `list.pop([index=-1])`

要删除 list 末尾的元素，用 pop()方法：

```py
>>> a.pop()
3
>>> a
[1, 2]
```

要删除指定位置的元素，用 `pop(i)` 方法，其中 `i` 是索引位置：

```py
>>> a.pop(1)
2
>>> a
[1, 3]
```

:::tip

JS 中 `pop(i)` 和 `pop()` 是一个意思，也就是说 `i` 被忽略了。

:::

### `list.remove(obj)`

### `list.reverse()`

### `list.sort( key=None, reverse=False)`

### `list.count(obj)`

### `list.clear()`

### `list.copy()`

## 常用操作

### 合并两个 list

假设有两个 list 分别为 `a` 和 `b`:

```py
a = [1, 2, 3]
b = [4, 5, 6, 7]
```

#### 1. 使用 `+` 号

```py
>>> a + b
[1, 2, 3, 4, 5, 6, 7]
```

#### 2. 使用 `extend` 方法

```py
>>> a.extend(b) # None
>>> a
[1, 2, 3, 4, 5, 6, 7]
```

#### 3. 使用切片

```py
>>> a[len(a): len(a)] = b
>>> a
[1, 2, 3, 4, 5, 6, 7]
```

:::tip

`len(a)` 代表要将 `b` 插入 `a` 中的位置。又例如：

```py
>>> a[0:0] = b
[4, 5, 6, 7, 1, 2, 3]
```

:::

#### 小结

- 第一种方法比较简洁，就是运算符的重载
- 第二种方法比较可读，但会覆盖原始 list
- 第三种方法比较强大，可以将一个列表插入另一个列表的任意位置

## 参考资料

1. [菜鸟教程：Python3 列表](https://www.runoob.com/python3/python3-list.html)
2. [StackOverflow: Best way to handle list.index(might-not-exist) in python?](https://stackoverflow.com/questions/2132718/best-way-to-handle-list-indexmight-not-exist-in-python)
3. [Python 将多个 list 合并为 1 个 list, 作者：缥缈之力](https://blog.csdn.net/roytao2/article/details/54180182)
