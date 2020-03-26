---
title: webpack核心概念
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

代码中的`__dirname`表示当前文件所在目录，是一个字符串，因此上述`path: __dirname + '/dist'`的意思为“将打包输出的文件存放在与配置文件相同目录的 dist 目录中”。

对于`path`除了使用上述方式外，还可以通过`const path = require('path')`调用`Node.js`的内置模块`path`，使用`path.resolve([...paths])`或者`path.join([...paths])`进行拼接。两者的区别可以通过[Node.js 文档](https://nodejs.org/docs/latest/api/path.html#path_path_join_paths)和[path.join()和 path.resolve()的区别](https://juejin.im/post/5cfc96c5f265da1b8333805a)学习。

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

其中`use` 字段有以下三种写法：

- 可以是一个字符串，例如上例中的 `use: 'raw-loader'`'。
- `use` 字段可以是一个数组，例如打包`.css`文件`use: ['style-loader', 'css-loader']`。
- `use` 数组的每一项既可以是**字符串**也可以是**对象**，当我们需要在`webpack` 的配置文件中对 `loader` 进行配置，就需要将其编写为一个对象，并且在此对象的 `options` 字段中进行配置，如：

```js
use: [
  {
    loader: 'file-loader',
    options: {
      name: '[name]_[hash:8].[ext]'
    }
  }
];
```

:::tip

`use` 中 `loader` 的调用顺序从右向左。

:::

## Plugins

插件用于 `bundle` 文件的优化，资源管理和环境变量注入，作于用整个构建过程。插件可以看作是`loaders`功能的补充，对于`loader`无法完成的打包需求，可以考虑使用插件来实现。

### 常用的 Plugins

| 名称 | 描述 |
| --- | --- |
| SplitChunksPlugin | 提取公共资源 |
| CleanWebpackPlugin | 每次构建后清楚`./dist`目录 |
| MiniCssExtractPlugin | 将`CSS`从`bundle`文件里提取成一个独立的`css`文件 |
| CopyWebpackPlugin | 将文件或者文件夹拷贝到构建的输出目录 |
| HtmlWebpackPlugin | 创建`html`文件去承载输出的`bundle` |
| UglifyjsWebpackPlugin | 压缩`js` |
| ZipWebpackPlugin | 将打包后的资源生成一个`zip`包 |
| friendly-errors-webpack-plugin | 优化命令行的构建日志提示信息 |
| webpack-livereload-plugin | 开启监听模式是，代码更改自动刷新页面 |

:::caution

在`webpack 3`版本时，一般会使用`CommonsChunkPlugin`插件进行资源提取，但是在`webpack 4`版本中，推荐使用`SplitChunksPlugin`来代替`CommonsChunkPlugin`，而`CommonsChunkPlugin`已被删除。

:::

:::caution

在`webpack 3.x`的版本中提取`CSS`会使用`ExtractTextWebpackPlugin`，而在`webpack 4`该插件已经被`MiniCssExtractPlugin`替代。

:::

### Plugins 用法

```js
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

`mode` 用来指定当前的构建环境是： `production`、`development` 还是 `none`。不设置`mode`时，即使配置`process.env.NODE_ENV`，其默认值依旧为`production`。

### 内置函数

| 选项 | 描述 |
| --- | --- |
| development | 设置 `process.env.NODE_ENV`的值为`development`，开启`NamedChunksPLugin`和`NamedModulesPlugin` |
| production | 设置 `process.env.NODE_ENV`的值为`production`, 开启`FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`， `ModuleConcatenationPlugin`, `NoEmitonErrorsPlugin`，`OccurrenceOrderPlugin`, `SideEffectsFlagPlugin`和 `TerserPlugin` |
| none | 不开启任何优化选项 |

当`mode`设置为`development`时，一般是为了开启代码的热更时显示更新的文件和目录。当`mode`设置为`production`时，一般做一些代码压缩、副作用检查等优化。

对于其中的内置函数在后面讲到该内容时会详细讲解。

### mode 用法

```js
module.exports = {
  output: {
    filename: 'bundle.js'
  },
  mode: 'production'
};
```

除了直接为`mode`赋值外，还可以通过在`package.json`中配置`NODE_ENV`的值来间接赋值。例如：

- package.json

```js
 "scripts": {
    "dev": "set NODE_ENV=development &&  webpack-dev-server --open --hot",
    "build": "set NODE_ENV=production &&   --progress --hide-modules"
  }
```

- webpack.config.js

```js
module.exports = {
  mode: process.env.NODE_ENV
};
```

此时`mode`将会根据`process.env.NODE_ENV`判断运行环境。

## 参考链接

- [玩转 webpack，by 程柳锋](https://time.geekbang.org/course/intro/190)
- [带你深度解锁 Webpack 系列, 刘小夕](https://juejin.im/post/5e5c65fc6fb9a07cd00d8838)
