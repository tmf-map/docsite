---
title: 代码分割
sidebar_label: 代码分割
---

import Img from '../../../src/components/Img';

## 概述

对于一个大的项目来说，代码都被打包到同一个文件中是相当臃肿的。当其中的某些代码只有在特定场景中才会用到时，这种打包方式的缺点尤为明显。所以，在`webpack`中允许将代码分割成更小的`chunk`，只有当代码运行到需要他们的时候再进行加载。通过脚本懒加载，可以使得初始下载的代码更小，有利于减少首屏的渲染时间。

## 实现方式

实现懒加载`JS`脚本的方式主要有以下两种：

- CommonJS: require.ensure()

```js
require.ensure('./text', function(require) {
  const result = require('./text');
});
```

- ES6: 动态 import（原生未支持，需要 babel 转换）

```js
import('./text').then(result => {});
```

上述两种方式都可以实现懒加载，但是`ES6`的动态`import`更符合我们开发时的编程习惯，所以本文将以动态`import`来实现代码分割功能。

## 相关代码

- text.js（懒加载脚本）

```js
const text = 'dynamic import';

export {text};
```

- index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';

class Split extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      text: null
    };
  }
  // 通过onClick事件触发懒加载
  loadComponent() {
    import('./text').then(result => {
      this.setState({
        text: result.text
      });
    });
  }
  render() {
    const {text} = this.state;
    return (
      <div>
        <p>{text ? text : null}</p>
        <p onClick={() => this.loadComponent()}>Spilt Code Test</p>
      </div>
    );
  }
}

ReactDOM.render(<Split />, document.getElementById('root'));
```

`index.js`对应`demo`的主页面，通过`onClick`事件调用回调函数`loadComponent`实现代码懒加载。

## 相关配置

- .babelrc

```
{
  "presets": [
    ["@babel/preset-env"],
      "@babel/preset-react"
  ],

  "plugins": [
    "@babel/plugin-syntax-dynamic-import"
  ]
}
```

上述`presets`中`@babel/preset-env`是为了解析`ES6`语法，`@babel/preset-react`是为了解析`react JSX`。`@babel/plugin-syntax-dynamic-import`是为了支持动态`import`语法。

- webpack 配置

```js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    split: './src/split/index'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    // 打包 html
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/split/index.html`),
      filename: 'split.html',
      chunks: ['split']
    })
  ]
};
```

## 结果展示

通过`npm run build`命令构建，生成的文件存放在`dist`目录中，`dist`目录如下：

```
├─dist
│      1.chunk.js
│      split.html
│      split_bundle.js
```

其中`1.chunk.js`为懒加载代码，对应`split/text.js`，`split_bundle.js`为入口文件的输出文件，`split.html`为`split/index.html`打包后文件。

在浏览器中执行`split.html`文件，执行结果如下图：

<Img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200316215036.png" />

通过上图`Network`可以看出，执行时并没有引入`1.chunk.js`文件。

当我们点击页面中的文字时，`1.chunk.js`脚本被加载，文字'dynamic import'显示在网页中。如下图所示：

<Img width="400"  src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200316215322.png" />

项目中所有的代码和配置已经上传到[webpack-demo](https://github.com/USTC-Han/webpack-demo/tree/master/code-split)中，可以下载运行一下。

## 参考链接

- [代码分割和动态 import，by 程柳锋](https://time.geekbang.org/course/detail/190-102405)
- [Webpack 的 Bundle Split 和 Code Split 区别和应用， by JS 菌](https://segmentfault.com/a/1190000017893334)
