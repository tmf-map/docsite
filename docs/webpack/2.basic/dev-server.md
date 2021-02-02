---
title: devServer 开发服务器
---

## 作用

- 提供 HTTP 服务，而非使用本地文件预览
- 监听文件的变化并自动刷新网页，做到实时预览
- 支持 SourceMap 方便调试

:::tip

devServer 会将 Webpack 构建出的文件保存在内存中

:::

Webpack 在启动时可以开启**监听模式**，之后 Webpack 会监听本地文件系统的变化，在发生变化时重新构建出新的结果。Webpack 默认关闭监听模式，我们可以在启动 Webpack 时通过 `webpack --watch` 来开启监听模式。

通过 devServer 启动的 Webpack 会开启监听模式，当发生变化时重新执行构建，然后通知 devServer 会让 Webpack 在构建出的 JavaScript 代码里注入一个代理客户端用于控制网页，网页和 devServer 之间通过 WebSocket 协议通信，以方便 devServer 主动向客户端发送命令。devServer 在收到来自 Webpack 的文件变化通知时，通过注入的客户端控制网页刷新。

如果尝试修改 `index.html` 文件并保存，则我们会发现这并不会触发以上机制，导致这个问题的原因是 Webpack 在启动时会以配置的 entry 为入口去递归解析出 entry 所依赖的文件，只有 entry 本身和依赖的文件才会被 Webpack 添加到监听列表里。而 `index.html` 文件时脱离了 JavaScript 模块化系统的，所以 Webpack 不知道它的存在。

```js
module.exports = {
  // webpack-dev-server 和 webpack-dev-middle 里 Watch 模式默认开启
  watch: true,

  devServer: {
    // 仅显示错误级别的输出，从而减少输出信息
    stats: 'error-only',

    // 从环境变量中传入 host 和 port，从而达到可配置
    //
    // 如果你是用 Docker、Vagrant 或者 Cloud9，那么把
    // host 设置为 "0.0.0.0"
    //
    // 0.0.0.0 对于所有的网络设备都是可用的
    // 而默认的 `localhost` 不行
    host: process.env.HOST, // 默认为 `localhost`
    port: process.env.PORT, // 默认为 8080
    open: true // 在浏览器打开
  }
};
```

:::note

