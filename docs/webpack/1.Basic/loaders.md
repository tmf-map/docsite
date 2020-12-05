---
title: Loaders
---

## 概要

`webpack` 默认只支持打包 `JS` 和 `JSON` 两种文件类型，为了支持其它文件类型的打包，需要使用对应的`Loaders`。`Loaders`本身是一个函数，接受源文件作为参数，返回转换的结果。常用的`Loaders`如下所示：

| 名称           | 描述                                        |
| -------------- | ------------------------------------------- |
| babel-loader   | 转换`ES6`以上新版本的`JS`代码               |
| css-loader     | 支持`.css`文件的加载和解析                  |
| less-loader    | 将`.less`文件转换成`.css`                   |
| postcss-loader | 为 CSS 属性补齐前缀                         |
| file-loader    | 进行图片、字体等打包                        |
| url-loader     | 将体积小于设定值的图片、字体等转化为 base64 |
| ts-loader      | 将`.ts`转换成`.js`                          |
| thread-loader  | 多进程打包`js`和`css`                       |

下面我们将分别讲述这些`Loaders`。

## babel-loader

babel-loader 的作用主要是配合`babel`解析和打包 ES6 语法文件。在配置 babel-loader 前我们需要安装和配置`babel`。

- 安装`babel` 和 `babel-loader`

```bash npm2yarn
npm install -D @babel/core @babel/preset-env babel-loader
```

`@babel/core`：该模块中包含了`babel`的核心功能，是使用`babel`必装的模块。

`@babel/preset-env`：该模块包含了一组可以将`ES6`语法转换为`ES5`语法的插件，并能够根据`browserslist`配置的目标环境加载不同的插件来编译`ES6`语法。

关于`babel`的更多内容推荐学习这篇博客--[《不容错过的 Babel7 知识》](https://juejin.im/post/5ddff3abe51d4502d56bd143#heading-0)

- .babelrc 文件的配置如下：

```title=".babelrc"
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

- webpak.config.js 配置

```js {10-13} title="webpak.config.js"
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};
```

为了更好的理解`babel-loader`，可以下载我所编写的小[demo](https://github.com/ThinkBucket/webpack-demo/tree/master/loaders/babel-loader)执行一下。demo 打包的结果如下所示：

<Img width="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200416145533.png" />

通过打包结果可以看出，ES6 语法的`babel.js`可以通过`babel`转换成 ES5 语法，同时代码还会被自动压缩在一起。

## css-loader

`css-loader`用于加载解析`.css`文件。

与`css-loader`经常一起使用的还有`style-loader`、`less-loader`和`postcss-loader`，其中`style-loader`可以将样式通过`<style>`标签插入到`<head>`标签中，`less-loader`用来转换`less`为`css`，`postcss-loader`结合`autoprefixer`插件可以为 CSS3 属性自动补齐前缀。

使用`style-loader`后样式会插入到`html`文件中:

<Img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200413223257.png" />

- `loader`安装：

```bash npm2yarn
npm install -D css-loader style-loader less-loader postcss-loader
```

- 使用`css-loader`时，webpak.config.js 配置：

```js {19-47} title="webpak.config.js"
const path = require('path');

module.exports = {
  entry: {
    split: './src/search/index'
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
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [autoprefixer({})]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [autoprefixer({})]
            }
          }
        ]
      }
    ]
  }
};
```

如果项目中还存在`less`文件，还可以在`css-loader`后面加上`less-loader`;

:::caution

需要注意的是，因为 webpack 中 loader 的解析采用了函数式编程中的`compose`，所以 loader 的加载顺序是从右向左。当 loader 的位置放反时，构建会报错。

:::

通过上例可以看出，先`postcss-loader`为匹配的`.less`文件中的 CSS3 属性添加前缀，再用`less-loader`将 Less 代码编译为 CSS 代码，然后再使用 `css-loader` 加载和解析 CSS 代码，最后将其交给 `style-loader` 插入到网页中去。

为了更好的理解与样式相关的`loader`，可以下载我所编写的小[demo](https://github.com/ThinkBucket/webpack-demo/tree/master/loaders/css-loader)执行一下。demo 打包后的结果如下图所示：

<Img width="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200416145040.png" />

通过打包结果可以看出，使用了`style-loader`后，demo 中的`.less`和`.css`文件都会被打包到`.js`文件中，并通过 DOM 操作将它们插入到`.html`的`<head>`标签中。

:::tip

我们知道`CSS`样式分为内联、外联和行内样式，使用`style-loader`打包后样式文件将会内联到`html`文件中，如果想要样式文件外联，可以使用插件[mini-css-extract-plugin](/docs/webpack/1.Basic/plugins#mini-css-extract-plugin)

:::

## file-loader

`file-loader`可以帮助`webpack`打包和解析图片、字体等文件。

- `loader`安装

```bash npm2yarn
npm install -D file-loader
```

- `webpack.config.json`配置

```js {14-35} title="webpak.config.js"
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.(png|jpe?g|gif|svg)$/i, // 匹配常用图片文件类型
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]' // 打包后文件名，‘hash:8’为添加8位哈希值，ext代表文件扩展名
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf|svg)$/, // svg代表svg fonts
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
};
```

为了更好的理解`file-loader`，可以下载我所编写的小[demo](https://github.com/ThinkBucket/webpack-demo/tree/master/loaders/file-loader)执行一下。该 demo 的打包结果如下图所示：

<Img width="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200416145950.png" />

在该 demo 中，我们在`src/images`目录下创建了`logo.png`文件，在`src/font`文件下导入了字体库`LiuJianMaoCao-Regular`。需要注意的是在样式文件中使用外部字体库时，需要用`@font-face`对其进行配置:

```less {3}
@font-face {
  font-family: 'LiuJianMaoCao-Regular';
  src: url('./font/LiuJianMaoCao-Regular.ttf') format('truetype');
}

