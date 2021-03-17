---
title: 概览
---

### 工具类型

如果把市面的工具按类型分可以分为这三类：

#### 基于任务运行的工具

例如：[Grunt](https://www.gruntjs.net/)、[Gulp](https://www.gulpjs.com.cn/)

它们会自动执行指定的任务，就像流水线，把资源放上去然后通过不同插件进行加工，它们包含活跃的社区，丰富的插件，能方便地打造各种工作流。

#### 基于模块化打包的工具

例如：[Browserify](http://browserify.org/)、[Webpack](https://www.webpackjs.com/)、[Rollup](https://www.rollupjs.com/guide/zh)

有过 Node.js 开发经历的应该对模块很熟悉，需要引用组件直接一个 `require` 就 OK，这类工具就是这个模式，还可以实现按需加载、异步加载模块。

#### 整合型工具

例如：Teoman、FIS、jdf、Athena、cooking、weflow

使用了很多技术栈实现的脚手架工具，好处是即开即用，缺点就是它们约束了技术选型，并且学习成本相对较高。

### 主流工具对比分析

#### NPM Script

- NodeJS 附带的包管理器（内置）
- 功能简单，不能方便地管理多个任务之间的依赖
- 配置文件：`package.json`
- 调用 Shell 脚本运行脚本命令

#### Grunt

- 灵活，只负责执行已定义任务
- 优点：大量可复用插件封装了常见任务，也能管理任务间依赖关系
- 缺点：集成度不高，很多需要配置后使用，无法做到开箱即用
- 配置文件：`Gruntfile.js`

#### Gulp

传送门：[Glup 中文网](https://www.gulpjs.com.cn/)

与 Grunt 类似，集成度不高，需配置使用，可堪称 Grunt 加强版

Glup 就像是一个产品的 **流水线**，整个产品从无到有，都要受流水线的控制，在流水线上我们可以对产品进行管理。

#### Rollup

- 能针对 ES6 源码去除已被定义但未被使用代码 TreeShaking => ScopeHoisting 减少输出文件体积 提升运行性能
- 用于打包 JavaScript 库时比 Webpack 更有优势

#### Parcel

#### Webpack

能将许多松散的模块按照依赖和规则打包成符合生产环境的前端资源。

还可以将按需加载的模块进行代码分割，等到实际需要的时候再异步加载。

- 专注于处理模块化的项目，能做到开箱即用、一步到位
- 可通过 Plugin 扩展，完整好用又不失灵活
- 使用场景不局限于 Web 开发
- 社区庞大成熟

### 构建工具对比

|  | Glup | Webpack |
| :-: | :-: | :-: |
| 侧重点 | 侧重于前端开发的**整个过程**的控制管理 | 更侧重于将开发中的所有资源**转译打包** |
| 管理方法 | **Task 配置**的路径下所有文件 | 根据模块的**依赖关系**静态分析（入口文件决定） |

拓展资料：[Gulp 与 Webpack 深度对比](https://www.cnblogs.com/RuMengkai/p/6667321.html)

Webpack 是一个模块打包器。Webpack 单独与一些的 Task Runner 配合工作。然而，由于社区开发的 Webpack 插件，Bundler 和 Task Runner 之间的界限变得模糊。有时，这些插件用于执行通常在 Webpack 之外完成的任务，例如清理构建目录或部署构建代码。

## 参考资料

1. [Webpack Guidebook: 构建工具, by tsejx](https://tsejx.github.io/webpack-guidebook/basic-summary/basic-concepts/build-tool)
