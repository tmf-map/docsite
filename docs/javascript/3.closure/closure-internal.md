---
title: 闭包的神
sidebar_label: 闭包的神
---

> 闭包本质上是函数作用域的继承。

## 神 1：Scope

Scope 包括：局部作用域，全局作用域，闭包

<img width="250" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/S6CoAv.jpg'/>

JS 中创建的函数，可以访问函数内局部变量，以及函数外全局变量。

> 那如果函数嵌套函数呢？

### 局部作用域（局部变量/私有变量）

函数内部定义的变量是定义在局部的变量。在下面的示例中，如果我们尝试在函数外面输出 `words` 的值，会得到一个引用错误。因为 `words` 是一个存在于局部作用域的变量：

```js
// Example of accessing variables INSIDE the function
// words is a LOCAL variable
function speak() {
  var words = 'hi';
  console.log(words);
}
speak(); // 'hi'
console.log(words); // Uncaught ReferenceError: words is not defined
```

### 全局作用域（全局变量）

与上面的例子不同，下面例子中的 `words` 是定义在全局作用域的。也就是说，它可以被所有函数访问到。

```js
// Example of accessing variables OUTSIDE the function
// words is a GLOBAL variable
var words = 'hi';
function speak() {
  console.log(words);
}
speak(); // 'hi'
console.log(words); // 'hi'
```

### 闭包作用域

闭包是在函数外部的 Scope 访问私有变量的方式，开辟了一条特殊的作用域，即闭包作用域

> 需要例子

## 神 2：GC

JS 垃圾回收基本原理：

- 如果一个对象不再被引用，那么这个对象就会被 GC 回收；
- 如果在两个不同的**函数作用域内**（可以简单这样理解，准确说是 `handleScope` ）两个对象互相引用，而不再被其它作用域内对象所引用，那么这两个互相引用的对象也会被回收。

### 闭包常驻内存原因

在了解闭包的作用之前，我们先回顾一下 JS 中的 GC 机制：在 JS 中，如果一个对象不再被引用，那么这个对象就会被 GC 回收，否则这个对象一直会保存在内存中。在下面的例子中，B 定义在 A 中，因此 B 依赖于 A ,而外部变量 C 又引用了 B , 所以 A 间接的被 C 引用。也就是说，A 不会被 GC 回收，会一直保存在内存中。为了证明我们的推理，可以将下面的例子运行下，会得出下面注释中的结果：

```js
function A() {
  var count = 0;
  function B() {
    count++;
    console.log(count);
  }
  return B;
}
var C = A();
C(); // 1
C(); // 2
C(); // 3
```

`count` 是函数 A 中的一个变量，它的值在函数 B 中被改变，函数 B 每执行一次， `count` 的值就在原来的基础上累加 1 。因此，函数 A 中的 `count` 变量会一直保存在内存中。

当我们需要在模块中定义一些变量，并希望这些**变量一直保存在内存中**但又不会“污染”全局的变量时，就可以用闭包来定义这个模块。

### 闭包的隐式写法

上面的写法其实是最原始的写法，而在实际应用中，会将闭包和匿名函数联系在一起使用。下面就是一个闭包常用的写法：

```js
(function(document) {
  var viewport;
  var obj = {
    init: function(id) {
      viewport = document.querySelector('#' + id);
    },
    addChild: function(child) {
      viewport.appendChild(child);
    },
    removeChild: function(child) {
      viewport.removeChild(child);
    },
  };
  window.jView = obj;
})(document);
```

这个组件的作用是：初始化一个容器，然后可以给这个容器添加子容器，也可以移除一个容器。

功能很简单，但这里涉及到了另外一个概念：**立即执行函数**。 简单了解一下就行，需要重点理解的是这种写法是如何实现闭包功能的。

可以将上面的代码拆分成两部分：`(function(){})` 和 `()` , `(function(){})` 是一个表达式，而这个表达式本身是一个匿名函数，所以在这个表达式后面加 `()` 就表示执行这个匿名函数。

因此这段代码执行执行过程可以分解如下：

```js
var f = function(document) {
  var viewport;
  var obj = {
    init: function(id) {
      viewport = document.querySelector('#' + id);
    },
    addChild: function(child) {
      viewport.appendChild(child);
    },
    removeChild: function(child) {
      viewport.removeChild(child);
    },
  };
  window.jView = obj;
};
f(document);
```

在这段代码中似乎看到了闭包的影子，但 f 中没有任何返回值，由似乎不具备闭包的条件，但注意这句代码：

```js
window.jView = obj;
```

`obj` 是在函数 f 中定义的一个对象，这个对象中定义了一系列方法， 执行 `window.jView = obj` 就是在 `window` 全局对象定义了一个变量 `jView` ，并将这个变量指向 `obj` 对象，即全局变量 `jView` 引用了 `obj` . 而 `obj` 对象中的函数又引用了函数 f 中的变量 `viewport` ,因此函数 f 中的 `viewport` 不会被 GC 回收， `viewport` 会一直保存到内存中，所以这种写法满足了闭包的条件。

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/vVS1rY.png'/>
