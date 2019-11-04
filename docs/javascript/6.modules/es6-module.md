---
title: ES6 Module
sidebar_label: ES6 Module
---
## 概述

> 在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

ES6模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

## export命令

### export变量

将profile文件看作模块导出，其中的变量
```js
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```

等价于：
```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```

注意： 无论导出的是一个变量，还是多个变量，`{}`是必须的

错误写法：

```js
var firstName = 'Michael';
export firstName;
```

### export函数

导出函数和类的语法与导出变量的一致

```js
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f}; //{}是必须的
```

### export别名

`export`导出的变量和函数可以被重命名

```js
function v1() { ... }
var n = 1;

export {
  v1 as streamV1,
  v1 as streamLatestVersion
  n as m
};
```

**`export`命令可以出现在模块的任何位置，但必须处于模块顶层，处于块级作用域时会报错**

## import命令

和上面`export`导出模块相对应，`import`用来导入模块

使用`import`命令加载profile文件

```js
// main.js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```
### 注意事项：
1. **`import`命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同**

2. `import`命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

    ```js
    import {a} from './xxx.js'

    a = {}; // Syntax Error : 'a' is read-only;

    ```
3. `import`后面的`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript引擎该模块的位置。
4. `import`命令具有提升效果，在代码编译时，`import`会提升到整个模块的头部，首先执行。
    ```js
    foo();

    import { foo } from 'my_module';
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
    上面三种写法都会报错，因为它们用到了表达式、变量和if结构。在静态分析阶段，这些语法都是没法得到值的。
6. 相同模块，多次引用只会加载一次
    ```js
    import 'lodash';
    import 'lodash';
    //上面代码加载了两次lodash，但是只会执行一次。

    import { foo } from 'my_module';
    import { bar } from 'my_module';
    // 等同于
    import { foo, bar } from 'my_module';
    ```
### import 别名

如果想为输入的变量重新取一个名字，`import`命令要使用as关键字，将输入的变量重命名。

```js
import { lastName as surname } from './profile.js';
```
导入的`lastName`被重命名为`surname`

### 模块整体加载
> 除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面

```js
// main.js

import { area, circumference } from './circle';

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
上面写法是逐一指定要加载的方法，整体加载的写法如下。

import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

## export default 命令 

>从前面的例子可以看出，使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

>为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。

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
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入
// 等同于
// import { default as crc32 } from 'crc32';

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入

```
第二组是不使用`export default`时，对应的`import`语句需要使用大括号。

因为`export default`命令其实只是输出一个叫做`default`的变量，所以它后面不能跟变量声明语句。
```js
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```

上面代码中，`export default a`的含义是将变量`a`的值赋给变量`default`。所以，最后一种写法会报错。

如果想在一条`import`语句中，同时输入默认方法和其他接口，可以写成下面这样。

```js
import _, { each, forEach } from 'lodash';
```
## ES6 Module与CommonJS差异

### 整体加载VS静态加载
`ES6` 模块的设计思想是尽量的静态化，使得**编译时就能确定模块的依赖关系**，以及输入和输出的变量。`CommonJS` 和 `AMD` 模块，**都只能在运行时确定这些东西**。比如，`CommonJS` 模块就是对象，输入时必须查找对象属性。
```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面代码的实质是`整体加载fs`模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

`ES6` 模块不是对象，而是通过`export`命令显式指定输出的代码，再通过import命令输入。

```js

// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面代码的实质是从`fs`模块加载 3 个方法，其他方法不加载。**这种加载称为“编译时加载”或者静态加载**，即 `ES6` 可以在编译时就完成模块加载，效率要比 `CommonJS` 模块的加载方式高。当然，这也导致了没法引用 `ES6` 模块本身，因为它不是对象。

由于 `ES6` 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 `JavaScript` 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

除了静态加载带来的各种好处，`ES6` 模块还有以下好处。

- 不再需要UMD模块格式了，将来服务器和浏览器都会支持 `ES6` 模块格式。目前，通过各种工具库，其实已经做到了这一点。
- 将来浏览器新 API 就能用模块格式提供，不再必须做成全局变量或者`navigator`对象的属性。
- 不再需要对象作为命名空间（比如`Math`对象），未来这些功能可以通过模块提供。

### 拷贝VS引用

`CommonJS` 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

`ES6` 模块的运行机制与`CommonJS` 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。原始值变了，`import`加载的值也会跟着变。因此，`ES6` 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

`ES6` 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。
```js
// lib.js
export let obj = {};

// a.js
import { obj } from './lib';

obj.prop = 123; // OK
console.log('a.js', obj)
obj = {}; // TypeError

// b.js
import { obj } from './lib';

console.log('b.js', obj)

// {props: 123}
// {props: 123}
```

### 严格模式

`ES6` 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。尤其需要注意`this`的限制。`ES6` 模块之中，顶层的`this`指向`undefined`，即不应该在顶层代码使用`this`。

### 循环依赖

a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。

```js
// a.js
var b = require('b');

// b.js
var a = require('a');
```

对于`CommonJS`而言循环引用的时候会去执行引用的模块，并输出引用模块已经执行部分`exports`的值，还未执行的部分不会输出。

对于`ES6`的`import`而言，执行到`import`的时候，它不会去执行引入模块的代码，而只是返回模块的引用，只有在真正调用引用模块中的值的时候才会执行。也就是说`ES6`的本身不会关注代码是否在循环引用，这需要编写代码的人去保证在真正取值的时候能够取道值，不会出错。

## 参考链接
《ECMAScript 6 入门》：http://es6.ruanyifeng.com/#docs/module

JavaScript 模块的循环加载：http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html

