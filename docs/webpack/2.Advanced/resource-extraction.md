---
title: 公共资源提取
sidebar_label: 公共资源提取
---

import Img from '../../../src/components/Img';

## 概述

当项目的多个页面使用相同的基础库，或者引用了相同的模块时，对每个页面都打包一遍是很浪费资源的。所以，需要在打包的时候通过提取公共资源来减少打包后`bundle`的体积。在`webpack 3`版本时，一般会使用`CommonsChunkPlugin`插件进行资源提取，但是在`webpack 4`版本中，推荐使用`SplitChunksPlugin`来代替`CommonsChunkPlugin`，而`CommonsChunkPlugin`已被删除。

## SplitChunksPlugin

`SplitChunksPlugin`在`production`的模式下是默认开启的，各字段的默认配置如下：

```js
optimization: {
    splitChunks: {
      chunks: 'async', // async 分离异步引入的库，initial 分离同步引用的库，all 分离所有类型的库
      minSize: 30000, // 进行脚本分离的最少字节
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1, // 设置最少引用次数为2次
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, // 引用模块的匹配规则
          priority: -10 // 优先级高的chunk为被优先选择，优先级一样的话，size大的优先被选择
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true // 当module未变时，是否可以使用之前的chunk
        }
      }
    }
  }
```

上述配置中还有几个字段没有介绍，如果感兴趣可以查看[官网文档](https://webpack.js.org/plugins/split-chunks-plugin/)。

## 相关代码

为了证明`webpack`能够提取公共资源，我们建立了`index.js`和`detail.js`文件，两个文件中都引用了`React`包，我们尝试对两个文件中的`react`和`react-dom`进行提取。

- index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';

class Resource extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <div>
        <p>resource extraction</p>
      </div>
    );
  }
}

ReactDOM.render(<Resource />, document.getElementById('root'));
```

- detail.js

```js
import React from 'react';

class Detail extends React.Component {
  constructor() {
    super(...arguments);
  }
  render() {
    return <input type="text" />;
  }
}

export default Detail;
```

## 相关配置

- webpack.config.js

```js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    resource: './src/split/index',
    detail: './src/split/detail'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  mode: 'production', // mode需要设置为production
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/split/index.html`),
      filename: 'index.html',
      chunks: ['vendors', 'resource', 'detail']
    })
  ],
  // 公共资源提取配置
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
```

## 结果展示

项目中的所有代码已经上传到[github](https://github.com/USTC-Han/webpack-demo/tree/master/resource-extraction)中，可以下载下来执行一下。

当我们未配置`optimization.splitChunks`时，执行`npm run build`的构建结果如下：

<Img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/微信截图_20200317102445.png" />

当配置后，构建的结果如下所示：

<Img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/resource.png" />

通过上面的结果可以看出，通过使用`SplitChunksPlugin`我们可以将公共资源(`react` 和 `react-dom`)提出到`vendors.chunk.js`文件中，对应打包后的`boundle`文件体积都有减小。因为`detail`只引用了`react`包，所以减少的体积较少。

## 参考链接

- [提取页面公共资源，by 程柳锋](https://time.geekbang.org/course/detail/190-100678)
- [Webpack 的 Bundle Split 和 Code Split 区别和应用， by JS 菌](https://segmentfault.com/a/1190000017893334)
- [webpack document](https://webpack.js.org/plugins/split-chunks-plugin/)
