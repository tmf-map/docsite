---
title: Js-Tree-Shaking
---

import Img from '../../../src/components/Img';

## 概述

`js`文件中导入的模块一般会有多个方法，但只要其中的某个方法被引用，则该模块的所有内容都将被打到`bundle`中。`tree shaking`的功能 就是只把用到的方法打入`bundle`，没有用到的方法会在 `uglify` 阶段被擦除掉。

`tree shaking`从`webpack 2`开始就已经支持，但需要配合插件才能使用。而在`webpack 4`中只要设置`mode`为`production`，`tree shaking`便默认开启。

:::caution

`tree shaking`要求必须是`ES6`模块，不支持`commonJS`模块，如果引用的模块使用`commonJS`规范，则`tree shaking`无效。

:::

下面我们将通过一个来讲述`tree shaking`的相关内容，demo 中的相关代码已经上传到`github`仓库[js-tree-shaking](https://github.com/ThinkBucket/webpack-demo/tree/master/js-tree-shaking)中，可以下载下来执行一下。

## 相关代码

- src/math.js

```js
export function square(x) {
  console.log('square', x);
  return x * x;
}

export function cube(x) {
  console.log('cube', x);
  return x * x * x;
}
```

- src/index.js

```js
import {join} from 'lodash';
import {cube} from './math.js';

console.log(join(['a', 'b', 'c'], '~'));
console.log(cube(2));
```

在`index.js`文件中我们导入了`lodash`包的`join`方法和`math.js`中的`cube`函数，

## 相关配置

- webpack.config.json

```js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_bundle.js'
  },
  mode: 'production'
  // mode: 'development'
  // optimization: {
  //     usedExports: true
  // }
};
```

在 webpack 的[官方文档](https://webpack.js.org/guides/tree-shaking/#add-a-utility)中列举了当配置`mode：'development'`时，构建后`tree shaking`结果:

```js
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
  'use strict';
  /* unused harmony export square */
  /* harmony export (immutable) */ __webpack_exports__['a'] = cube;
  function square(x) {
    return x * x;
  }

  function cube(x) {
    return x * x * x;
  }
});
```

通过上面的结果可以看出，在`mode`为`development`时，`webpack`虽然识别出了`square`函数是没有用到的，但是对应的代码却没有被删除，为了删除这些`dead code`，需要配置`mode`为`production`。

:::tip

当`mode`为`development`时，代码没有被删除是为了方便在开发阶段进行代码调试。删除没有用到的语句可能会造成`sourcemap`对应行错乱等问题

:::

## 构建结果

代码的构建过程如下图所示：

<Img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/tree.gif" />

通过构建的结果可以看出`math.js`中的`square`函数并没有被打包到`bundle`文件中，只将被引用的`cube`函数打包。这也证明我们`tree shaking`已经“成功了”。

对于文件模块的`tree shaking`虽然成功了，但是对`node`包`lodash`的`tree shaking`并没有成功。在代码中只使用了`lodash`中的一个`join`函数，打包后的体积却有`72.1KB`。

## npm 包的 tree shaking

上文中提到，导入`lodash`包并没有`tree shaking`成功。为了找寻原因，我们可以看一下`lodash`的[源码](https://github.com/lodash/lodash/blob/npm/lodash.js#L17105)，通过源码可以看出`lodash`打包遵循的是`commonJS`的规范，通过立即执行函数来注册各个工具函数。

为了解决该问题，一般会有两种方案，下面我们将分别讲解这两种方案。

- 方案一：只导入使用的文件

目前业界流行的组件库多是**将每一个组件或者功能函数，都打包成单独的文件或目录**。如下图是`lodash`中的单独文件：

<Img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200330172536.png" />

然后可以像如下的方式引入：

```js
import join from 'lodash/join';
```

此时打包的结果（右上角）与之前打包的结果对比如下图所示：

<Img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/微信截图_20200330173101.png" />

从图中可以看出，打包后的文件只有`1.11KB`，这说明`npm`包`tree shaking`。

:::caution

但是此方法存在缺陷，当我们导入某一个库的多个模块时，我们需要写多个导入语句。

:::

- 方案二：只导入`npm`包的`es`版本

有些常用的包像`lodash`、`antd`等，一般会打包两个版本的`npm`包，一种是采用`umd`的导出方式，一种是采用`ES`的导出方式。

`webpack`的打包不支持打包成`ES`模块，当使用`webpack`打包文件时，我们通常会选用`umd`的导出方式。因此，如果我们把所有的资源文件通过`webpack`打包到一个`bundle`文件里的话，那这个库文件从此与`tree shaking`无缘。

为了保留两种打包模块的方式，我们一般会使用`webpack`打包生成支持`CommonJS`规范的模块，使用`gulp`等工具打包生成`ES`模块。同时我们需要在`package.json`中增加一个`module`字段，当开发者以`es6`模块的方式去加载`npm`包时，会以`module`的值为入口文件，这样就能够同时兼容多种引入方式。

对于我们项目中使用到的`lodash`，我们可以用`lodash-es`代替。如下所示：

- src/index.js

```js
import {join} from 'lodash-es';
import {cube} from './math.js';

console.log(join(['a', 'b', 'c'], '~'));
console.log(cube(2));
```

打包后的结果如下所示：

<Img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200330221705.png" />

由结果可以看出，使用`lodash-es`包时`tree shaking`会生效。

## sideEffects

在`webpack`做静态分析时，如果导入模块是包含“副作用”代码时，比如立即执行函数、调用了 `window` 上的属性等，此时`webpack`不能对导入的模块做`tree shaking`。

为了帮助`webpack`更好的分析那些文件是具有“副作用”的，那些文件时“纯净”的。我们可以在`package.json`中增加一个`sideEffects`字段，将具有“副作用”的文件路径放到`sideEffects`的属性值中。`sideEffects`的值为`false`或者是一个数组，当`sideEffects`的值为`false`值是则代表导入的所有模块都没有“副作用”，`webpack`可以放心的使用`tree shaking`。

我们导入`css`和`less`模块时，一般会使用`import "./index.less"`的方式导入，但由于样式文件没有导出任何文件，因此`webpack`在做静态分析时会将`import "./index.less"`移除，从而导致样式问题，因此我们将`sideEffects`配置如下：

```js
 "sideEffects": [
    "**/*.css",
    "**/*.scss"
  ]
```

## tree shaking 的原理

因为`ES6`模块可以进行可靠的静态分析，和代码运行时的状态无关，且模块间的依赖关系是确定的，所以可以消除无用的`JS`代码，支持`tree shaking`。

**被消除的代码主要分为以下几类**：

- 代码不会被执行，不可到达，例如条件判断为 false

修改`src/math.js`文件如下所示：

```js
export function square(x) {
  console.log('square', x);
  return x * x;
}

export function cube(x) {
  // 添加不会执行的代码
  if (false) {
    console.log('false will delete');
  }
  console.log('cube', x);
  return x * x * x;
}
```

打包后的部分代码为：

```js
function (e, r, t) {
        "use strict";
        t.r(r);
        var n = Array.prototype.join;
        var o, u = function (e, r) {
            return null == e ? "" : n.call(e, r)
        };
        console.log(u(["a", "b", "c"], "~")),
        console.log((o=2,console.log("cube",o),o*o*o))
    }
```

通过打包后的结果可以看出，打包后新添加的语句已经被删除，没有添加到`bundle`中。

- 代码的执行结果不会被用到，例如调用函数，但是函数结果并没有赋值给任何变量

```js
let helloWorld = () => {
  return 'hello world';
};

export function square(x) {
  console.log('square', x);
  return x * x;
}

export function cube(x) {
  helloWorld();
  console.log('cube', x);
  return x * x * x;
}
```

打包的结果如下图所示：

<Img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/removefunction.gif" />

通过打包后的结果可以看出，打包后的`bundle`中并没有包含`helloWorld`函数的返回结果。

:::caution

如果调用的函数是有“副作用”的，那么即使函数执行结果没被使用，也会被打包到`bundle文件中`。

:::

- 变量未被使用，例如只定义变量或通过代码改变某个变量，但是该变量不会被使用到。

```js
let helloWorld = () => {
  return 'hello world';
};

export function square(x) {
  console.log('square', x);
  return x * x;
}

export function cube(x) {
  let variate = helloWorld();
  console.log('cube', x);
  return x * x * x;
}
```

打包的结果如下图所示：

<Img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/remove-variate.gif" />

通过打包后的结果可以看出，打包后的`bundle`中即并没有包含`variate`变量，也没有`helloWorld`函数的返回结果。

## 参考链接

- [webpack official document](https://webpack.js.org/guides/tree-shaking/)
- [Webpack Tree shaking 深入探究，by sialvsic](https://juejin.im/post/5bb8ef58f265da0a972e3434#heading-0)
- [体积减少 80%！释放 webpack tree-shaking 的真正潜力，by 腾讯 IVWEB 团队](https://juejin.im/post/5b8ce49df265da438151b468)
- [你的 Tree-Shaking 并没什么卵用，by 相学长](https://juejin.im/post/5a5652d8f265da3e497ff3de)
- [Webpack 中的 sideEffects 到底该怎么用？，by kuitos](https://juejin.im/post/5b4ff9ece51d45190c18bb65)
- [What Does Webpack 4 Expect From A Package With sideEffects: false](https://stackoverflow.com/questions/49160752/what-does-webpack-4-expect-from-a-package-with-sideeffects-false)
