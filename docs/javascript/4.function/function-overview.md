---
title: 函数概览
sidebar_label: 函数概览
---

函数声明，函数表达式之分

```js
// 函数声明
function f() {}

// 表达式（非匿名）
var f1 = function f() {};
// 表达式（匿名）
var f2 = function() {};
```

- 静态方法：直接挂载函数名下
- 实例方法：挂载 prototype 属性下面
