---
title: path vs. publicPath vs. contentBase
---

import Img from '../../../src/components/Img';

## 概述

在`webapck`的打包配置中，一般会使用到`path`、 `publicPath` 和 `contentBase`来配置资源路径，那么三者分别代表什么含义呢？三者的含义简要概述如下：

- `path`在生产环境（production）中代表**打包在本地磁盘上的物理位置**，在**开发环境（development）中可以省略**。
- `publicPath`在生产环境一般用来**为`CDN`资源添加前缀**，在开启 webpackDevServer 的开发环境中则**代表资源打包后的资源路径**。
- `contentBase`是 devServer 对象中的一个字段，决定了 webpackDevServer 启动时**服务器资源的根目录**，默认是**项目的根目录**。

下面我们将结合一个[demo](https://github.com/ThinkBucket/webpack-demo/tree/master/path-publicPath)来分别阐述三者的具体含义。

## path

`path`一个绝对路径，代表**打包在本地磁盘上的物理位置**。

```js {4} title="webpack.prod.js"
module.exports = {
  //...
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
    publicPath: "/dist/",
  }
  //...
}
```

`path`字段的配置在`生产环境`下是必须的，因为我们需要为`webpack`指明打包路径，但是在`开发环境`下不是必须的，因为当使用 `webpackDevServer`时打包出来的**文件都在内存中而没有打包到磁盘**，即使指定了输出目录，执行打包命令行后，输出目录也是空的。

## publicPath

### output.publicPath

`output`中的`publicPath`可以分为两种情况：

1. 在生产环境中，通过设置`publicPath`添加 <abbr title="Content Delivery Network">CDN</abbr> 前缀，将我们的静态资源进行 <abbr title="Content Delivery Network">CDN</abbr> 托管。

2. 在开发环境中，通过设置`publicPath`添加相对路径前缀，在开启`webpackDevServer`时，指明打包后的资源路径，默认路径为项目的根目录。

:::caution

需要注意的是，publicPath 都是以‘/’结尾。

:::

下面我们结合 demo，着重讲解在开发环境中`output.publicPath`的表现。

- 我们不为`publicPath`赋值，让`publicPath`取默认值，因此我们期望打包后，所有文件都可以被打包到根目录，以`/`为前缀。

```js {7,18} title="webpack.dev.js"
module.exports = {
  //...
  module: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
    // publicPath: "/dist/",
  }
  //...
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/index.html'),
    filename: 'index.html',
    chunks: ['index'],
  })

  //先注释掉devServer.contentBase
   devServer: {
        // publicPath: "/dist/"
    }
}
```

当我们执行`npm run dev`后，将启动 webpackDevServer，运行过程如下图所示： first <Img width="700" id = "first-demo" legend="演示1：output.publicPath默认值" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200423180630.gif"/>

由演示的结果可以看出，打包后的静态资源`search.html`、`index.js`和图片都是以`/`为前缀，这证明了**在默认的情况下，`output.publicPath`代表着项目根目录**。

- 为了进一步的证明，我们还可以将`output.publicPath`改为`/dist/`，我们期望所有的静态资源都会添加/dist/前缀。运行过程如下图：

<Img width="700" legend="演示2：output.publicPath为特定值" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200423181421.gif" id = "测试"/>

通过图中可以看出，所有的静态资源都是以`/dist/`为前缀。

### devServer.publicPath

在开启 webpackDevServer 时浏览器中可通过该路径访问 `bundled` 文件，**静态文件前会加上这个路径前缀**。`devServer.publicPath`和`out.publicPath`的功能相似，两者之间的联系如下：

1. 若两者都不设置的话，那所有的静态文件都以“/”为前缀。
2. 若`devServer.publicPath`没有设置，则默认为`out.publicPath`的值。
3. 若`out.publicPath`的值没有设置，则所有静态文件以`devServer.publicPath`值为前缀。
4. 若两者都有设置且不相同，则使用`loader`打包出的静态文件以`out.publicPath`的值为前缀，`html`文件以`devServer.publicPath`为前缀。

:::good

从上面两者的联系可以看出，我们最好只设置`out.publicPath`的值，或者两者设置为相同的值，不然两者关系太复杂。

:::

上述结论的`1`和`2`在前面的案例中已经涉及，分别对应<a href="#first-demo">演示 1</a> 和 <a href="#second-demo">演示 2</a>，此处不再细述，下面重点说下`3`和`4`。

- 若`out.publicPath`的值没有设置，则所有静态文件以`devServer.publicPath`值为前缀，也就是说所有的静态资源会打包到`devServer.publicPath`的路径下。如下例所示：

```js {6,17} title="webpack.dev.js"
module.exports = {
  //...
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
    // publicPath: "/test/",
  }
  //...
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/index.html'),
    filename: 'index.html',
    chunks: ['index'],
  })

  //先注释掉devServer.contentBase
  devServer: {
    publicPath: "/dist/",
    // contentBase: './src',
  }
}
```

此时打包过程如下图所示：

<Img width="700" legend="演示3：devServer.publicPath为特定值" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200423221610.gif" />

从打包结果可以看出，所有的文件都是以"/dist/"为前缀。

- 为了验证结论第 `4` 条，我们将上面配置中`output.publicPath`的注释取消，打包结果如下：

<Img width="700" legend="演示4：devServer.publicPath与`output.publicPath`的值不相同" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200423222102.gif" />

通过打包过程可以看出，`search.html`以`devServer.publicPath`值为前缀，而其对应的`index.js`却以`output.publicPath`值为前缀。除此之外打包的页面也没能正常显示，因此在设置这两个值的时候，**最好两者保持一致，或者只设置`output.publicPath`即可**。

## contentBase

`devServer.contentBase`决定了 webpackDevServer 启动时**服务器资源的根目录，默认是项目的根目录**。`contentBase` 不会影响 `path` 和 `publicPath`，**它唯一的作用就是指定服务器的根目录来引用静态文件**。

前面的例子中已经展示了，在不设置`contentBase`时，项目中所有的一级目录都会默认被列举在`http://localhost:8080/`页面中，如下图所示：

<Img width="700" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200423223125.png" />

为了`contentBase`在有值时的作用，我们可以将`devServer.contentBase`设置如下

```js {17} title="webpack.dev.js"
module.exports = {
  //...
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
    publicPath: "/dist/",
  }
  //...
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/index.html'),
    filename: 'index.html',
    chunks: ['index'],
  })

  //先注释掉devServer.contentBase
  devServer: {
    contentBase: './dist',
  }
}
```

因为在开发环境执行`npm run dev`后`./dist`为空目录，为了证明首页目录真的是`./dist`，我们可以在`./dist`新建一个文件`i-am-dist.html`，打包结果如下图所示：

<Img width="700" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200423224422.gif" />

由上图可知服务器资源的目录为`./dist`，当我们在地址栏输入`dist/search.html`时页面可以正常显示，这也说明`contentBase`与`publicPath`其实没啥关系，互不影响。

## 参考链接

- [Webpack 中 path/publicPath/contentBase 的关系，by fi3ework ](https://github.com/fi3ework/blog/issues/39)
- [webpack 配置文件中 publicPath 和 contentBase 傻傻分不清, by 小飞猫\_](https://blog.csdn.net/wang839305939/article/details/85855967)
- [webpack 配置 publicPath 的理解, by SamWeb](https://www.cnblogs.com/SamWeb/p/8353367.html)
- [webpack 中的热更新及原理分析，by 程柳锋](https://time.geekbang.org/course/detail/100028901-98391)
