---
title: AMD/CMD/UMD
sidebar_label: AMD/CMD/UMD
---

## 前言

`CommonJS`加载模块是同步的，也就是说只有模块加载完才能执行后续操作。对于`Node.js`这种运行在服务器上的编程，所加载的模块一般都是保存在本地文件（缓存是在内存中），加载速度较快，不需要考虑异步加载。而如果是运行在浏览器上的程序，模块的加载需要从服务器获取，涉及到网速，代理等原因，一旦等待时间过长，浏览器处于”假死”状态。所以在浏览器端需要一种异步加载模块的机制。这就是下面的`AMD、CMD和UMD`。

## AMD 模块定义规范

> AMD 是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。

### 模块定义

`define(id?, dependencies?, factory);`

- id 为字符串类型，表示了模块标识（模块名），为可选参数。若不存在则模块标识应该默认定义为在加载器中被请求脚本的标识（JS 文件名）。如果存在，那么模块标识必须为顶层的或者一个绝对的标识。
- dependencies ，是个数组，数组里放着所依赖的模块。
- factory，模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块初始化的输出值。

### 模块加载

`require([module], callback)`

- module 是要加载的模块
- callback 是模块加载完成后的回调函数

```js
// a.js
define(['b', 'require', 'exports'], function (b, require, exports) {
  console.log('a.js执行');
  console.log(b);
  // 暴露api可以使用exports、module.exports、return
  exports.a = function () {
    return require('b');
  };
});
// b.js
define(function () {
  console.log('b.js执行');
  console.log(require);
  console.log(exports);
  console.log(module);
  return 'b';
});
// 定义index.js
// 支持Modules/Wrappings写法，注意dependencies得是空的，且factory参数不可空
define(function (require, exports, module) {
  console.log('index.js执行');
  var a = require('a');
  var b = require('b');
});
// 加载index.js
require(['a', 'b'], function (a, b) {
  console.log('index.js执行');
});
```

上例中的 a.js 模块的定义，如果使用 return 来暴露模块 API 的写法更简洁些：

```js
define(['b'], function (b) {
  console.log('a.js执行');
  console.log(b);
  return {
    a: function () {
      return require('b');
    }
  };
});
```

点击[查看](https://segmentfault.com/a/1190000004873947#articleHeader6)详细模块的定义方式

### 应用：RequireJS

`RequireJS` 是一个**前端的模块化管理的工具库**，遵循`AMD`规范。它使用`define`来定义模块，使用`require`来加载模块，语法与`AMD`中所写一样。

`RequireJS` 的基本思想：通过一个函数来将所有所需要的或者说所依赖的模块实现装载进来，然后返回一个新的函数（模块），我们所有的关于新模块的业务代码都在这个函数内部操作，其内部也可无限制的使用已经加载进来的以来的模块。

## CMD 模块定义规范

CMD（Common Module Definition），即公共模块定义，它内部模块的加载也是异步的。

### 模块定义：

`define(factory)`

- require, exports, module 参数顺序不可乱
- 暴露 api 方法可以使用 exports、module.exports、return
- 与 requirejs 不同的是，若是未暴露，则返回{}，requirejs 返回 undefined

**定义模块无需列依赖，它会调用 factory 的 toString 方法对其进行正则匹配以此分析依赖。模块定义时，对所依赖的模块采用运行时加载。**

### 模块加载：

`require(callback)`

```js
// a.js
define(function (require, exports, module) {
  console.log('a.js执行');
  console.log(require);
  console.log(exports);
  console.log(module);
});
// b.js
define(function (require, module, exports) {
  console.log('b.js执行');
  console.log(require);
  console.log(exports);
  console.log(module);
});
// index.js
define(function (require) {
  var a = require('a');
  var b = require('b');
  console.log(a);
  console.log(b);
});
```

### 应用： seajs

在`seajs`中使用`seajs.use()`来完成模块的加载

```js
seajs.use(['./main'], function (main) {
  main.hello();
});
```

## CMD 和 AMD 异步加载的区别：

1. 模块执行机制差别

   首先，要清楚模块执行机制和模块加载机制的概念。模块加载机制是指浏览器请求模块的方式，这里两者都是异步请求，因此没有区别。而模块执行机制是指 factory 的执行顺序。CMD 是懒执行的，即执行流从主模块 factory 开始，如果 require 到某个依赖模块，则再去执行该依赖模块的 factory。而 AMD 是在执行主模块 factory 之前，先执行所有依赖模块的 factory。

2. 依赖模块的执行顺序差别

   在上一条结论里，由于 CMD 是懒执行的，因此执行顺序始终是一致的。而 AMD 里各自的依赖模块执行顺序是无序的，即浏览器请求到模块时立即执行 factory。

   点击[查看](https://github.com/luckydrq/loader-test)demo

## UMD 模块定义规范

UMD（Universal Module Definition）是 AMD 和 CommonJS 的糅合，它希望实现跨平台的解决方案。即 UMD 既能支持服务器端的 CommonJS 实现模块同步加载, 也可以支持浏览器端模块的异步加载。

UMD 先判断是否支持 Node.js 的模块（exports）是否存在，存在则使用 Node.js 模块模式。再判断是否支持 AMD（define 是否存在），存在则使用 AMD 方式加载模块。

```js
(function (window, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    window.eventUtil = factory();
  }
})(this, function () {
  //module ...
});
```
