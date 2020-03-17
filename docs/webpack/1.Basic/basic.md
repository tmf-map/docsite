---
title: webpack核心概念
sidebar_label: webpack核心概念
---

import Img from '../../../src/components/Img';

## Entry

`Entry` ⽤用来指定 `webpack` 的打包入⼝，入⼝文件只能是`.js`文件。对于非代码部分比如图片、字体等也会通过依赖加入到依赖图中。

### Entry 用法

- 单入口文件： entry 是一个字符串

```js
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

- 多入口文件： entry 是一个字符串对象

```js
module.exports = {
  entry: {
  app: './src/app.js',
  adminApp: './src/adminApp.js
  }
}
```

## Output

`output` 用来告诉 `webpack` 如何将编译后的文件输出到磁盘。

### Output 用法

- 单入口配置：

```js
module.exports = {
  entry: './path/to/my/entry/file.js'
  output: {
    filename: 'bundle.js’ ,
    path: __dirname + '/dist'
  }
};
```

- 多入口配置：

```js
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js', // 通过占位符确保文件的名称唯一
    path: __dirname + '/dist'
  }
};
```

## Loaders

`webpack` 开箱即用只支持 `JS` 和 `JSON` 两种文件类型，通过 `Loaders` 去支持其它文件类型并且把它们转化成有效的模块，并且可以添加到依赖图中。本身是一个函数，接受源文件作为参数，返回转换的结果。

### 常用的 loaders

| 名称          | 描述                          |
| ------------- | ----------------------------- |
| babel-loader  | 转换`ES6`以上新版本的`JS`代码 |
| css-loader    | 支持`.css`文件的加载和解析    |
| less-loader   | 将`less`文件转换成`css`       |
| ts-loader     | 将`ts`转换成`js`              |
| file-loader   | 进行图片、字体等打包          |
| raw-loader    | 将文件以字符串的形式导入      |
| thread-loader | 多进程打包`js`和`css`         |

### Loaders 的用法

```js
const path = require('path');
module.exports = {
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {test: /\.txt$/, use: 'raw-loader'} // test指的是匹配规则，use指定使用loader的名称。
    ]
  }
};
```

## Plugins

插件用于 `bundle` 文件的优化，资源管理和环境变量注入，作于用整个构建过程。插件可以看作是`loaders`功能的补充，对于`loader`无法完成的打包需求，可以考虑使用插件来实现。

### 常用的 Plugins

| 名称                     | 描述                                             |
| ------------------------ | ------------------------------------------------ |
| CleanWebpackPlugin       | 每次构建后清楚`./dist`目录                       |
| ExtractTextWebpackPlugin | 将`CSS`从`bundle`文件里提取成一个独立的`css`文件 |
| CopyWebpackPlugin        | 将文件或者文件夹拷贝到构建的输出目录             |
| HtmlWebpackPlugin        | 创建`html`文件去承载输出的`bundle`               |
| UglifyjsWebpackPlugin    | 压缩`js`                                         |
| ZipWebpackPlugin         | 将打包后的资源生成一个`zip`包                    |

### Plugins 用法

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}) // 插件需要放到`plugins`数组中
  ]
};
```

## Mode

`Mode` ⽤用来指定当前的构建环境是： `production`、`developmen`t 还是 `none`。

### 内置函数

设置 `mode` 可以使用 `webpack` 内置的函数，默认值为 `production`。

| 选项 | 描述 |
| --- | --- |
| development | 设置 `process.env.NODE_ENV`的值为`development`，开启`NamedChunksPLugin`和`NamedModulesPlugin` |
| production | 设置 `process.env.NODE_ENV`的值为`production`, 开启`FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`， `ModuleConcatenationPlugin`, `NoEmitonErrorsPlugin`，`OccurrenceOrderPlugin`, `SideEffectsFlagPlugin`和 `TerserPlugin` |
| none | 不开启任何优化选项 |

当`mode`设置为`development`时，一般时为了开启代码的热更新以及显示封信的文件和目录。当`mode`设置为`production`时，一般做一些代码压缩、副作用检查等优化。

对于其中的内置函数在后面讲到该内容时会详细讲解。

## 参考链接

- [玩转 webpack，by 程柳锋](https://time.geekbang.org/course/intro/190)
