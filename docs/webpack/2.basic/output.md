---
title: output 输出
---

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
