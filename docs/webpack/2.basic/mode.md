---
title: mode 模式
---

## 作用

省去 `process.env.NODE_ENV` 配置，并且根据环境自动加载对应插件。

:::tip

Webpack4+ 支持该配置。

:::

## development

### 示例

```js
module.exports = {
  mode: 'development'
};
```

### 特性

- 方便于浏览器调试的工具；
- 可以快速地对增加的内容进行编译；
- 提供了更精确、更有用的运行时错误提示机制

### 功能

- 自动设置 `process.env.NODE_ENV = development`
- 启用 NamedChunksPlugin 和 NamedModulesPlugin 为所有的模块（源文件）和块（构建输出的文件）定义一个名字

## production

### 示例

```js
module.exports = {
  mode: 'production'
};
```

### 特性

- 自动压缩构建输出的文件
- 快速的运行时处理
- 不暴露源代码和源文件的路径
- 快速的静态资源输出

### 功能

- 自动设置 `process.env.NODE_ENV = production`
- 启用插件（最后一个为非内置插件）
  - FlagDependencyUsagePlugin：检测并标记模块之间的从属关系
  - FlagIncludeChunksPlugin：可以让 Webpack 根据模块间的关系依赖图中，将所有的模块连接成一个模块
  - ModuleConcatenationPlugin：告诉 Webpack 去清除一个大的模块文件中的未使用的代码，这个大的文件模块可以是自定义的，也可以是第三方的（注意：一定要 `package.json` 文件中添加 `"sideEffects": false`）
  - NoEmitOnErrorsPlugin
  - OccurrenceOrderPlugin：
  - SideEffectsFlagPlugin：告诉 Webpack 各个模块间的先后顺序，这样可以实现最优的构建输出
  - TerserPlugin：替代 `uglifyjs-webpack-plugin` 插件。它的作用依然是对构建输出的代码进行压缩

## none

### 示例

```js
module.exports = {
  mode: 'none'
};
```

### 功能

即不做任何优化，启动 Webpack 打包时关闭默认的内置插件。

## 配置中没有写 mode 项

不设置 `mode` 时，即使配置 `process.env.NODE_ENV` ，其默认值依旧为 `production` 。

## 使用 `NODE_ENV`

除了直接为`mode`赋值外，还可以通过在`package.json`中配置`NODE_ENV`的值来间接赋值。例如：

- package.json

```js
 "scripts": {
    "dev": "set NODE_ENV=development && webpack-dev-server --open --hot",
    "build": "set NODE_ENV=production && webpack --progress --hide-modules"
  }
```

- webpack.config.js

```js
module.exports = {
  mode: process.env.NODE_ENV
};
```

此时 `mode` 将会根据 `process.env.NODE_ENV` 判断运行环境。

## 参考资料

1. [Webpack Guidebook: mode 模式, by tsejx](https://tsejx.github.io/webpack-guidebook/basic-summary/core-concepts/mode)
