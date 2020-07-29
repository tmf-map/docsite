---
title: 数据类型
---

这种类型指的是 None，str, bytes, float, bool, int

## 数值型

```py
int_val = 123554
int_val ** 6 # 3557466836753811461234217695296

float_val = 7.234
float_val = 5.43e-5

5 / 2 # 2.5
5 // 2 # 2 取商
5 % 2 # 1 取余数
```

## 字符串

```py
a = 'one way of writing a string'
b = "another way"
c = """
    This is a longer string that
    spans multiple lines
    """
```

```py
c.count('\n') # 3
```

字符串类型是不可变的：

```py
a[10] = 'f'
```

```py
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
<ipython-input-45-5ca625d1e504> in <module>()
----> 1 a[10] = 'f'

TypeError: 'str' object does not support item assignment
```

## Bytes and Unicode

## 类型塑造（Type casting）

## 日期和时间

python 内建的 datetime 模块提供了三种类型，datatime, date and time types：
