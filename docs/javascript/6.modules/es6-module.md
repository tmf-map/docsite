---
title: ES6 Module
sidebar_label: ES6 Module
---

import Img from '../../../src/components/Img'; import Hint from '../../../src/components/Hint';

## 概述

> 在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

ES6 模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

## export 命令

### export 变量

将 profile 文件看作模块导出，其中的变量

```js
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
```

等价于：

```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';

export {firstName, lastName};
```

注意： 无论导出的是一个变量，还是多个变量，`{}`是必须的

错误写法：

```js
var firstName = 'Michael';
export firstName;
```

### export 函数

导出函数和类的语法与导出变量的一致

```js
// 正确
export function f() {}

// 正确
function f() {}
export {f}; //{}是必须的
```

### export 别名

`export`导出的变量和函数可以被重命名

```js
function v1() { ... }
var n = 1;

export {
  v1 as streamV1,
  n as m
};
```

**`export`命令可以出现在模块的任何位置，但必须处于模块顶层，处于块级作用域时会报错**

## import 命令

和上面`export`导出模块相对应，`import`用来导入模块

使用`import`命令加载 profile 文件

```js
// main.js
import {firstName, lastName} from './profile.js';
```

### 注意事项：

1. **`import`命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同**

2. `import`命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

   ```js
   import {a} from './xxx.js';

   a = {}; // Syntax Error : 'a' is read-only;
   ```

3. `import`后面的`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js 后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

4. `import`命令具有提升效果，在代码编译时，`import`会提升到整个模块的头部，首先执行。

   ```js
   foo();

   import {foo} from 'my_module';
   ```

   上面的代码不会报错，因为`import`的执行早于`foo`的调用。这种行为的本质是，`import`命令是编译阶段执行的，在代码运行之前。

5. 由于`import`是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

   ```js
   // 报错
   import { 'f' + 'oo' } from 'my_module';

   // 报错
   let module = 'my_module';
   import { foo } from module;

   // 报错
   if (x === 1) {
     import { foo } from 'module1';
   } else {
     import { foo } from 'module2';
   }
   ```

   上面三种写法都会报错，因为它们用到了表达式、变量和 if 结构。在静态分析阶段，这些语法都是没法得到值的。

6. 相同模块，多次引用只会加载一次

   ```js
   import 'lodash';
   import 'lodash';
   //上面代码加载了两次lodash，但是只会执行一次。

   import {foo} from 'my_module';
   import {bar} from 'my_module';
   // 等同于
   import {foo, bar} from 'my_module';
   ```

### import 别名

如果想为输入的变量重新取一个名字，`import`命令要使用 as 关键字，将输入的变量重命名。

```js
import {lastName as surname} from './profile.js';
```

导入的`lastName`被重命名为`surname`

### 模块整体加载

> 除了指定加载某个输出值，还可以使用整体加载，即用星号（\*）指定一个对象，所有输出值都加载在这个对象上面

```js
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

## export default 命令

> 从前面的例子可以看出，使用 import 命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

> 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到 export default 命令，为模块指定默认输出。

`export default`命令有下面两种写法，两种是等效的。

```js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;
```

对比默认输出和正常输出:

```js
// 默认输出
export default function crc32() {
  // 输出
  // ...
}

import crc32 from 'crc32'; // 输入
// 等同于
// import { default as crc32 } from 'crc32';

// 正常输出
export function crc32() {
  // 输出
  // ...
}

import {crc32} from 'crc32'; // 输入
```

如果想在一条`import`语句中，同时输入默认方法和其他接口，可以写成下面这样。

```js
import _, {each, forEach} from 'lodash';
```

## ES6 Module 与 CommonJS 差异

> 1. **CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用**
> 2. **全部加载和引用加载**
> 3. **ES6 模块的运行环境是严格模式**
> 4. **循环依赖**

### 拷贝 VS 引用

要想理解**CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用**需要了解 JS 中的 getter。

- **例 1：**

```js
function counter() {
  var count = 0;

  function addCount() {
    count++;
  }
  return {
    count,
    addCount,
  };
}
var c = counter();
console.log(c.count);

console.log('--- count是值拷贝 ---');

c.addCount();
console.log(c.count);
```

- **例 2：**

```js
function counter() {
  var count = 0;

  function addCount() {
    count++;
  }
  return {
    get count() {
      return count;
    },
    addCount,
  };
}

var c = counter();
console.log(c.count);

console.log('--- count值是值引用 ---');

c.addCount();
console.log(c.count);
```

通过上面的两个例子可以看出，例 1 中输出的是值的拷贝（commonJS 模块），而例 2 中使用`getter`了，当外部获取`c.count`时，会去动态调取函数中最新的值（ES6 模块）。

如果上面的例子明白的话，那么**CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用**这句话也不难理解。在 commonJS 模块就是采用`{key: value}`的形式将导出对象拷贝到引用该模块的文件。而 ES6 模块中则是为每个要导出的变量都设置了`getter`，在引用该模块的文件内部都是执行这些变量所对应的`getter`函数，然后从`import`的模块中动态获取变量的值。

### 整体加载 VS 部分加载

<Img width="600" legend="图：commonJS 模块导出规范" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/XrOhPa.png" />

通过上面的分析并结合上图，我们知道 CommonJS 模块导入的是值的拷贝，`require`语句执行完后便于`require`的模块无关了。所以在`require`语句未执行时，需要导入的值还没有拷贝过来，文件是不知道具体要导入的是什么。

<Img width="780" legend="图：ES6 模块导出规范" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/CKPI9i.png" />

