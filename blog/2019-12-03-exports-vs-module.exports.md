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

在说这两个之前，想先说一个一个知识点，当JS函数参数是引用类型时，其形参在函数内的改变对原变量的影响。

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

例2是理解`exports`和`module.exports`关系的关键，在例2中函数内部对`info`进行了重写，为它开辟了新的地址空间，所以`info`和`myInfo`在指向的完全是两块内容。

## exports和module.exports的关系

在CommonJS模块规范中，每个模块文件中都存在着`require`、`exports`、`module` 这3个变量。模块导出一般常用的就是`exports`或者`module.exports`。

**module变量的定义：**

```js
var module = installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {}
};
```

通过`module`变量的定义，我们可以看出模块导出的`exports`对象实际上只是对`module.exports`的引用。`exports`的本质是一个对象，通过向这个对象中添加元素，实现模块变量的导出。

由上面可知，在模块中`module.exports.XXX = XXX === exports.XXX = XXX`， `exports`与`module.exports`指向同一块地址空间。

为了更容易的理解`exports`和`module.exports`的关系，我们可以尝试使用下面的这个例子进行解释。

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

通过例子可以看出，`exports`和`module.exports`的关系同文中开头的例2是一个道理。

修改后的结果可以说明，对于模块引入来说，`require`一个模块其实读的是模块的`module.exports`指向的内容，不一定是`exports`（两者指向不同时）。

## 拓展

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

和例2做个对比看起来好像，`exports`就是那个形参，是对`module.exports`的引用。如果不对两者重新定义，只向其中添加元素，这两个其实是“完全等价”的。而`exports`只是在这个模块中代表`module.exports`的一个形参。

## 参考链接

[Node.js模块里exports与module.exports的区别? --- 知乎](https://www.zhihu.com/question/26621212)