[dotenv](https://www.npmjs.com/package/dotenv) 允许你通过 `.env` 文件定义环境变量，这样就可以快速方便地设置主机地址和端口

:::

:::tip

如果您的网页应用使用基于 HTML History API 记录路由，你可以启动 `devServer.historyApiFallback`

:::

## 模块热替换特性

`hot` 字段配置是否启用**模块热替换**功能。

```js
hot: true;
```

默认行为是发现源码变更后自动刷新整个页面来做到实时预览，开启后，将在不刷新页面的情况下通过新模块替换老模块来做到实时预览。

除了通过重新刷新整个网页来实现实时预览，devServer 还有一种被称作模块热替换的刷新技术。模块热替换能做到在不重新加载整个网页的情况下，通过将己更新的模块替换老模块，再重新执行一次来实现实时预览。模块热替换相对于默认的刷新机制能提供更快的响应速度和更好的开发体验。模块热替换默认是关闭的，要开启模块热替换，我们只需在启动 devServer 时带上 `--hot` 参数，重启 devServer 后再去更新文件就能体验到模块热替换的神奇了。

## 注入页面分支

devServer 的实时预览功能依赖一个注入页面里的代理客户端，去接收来自 devServer 的命令并负责刷新网页的工作。 `devServer.inline` 用于配置是否将这个代理客户端**自动注入**将运行在页面中的 Chunk 里，默认自动注入。 devServer 会根据我们是否开启 inline 来调整它的自动刷新策略。

- 如果开启 inline，则 devServer 会在构建变化后的代码时通过**代理客户端**控制网页刷新。
- 如果关闭 inline，则 devServer 将无法直接控制要开发的网页。这时它会通过 iframe 的方式去运行要开发的网页。在构建完变化后的代码时，会通过刷新 iframe 来实现实时预览，但这时我们需要去 `http://localhost:8080/webpack­-dev-server/` 实时预览自己的网页。

如果想使用 devServer 的模块热替换机制去实现实时预览，则最方便的方法是直接开启 inline 。

## 历史记录路由

配置项 `historyApiFallback` 用于方便地开发使用 HTML5 History API 的单页应用。

这类单页应用要求服务器在针对任何命中的路由时，都返回一个对应的 HTML 文件。

例如在访问 `http://localhost/user` 和 `http://localhost/home` 时都返回 `index.html` 文件，浏览器端的 JavaScript 代码会从 URL 里解析出当前页面的状态，显示对应的界面。

```js
historyApiFallback: true;
```

只能用于只有一个 HTML 文件的应用。

如果是多页应用。

```js
historyApiFallback: {
  // 使用正则匹配命中路由
  rewrites: [
    // /user 开头的都返回 user.html
    {from: /^\/user/, to: '/user.html'},
    {from: /^\/game/, to: '.game.html'},
    // 其他的都返回 index.html
    {from: /./, to: '/index.html'}
  ];
}
```

## 文件根目录

配置项 `contentBase` 用于配置 devServer HTTP 服务器的文件根目录。默认为当前执行目录，一般不必设置，除非有额外的文件需要被 devServer 服务。

例如将 `public` 目录设置成 devServer 服务器的文件根目录。

```js
devServer: {
  contentBase: path.join(__dirname, 'public');
}
```

devServer 服务器通过 HTTP 服务器暴露文件的方式可分为两类：

- 暴露本地文件
- 暴露 Webpack 构建出的结果，由于构建出的结果交给了 devServer，所以我们在使用 devServer 时，会在本地找不到构建出的文件

## 设置响应头

配置项 `headers` 用于配置 HTTP 相应中注入一些 HTTP 响应头。

```js
devServer: {
    headers: {
        'X-foo': 'bar'
    }
}
```

## 服务监听地址

配置项 `host` 用于配置 devServer 服务监听的地址，只能通过命令行参数传入。

## 服务监听端口

配置项 `port` 用于配置 devServer 服务监听的端口，默认使用 8080 端口。

## 白名单列表

配置 `allowedHosts` 白名单列表，只有 HTTP 请求的 HOST 在列表里才能正常返回。

```js
allowedHosts: [
  // 匹配单个域名
  'host.com',
  'sub.host.com',
  // host2.com 和所有的子域名 *.host2.com 都将匹配
  '.host2.com'
];
```

## HOST 检查

配置项 `disableHostCheck` 用于配置是否关闭用于 DNS 重新绑定的 HTTP 请求的 HOST 检查。

devServer 默认值接收来自本地的请求，关闭后可以接收来自任意 HOST 的请求。它通常用于搭配 `--host 0.0.0.0` 使用，因为想让其他设备访问自己的本地服务，但访问时是直接通过 IP 地址访问而不是通过 HOST 访问，所以需要关闭 HOST 检查。

## HTTPS

devServer 默认使用 HTTP 服务。

某些情况必须使用 HTTPS，例如 HTTP2 和 ServiceWorker 就必须运行在 HTTPS 上。自动生成证书。

```js
devServer: {
  https: true;
}
```

如果想使用自己的证书。

```js
devServer: {
    https: {
        key: fs.readFileSync('path/to/server.key'),
        cert: fs.readFileSync('path/to/server.crt'),
        ca: fs.readFileSync('path/to/ca.pem')
    }
}
```

## 客户端日志内容

配置客户端的日志登记，这会影响到我们在浏览器开发者工具控制台里看到的日志内容。

可取值：

- none - 不输出
- error
- warning
- info（默认）

## 传输压缩

配置是否启用 Gzip 压缩，默认为 `false`。

## 默认开启浏览器

启动项目后自动打开系统默认浏览器。

## 浏览器显示编译异常

WDS 提供了 overlay 属性，开启后可以捕获与编译相关的错误和警告：

```js
module.exports = {
  devServer: {
    overlay: true
  }
};
```

:::tip

如果你想要更全面的提示信息，请考虑 [error-overlay-webpack-plugin](https://www.npmjs.com/package/error-overlay-webpack-plugin)，因为它更好地显示了错误的起源。

:::

## 轮询而非监测文件

有时，WDS 提供的文件监测设置将无法在您的系统上运行。在旧版本的 Windows，Ubuntu，Vagrant 和 Docker 上可能会出现问题。启用轮询是一个很好的选择：

```js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    watchOptions: {
      // 首次更改后延迟多少时间再重新构建
      aggregateTimeout: 300,

      // 轮询的时间间隔（单位 ms，接受 Boolean 类型的值）
      poll: 1000
    }
  },
  plugins: [
    // 忽略 node_modules 目录，节省 CPU 资源
    new webpack.WatchIgnorePlugin([path.join(__dirname, 'node_modules')])
  ]
};
```
