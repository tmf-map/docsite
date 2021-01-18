---
title: 动态import()
---

## 为什么需要 import()

动态`import()`是为了解决因为 ES6 模块静态加载（编译时加载）而无法执行条件语句选择执行`import`、拼接字符串等操作。

ES6 执行下列操作会出错：

```js
if(some condition) {
  import a from './a';
}else {
  import b from './b';
}

// or
import a from (str + 'b');
```

`import()` 允许在运行时动态地引入 ES6 模块。动态 `import()` 为我们提供了以异步方式使用 ES 模块的额外功能。 根据我们的需求动态或有条件地加载它们，这使我们能够更快，更好地创建更多优势应用程序

## import()的特点：

- 动态的`import()` 提供一个基于 `Promise` 的 `API`
- 动态的`import()` 可以在脚本的任何地方使用
- `import()`接受字符串文字，你可以根据你的需要构造说明符

因为`import()`是基于`Promise`的`API，所以我们可以使用`Promise.all()`和`async/await`动态加载模块。

```js
Promise.all([import('./a.js'), import('./b.js'), import('./c.js')]).then(
  ([a, {default: b}, {c}]) => {
    console.log('a.js is loaded dynamically');
    console.log('b.js is loaded dynamically');
    console.log('c.js is loaded dynamically');
  }
);
```

```js
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] = await Promise.all([
    import('./module1.js'),
    import('./module2.js'),
    import('./module3.js')
  ]);
}
```

## 参考资料

1. https://zhuanlan.zhihu.com/p/41231046