.search-text {
  font-size: 20px;
  color: #f00;
  font-family: 'LiuJianMaoCao-Regular';
}
```

## url-loader

`url-loader` 功能类似于 `file-loader`，但是在文件大小低于指定的限制时会将资源自动转为`base64`。

- 安装`url-loader`

```bash npm2yarn
npm install -D url-loader file-loader
```

- `webpack.config.js`配置

```js {15-37} title="webpak.config.js"
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              limit: 10240
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/index.html`),
      filename: 'index.html',
      chunks: ['index']
    })
  ]
};
```

为了更好的理解`url-loader`，可以下载我所编写的小[demo](https://github.com/ThinkBucket/webpack-demo/tree/master/loaders/url-loader)执行一下。

在该 demo 中，`src/images`目录下创建的图片`logo.png`的体积小于`10kb`，在`src/font`文件下导入的字体库`LiuJianMaoCao-Regular`的体积大于`10kb`。

执行 demo 的打包过程如下图所示：

<Img width="700" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/url-loader.gif" />

通过打包过程可以看出，图片文件没有以`boundle`的形式输出，查看打包后的`js`文件，可以看到图片被转成了`base64`，如下图所示：

<Img width="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200414133858.png" />

`url-loader`内部的实现也使用了`file-loader`。在 demo 中由于字体库`LiuJianMaoCao-Regular`的体积有`4.7mb`，远远超过了设置 limit 的值，所以打包的时候会使用`file-loader`将文件以`boundle`的形式输出。

:::caution

安装`url-loader`时也必须同时安装`file-loader`模块，但不需要在`webpack.config.js`添加`file-loader`。否则当文件超过设定的`limit`的值时，会提示**'Cannot find module 'file-loader'**。

:::

我们使用`npm uninstall file-loader`卸载`file-loader`模块，然后重新打包后的结果如下所示：

<Img width="700" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/url-loader-error.gif" />

## ts-loader

当项目中使用`ts`开发时，webpack 打包时需要使用`ts-loader`。

- 安装 TypeScript 编译器和`ts-loader`

```bash npm2yarn
npm install -D typescript ts-loader
```

- `webpack.config.js`配置

```js {7-11} title="webpak.config.js"
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/ // 减少被处理的文件
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

为了更好的理解`ts-loader`，可以下载我编写的小[demo](https://github.com/ThinkBucket/webpack-demo/tree/master/loaders/ts-loader)执行一下。打包后的结果如下图所示

<Img width="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200416143400.png" />

## thread-loader

因为基于 `Node.js` 的 `webpack` 是单线程模型，所以 `webpack` 处理任务时只能一件一件的做。当项目中存在大量文件时，打包时间就会比较漫长。使用`thread-loader`可以让 `webpack` 在同一时刻处理多个任务发挥多核 CPU 电脑的功能，提升构建速度。

`thread-loader`使用起来很简单，只需要将其放置到其它的`loader`之前，放置其后的 `loader` 就会在一个单独 worker pool 中运行。对于一个前端项目来说，项目中最多的文件一般为`JS`和`CSS`文件，所以`thread-loader`经常被用在`babel-loader`和`css-loader`前。

- `thread-loader`的安装

```bash npm2yarn
npm install -D thread-loader
```

- webpack.config.js 配置

```js title="webpack.config.js"
module: {
  rules: [
    {
      test: /\.js$/,
      use: ['thread-loader', 'babel-loader']
    }
  ];
}
```

:::caution

当项目较小时，使用`thread-loader`打包可能会对打包速度没有影响，甚至导致打包速度变慢，这是因为它本身的额外开销导致，建议只在极高性能消耗的场景下使用。

:::

Used in TypeScript:

```js title="webpack.config.dev.js"
module: {
  rules: [
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'thread-loader'
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
          }
        }
      ]
    }
  ];
}
```

```js title="webpack.config.prod.js"
module: {
    rules: [
        {
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'thread-loader',
                    options: {
                        // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                        workers: require('os').cpus().length - 1
                    }
                },
                {
                    loader: 'ts-loader',
                    options: {
                        happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                    }
                }
            ]
        }
    ]
},
plugins: [
    new ForkTsCheckerWebpackPlugin({
        typescript: {
            diagnosticOptions: {
                semantic: true,
                syntactic: true
            }
        }
    })
]
```

## 参考链接

- [webpack official document](https://webpack.js.org/loaders/)
- [玩转 webpack，by 程柳锋](https://time.geekbang.org/course/intro/100028901)
- [让你的 Webpack 起飞，by 考拉海购技术中心](https://zhuanlan.zhihu.com/p/42465502)
- [webpack 不可错过的打包优化方法，by 前端工匠](https://mp.weixin.qq.com/s/hN2yTtFLyFBWmOrKF-E8lQ)
