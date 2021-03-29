---
title: 代码拆分 Code Splitting
---

## 概述

对于一个大的项目来说，代码都被打包到同一个文件中是相当臃肿的。当其中的某些代码只有在特定场景中才会用到时，这种打包方式的缺点尤为明显。所以，在`webpack`中允许将代码分割成更小的`chunk`，只有当代码运行到需要他们的时候再进行加载。通过脚本懒加载，可以使得初始下载的代码更小，有利于减少首屏的渲染时间。

## 实现方式

实现懒加载`JS`脚本的方式主要有以下两种：

- CommonJS: require.ensure()

```js
require.ensure('./text', function (require) {
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
  constructor(props) {
    super(props);
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
    path: path.join(__dirname, 'dist'), // 输出目录
    filename: '[name]_bundle.js', // 入口文件打包后的文件名
    chunkFilename: '[name]_chunk.js' // 代码分离出块的文件名
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

:::tip

`babel`的配置以及`webpack`中`entry`和`output`的配置是实现代码分割的关键。

:::

## 结果展示

通过`npm run build`命令构建，生成的文件存放在`dist`目录中，`dist`目录如下：

```
├─dist
│      1_chunk.js
│      split.html
│      split_bundle.js
```

其中`1_chunk.js`为懒加载代码，当`import`没加魔法注释时默认`name`为数字，对应`split/text.js`，`split_bundle.js`为入口文件的输出文件，`split.html`为`split/index.html`打包后文件。

在浏览器中执行`split.html`文件，执行结果如下图：

<Img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200316215036.png" />

通过上图`Network`可以看出，执行时并没有引入`1_chunk.js`文件。

当我们点击页面中的文字时，`1_chunk.js`脚本被加载，文字'dynamic import'显示在网页中。如下图所示：

<Img width="400"  src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/lazy-import.gif" />

项目中所有的代码和配置已经上传到`github`仓库的[code-split](https://github.com/ThinkBucket/webpack-demo/tree/master/code-split)中，可以下载运行一下。

## 魔法注释

通过在`import()`中添加[魔法注释](https://webpack.js.org/api/module-methods/#magic-comments)，可以对分割后的`chunk`进行命名等操作。本节我们将讲解两个常用的注释：`/* webpackChunkName: "my-chunk-name" */`和`/* webpackExclude: /\.json$/ */`。

### webpackChunkName

通过之前的运行结果可以看出，被分割的`chunk`的文件名都是数字，当分割的文件较多时用数字对文件命名显然是反人类的。为了解决这一问题，我们可以使用魔法注释中的`webpackChunkName`来自定义分割出的`chunk`名。

- 动态导入 npm 包

当动态导入的是`npm`包时，建议`webpackChunkName`的值设为**包名**。例如当我们动态导入`lodash`包时，我们不再需要使用`import _ from 'lodash'`，其配置如下：

```js
import(/* webpackChunkName: "lodash" */ 'lodash').then();
```

使用`webpack`打包后的文件名为：

```
vendors~lodash_chunk.js
```

- 动态导入文件：

当动态导入的是文件时，建议`webpackChunkName`的值设为`[request]`。例如当我们导入`text.js`文件时，其配置如下：

```js
import(/* webpackChunkName: "[request]" */ `./text.js`).then();
```

使用`webpack`打包后的文件名为：

```
text_chunk.js
```

### webpackExclude

`webpackExclude`注释的值是一个正则表达式，符合该正则表达式的所有文件在代码分割时将被排除在外。

例如，demo 的目录如下所示：

```
src
    ├─code
    │      regexp.json
    │      test.js
    │      text.js
    │
    └─split
            index.html
            index.js
```

当我们在`spilt/index.js`文件中动态导入`code`目录下的`text.js`文件时，如果`spilt/index.js`代码设置如下：

```js
   loadComponent(fileName) {
        const path = `${fileName}.js`;
        import(/* webpackChunkName: "[request]" */ /* webpackExclude: /\.json$/ */`../code/${path}`).then((result) => {
            if(fileName === 'test') {
                this.setState({ test: result[fileName] })
            }else{
                this.setState({ text: result[fileName] })
            }
        })
    }

```

因为`webpack`编译前不会分析`${path}`，所以`/code`目录下的所有`.js`文件将分别打包成对应的`chunk`，而`.json`文件将会被忽略。此处可以通过传递不同的参数来懒加载不同的文件。

打包后的结果为：

```
├─dist
│      split_bundle.js
│      test_chunk.js
│      text_chunk.js
```

:::caution

需要注意的是，不要将字符串模板提取成一个变量，例如：`import(code)`，`webpack`在编译前不会去推断这个变量名`code`到底代表什么。因此在 import()中必须至少包含导入模块位置的某些信息以方便调用。

:::

添加魔法注释后的代码可以点击`github`仓库的[code-split-1](https://github.com/ThinkBucket/webpack-demo/tree/master/code-split-1)下载运行。

## 参考资料

- [代码分割和动态 import，by 程柳锋](https://time.geekbang.org/course/detail/190-102405)
- [Webpack 的 Bundle Split 和 Code Split 区别和应用， by JS 菌](https://segmentfault.com/a/1190000017893334)
- [webpack document -- Module Methods](https://webpack.js.org/api/module-methods/#magic-comments)
- [使用 import()配合 webpack 动态导入模块时，如何指定 chunk name？，by mrdulin](https://github.com/mrdulin/blog/issues/43)
- [Error: Cannot find module with dynamic import，by MrDarkSkil](https://github.com/webpack/webpack/issues/6680)
- [Tree Shaking 的使用和原理分析，by 程柳锋](https://time.geekbang.org/course/detail/100028901-100679)
- [Tree Shaking 概念详解](https://b23.tv/BV1ME411T77n/p20)
