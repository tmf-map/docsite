---
title: 组合配置
---

## 管理配置的方法

你可以通过以下方式管理 Webpack 配置：

- 对于每一个环境都使用多个环境来组合配置，通过模块导入共享相同的配置，并通过 `--config` 参数将 Webpack 指向特定的环境
- 将配置打包成库，然后使用该库。例如：[hjs-webpack](https://www.npmjs.com/package/hjs-webpack)、[Neutrino](https://neutrino.js.org/)、[webpack-blocks](https://www.npmjs.com/package/webpack-blocks)
- 将配置转换成工具。例如：[create-raect-app](https://www.npmjs.com/package/create-react-app)、[kyt](https://www.npmjs.com/package/kyt)、[nwb](https://www.npmjs.com/package/nwb)
- 在单个文件中的维护所有的配置，并在其内部进行分支，使用传入 `--env` 参数来确定分支走向

可以组合这些方法以创建更高级别的配置，然后由更小的部分组成。然后可以将这些部分添加到库中，然后通过 npm 使用它，从而可以在多个项目中使用相同的配置。

## 合并组合配置

如果配置文件被分成不同的部分，则必须以某种方式再次组合它们。通常这意味着合并对象和数组。为了解决 Object.assign 和 Array.concat 存在的问题，我们可以使用 [webpack-merge](https://www.npmjs.org/package/webpack-merge)。

`webpack-merge` 做了两件事：拼接数组并合并对象，而不是简单的覆盖它们。以下示例详细显示了这种特性：

```js
const merge = require('webpack-merge');

const result = merge({a: [1], b: 5, c: 20}, {a: [2], b: 10, c: 421});

console.log(result);
// { a: [1, 2], b: 10, c: 20, d: 421 }
```

`webpack-merge` 提供了许多可控的策略，使你能够控制每个字段的行为。它们允许你对于特定的字段进行追加，添加或替换内容。

> 在组合修改 Webpack 配置的时候，[webpack-chain](https://www.npmjs.com/package/webpack-chain) 提供了一个清晰的 API 简化这一过程。

## 按环境拆分配置

我们把 Webpack 配置分为两个文件：`webpack.base.js` 和 `webpack.[env].js`。前者包含通用型的配置，后者包含一些特殊配置，这样我们可以更方便的管理我们的配置文件。如果你按环境拆分配置，最终可能会得到如下文件结构：

```bash
.
└── webpack
    ├── webpack.base.js
    ├── webpack.development.js
    └── webpack.production.js
```

在这种情况下，你将通过 Webpack CLI `--config` 参数和 `webpack.[env].js` 里的 `module.exports = merge(base, config);` 来获得最终的配置环境。

## 参考资料

1. [Webpack Guidebook: 组合配置, by tsejx](https://tsejx.github.io/webpack-guidebook/best-practice/practical-application/composing-webpack-configuration)
