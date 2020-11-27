---
title: 作用域
---

## 概述

Scope 指变量的**可见性**。

```js
// Example #1
var color = 'red';
function test() {
  return color;
}
console.log(test()); // red
```

```js
// Example #2
function test() {
  var color = 'red';
}
test();
console.log(color); // undefined
```

```js
// Example #3
function test() {
  var color = 'red';
  return color;
}
console.log(test()); // red
```

在解析阶段构建的作用域其实就是**定义了一套变量查找(即变量可见性)的规则**。请注意这里说的是一套规则，有没有找到，没有找到报 `ReferenceError` 的错都不是解析器的事情：

<Img width="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/V0UPNK.jpg'  align="left"/>

作用域链是指变量查找的顺序，先去哪里找，再去哪里找，就像一根链条以下从下往上找。

## 块级作用域

变量声明： ES5 只有全局作用域和函数作用域，没有块级作用域，导致了以下的不合理场景出现：

- 由于变量提升，内层变量可能会覆盖外层变量
- 用来计数的循环变量泄露为全局变量

ES6 中 let 的出现实际上为 JavaScript 新增了块级作用域，在语句块中声明的语句或变量只在当前语句块中起作用。

```js
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```

上面的函数有两个代码块，都声明了变量 n，运行后输出 5。这表示外层代码块不受内层代码块的影响。如果两次都使用 var 定义变量 n，最后输出的值才是 10。ES6 允许块级作用域的任意嵌套，每一层都是一个单独的作用域。外层作用域无法读取内层作用域的内部变量。

函数声明： ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明； ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于 let，在块级作用域之外不可引用。

:::caution

由于要兼容老的代码，ES6 在附录 B 里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。

- 允许在块级作用域内声明函数。
- 函数声明类似于 var，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

:::

上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作 let 处理。根据这三条规则，浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于 var 声明的变量。

ES6 新增了 `let` 命令，用来声明变量。它的用法类似于 `var` ，但是所声明的变量，只在 `let` 命令所在的代码块内有效，如下图所示：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/NecK56.png' width="700"  align="left"/>

从下面两个例子看看，在 `for` 循环中使用 `var` 和 `let` 的区别：

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```

上面代码中，变量 `i` 是 `var` 命令声明的，在**全局范围**内都有效，所以全局只有一个变量 `i` 。每一次循环，变量 i 的值都会发生改变，而数组 a 的函数内部的 `console.log(i)` ，里面的 `i` 指向的就是全局的 `i` 。也就是说，所有数组 a 的成员里面的 `i` ，指向的都是同一个 `i` ，导致运行时输出的是**最后一轮**的 `i` 的值，也就是 `10` 。

```js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

上面代码中，变量 `i` 是 `let` 声明的，当前的 `i` 只在**本轮循环有效**，所以每一次循环的 `i` 其实都是一个新的变量，所以最后输出的是 `6` 。

## `let` 不存在变量提升

变量提升（hoisting）：通常 JS 引擎会在正式执行之前先进行一次预编译，在这个过程中，首先将变量声明及函数声明提升至当前作用域的顶端，然后进行接下来的处理。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升。

```js
var liList = document.querySelectorAll('li'); // 共5个li
for (var i = 0; i < liList.length; i++) {
  liList[i].onclick = function () {
    console.log(i);
  };
}
```

根据以上代码可知，如果依次点击 `li` ，会打印出 5 个 5 。因为代码中只通过 `var` 声明了一个 `i` ，在循环之后 `i` 变为 5 。

```js
var liList = document.querySelectorAll('li'); // 共5个li
for (let i = 0; i < liList.length; i++) {
  liList[i].onclick = function () {
    console.log(i);
  };
}
```

把代码中的 `var` 换成 `let` ，此时如果依次点击 `li` ，会依次打印出 `0、1、2、3、4`。

此时，代码中也只声明了一个 `i` ，但是打印出了不同的值。这是为什么呢，我们可以把上面一段代码近似地理解为如下形式：

```js
var liList = document.querySelectorAll('li'); // 共5个li
for (let i = 0; i < liList.length; i++) {
  let i = 隐藏作用域中的i; // 敲黑板，此处很重要！
  liList[i].onclick = function () {
    console.log(i);
  };
}
```

