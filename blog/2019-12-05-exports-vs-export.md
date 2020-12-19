---
title: exports、export 和 export default
author: Robbie Han
author_title: Front End Engineer @ Tradeshift
author_url: https://github.com/Robbie-Han
author_image_url: https://robbie-pic.oss-cn-beijing.aliyuncs.com/IMG_4175.JPG?x-oss-process=style/compress
tags: [exports, export, export default]
---

## 前言

在[exports 和 module.exports](/blog/2019/12/03/exports-vs-module.exports)这篇博客中，我们详细解释了在 CommonJS 规范中`exports`和`module.exports`的区别。本篇博客将讨论 CommonJS 规范和 ES6 规范模块导出之间的关系。

## export 和 export default

ES6 导出模块一般会使用`export`或`export default`，使用两者的语法在 javaScript 文档中的[ES6 Module](/docs/javascript/6.modules/es6-module)已经做了详细的讲解，此处不再赘述。那么为什么已经有了`export`还要整个`export default`呢？`export`和`export default`之间的关系是什么呢？下面的内容也将通过这两个问题进行展开。

### 为什么已经有了 export 还要整个 export default 呢？

在 ES6 模块中，如果模块导出中使用`export var name = 'Robbie'`,那么在导入改模块的时候，导入的变量必须与之相对应，即`import {name} form Info`。而`export default name`在模块导入时的导入变量的命名可是任意的`import myName form Info`。对比两者来看使用`export default`可能具有更高的灵活性，也更便于不熟悉该库的开发者进行开发。

### export 和 export default 之间的关系是什么呢？

我们知道浏览器是不支持 ES6 模块语法的，所以对于代码中的 ES6 模块一般是采用 Babel 转成 CommonJS 规范的代码。此时的代码虽然浏览器仍然不能执行，但是 Node 可以，因为 webpack 是基于 Node 构建的，所以我们可以通过 webpack 将代码打包成浏览器支持的 ES5 代码。

<!--truncate-->

<Img width="480" legend="图：ES6模块转浏览器可执行代码示意图" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/y8Gvm6.png" />

为了探索 ES6 模块中`export`和`export default`这两个之间的关系，我们可以看下面这个例子

```js
export var info = {age: 22, name: 'han'};
var email = 'xiaoming@thinkbucket.com';
export default email;
```

Babel 转义后：

```js
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = exports.info = void 0;
var info = {
  age: 22,
  name: 'han'
};
exports.info = info;
var email = 'SA17225105@gmail.com';
var _default = email;
exports.default = _default;
```

通过转义后的结果我们可以看出，模块导出会先定义一个`exports`对象，然后再将要导出的元素挂在这个对象上。

看到例子中的这个 exports 我们不仅会想到两个问题：

1. ES6 在模块导入的时候会是个什么情况？
2. 在项目中曾看到过`export`和`exports`混用的情况，它们两个一样吗？有什么联系？

### ES6 在模块导入的时候会是个什么情况？

从 ES6 模块的导出结果可以看出，模块导出的时候是一个对象。对于`export`导出的变量，导入的时候通过需要用`{}`包裹，且导入和导出使用相同的变量名，这个很像 ES6 对象的解构，这个很好理解。而对于`export default`导出的变量的，导入的行为可能会令人费解，为什么可以不用`{}`包裹直接`import`，还可以任意的命名？

下面我想通过一个例子来探究一下对于`export default`导入的具体细节。

```js
import email from 'myInfo';
console.log(email);
```

Babel 转义后：

```js
'use strict';

var _myInfo = _interopRequireDefault(require('myInfo'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : {
        default: obj
      };
}

console.log(_myInfo.default);
```

从模块导出中可以看出`__esModule`的值为 true，所以模块导入的是一个“对象”。而从我们转义后的内容中也可以看出，转义后的内容和我们定义的`email`没有半毛钱关系，我们在使用`email`时，其实取到是`_myInfo.default`。这也解释了为什么我们导入的时候可以使用任何自定义的变量名。

### 在项目中曾看到过`export`和`exports`混用的情况，它们两个一样吗？有什么联系？

`export`和`exports`属于不同的规范，显然不是一回事。如果在项目中导出模块混用`export`和`exports`，模块在转义和打包的时候会将里面的代码统统打包成浏览器支持运行的 ES5 代码。

但是还是不建议混写两者，一方面容易使人懵逼，另一方面两个规范的输出规则是完全不一样的。

## ES6 模块与 CommonJS 模块的差异

关于 ES6 模块与 CommonJS 模块的差异可以参考[ES6 Module](/docs/javascript/6.modules/es6-module)这一篇的文章。

如果对 ES6 模块和 CommonJS 模块打包后的内容感兴趣，可以结合下面这两个文件一起研究：

- [ES6 模块打包后文件](https://robbie-blog.oss-cn-shanghai.aliyuncs.com/ES6.js)
- [CommonJS 模块打包后文件](https://robbie-blog.oss-cn-shanghai.aliyuncs.com/commonJS.js)

## 参考资料

- [ECMAScript 6 入门 -- 阮一峰](http://es6.ruanyifeng.com/#docs/module-loader#ES6-%E6%A8%A1%E5%9D%97%E4%B8%8E-CommonJS-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%B7%AE%E5%BC%82)

- [import、require、export、module.exports 混合使用详解 --- lv_DaDa](https://segmentfault.com/a/1190000012386576)
