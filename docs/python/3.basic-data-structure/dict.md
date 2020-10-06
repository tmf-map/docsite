---
title: Dict
---

Dict 全称 Dictionary（字典），在其他语言中也称为 Map，使用 key-value（键-值）存储，具有**极快的查找速度**。

- key 最好是唯一的（如果有两个相同的 key，后一个值会覆盖前一个），必须是不可变的，如字符串，数字。
- value 不必唯一，可以取任何数据类型。

一个简单的字典实例：

```py
dict1 = {'Kimi': '123', 'Jack': '456', 'Alice': '789'}
```

也可如此创建字典：

```py
dict2 = { 'abc': 123 }
dict3 = { 16.6: 28 }
dict4 = { (1,2): 28 }
```

但不能用列表作为 key，如下实例：

```py
dict5 = { [1,2]: 28 }
```

```py
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
<ipython-input-21-8662ab199307> in <module>
----> 1 dict4 = { [1,2]: 28 }

TypeError: unhashable type: 'list'
```

## 访问字典里的值

把相应的键放入到方括号中，如下实例:

```py
>>> dict6 = {'Name': 'Kimi', 'Age': 18, 'Class': 'First'}

>>> dict6['Name']
'Kimi'
>>> dict6['Age']
18
```

如果用字典里没有的键访问数据，会输出错误如下：

```py
>>> dict6['Gender']

---------------------------------------------------------------------------
KeyError                                  Traceback (most recent call last)
<ipython-input-79-c5a8f7a0626b> in <module>
----> 1 dict6['Gender']

KeyError: 'Gender'
```

:::caution

虽然字典的定义和 JS 中对象类似，但不支持 JS 中点取属性的语法：

```py
>>> dict6.Name
---------------------------------------------------------------------------
AttributeError                            Traceback (most recent call last)
<ipython-input-80-00d88607b6a3> in <module>
----> 1 dict6.Name

AttributeError: 'dict' object has no attribute 'Name'
```

:::

## 修改字典

向字典添加新内容的方法是增加新的键/值对，修改或删除已有键/值对如下实例:

```py
>>> dict6 = {'Name': 'Kimi', 'Age': 18, 'Class': 'First'}

>>> dict6['Age'] = 20 # 更新 Age
>>> dict6['School'] = 'ABC'  # 添加信息

>>> dict6['Age']
20
>>> dict6['School']
'ABC'
```

## 删除字典元素

能删单一的元素也能清空字典。显式删除一个字典用 `del` 命令，如下实例：

```py
>>> dict6 = {'Name': 'Kimi', 'Age': 18, 'Class': 'First'}

>>> del dict6['Name'] # 删除键 'Name'
>>> dict6
{'Age': 18, 'Class': 'First'}

>>> dict6.clear()     # 清空字典
{}
```

使用 `del` 删除后如果再次使用这个变量将会引发一个异常，因为用执行 `del` 操作后字典不再存在：

```py
>>> del dict6
>>> dict6
---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)
<ipython-input-86-e2ff198fdc6c> in <module>
----> 1 dict6

NameError: name 'dict6' is not defined
```

## 遍历字典元素

### `key in dict`

如果键在字典 dict 里返回 True，否则返回 False

## 函数

### `len(dict)`

计算字典元素个数，即键的总数。

```py
>>> dict6 = {'Name': 'Kimi', 'Age': 18, 'Class': 'First'}
>>> len(dict6)
3
```

### `str(dict)`

输出字典，以可打印的字符串表示。

```py
>>> dict6 = {'Name': 'Kimi', 'Age': 18, 'Class': 'First'}
>>> str(dict6)
"{'Name': 'Kimi', 'Age': 18, 'Class': 'First'}"
```

### `type(variable)`

返回输入的变量类型，如果变量是字典就返回字典类型。

```py
>>> dict6 = {'Name': 'Kimi', 'Age': 18, 'Class': 'First'}
>>> type(dict6)
<class 'dict'>
```

## 方法

### `dict.clear()`

删除字典内所有元素

### `dict.copy()`

返回一个字典的浅复制

### `dict.fromkeys()`

创建一个新字典，以序列 seq 中元素做字典的键，val 为字典所有键对应的初始值

### `dict.get(key, default=None)`

返回指定键的值，如果键不在字典中返回 default 设置的默认值

### `dict.items()`

以列表返回可遍历的(键, 值) 元组数组

### `dict.keys()`

返回一个迭代器，可以使用 list() 来转换为列表

### `dict.setdefault(key, default=None)`

和 get()类似, 但如果键不存在于字典中，将会添加键并将值设为 default

### `dict.update(dict2)`

把字典 dict2 的键/值对更新到 dict 里

### `dict.values()`

返回一个迭代器，可以使用 list() 来转换为列表

### `pop(key[,default])`

删除字典给定键 key 所对应的值，返回值为被删除的值。key 值必须给出。 否则，返回 default 值。

### `popitem()`

随机返回并删除字典中的最后一对键和值。
