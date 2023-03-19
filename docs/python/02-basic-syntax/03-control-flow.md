---
title: Control Flow
---

## 分支结构

Python 中的分支结构语法主要包括 `if` `else`, `elif` (`else if`的缩写)，先来看一个例子：

```py
age = 3
if age >= 18:
    print('adult')
elif age >= 6:
    print('teenager')
else:
    print('kid')
```

和 C/C++、Java、JavaScript 等语言不同，Python 中没有用花括号来构造代码块，而是使用了**缩进**的方式来表示代码的层次结构，缩进可以使用任意数量的空格，但通常使用 4 个空格。

:::tip

`if`, `elif`, `else` 以及 `for`, `while`，当接下来的一段代码在本行的作用范围内，本行结尾都要有冒号`:`

:::

当需要构造更多的分支，除了使用以上扁平的 `if...elif...else...` 结构，还可以使用嵌套的 `if...else...` 结构：

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

大家可以自己感受一下这两种写法到底是哪一种更好。在 Python 之禅中有这么一句话 “_Flat is better than nested._”，之所以提倡代码“扁平化”是因为嵌套结构的嵌套层次多了之后会严重的影响代码的可读性，所以能使用扁平化的结构时就不要使用嵌套。

:::tip

Python 的分支结构中没有 switch/case 语句，只有 if/else 语句。

:::

## 循环结构

Python 的循环语法主要有两种：for-in 和 while，没有其他语言常用的 for 循环和 do-while 等。

### for-in 循环

先看一个计算 `1 + 2 + 3 + ··· + 100` 的例子：

```py
sum = 0
for x in range(101):
    sum += x
print(sum) # 5050
```

上面代码中的 `range(1, 101)` 可以用来构造一个从 1 到 100 的范围，当我们把这样一个范围放到 for-in 循环中，就可以通过前面的循环变量 x 依次取出从 1 到 100 的整数。当然，`range` 的用法非常灵活，如下所示：

| Python 表达式       | 结果            | 描述                                 |
| ------------------- | --------------- | ------------------------------------ |
| `range(101)`        | 0 到 100 的整数 | 左闭右开的区间，取不到 10            |
| `range(1, 101)`     | 1 到 100 的整数 | 左闭右开的区间，取不到 10            |
| `range(1, 101, 2)`  | 1 到 100 的奇数 | 其中 `2` 是步长，即每次数值递增的值  |
| `range(100, 0, -2)` | 100 到 1 的偶数 | 其中 `-2` 是步长，即每次数字递减的值 |

我们可以用下面的代码来实现 1~100 之间的偶数求和。

```py
sum = 0
for x in range(2, 101, 2):
    sum += x
print(sum) # 2550
```

遍历数组也可以用`for in`:

```py
for val in ['a', 'b', 'c']:
    print(val)
```

如果需要获取数组下标可以用 built-in function [enumerate()](https://docs.python.org/3/library/functions.html#enumerate):

```py
for idx, val in enumerate(['a', 'b', 'c']):
    print(idx, val)
```

### while 循环

如果要构造不知道具体循环次数的循环结构，可以使用 while 循环。下面我们通过一个“猜数字”的小游戏来看看如何使用 while 循环。

> 猜数字游戏的规则是：计算机出一个 1 到 100 之间的随机数，玩家输入自己猜的数字，计算机给出对应的提示信息（大一点、小一点或猜对了），如果玩家猜中了数字，计算机提示用户一共猜了多少次，游戏结束，否则游戏继续。

```py
import random

answer = random.randint(1, 100)
counter = 0
while True:
    counter += 1
    number = int(input('请输入: '))
    if number < answer:
        print('大一点')
    elif number > answer:
        print('小一点')
    else:
        print('恭喜你猜对了!')
        break
print('你总共猜了%d次' % counter)
if counter > 7:
    print('你的智商余额明显不足')
```

上面的代码中使用了 `break` 关键字来提前终止循环。

- `break` 终止的是本层循环
- `continue` 终止的是本轮（次）循环，让代码直接循环进入下一轮循环

:::tip

`break` 和 `continue` 都可以用在 while 和 for-in 循环中。

:::

## 参考资料

1. [Python-100-Days Day01-15/03.分支结构, by jackfrued](https://github.com/jackfrued/Python-100-Days/blob/master/Day01-15/03.%E5%88%86%E6%94%AF%E7%BB%93%E6%9E%84.md)
2. [Python-100-Days Day01-15/04.循环结构, by jackfrued](https://github.com/jackfrued/Python-100-Days/blob/master/Day01-15/04.%E5%BE%AA%E7%8E%AF%E7%BB%93%E6%9E%84.md)
