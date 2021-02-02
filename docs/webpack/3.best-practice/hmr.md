---
title: 热加载 HMR
---

## 什么是 HMR

HMR 是指 Hot Module Replacement。对于你需要更新的模块，进行一个"热"替换，所谓的热替换是指在不需要刷新页面的情况下，对某个改动进行无缝更新。如果你没有配置 HMR，那么你每次改动，都需要刷新页面，才能看到改动之后的结果，对于调试来说，非常麻烦，而且效率不高，最关键的是，你在界面上修改的数据，随着刷新页面会丢失，而如果有类似 Webpack 热更新的机制存在，那么，则是修改了代码，不会导致刷新，而是保留现有的数据状态，只将模块进行更新替换。也就是说，既保留了现有的数据状态，又能看到代码修改后的变化。

总结：

- 加载页面时保存应用程序状态
- 只更新改变的内容，节省调试时间
- 修改样式更快，几乎等同于在浏览器中更改样式

## 基础配置

### 安装依赖

假设现在已经有了 webpack 的基础依赖包，想要让 HMR 生效还需要安装以下包：

- webpack-dev-middleware
- webpack-hot-middleware (@webapp-suite/webpack-hot-middleware)

```bash npm2yarn
npm install -D webpack-dev-middleware @webapp-suite/webpack-hot-middleware @pmmmwh/react-refresh-webpack-plugin react-refresh
```

### 配置 Webpack

```js title=webpack.dev.config.js {7,10}
module.exports = {
  mode: 'development',
  entry: {
    app: [
      resolve(__dirname, '../src/index'),
      // 必须这么写，这将连接到服务器，以便在包重新构建时接收通知，然后相应地更新客户端
      '@webapp-suite/webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
```

### 配置 Node Server

```js title=server.js {1,11-15,17}
const webpackHotMiddleware = require('@webapp-suite/webpack-hot-middleware');

if (isDevelopment) {
  const urls = prepareUrls('http', 'localhost');
  const openUrl = urls.localUrlForBrowser;

  const compiler = webpack({...WebpackDevConfig, mode: 'development'});
  const webpackDevInstance = webpackDevMiddleware(compiler, {
    stats: false
  });
  const webpackHotInstance = webpackHotMiddleware(compiler, {
    log: false, // https://github.com/geowarin/friendly-errors-webpack-plugin#turn-off-errors
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  });
  server.use(webpackDevInstance);
  server.use(webpackHotInstance);
  webpackDevInstance.waitUntilValid(() => {
    openBrowser(openUrl);
  });
}
```

### 查看

<Img w="600" src="https://user-gold-cdn.xitu.io/2019/6/6/16b2b7af93648a4c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" />

效果已经出来，我们发现控制台已经提示热更新日志输出：

```text
[HMR] connected
```

这已经很明白地告诉我们热更新已经连接上了，当我们修改源码文件后，浏览器会自动的刷新。

### 问题

比如弹框组件，当我点击 button，state 也会随之增加。但是这个时候如果我修改了某一个文件内容，可以看到我浏览器的确刷新了。但是！state 却重置到了 1，这并不是我们想要的。

## 热更新保留组件状态

### React

- @pmmmwh/react-refresh-webpack-plugin (React App)
- react-refresh (React App)

```bash npm2yarn
npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh
```

```js title=webpack.dev.config.js {1,19,28}
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: [
      resolve(__dirname, '../src/index'),
      '@webapp-suite/webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-refresh/babel']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin()
  ]
};
```

至此，我们就已经实现了，修改源码后 ，浏览器自动刷新的效果了，并且还保留了刷新前的 state 状态。

## 使用 TypeScript

- @babel/core
- @babel/plugin-syntax-decorators
- @babel/plugin-syntax-jsx
- @babel/plugin-syntax-typescript
- babel-loader

```bash npm2yarn
npm install -D @babel/core @babel/plugin-syntax-decorators @babel/plugin-syntax-jsx @babel/plugin-syntax-typescript babel-loader
```

```js title=webpack.dev.config.js {19-29}
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: [
      resolve(__dirname, '../src/index'),
      '@webapp-suite/webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'thread-loader'
          },
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-syntax-typescript',
                ['@babel/plugin-syntax-decorators', {legacy: true}],
                '@babel/plugin-syntax-jsx',
                'react-refresh/babel'
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin()
  ]
};
```

虽然直接在 ts-loader 后面加一层 babel-loader 会带来一定的性能损耗，但实际开发过程中还是可以接受的，如果直接用 babel-loader 代替 ts-loader，各种语法兼容需要装插件，还可能还会有各种错，比较折腾，不如这样省事。

## 参考资料

1. https://github.com/pmmmwh/react-refresh-webpack-plugin/
1. https://webpack.js.org/concepts/hot-module-replacement/
1. https://webpack.docschina.org/guides/hot-module-replacement/
1. https://juejin.cn/post/6844903861002436621
1. https://juejin.cn/post/6844903796200439816
1. https://www.webpackjs.com/api/hot-module-replacement/
1. https://stackoverflow.com/questions/58725966/webpack-dev-server-how-to-preserve-state-with-module-hot-data
1. https://github.com/facebook/create-react-app/blob/7e48117abfa263bfa2559b73eebc2c2ea3ecee13/packages/react-dev-utils/webpackHotDevClient.js
1. https://blog.csdn.net/bangbDIV/article/details/107365123
1. https://github.com/gaearon/react-hot-loader
1. https://github.com/gaearon/react-hot-loader#hot-loaderreact-dom
1. https://github.com/gaearon/react-hot-loader/issues/884#issuecomment-383365781
1. http://gaearon.github.io/react-hot-loader/getstarted/
1. https://cloud.tencent.com/developer/article/1515569
1. https://github.com/dvajs/babel-plugin-dva-hmr/issues/21
1. https://juejin.cn/post/6844904057593659400
1. [Webpack 如何配置热更新，By 发声的沉默者](https://juejin.cn/post/6844904164707794951)
1. https://www.zoo.team/article/webpack
1. https://github.com/webpack-contrib/webpack-hot-middleware/pull/393
1. https://github.com/facebook/react/issues/16604
1. [使用 webpack 实现 react 的热更新, By isNealyang](https://segmentfault.com/a/1190000011151106)
1. https://github.com/pmmmwh/react-refresh-webpack-plugin/
1. https://tsejx.github.io/webpack-guidebook/principle-analysis/operational-principle/hot-module-replacement
