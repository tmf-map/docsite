---
title: List
---

List（列表）是一种有序的集合，可以随时添加和删除其中的元素。

## 创建

```py
a = [1, 2, 3]
```

## 下标

可以通过下标访问列表元素，下标从 `0` 开始，比如：

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

### `list.append(obj)`

list 是一个可变的有序表，所以，可以往 list 中追加元素到末尾：

```py
>>> a = [1, 2, 3]
>>> a.append(4)
>>> a
[1, 2, 3, 4]
```

### `list.extend(seq)`

### `list.insert(index, obj)`

也可以把元素插入到指定的位置，比如索引号为 1 的位置：

### `list.pop([index=-1])`

要删除 list 末尾的元素，用 pop()方法：

要删除指定位置的元素，用 pop(i)方法，其中 i 是索引位置：

### `list.remove(obj)`

### `list.reverse()`

### `list.sort( key=None, reverse=False)`

### `list.count(obj)`

### `list.clear()`

### `list.copy()`

## 参考资料

1. [菜鸟教程：Python3 列表](https://www.runoob.com/python3/python3-list.html)
