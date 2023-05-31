---
title: 分割打包 Bundle Splitting
---

## 概述

当项目的多个页面使用相同的基础库，或者引用了相同的模块时，对每个页面都打包一遍是很浪费资源的。所以，需要在打包的时候通过提取公共资源来减少打包后`bundle`的体积。在`webpack 3`版本时，一般会使用`CommonsChunkPlugin`插件进行资源提取，但是在`webpack 4`版本中，推荐使用`SplitChunksPlugin`来代替`CommonsChunkPlugin`，而`CommonsChunkPlugin`已被删除。

## SplitChunksPlugin

`SplitChunksPlugin`是`webpack`的内置插件，不需要单独安装，其各字段的默认配置如下：

```js title="webpack.config.js"
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'async', // async 分离异步引入的库，initial 分离同步引用的库，all 分离所有类型的库
      minSize: 30000, // 进行脚本分离的最少字节
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1, // 设置最少引用次数为1次
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, // 引用模块的匹配规则，此处设置意味着将node_modules下的所有模块都打包到defaultVendors中。
          priority: -10 // 一个模块可能属于多个cache group，当优先级高的group可以优先选择模块。优先级一样的话，size大的优先被选择。默认值为0
        },
        default: {
          minChunks: 2, // 覆盖splitChunks.*中的配置项
          priority: -20,
          reuseExistingChunk: true // 当module未变时，是否可以使用之前的chunk
        }
      }
    }
  }
};
```

`cacheGroups`对象能够继承或者覆盖`splitChunks.*`中的配置项，但是`test`、`priority`和`reuseExistingChunk`仅能在其子对象内部使用。`cacheGroups`中还可以在子对象内部使用`name`字段，当不设置`name`字段时，提取后的`chunk`与其子对象名相同。

上述配置中还有几个字段没有介绍，如果感兴趣可以查看[官网文档](https://webpack.js.org/plugins/split-chunks-plugin/)。

## 相关代码

为了证明`webpack`能够提取公共资源，我们建立了`index.js`和`detail.js`文件，两个文件中都引用了`React`包，我们尝试对两个文件中的`react`和`react-dom`进行提取。

- index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import common from '../../commons';

class Resource extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <div>
        <p>{common()}</p>
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
import common from '../../commons';

class Detail extends React.Component {
  constructor() {
    super(...arguments);
  }
  render() {
    return (
      <div>
        <p>{common()}</p>
        <input type="text" />
      </div>
    );
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
        // 提取公共包
        vendor: {
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all'
        },
        // 提取公共文件
        commons: {
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
};
```

## 结果展示

项目中的所有代码已经上传到`github`仓库[resource-extraction](https://github.com/tmf-map/webpack-demo/tree/master/resource-extraction)中，可以下载下来执行一下。

当我们未配置`optimization.splitChunks`时，执行`npm run build`的构建结果如下：

<Img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200321115710.png" />

当配置后，构建的结果如下所示：

<Img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200321120250.png" />

通过上面的结果可以看出，通过使用`SplitChunksPlugin`我们可以将公共资源(`react` 和 `react-dom`)提出到`vendors.chunk.js`文件中，将引用的`commons`文件提取到`commons~detail~split.chunk.js`文件中，对应打包后的`boundle`文件体积都有减小。因为`detail`只引用了`react`包，所以减少的体积较少。

## 参考资料

1. [提取页面公共资源，by 程柳锋](https://time.geekbang.org/course/detail/190-100678)
2. [Webpack 的 Bundle Split 和 Code Split 区别和应用， by JS 菌](https://segmentfault.com/a/1190000017893334)
3. [webpack document](https://webpack.js.org/plugins/split-chunks-plugin/)
