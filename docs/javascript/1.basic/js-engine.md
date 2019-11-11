---
title: JS 引擎
sidebar_label: JS 引擎
---

import Hint from '../../../src/components/Hint'
import Img from '../../../src/components/Img'

## JS Engine

- Chrome: [V8](https://v8.dev/)
- FireFox: [Spidermonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey)
- Edge: [Chakra](https://github.com/Microsoft/ChakraCore)
- Safari: [JavaScriptCore](https://trac.webkit.org/wiki/JavaScriptCore)

## V8 Engine Workflow

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/jyJKvS.jpg'/>

JS 代码块加载完毕后，会首先进入语法 Parser 阶段。该阶段主要作用是生成 AST 和构建作用域。

从广义上讲，Parser 阶段主要包括 **词法分析(lexical analysis)** 和 **语法分析(syntax analysis)**。

- **词法分析**：(分词)从代码中读取一组字符并将它们组合成语句(tokens)，它还涉及删除空格字符、注释等。最后，整个代码串将被拆分为一系列语句。
- **语法分析**：(也称为解析器)将在词法分析后获取一个简单的语句列表，并将其转换为树形表示即AST，并检查是否有语法错误。如果出现不正确，则向外抛出一个语法错误（SyntaxError），停止该JS代码的后续执行：

<img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/V5pGiz.jpg" />

然后，AST(抽象语法树) 基于 Parser 的分类构造树状结构。

随后将 AST 提供给 Interpreter 生成 ByteCode。ByteCode 不是最底层的代码，但可以被执行。在此阶段，浏览器借助 V8 引擎执行 ByteCode 进行工作，因此用户无需等待。

同时，Profiler 将查找可以被优化的代码，然后将它们传递给 Compiler。Compiler 生成优化代码的同时，浏览器暂时用 ByteCode 执行操作。并且，一旦 Compiler 生成了优化代码，优化代码则将完全替换掉临时的 ByteCode。

<Img width="600" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/kvO4JB.jpg'/>

## Parser

### AST

可以去这个网站生成一个AST(Abstract Syntax Tree)试试：https://astexplorer.net/

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Wc8x5N.jpg'/>

**Q**: 函数没调用会不会生成AST？

**A**: 会，AST是对整个代码都会生成，不管有没有调用，通过 https://astexplorer.net/ 也可以看出。下面这段代码，从侧面也可以说明在进行语法分析生成AST。其实V8有用两个`Parser`，`Preparser` 对这些不是迫切需要执行的代码(顶级代码、立即调用函数表达式IIFE)只构建作用域，会跳过AST，但由于 `Ignition` 的引入，现在并没有用到 `Preparser`。

<img width="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/DVCIa0.jpg'/>

## Compiler

这部分内容不重要，但理清楚基本概念，对后面深入学习十分有必要。我们人为地将解释器和编译器都划分在了编译阶段，有些文章用的是“预编译”这个词，虽然都不准确，但是所表达的意思都是相同的。

JS引擎为了提高速度采用即时编译（JIT）技术。执行之前立即将代码快速编译为机器码。通常最初由基线编译器编译，基线编译器可以快速生成非优化的机器代码。编译后的代码在运行时进行分析，并可选择使用更高级的优化编译器动态地重新编译，以实现最佳性能。只有在这种情况下，Ignition是基线编译器，它实际上是一个解释器。它取代了旧的full-codegen。

### Interpreter 和 Compiler 的优缺点

Interpreter 的优点是无需等待编译即可立即执行代码。这对在浏览器中运行 JS 提供了极大的便利，因为所有用户都不想浪费时间在等待代码编译这件事上。但是，当有大量的 JS 代码需要执行时会运行地比较慢。

```js
function add(a, b) {
    return a+b;
}
for (let i = 0; i < 1000; i++) {
    add(1 + 1);
}
```

- **Interpreter** 接收上面的代码后，它将逐行读取并立即执行代码，直到循环结束。 它的工作仅仅是实时地将代码转换为我们的计算机可以理解的内容。
- 如果这段代码接受者是 **Compiler**，它会先完整地读取整个程序，对我们要执行的代码进行分析，并生成电脑可以读懂的机器语言。过程如同获取 X（我们的JS文件）并生成 Y（机器语言）一样。如果我们使用 Interpreter 执行 Y，则会获得与执行 X 相同的结果。

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/y0T9vQ.jpg'/>

从上图中可以看出，ByteCode 只是中间码，计算机仍需要对其进行翻译才能执行。 但是 Interpreter 和 Compiler 都将源代码转换为机器语言，它们唯一的区别在于转换的过程不尽相同。

- **Interpreter** 逐行将源代码转换为等效的机器代码。
- **Compiler** 在一开始就将所有源代码转换为机器代码。

再看上面代码，执行了1000次函数调用。函数 add 被调用了1000次，但他的输出保持不变。但是 Interpreter 还是逐行执行，会显得比较慢。

在同样的情况下，Compiler 可以通过用2代替循环（因为 add 函数每次都是执行1 + 1）来进行一些优化。Compiler 最终给出的优化代码可以在更短的时间内执行完成。

<Hint type="tip">Interpreter 可以立即开始执行代码，但不会进行优化。Compiler 虽然需要花费一些时间来编译代码，但是会生成对执行时更优的代码。</Hint>

### JIT

考虑到编译器和解释器的优缺点，如果我们同时利用两者的优点，该怎么办？这就是 **JIT(Just In Time) Compiler** 的用武之地。它是 Interpreter 和 Compiler 的结合，现在大多数浏览器都在更快，更高效地实现此功能。同时 V8 引擎也使用此功能。

通过这种方式，我们可以充分利用 Interpreter 和 Compiler 的优点。Interpreter 执行代码的同时，Profiler 寻找可以被优化的代码，Compiler 则创建优化的代码。然后，将 ByteCode 码替换为优化后的较为底层的代码，例如机器代码。这仅意味着性能将在逐渐提高，同时不会有阻塞执行的时间。

## 参考资料

1. [JS编译器](https://app.yinxiang.com/fx/23ae9ccc-9086-4b93-b8d3-d15d0fcd6c51)
2. [WebAssembly](https://app.yinxiang.com/fx/67a2ad7e-3d41-4814-93fd-b4ee30a32407)
3. [JavaScript: Under the Hood, By Mano lingam](https://blog.bitsrc.io/javascript-under-the-hood-632ccae06b27)
4. [What is the Difference Between Machine Code and Bytecode](https://pediaa.com/what-is-the-difference-between-machine-code-and-bytecode/)