通过如上代码，我们知道通过五次循环，产生了 `5` 个不同的 `i` ，所以 `console.log(i)` ，打印出的值各不相同。

### `var` 声明的「创建、初始化和赋值」过程

```js
function fn() {
  var x = 1;
  var y = 2;
}
fn();
```

在执行 `fn` 时，会有以下过程（不完全）：

1. 进入 `fn` ，为 `fn` 创建一个环境。
1. 找到 `fn` 中所有用 `var` 声明的变量，在这个环境中「创建」这些变量（即 x 和 y）。
1. 将这些变量「初始化」为 `undefined` 。
1. 开始执行代码
1. `x = 1` 将 `x` 变量「赋值」为 1
1. `y = 2` 将 `y` 变量「赋值」为 2

也就是说 `var` 声明会在代码执行之前就将创建变量，并将其初始化为 `undefined` 。这就解释了为什么在 `var x = 1` 之前 `console.log(x)` 会得到 `undefined` 。

### `function` 声明的「创建、初始化和赋值」过程

```js
fn2();

function fn2() {
  console.log(2);
}
```

JS 引擎会有以下过程：

1. 找到所有用 `function` 声明的变量，在环境中「创建」这些变量。
2. 将这些变量「初始化」并「赋值」为 `function(){ console.log(2) }` 。
3. 开始执行代码 `fn2()` 。

也就是说 `function` 声明会在代码执行之前就「创建、初始化并赋值」。

### `let` 声明的「创建、初始化和赋值」过程

```js
{
  let x = 1;
  x = 2;
}
```

我们只看 `{}` 里面的过程：

1. 找到所有用 `let` 声明的变量，在环境中「创建」这些变量
2. 开始执行代码（注意现在还没有初始化）
3. 执行 `x = 1` ，将 `x` 「初始化」为 1（这并不是一次赋值，如果代码是 `let x` ，就将 `x` 初始化为 `undefined` ）
4. 执行 `x = 2` ，对 `x` 进行「赋值」

这就解释了为什么在 `let x` 之前使用 `x` 会报错：

```js
let x = 'global';
{
  console.log(x); // Uncaught ReferenceError: x is not defined
  let x = 1;
}
```

原因有两个：

1. `console.log(x)` 中的 x 指的是下面的 x，而不是全局的 x
2. 执行 log 时 x 还没「初始化」，所以不能使用（也就是所谓的暂时死区）

看到这里，你应该明白了 `let` 到底有没有提升：

1. `let` 的「创建」过程被提升了，但是初始化没有提升。
2. `var` 的「创建」和「初始化」都被提升了。
3. function 的「创建」「初始化」和「赋值」都被提升了。

这四种声明，用下图就可以快速理解：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/hwksuH.jpg' width="500"/>

下面来看一个有趣的例子：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/wZTieV.jpg' width="600"  align="left"/>

从图上这一系列操作可以看出，如果 `let x` 的初始化过程失败了，会导致：

- `x` 变量就将永远处于 created 状态。
- 无法再次对 `x` 进行初始化（初始化只有一次机会，而那次机会你失败了）
- 无法再次对 `x` 进行赋值（毕竟初始化都失败了，肯定不能继续赋值了）
- 由于 `x` 无法被初始化，所以 `x` 永远处在暂时死区

## 暂时性死区

暂时性死区(Temporal Dead Zone，简称 **TDZ**)：在代码块内，使用 `let` 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”。

“暂时性死区”也意味着 `typeof` 不再是一个百分之百安全的操作：

```js
typeof x; // ReferenceError
let x;
```

上面代码中，变量 `x` 使用 `let` 命令声明，所以在声明之前，都属于 `x` 的“死区”，只要用到该变量就会报错。因此， `typeof` 运行时就会抛出一个 `ReferenceError` 。

再看下面这个例子：

```js
// let x; x未声明
typeof x; // undefined
```

从上面的代码中我们可以看到，对一个根本没有声明的变量却返回了 `undefined` 。在没有 `let` 之前， `typeof` 运算符是百分之百安全的，永远不会报错。现在这一点不成立了，所以在以后的代码中一定要注意。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

## 更多阅读

1. [块级作用域，暂时性死区等](https://zhuanlan.zhihu.com/p/28140450l)
