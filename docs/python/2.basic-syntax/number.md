---
title: Number
---

Number 是不允许改变的,这就意味着如果改变 Number 的值，将重新分配内存空间。以下实例在变量赋值时 Number 对象将被创建：

```py
var1 = 1
var2 = 10
```

使用 `del` 语句删除一些数字对象的引用。 `del` 语句的语法是：

```py
del var1[,var2[,var3[....,varN]]]
```

也可以通过使用 del 语句删除单个或多个对象的引用，例如：

```py
del var
del var1, var2
```
