---
title: entry 输入
---

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
