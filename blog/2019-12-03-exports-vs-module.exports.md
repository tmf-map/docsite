---
title: exports 和 module.exports
author: Robbie Han
author_title: Front End Engineer @ Tradeshift
author_url: https://github.com/USTC-Han
author_image_url: https://robbie-pic.oss-cn-beijing.aliyuncs.com/IMG_4175.JPG?x-oss-process=style/compress
tags: [exports, module.exports, node.js]
---

import Img from '../src/components/Img'

## 前言

`exports`和`module.exports`这两个之间的关系一直傻傻的分不清，为啥有了`module.exports`还要有`exports`？我想通过这篇文章来理清两者之间的关系。

## 引用类型的形参

在说这两个之前，想先说一个知识点，当JS函数参数是引用类型时，其形参在函数内的改变对原变量的影响，这也是理解`exports`和`module.exports`关系的关键。

<!--truncate-->

**举两个例子：**

**例1:**
```js
var myInfo = {name: 'Robbie'};
var changeInfo = function(info) {
  info.age = '18';
  console.log('info: ' , info);
}

changeInfo(myInfo);
console.log('myInfo: ' , myInfo);
// info:  {name: "Robbie", age: 18}
// myInfo:  {name: "Robbie", age: 18}
```

**例2:**
```js
var myInfo = {name: 'Robbie'};
var changeInfo = function(info) {
  info = {name: 'Robbie', age: 18}
  console.log('info: ' , info);
}

changeInfo(myInfo);
console.log('myInfo: ' , myInfo);
// info:  {name: "Robbie", age: 18}
// myInfo:  {name: "Robbie"}
```

<Img width="480" legend="图：例1（上）和 例2（下）操作示意图" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ejLuQr.png" />

如上图，例1很简单，因为`myInfo`是引用类型，传递的是堆内存中的内存地址，`info`和`myInfo`两者指向同一块地址空间，所以向`info`中添加元素时，`myInfo`读到的是同一份数据。

在例2中函数内部对`info`进行了重写，为它开辟了新的地址空间，所以`info`和`myInfo`在指向的完全是两块内容。

## exports和module.exports的关系

在CommonJS模块规范中，每个模块文件中都存在着`require`、`exports`、`module` 这3个变量。模块导出一般常用的就是`exports`或者`module.exports`。

我们在一些资料上经常会看到下面这句话：

> 在CommonJS模块规范中`exports`实际上是对`module.exports`的引用

引用？什么意思？你说引用就引用呀，怎么引用的？

为了弄清楚`exports`到底是如何引用`module.exports`的，我们尝试用下面的例子进行探索。

```js
// lib.js
exports.info = { name: 'Robbie', age: 18 }

console.log('module.exports: ', module.exports)
console.log('exports: ', exports);

module.exports = function() {
  console.log('robbie')
}
console.log('---修改后---');
console.log('module.exports: ', module.exports)
console.log('exports: ', exports);
```

```js
// index.js
var info = require('./lib.js')
console.log('-----')
console.log('require： ',info)
```

上面的index.js文件中导入了lib文件，执行`node index.js`后，打印如下

```
module.exports:  { info: { name: 'Robbie', age: 18 } }
exports:  { info: { name: 'Robbie', age: 18 } }

---修改后---
module.exports:  function () {
  console.log('robbie')
}
exports:  { info: { name: 'Robbie', age: 18 } }
-----

require：  function () {
  console.log('robbie')
}
```

通过例子可以看出，当我们在模块中向`exports`中添加元素时，`module.exports`确实也会添加元素，在对`module.exports`重写后，两者指向的内容不同，可以证明两者确实存在引用关系。

通过index文件中打印的内容可以看出，对于模块引入来说，`require`一个模块其实读的是模块的`module.exports`指向的内容，不一定是`exports`（两者指向不同时）。

结合上面两点可以看出，`exports`实际上就是对`module.exports`的引用。

<Img width="360" legend="图：exports 与 module.exports 关系示意图" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Nswdpp.png" />

也就是说，`exports`与`module.exports`指向同一块地址空间。在模块中添加`module.exports.变量A = A`与`exports.变量A = A`是完全等价的操作。

## 赋值引用还是函数传参引用

其实上面通过案例已经说明白这两者之间的关系了，此处通过`webpack`对上面定义的`lib`模块进行了转义，截取了其中的一段代码，简单看一下`node`模块的封装。

```js
(function(modules) {
    var module = installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
    };

    // ......

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // ......

   (function(module, exports) {

        exports.info = { name: 'Robbie', age: 18 }

        console.log('module.exports: ', module.exports)
        console.log('exports: ', exports);

        module.exports = function() {
          console.log('robbie')
        }
        console.log('---修改后---');
        console.log('module.exports: ', module.exports)
        console.log('exports: ', exports);
    })
})
```

通过`module`变量的定义可以看出，`exports`的本质是`module`变量中定义的一个对象。**模块执行时，通过函数引用类型传参的方式将`module`作为函数的第一个参数传递给模块函数，`module.exports`作为函数的第二个参数传递给模块函数。所以我们在导出的时既能用`module.exports`，也可以用`exports`**。

## 本文小结

和文章开头的例子对比一下，有没有感觉很像。`exports`就是那个形参，是对`module.exports`的引用。如果不对两者重新定义，只向其中添加元素，这两个其实是“完全等价”的。

而对于模块的引用来说，`require`一个模块读取的是`module.exports`所指向的内容。所以我们在导出模块的内容时可以使用`exports.变量A`，但最好不要两种方式一起用，更不要在混用的同时，还对其中的一个进行重写，这样才能保证导出的内容被`require`到。

## 相关拓展

与本文内容相关的还有ES6模块的导出规范，如果对ES6模块`export`和`export default`感兴趣，可以[点击此处查看相关总结](https://www.thinkbucket.cn/docs/javascript/6.modules/es6-module)。

## 参考链接

[Node.js模块里exports与module.exports的区别? --- 小明plus](https://www.zhihu.com/question/26621212)
