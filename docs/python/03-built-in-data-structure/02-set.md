---
title: Set
---

Set（集合）是一个**无序**的**不重复**元素序列。

## 创建

可以使用大括号 `{ }` 或者 `set()` 函数创建集合：

```py
set1 = {value1, value2, ...}
# or
set2 = set(value)
```

:::caution

- set2 中的 `value` 必须是 iterable，比如 string, list，不能是 int。
- 创建一个空集合必须用 `set()` 而不是 `{ }`，因为 `{ }` 是用来创建一个空字典。

:::

```py
>>> print({1, 2, 3})
{1, 2, 3}

>>> print(set([1, 2, 3]))
{1, 2, 3}
```

## 去重

集合具有天然去重的功能：

```py
>>> basket = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
>>> print(basket)
{'orange', 'banana', 'pear', 'apple'}
```

## 元素与集合关系

### `in` ∈

判断元素 x 是否在集合 s 中，存在返回 True，不存在返回 False。类似数学中的 `∈` 符号。

```py
x in s
```

```py
>>> 'apple' in basket
True
>>> 'peach' in basket
False
```

### `not in` ∉

判断元素 x 是否不在集合 s 中，类似数学中的 `∉` 符号。

```py
x not in s
```

```py
>>> 'apple' not in basket
False
>>> 'peach' not in basket
True
```

## 集合间运算

```py
>>> set1 = set('abcde')
>>> set2 = set('defgh')
>>> set1
{'a', 'b', 'c', 'd', 'e'}
>>> set2
{'d', 'e', 'f', 'g', 'h'}
```

### `<`, `<=` 子集

```py
>>> set1 < set2
False
>>> set('def') < set2
True
```

#### `set1.issubset(set2)`

判断 set1 是否为 set2 的子集。

```py
>>> set1.issubset(set2)
False
>>> set('def').issubset(set2)
False
```

### `>`, `>=` 超集

```py
>>> set1 > set2
False
>>> set('defghijk') > set2
True
```

#### `set1.issuperset(set2)`

判断 set1 是否为 set2 的超集。

```py
>>> set1.issuperset(set2)
False
>>> set('defghijk').issuperset(set2)
True
```

### `&` 交集

集合 set1 和 set2 中都包含了的元素，如下图所示：

<Img w="300" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/YmMY6t.png' alt='YmMY6t'/>

```py
>>> set1 & set2
{'d', 'e'}
```

#### `set1.intersection(set2, set3 ... etc)`

```py
>>> set1.intersection(set2)
{'d', 'e'}
```

#### `set1.intersection_update(set2, set3 ... etc)`

`intersection_update()` 方法其实就是将 `intersection()` 方法返回的新集合，重新赋值给 set1。该方法没有返回值。

```py
>>> set1.intersection_update(set2)
>>> set1
{'d', 'e'}
```

#### `set1.isdisjoint(set2)`

判断两个集合是否包含相同的元素，如果没有返回 True，否则返回 False。

```py
>>> set1.isdisjoint(set2)
False
```

### `|` 并集

集合 set1 或 set2 中包含的所有元素，如下图所示：

<Img w="300" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/JI7UaZ.png' alt='JI7UaZ'/>

```py
>>> set1 | set2
{'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'}
```

#### `set1.union(set2, set3 ... etc)`

```py
>>> set1.union(set2)
{'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'}
```

### `-` 差集

集合 set1 中包含而集合 set2 中不包含的元素，如下图所示：

<Img w="300" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/uHZJs3.png' alt='uHZJs3'/>

```py
>>> set1 - set2
{'a', 'b', 'c'}
```

#### `set1.difference(set2)`

```py
>>> set1.difference(set2)
{'a', 'b', 'c'}
```

#### `set1.difference_update(set2)`

`difference_update()` 方法其实就是将 `difference()` 方法返回的新集合，重新赋值给 set1。该方法没有返回值。

```py
>>> set1.difference_update(set2)
>>> set1
{'a', 'b', 'c'}
```

### `^` 对称差集

不同时包含于 set1 和 set2 的元素，如下图所示：

<Img w="300" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/o523Nx.png' alt='o523Nx'/>

```py
>>> set1 ^ set2
{'a', 'b', 'c', 'f', 'g', 'h'}
```

#### `set1.symmetric_difference(set2)`

```py
>>> set1.symmetric_difference(set2)
{'a', 'b', 'c', 'f', 'g', 'h'}
```

#### `set1.symmetric_difference_update(set2)`

`symmetric_difference_update()` 方法其实就是将 `symmetric_difference()` 方法返回的新集合，重新赋值给 set1。该方法没有返回值。

```py
>>> set1.symmetric_difference_update(set2)
>>> set1
{'a', 'b', 'c', 'f', 'g', 'h'}
```

## 集合推导式

类似列表推导式，同样集合支持集合推导式(Set comprehension):

```py
>>> a = {x for x in 'abracadabra' if x not in 'abc'}
>>> a
{'r', 'd'}
```

## 函数

### `len(set)`

```py
>>> basket = {'apple', 'orange', 'pear', 'banana'}
>>> len(basket)
4
```

## 其他方法

### `set.add(elem)`

为集合添加元素：

```py
>>> basket = {'apple', 'orange', 'pear', 'banana'}
>>> basket.add('peach')
>>> basket
{'apple', 'banana', 'orange', 'peach', 'pear'}
```

### `set.update(elem)`

给集合添加元素，且参数可以是列表，元组，字典等，语法格式如下：

```py
>>> basket = {'apple', 'orange', 'pear', 'banana'}
>>> basket.update({1, 2})
>>> basket
{1, 2, 'apple', 'banana', 'orange', 'pear'}
```

```py
>>> basket = {'apple', 'orange', 'pear', 'banana'}
>>> basket.update([1, 2], [3, 4])
>>> basket
{1, 2, 3, 4, 'apple', 'banana', 'orange', 'pear'}
```

### `set.remove(elem)`

将元素 x 从集合 set 中移除，如果元素不存在，则会发生错误。

```py
>>> basket = {'apple', 'orange', 'pear', 'banana'}
>>> basket.remove('apple')
>>> basket
{'banana', 'orange', 'pear'}

>>> basket.remove('apple')
---------------------------------------------------------------------------
KeyError                                  Traceback (most recent call last)
<ipython-input-54-0ec2f8a956bf> in <module>
----> 1 basket.remove('apple')

KeyError: 'apple'
```

### `set.discard(elem)`

移除集合中的元素，且如果元素不存在，不会发生错误。

```py
>>> basket = {'apple', 'orange', 'pear', 'banana'}
>>> basket.discard('apple')
>>> basket
{'banana', 'orange', 'pear'}

>>> basket.discard('apple')  # 不存在不会发生错误
>>> basket
{'banana', 'orange', 'pear'}
```

### `set.pop()`

随机移除元素，多次执行测试结果都不一样。因为 `pop` 方法会对集合进行无序的排列，然后将这个无序排列集合的左面第一个元素进行删除。

```py
>>> basket = {'apple', 'orange', 'pear', 'banana'}
>>> basket.pop()
'pear'
```

### `set.clear()`

清空集合中的所有元素：

```py
>>> basket = {'apple', 'orange', 'pear', 'banana'}
>>> basket.clear()
>>> basket
set()
```

### `set.copy()`

拷贝一个集合：

```py
>>> basket = {'apple', 'orange', 'pear', 'banana'}
>>> basket_copy = basket.copy()
>>> basket_copy
{'apple', 'banana', 'orange', 'pear'}
```

## 参考资料

1. [菜鸟教程：Python3 集合](https://www.runoob.com/python3/python3-set.html)