而 ES6 模块输出的并不是对输出对象的拷贝，而是用 getter 函数对每个`export`的变量进行了封装。模块编译`import`的时候，会静态的分析要导入的变量，将`import {}`里的变量与 ES6 导出对象中变量对应的 getter`链接`起来。那些`{}`中没有的变量将被省略。这块的思路和对象的解构一个道理。当文件中用到`{}`的变量时，再调用`getter`函数，读取导出变量的值。

### ES6 模块的运行环境是严格模式

这个差异很好理解，无论是通过 babel 还是 webpack 中编译的结果都可以看出，ES6 模块的运行环境是严格模式。

### 循环依赖

**CommonJS 规范：**

对于 CommonJS 而言，循环引用的时候会去执行引用的模块，并输出引用模块已经执行部分`exports`的值，还未执行的部分不会输出。

为了弄清楚`CommonJS`在出现循环依赖时的表现，我们可以看一个官网的例子：

a.js:

```js
console.log('a starting');
exports.done = false; // 位置1
const b = require('./b.js'); //位置2
console.log('in a, b.done = %j', b.done);
exports.done = true;
console.log('a done');
```

当 a.js 中的代码在执行时，a 执行到位置 2 时导入了 b 模块，因为 CommonJS 是同步加载，所以此时会暂停 a 中代码的执行去执行模块 b。

b.js:

```js
console.log('b starting');
exports.done = false;
const a = require('./a.js'); //位置3
console.log('in b, a.done = %j', a.done);
exports.done = true;
console.log('b done');
```

当 b 模块执行的时候，执行到位置 3 的时候需要去执行 a 模块获取`exports`的值，因为此时 a 模块已经处于执行状态，且在位置 1 处输出了`exports.done = false;`，所以此时在位置 3 处，a 的值将为`{ done: false }`。然后继续向下执行，等 b 模块代码执行完后，a 模块将继续从位置 1 开始向下执行。

main.js:

```js
console.log('main starting');
const a = require('./a.js');
const b = require('./b.js'); //位置4
console.log('in main, a.done = %j, b.done = %j', a.done, b.done);
```

为了验证上面的过程，可以执行`node main.js`进行验证，输出结果如下：

```js
$ node main.js
main starting
a starting
b starting
in b, a.done = false
b done
in a, b.done = true
a done
in main, a.done = true, b.done = true
```

通过上面的输出除了可以验证我们的结论以外，我们还可以发现 main.js 中位置 3 对应的 b 模块没有被二次加载。这是因为在模块 a 加载的时候已经加载过模块 b，所以在位置 4 处不会被重复的加载。

**ES6 规范：**

由上可知，CommonJS 模块的导入是需要执行导入模块的。但是循环引用可能会存在拿不到预期变量，从而导致出错。就像下面这个例子：

```js
//------ a.js ------
var b = require('b'); //位置1
function foo() {
  b.bar();
}
exports.foo = foo;

//------ b.js ------
var a = require('a'); //位置2
function bar() {
  if (Math.random()) {
    a.foo(); // 位置3
  }
}
exports.bar = bar;
```

当 a 模块执行到位置 1 的时候，会去加载 b 模块。当 b 模块执行到位置 2 的时候，去执行 a 模块，结果什么也不会拿到。此时当执行到位置 3 时会因为不存在`a.foo()`报错。

与之相比，因为 ES6 模块`import`不需要执行所导入的模块，而是与之建立了引用关系。所以不存在`import`时执行整个导入的模块，这也避免了循环引用时因为拿不到所导入的值而出错。就像下面这个例子：

```js
//------ a.js ------
import {bar} from 'b'; // 位置1
export function foo() {
  bar(); // 位置2
}

//------ b.js ------
import {foo} from 'a'; // 位置3
export function bar() {
  if (Math.random()) {
    foo(); // 位置4
  }
}
```

执行 a 模块到位置 1 时，导入的变量`bar`和 b 模块的`bar()`函数已经建立了引用关系，所以执行到位置 2 的时候是会动态执行 b 模块中的`bar()`函数，当执行到位置 4 的时候，会动态执行 a 模块中的`foo()`函数，此时形成一个循环引用关系。

虽然上面的例子是可以执行的，但是将上述代码直接执行会因为两个模块之间循环引用次数过多直接爆栈，这和下面的这个递归函数的例子的情况很像：

```js
function a() {
  a();
}
a(); // RangeError: Maximum call stack size exceeded
```

虽然 ES6 中模块即使存在循环引用也有可能正常的运行，但是运行的结果可能和自己的预期值不符，比如下面这个例子：

```js
// even.js
import {odd} from './odd';
export var counter = 0;
export function even(n) {
  counter++;
  return n == 0 || odd(n - 1);
}

// odd.js
import {even} from './even';
export function odd(n) {
  return n != 0 && even(n - 1);
}

// index.js
import * as m from './even.js';
m.even(10);
m.counter; // 6

// m.even(1000000);
```

上述代码在 n 为 10 的时候`m.counter`返回的值是 6，虽然运行过程没有报错，但输入值和输出值之间的关联并不可知。而当 n 的值为一个特别大的数时，系统会直接爆栈。

<Hint type="best">通过上面的分析，我们可以看出无论是在 CommonJS 规范中还是在 ES6 规范中，循环引用的情况都是非常难以控制的。因此在模块的定义和使用的过程中，都应该尽量的避免出现循环引用的情况。</Hint>

## 相关拓展

[exports、export 和 export default 的关系](/blog/2019/12/05/exports-vs-export)

## 参考链接

[ECMAScript 6 入门 -- 阮一峰](http://es6.ruanyifeng.com/#docs/module)

[JavaScript 模块的循环加载 -- 阮一峰](http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html)

[Exploring ES6 -- Dr. Axel Rauschmayer](https://exploringjs.com/es6/)
