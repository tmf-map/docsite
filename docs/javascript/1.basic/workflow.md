---
title: V8工作流程
sidebar_label: V8工作流程
---

## JS Engine

- Chrome: [V8](https://v8.dev/)
- FireFox: [Spidermonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey)
- Edge: [Chakra](https://github.com/Microsoft/ChakraCore)
- Safari: [JavaScriptCore](https://trac.webkit.org/wiki/JavaScriptCore)

## V8 Engine Workflow

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/jyJKvS.jpg'/>

JS 代码块加载完毕后，会首先进入语法解析阶段。该阶段主要作用是生成 AST 和构建作用域。

从广义上讲，解析阶段主要包括 **词法分析(lexical analysis)** 和 **语法分析(syntax analysis)**。

- **词法分析**：(分词)从代码中读取一组字符并将它们组合成语句(tokens)，它还涉及删除空格字符、注释等。最后，整个代码串将被拆分为一系列语句。
- **语法分析**：(也称为解析器)将在词法分析后获取一个简单的语句列表，并将其转换为树形表示即AST，并检查是否有语法错误。如果出现不正确，则向外抛出一个语法错误（SyntaxError），停止该JS代码的后续执行：

<img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/V5pGiz.jpg" />

## Parsing

### AST

可以去这个网站生成一个AST(Abstract Syntax Tree)试试：https://astexplorer.net/

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Wc8x5N.jpg'/>

### Q: 函数没调用会不会生成AST？

A: 会，AST是对整个代码都会生成，不管有没有调用，通过 https://astexplorer.net/ 也可以看出。下面这段代码，从侧面也可以说明在进行语法分析生成AST。其实V8有用两个`Parser`，`Preparser` 对这些不是迫切需要执行的代码(顶级代码、立即调用函数表达式IIFE)只构建作用域，会跳过AST，但由于 `Ignition` 的引入，现在并没有用到 `Preparser`。

<img width="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/DVCIa0.jpg'/>

## Compiling

这部分内容不重要，但理清楚基本概念，对后面深入学习十分有必要。我们人为地将解释器和编译器都划分在了编译阶段，有些文章用的是“预编译”这个词，虽然都不准确，但是所表达的意思都是相同的。

JS引擎为了提高速度采用即时编译（JIT）技术。执行之前立即将代码快速编译为机器码。通常最初由基线编译器编译，基线编译器可以快速生成非优化的机器代码。编译后的代码在运行时进行分析，并可选择使用更高级的优化编译器动态地重新编译，以实现最佳性能。只有在这种情况下，Ignition是基线编译器，它实际上是一个解释器。它取代了旧的full-codegen。

阅读更多：

- [JS编译器](https://app.yinxiang.com/fx/23ae9ccc-9086-4b93-b8d3-d15d0fcd6c51)
- [WebAssembly](https://app.yinxiang.com/fx/67a2ad7e-3d41-4814-93fd-b4ee30a32407)
