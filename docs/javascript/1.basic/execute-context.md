---
title: 执行上下文
sidebar_label: 执行上下文
---

## 概述

这是混淆经常出现的地方，“执行上下文（Execution Context）”更多地涉及作用域而不是如前所述的上下文（Context），可以理解为当前代码的执行环境。这是一个不幸的命名约定，但它是 ECMAScript 规范定义的术语。

- **上下文**：方法属于哪一个对象，即 this 指代那个对象，即**上下文是基于对象的**。
- **执行上下文**：除了 this 指向还包括 VO 和作用域链，更偏向于作用域的描述。比如全局 EC：

```js
windowEC = {
  VO: Window,
  scopeChain: {},
  this: Window,
};
```

JS 是单线程语言，意味着一次只能执行一个任务。当 JS 编译器最初执行代码时，它首先默认进入全局执行上下文。以后每次调用一个函数都会导致创建一个新的执行上下文。

**每进入一个不同的运行环境都会创建一个相应的执行上下文**，那么在一段 JS 程序中一般都会创建多个执行上下文，JS 引擎会以**栈**的方式对这些执行上下文进行处理，形成函数调用栈（call stack），栈底永远是全局执行上下文，栈顶则永远是当前执行上下文。

EC 特点：

- 单线程
- 同步执行，只有栈顶的上下文处于执行中，其他上下文需要等待
- 全局上下文只有唯一的一个，它在浏览器关闭时出栈
- 每次函数被调用，就会有个新的执行上下文为其创建，即使是调用的自身函数，也是如此。

两大阶段

- **创建阶段** [函数调用时，执行内部代码前]:
  - 根据之前解析阶段的成果创建作用域链
  - 创建 variables, functions 和 arguments
  - 确定 "this" 的值
- **激活 / 代码执行阶段**:
  - 赋值
  - 函数引用
  - 解释(编译)执行代码

可以将每个执行上下文在概念上表示为具有 3 个属性的对象：

```js
executionContextObj = {
  scopeChain: {
    /* variableObject + all parent execution context's variableObject */
  },
  variableObject: {
    /* function arguments / parameters, inner variable and function declarations */
  },
  this: {},
};
```

## Activation / Variable Object [AO/VO]

创建阶段解释器通过扫描传入的参数或参数的函数，本地函数声明和局部变量声明来创建 executionContextObj。此扫描的结果将成为 executionContextObj 中的 variableObject。

- 查找调用函数的代码。
- 创建阶段，在之前函数内部代码之前，先创建执行上下文:
  - 初始化作用域链.
  - 创建变量对象 VO:
    - 创建 arguments 对象，检查上下文，初始化参数名称和值并创建引用的复制。
    - 扫描上下文的函数声明:
      - 为每一个函数，在 variableObject 上创建一个{函数名: 引用地址}.
      - 如果函数的名字已经存在，引用指针将被重写.
    - 扫描上下文的变量声明:
      - 为每个变量声明，在 variableObject 上创建一个{ 变量名: undefined}
      - 如果变量名已经在 variableObject 里，将不会进行任何操作并继续扫描.
    - 确定上下文内部 "this" 的值.
- 激活 / 代码执行阶段:
  - 在当前上下文上运行/解释函数代码，并随着代码一行行执行指派变量的值

示例:

```js
function foo(i) {
  var a = 'hello';
  var b = function privateB() {};
  function c() {}
}

foo(22);
```

在调用 `foo(22)` 时，创建阶段如下所示:

```js
fooExecutionContext = {
   scopeChain: { ... },
   variableObject: {
       arguments: {
           0: 22,
           length: 1
       },
       i: 22,
       c: pointer to function c()
       a: undefined,
       b: undefined
   },
   this: { ... }
}
```

创建阶段处理定义属性的名称，而不是为它们赋值，但参数除外。创建阶段完成后，进入函数执行流程，激活/代码执行阶段在函数执行完毕后如下所示:

```js
fooExecutionContext = {
   scopeChain: { ... },
   variableObject: {
       arguments: {
           0: 22,
           length: 1
       },
       i: 22,
       c: pointer to function c()
       a: 'hello',
       b: pointer to function privateB()
   },
   this: { ... }
}
```

## 变量名提升(Hoisting)

掌握了关于解释器如何创建 AO 的新知识，很容易理解为什么会发生这种情况的细节。请以下代码：

```js
​(function() {
    console.log(typeof foo); // function pointer
    console.log(typeof bar); // undefined
    function foo() {
       return 'hello';
    }
    var foo = 'hello';
    var bar = function() {
       return 'world';
    };
}());​
```

**Q: 为什么我们能在 foo 声明之前访问它？**

A: 在函数内部代码执行之前会有一个创建阶段，foo 那个时候就已经在 VO 里面被定义了。

**Q: Foo 被声明了两次，为什么 foo 显示为函数而不是 undefined 或字符串？**

A: 首先扫描函数声明比扫描变量声明早，其次扫描变量声明时如果发现 VO 中已经存在了则会跳过。

**Q: 为什么 bar 的值是 undefined？**

bar 实际上是一个变量，但变量的值是函数，并且我们知道变量在创建阶段被创建但他们被初始化为 undefined。
