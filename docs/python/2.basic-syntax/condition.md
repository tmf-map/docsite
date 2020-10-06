---
title: Condition
---

先来看一个例子：

```py
age = 3
if age >= 18:
    print('adult')
elif age >= 6:
    print('teenager')
else:
    print('kid')
```

和 C/C++、Java、JavaScript 等语言不同，Python 中没有用花括号来构造代码块而是使用了**缩进**的方式来表示代码的层次结构，缩进可以使用任意数量的空格，但通常使用 4 个空格，建议大家不要使用制表键或者设置你的代码编辑工具自动将制表键变成 4 个空格。

:::tip

`if`, `elif`, `else` 所在行末尾不要少写了冒号`:`

:::

当然如果要构造出更多的分支，可以使用如上的 `if...elif...else...` 结构或者嵌套的 `if...else...` 结构：

```py
age = 3
if age >= 18:
    print('adult')
else:
  if age >= 6:
    print('teenager')
  else:
      print('kid')
```

:::tip

大家可以自己感受一下这两种写法到底是哪一种更好。在 Python 之禅中有这么一句话“Flat is better than nested.”，之所以提倡代码“扁平化”是因为嵌套结构的嵌套层次多了之后会严重的影响代码的可读性，所以能使用扁平化的结构时就不要使用嵌套。

:::

elif 是 else if 的缩写，完全可以有多个 elif
