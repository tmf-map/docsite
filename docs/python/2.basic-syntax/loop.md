---
title: Loop
---

Python 的循环语法主要有两种：for-in 和 while，没有其他语言常用的 for 循环和 do-while 等。

## for-in 循环

先看一个计算 `1 + 2 + 3 + ··· + 100` 的例子：

```py
sum = 0
for x in range(101):
    sum += x
print(sum)
# 5050
```

需要说明的是上面代码中的 `range(1, 101)` 可以用来构造一个从 1 到 100 的范围，当我们把这样一个范围放到 for-in 循环中，就可以通过前面的循环变量 x 依次取出从 1 到 100 的整数。当然，range 的用法非常灵活，下面给出了一个例子：

`range(101)`：可以用来产生 0 到 100 范围的整数，需要注意的是取不到 101。 `range(1, 101)`：可以用来产生 1 到 100 范围的整数，左闭右开的区间。 `range(1, 101, 2)`：可以用来产生 1 到 100 的奇数，其中 2 是步长，即每次数值递增的值。 `range(100, 0, -2)`：可以用来产生 100 到 1 的偶数，其中-2 是步长，即每次数字递减的值。

我们可以用下面的代码来实现 1~100 之间的偶数求和。

```py
sum = 0
for x in range(2, 101, 2):
    sum += x
print(sum)
```

## while 循环

如果要构造不知道具体循环次数的循环结构，我们推荐使用 while 循环。下面我们通过一个“猜数字”的小游戏来看看如何使用 while 循环。

猜数字游戏的规则是：计算机出一个 1 到 100 之间的随机数，玩家输入自己猜的数字，计算机给出对应的提示信息（大一点、小一点或猜对了），如果玩家猜中了数字，计算机提示用户一共猜了多少次，游戏结束，否则游戏继续。

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

上面的代码中使用了 `break` 关键字来提前终止循环

- `break` 终止的是本层循环。
- `continue` 终止的是本轮（次）循环，让代码直接循环进入下一轮循环。

:::tip

`break` 和 `continue` 只能用在 while 循环中。

:::
