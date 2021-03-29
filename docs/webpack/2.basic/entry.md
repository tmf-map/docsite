---
title: entry 输入
---

`entry` ⽤用来指定 Webpack 的打包入⼝，入⼝文件只能是`.js`文件。对于非代码部分比如图片、字体等也会通过依赖加入到依赖图中。

## context 基础目录

Webpack 寻找相对路径的文件时会以 context 字段为根目录，默认为执行启动 Webpack 时所在当前工作目录。

context 必须是**绝对路径**字符串。

```js
module.exports = {
  context: path.resolve(__dirname, 'app')
};
```

entry 路径及其依赖的模块的路径采用相对于 context 的路径来描述，context 会影响到这些相对路径所指向的真实文件。

## entry 用法

- 单入口文件： entry 是一个字符串或字符串数组

```js
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

```js
module.exports = {
  entry: ['./app/entry', './app/index']
};
```

如果是 Array 类型，则搭配 `output.library` 配置项使用时，只有数组里的最后一个入口文件的模块会被导出。

- 多入口文件： entry 是一个字符串对象

```js
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  }
};
```

如果是 Object 类型，则 entry 为可扩展的配置。可重用并且可以与其他配置组合使用。这是一种流行的技术，用于将关注点从环境（environment）、构建目标（build target）、运行时（runtime）中分离。然后使用专门的工具（如 [webpack-merge](https://github.com/survivejs/webpack-merge)）将它们合并。

## chunk

如果传入一个字符串或字符串数组，chunk 会被命名为 `main`。如果传入一个对象，则每个键（key）为 **chunk** 的名称，该值描述了 **chunk** 的入口起点。

- 如果 entry 是一个 string 或 array，就只会声称一个 Chunk，这时 Chunk 的名称是 `main`
- 如果 entry 是一个 object，就可能会出现多个 Chunk，这时 Chunk 的名称是 object 键值中键的名称

## 动态入口

```js
// 同步函数
module.exports = {
  // ...
  entry: () => './demo'
};

// 异步函数
module.exports = {
  entry: () =>
    new Promise(resolve => {
      resolve({
        a: './page/a',
        b: './page/b'
      });
    })
};
```

## 常见场景

- [分离应用程序和第三方库入口](https://webpack.docschina.org/concepts/entry-points#%E5%88%86%E7%A6%BB-%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F-app-%E5%92%8C-%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%93-vendor-%E5%85%A5%E5%8F%A3)
- [多页面应用程序](https://webpack.docschina.org/concepts/entry-points#%E5%A4%9A%E9%A1%B5%E9%9D%A2%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F)

## 参考资料

1. [Webpack Guidebook: entry 输入, by tsejx](https://tsejx.github.io/webpack-guidebook/basic-summary/core-concepts/entry)
