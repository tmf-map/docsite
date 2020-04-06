---
title: 类型判断
sidebar_label: 类型判断
---

## isEmpty

```js
const isEmpty = (val) => val == null || !(Object.keys(val) || val).length;
```

如何判断一个对象是 `{}`

```js
Object.keys(a).length === 0; // or JSON.stringify(a) === '{}'
```

## typeof 返回字符串

- 原始类型除了 `null` 返回是 `"object"`
- 引用类型除了 `function` 返回是 `"function"` 其他都是 `"object"`

## obj instanceof B 返回布尔值

只用来详细判断属于具体的哪一个引用类型（包括对函数和 Element 的判断），B 不是字符串

```js
obj instanceof Element;
```

## Object.prototype.toString.call(obj) 返回字符串

数组、字符串、函数、Date 对象调用 toString 方法，并不会返回[object Object]，因为它们都自定义了 toString 方法，覆盖原始方法。所以采用显示绑定上下文的方式去调用。

小问题 Number，String 的区分

```js
var a = '123';
Object.prototype.toString.call(a); // "[object String]"
var b = new String('1234'); // String {"1234"}
Object.prototype.toString.call(b); // "[object String]"
```
