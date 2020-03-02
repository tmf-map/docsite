---
title: 编译选项
sidebar_label: 编译选项
---

import Img from '../../../src/components/Img'; import Hint from '../../../src/components/Hint';

## compilerOptions

`compilerOptions`（编译选项）是`tsconfig.json`文件中的重要组成部分，通过配置`compilerOptions`中的属性可以实现项目的定制化编译。当`tsconfig.json`文件中不包含`compilerOptions`对象时，编译器编译时会使用默认值。

本文将`compilerOptions`中的属性划分为以下四类进行讲解：

- [Basic Options](/docs/typescript/2.config/compiler-options#basic-options)
- [Strict Type-Checking Options](/docs/typescript/2.config/compiler-options#strict-type-checking-options)
- [Additional Checks](/docs/typescript/2.config/compiler-options#additional-checks)
- [Module Resolution Options](/docs/typescript/2.config/compiler-options#module-resolution-options)

## Basic Options

### incremental

`incremental`**增量编译**，默认值为`true`，作用是**加快编译速度**。

当该配置为 `true`时，会保存 `ts` 最后一次编译的信息，信息保存在根目录下的 `.tsbuildinfo` 文件中。下一次编译时，编译器会根据 `.tsbuildinfo` 文件中的信息判断出编译的最小代价。

与`incremental`相关的字段为`tsBuildInfoFile`，通过该字段可以指定编译信息保存在自定义的文件。

```js
{
    "compilerOptions": {
        "incremental": true, /* Enable incremental compilation */
        "tsBuildInfoFile": "./buildcache/front-end" /* Specify file to store incremental compilation information */
    }
}

```

### target

`target`**编译后目标语言的版本**，默认值为`ES3`（不区分大小写）。除了设置为`ES3`外，还可以设置为`ES5`, `ES2015`,......, `ES2020`, or `ESNEXT`。其中`ESNEXT`总是指向最新的`js`版本，随着版本更新的变化而变化。但是通常我们都将其设置为`ES5`。

```js
{
    "compilerOptions": {
        "target": "es5"
    }
}
```

### module

`module`是指生成代码的模块标准，当`target`的值为`es6`时，`module`的默认值为`es6`，否则默认为`commonjs`。其中`es6`是`js`模块化规范，`commonjs`是`node.js`的模块化规范。除了默认的这两个之外，它的值还可以是 'amd', 'umd'等。关于模块化的内容推荐学习 [javaScript：模块机制](/docs/javascript/1.basic/js-engine)。

下面我们通过一个`ts`文件，列举了不同`module`值编译后的结果：

`ts`文件代码（ES6 规范）:

```js
const sum = (a: number, b: number) => a + b;
export default sum;
```

module: es6

```js
const sum = (a, b) => a + b;
export default sum;
```

module: commonjs

```js
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
const sum = (a, b) => a + b;
exports.default = sum;
```

module: umd

```js
(function(factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === 'function' && define.amd) {
    define(['require', 'exports'], factory);
  }
})(function(require, exports) {
  'use strict';
  Object.defineProperty(exports, '__esModule', {value: true});
  const sum = (a, b) => a + b;
  exports.default = sum;
});
```

`amd`不经常使用，但可以结合`outFile`字段，将多个相互依赖的文件生成一个文件。

```js
{
    "compilerOptions": {
         "module": "amd",
         "outFile": "./app.js"
    }
}
```

当执行`tsc`命令时，会将本目录下的文件一起整合到`./app.js`中。

### lib

`lib`是指`TS`编译需要引用的库。当`target` 设置为较低版本`JS`，却在代码中使用更高版本的`API`时，代码编译会出错。

例如 index.ts 的内容为：

```js
let myname: string | undefined = ['robbie', 'peter'].find(
  item => item === 'robbie'
);
```

使用`tsc index.js --target es5`编译时会编译失败。

```
error TS2339: Property 'find' does not exist on type 'string[]'.
```

此时如果使用`tsc index.js --target es5 --lib es6`运行，代码将编译成功。 :::note

原因：虽然`TS`是`JS`的超集，但是仅仅是相对于`JS`的语法来说。对于`JS`各类型的`API`需要引用类库（lib）来支持。所以当代码中使用了`JS`较高版本的`API`时，最好在`lib`字段上添加相应版本。

::: 建议配置：

```js
{
   "compilerOptions": {
        "target": "es5",
        "lib": ["dom","dom.iterable","esnext"],
   }
}
```

### outDir

`outDir`表示编译后的输出目录。

```
"outDir": './dist'
```

当将`outDir`设置为`./dist`后，编译后的文件将输出到`./dist`目录下。

### rootDir

`rootDir`通过设置输入文件的目录控制输出文件的目录结构，默认输入文件目录为当前目录。

当`compilerOptions`的配置如下时：

```js
{
   "compilerOptions": {
        "outDir": './dist'，
        "rootDir": './src'
   }
}
```

编译后的目录结构：

```
|-- dist        <========= 输出目录
    |-- src
        |-- ex1.js
    |-- index.js

|-- src
    |-- ex1.ts
|-- index.ts
```

由编译目录可以看到，`index.ts`文件虽然不在`src`下，但是依旧被编译了，但是执行会打印错误提示信息，建议将所有文件包含在`rootDir`下。

```
error TS6059: File 'D:/Code/ts/index.ts' is not under 'rootDir' 'D:/Code/ts/src'. 'rootDir' is expected to contain all source files.
```

如果将`index.ts`文件放入`src`文件下再编译，文件目录如下：

```
|-- dist        <========= 输出目录
    |-- ex1.js
    |-- index.js
|-- src
    |-- ex1.ts
    |-- index.ts
```

可以看出`dist`文件下的目录发生了改变，文件中没有包含`src`。

### allowJs

`allowJs`默认值为`false`，当设置它的值为`true`时，编译时允许编译 `JS` 文件。

allowJs: false

```
|-- dist
    |-- ex1.js
|-- src
    |-- ex1.ts
    |-- ex2.js      <= allowJs: false 时 js 文件不编译
```

allowJs: true

```
|-- dist
    |-- ex1.js
    |-- ex2.js      <= allowJs: true 时 js 文件也编译了
|-- src
    |-- ex1.ts
    |-- ex2.js
```

:::note

将 `js` 工程升级为 `ts` 工程时，在将所有 `js` 结尾的文件改成 `ts` 结尾的同时要注意 `ts` 文件引用 `js` 文件的情形。此时引用的 `js` 文件也需要编译导出。

:::

### checkJs

`checkJs`默认值为`false`，当值为`true`时允许在`js`文件中进行类型检查和报错。但`checkJs`需要配合`allowJs`一起使用，当`allowJs`为`false`时，`checkJs`即使为`true`也不会起作用。

例如当没有配置`outDir`时允许编译`js`文件时，编译后的 js 文件会覆盖源文件，此时如果`checkJs`的值为`true`时，编译时会报错。

```js
 {
    "compilerOptions": {
         // "outDir": './dist'，
         "allowJs": true,
         "checkJs": true
    }
}
```

### jsx

当使用`ts`开发时，通常都是以`.ts`为后缀。但是当我们开发`react`的时候，`react`组件一般会以`.tsx`作为文件的后缀，此时便需要对`jsx`属性进行配置。

`jsx`属性有三个值：

| jsx 值       | 输入      | 输出                       | 输出文件扩展名 |
| ------------ | --------- | -------------------------- | -------------- |
| preserve     | `<div />` | `<div />`                  | .jsx           |
| react        | `<div />` | React.createElement("div") | .js            |
| react-native | `<div />` | `<div />`                  | .js            |

### declaration

`declaration`为`true`时，编译后会为每个 `ts` 文件生成对应的声明文件（`.d.ts` 文件） 。

原目录：

```
|-- src
    |-- index.ts
```

编译后目录：

```
|-- dist
    |-- index.js
    |-- index.d.ts    <= 自动生成的类型声明文件
|-- src
    |-- index.ts
```

声明文件默认会和编译后的`js`文件保存在同一目录，但是我们可以在`compilerOptions`中配置`declarationDir`属性指定声明文件的输出目录。

当我们只想编译生成`.d.ts`文件而不想编译生成`js`文件时，可以在`compilerOptions`中配置 `emitDeclarationOnly`为`true`。

<Hint type="good">在项目中使用工程引用时，必须在根 `tsconfig.json` 中配置`declaration`。</Hint>

### sourceMap

`sourceMap`为`true`时，`ts`编译时会生成对应的`.js.map`文件。 `.js.map`文件是一个信息文件，里面储存着位置信息，记录着编译文件前后的位置关系。当编译后的`js`文件出错时，可以更方便的定位到`ts`文件的错误位置。

原目录：

```
|-- src
    |-- index.ts
```

编译后目录：

```
|-- dist
    |-- index.js
    |-- index.js.map  <= 编译后生成对应的 *.js.map 文件
|-- src
    |-- index.ts
```

### declarationMap

与`souceMap`类似，`declarationMap`会为声明文件生成对应的`.d.ts.map`文件。

### removeComments

`removeComments`的值为`true`时，编译后的`js`文件会删除源文件中的注释。

### noEmit

`noEmit`为 `true`时，使用 `tsc` 编译后不会输出文件。

与之相关的属性有`noEmitOnError`，`noEmitOnError`为`true`时，在编译发生错误时不会输出文件。

### importHelpers

当`ts`中使用类继承等操作时，编译后的`js`文件需要用到一些公共方法（helper），每个文件中用到都重新定义一遍是很浪费且很占用空间的。所以当我们配置`importHelpers`为`true`时，编译后的文件将不再生成`helper`函数。

例如当`index.ts`文件内容如下时：

```js
class A {}
class B extends A {}
export = B
```

编译后 helper 函数为:

```js
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({__proto__: []} instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
```

配置`importHelpers`为`true`后，编译后的代码会引用`tslib`包，`tslib`包中包含`__extends`方法。

```js
var tslib_1 = require("tslib");
...

var B =(function (_super){
    tslib_1.__extends(B,_super); <=== tslib_1中包含__extends方法
    ...
}(A))
```

### downlevelIteration

当 target 为 es5 或 es3 时，`downlevelIteration`为`true`会降级实现遍历器。

例如`index.ts`文件为：

```js
let a: number[] = [1, 2, 3];
for (let item of a) {
  console.log(item);
}
```

当不配置`downlevelIteration`时，编译结果：

```js
var a = [1, 2, 3];
for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
  var item = a_1[_i];
  console.log(item);
}
```

当`downlevelIteration`为`true`时，编译结果使用了`helper`函数降级实现。

```js
'use strict';
var __values =
  (this && this.__values) ||
  function(o) {
    var s = typeof Symbol === 'function' && Symbol.iterator,
      m = s && o[s],
      i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === 'number')
      return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return {value: o && o[i++], done: !o};
        }
      };
    throw new TypeError(
      s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
    );
  };
var e_1, _a;
var a = [1, 2, 3];
try {
  for (
    var a_1 = __values(a), a_1_1 = a_1.next();
    !a_1_1.done;
    a_1_1 = a_1.next()
  ) {
    var item = a_1_1.value;
    console.log(item);
  }
} catch (e_1_1) {
  e_1 = {error: e_1_1};
} finally {
  try {
    if (a_1_1 && !a_1_1.done && (_a = a_1.return)) _a.call(a_1);
  } finally {
    if (e_1) throw e_1.error;
  }
}
```

### isolatedModules

在`typescript`中，默认情况下却将所有的 `*.ts` 文件作用域放到了一起。所以即使不同文件有同名变量也会报错。此时可以将`isolatedModules`设为`true`，这样就可以隔离各个文件的作用域。

```
|-- src
    |-- index.ts
    |-- exp1.ts
```

例如在`src`目录下的`index.ts`和`exp1.ts`文件中都定义了一个变量`test`，此时编译器会提示错误：`Cannot redeclare block-scoped variable test`。

除了使用`isolatedModules`字段外，还可以使用`export { test }` 或者`export defalut test`，让`ts`文件成为一个模块，这样也可以达到隔离作用域的效果。

## Strict Type-Checking Options

与严格类型检查相关的配置项一共有以下八项：

```
// "strict": true,                        // 开启所有严格的类型检查
// "noImplicitAny": false,                // 不允许隐式的 any 类型
// "strictNullChecks": false,             // 不允许把 null、undefined 赋值给其他类型变量
// "strictFunctionTypes": false           // 不允许函数参数双向协变
// "strictPropertyInitialization": false, // 类的实例属性必须初始化
// "strictBindCallApply": false,          // 严格的 bind/call/apply 检查（参数类型相同）
// "noImplicitThis": false,               // 不允许 this 有隐式的 any 类型，避免this指向全局
// "alwaysStrict": false,                 // 在代码中注入 "use strict";
```

### strict

`strict`的默认值为`false`，当`strict`配置为`true`时，其它七项默认为开启状态，当配置为`false`时，其它七项默认为关闭状态，也就是说其它七项是`strict`的子集。

当`strict`为`false`时，可以根据自己的需求，通过设置其它几项自定义类型检查。

### noImplicitAny

当`noImplicitAny`的值为`true`时，`ts`文件中所有的函数参数都必须明确参数类型，否则会编译出错。

```js
function echo(o) {
  // <= 编译报错：Parameter 'o' implicitly has an 'any' type.
  console.log(o);
}
```

### strictNullChecks

当`strictNullChecks`的值为`true`时，`ts`文件中不能将`null`、`undefined` 赋值给其他类型变量。当赋值给其它类型时会编译出错。

### strictFunctionTypes

当`strictFunctionTypes`的值为`true`时，`ts`文件不允许函数参数双向协变。

### strictBindCallApply

当`strictBindCallApply`的值为`true`时对 `bind`、`call`、`apply` 进行更加严格的类型检查，要求参数类型和个数必须保持一致。

例如当传递的参数少于函数参数，或参数类型不对时，编译时就会报错，如下例所示：

```js
function foo(a: number, b: string): string {
  return a + b;
}

let a = foo.call(undefined, 10); // <=== Expected 3 arguments, but got 2
let b = foo.call(undefined, 10, 2); // <=== Argument of type '2' is not assignable to parameter of type 'string'
```

### strictPropertyInitialization

当`strictPropertyInitialization`的值为`true`时，类的实例属性必须初始化。即类中每个实例属性都有初始值，初始值可以在 `constructor` 中设置，也可以在声明时设置。

未赋值：

```js
class C {
  name: string; // <= Property 'name' has no initializer and is not definitely assigned in the constructor.
}
```

赋值：

```js
class C {
  name: string = 'dk'; // <=== 在声明变量时初始化值
  age: number;

  constructor(age: number) {
    this.age = age; // <=== 在构造函数中赋值
  }
}
```

### noImplicitThis

当`noImplicitThis`的值为`true`时，不允许 `this` 有隐式的 `any` 类型，避免`this`指向全局。

```js
class Age {
  age: number = 10;
  getAge() {
    return function() {
      console.log(this.age);
    };
  }
}

let age = new Age().getAge();

age();
```

由上例可知`this`并不指向`Age`类，而是指向`undefined`，此时如果`noImplicitThis`的值为`true`，将会编译出错。

### alwaysStrict

`alwaysStrict`为 true 时，编译后的代码会在文件开头加上`"use strict"`。

## Additional Checks

### noUnusedLocals

`noUnusedLocals`的值为`true`时，`ts`文件不允许出现只声明未使用的局部变量。

### noUnusedParameters

`noUnusedParameters`的值为`true`时，函数中的参数必须在函数中被使用。

由下例可知，参数`c`在函数参数中被声明，但是并未使用，编译出错

```js
function sum(a: number, b: number, c: number) {
  // <= 编译报错：'c' is declared but its value is never read.
  return a + b;
}
```

### noImplicitReturns

`noImplicitReturns`的值为`true`时，所有的分支必须有返回值。

```js
function fn(a: number) {
  if (a > 0) {
    return false;
  } else {
    a = -a; // <= 编译报错：Not all code paths return a value.
  }
}
```

由上例可知，`else`分支没有返回值，此时只要加上`return`语句便可编译通过。

### noFallthroughCasesInSwitch

`noFallthroughCasesInSwitch`的值为`true`时，可以防止`switch`语句贯穿（当没有`break`的时候会一直向下执行）。当`break`丢失时，会编译报错：**Fallthrough case in switch**。

## Module Resolution Options

### moduleResolution

`moduleResolution`表示模块解析策略，它的默认值为`node`，除了使用`node`对模块进行解析外，还可以使用`classic`（TypeScript pre-1.6）。

`class`模块的解析规则：

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/微信截图_20200229145914.png' alt='D3twOQ'/>

`node`模块的解析规则：

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/微信截图_20200229145940.png' alt='D3twOQ'/>

### baseUrl

`baseUrl`解析非相对导入模块的基地址，默认为当前目录。

### paths

`paths`是指相对于`baseUrl`的路径映射，`paths`依赖于`baseUrl`而存在。

比如，当`index.ts`想导入`Jquery`的精简版本，而不是默认版本。可以设置`path`为：

```js
"baseUrl": "./",
"paths": {
    "jquery": ["node_modules/jquery/dist/jquery.slim.min.js"]
}
```

目录结构：

```
|-- node_modules
|-- index.ts
```

### rootDirs

`rootDirs` 功能是将多个目录放在一个虚拟目录下。

```
|-- dist
    |--util.d.ts
    |--util.js
|-- src
    |-- index.ts
```

`util`这个类库会一直在输出目录，不会再次被构建。而当`src`文件下的`index.js`引用`util`时，需要使用以下方式：

```js
import {util} from '../dist/util';
```

但当`src`被构建进输出目录后，之前导入类库的路径就会出错。此时可以使用 `rootDirs`将`dist`和`src`放在同一个虚拟目录，如下所示：

```
"rootDirs": ['src', 'dist']
```

此时`util.*`和`index.ts`可以看作在同一目录下，所以将引用改为：

```js
import {util} from './util';
```

### typeRoots

`typeRoots`指的是声明文件的目录，默认`node_modules/@types`。

当我们使用`npm`安装了`node`包后，发现引用`fs`模块依旧出错，这是因为 `typescript` 不认识 `nodejs` 原生`api`，需要安装对应的声明文件 `@types/node`。与`node`相似，当我们安装包后，引用依旧出错，可以看一下是否安装了它的声明文件。

### types

`types`为声明文件包，当我们将包名放到`types`属性中时，只会从`types`的属性值中进行查找。

例如配置为：

```js
{
   "compilerOptions": {
       "types" : ["node", "lodash"]
   }
}
```

编译时只会找 `./node_modules/@types/node`, `./node_modules/@types/lodash`两个包的声明文件，其它包的声明文件不会查找。

### esModuleInterop

`esModuleInterop`的默认值为`false`，当`esModuleInterop`的值为`true`时，允许模块使用`export = 模块名`导出，由`import XX from "模块名"`导入。

例如在`react`项目中，我们项目中会使用`import React from 'react';`，因此我们需要将`esModuleInterop`的值设为`true`。否则，只能使用`import * as React from 'react'`来引入`react`

### allowUmdGlobalAccess

`allowUmdGlobalAccess`的值为`true`时，允许以全局变量的形式访问 `UMD` 模块

## 参考目录

1. [配置 tsconfig.json：编译选项，by 梁宵](https://time.geekbang.org/course/detail/211-117235)
2. [tsconfig.json 详解一，by dkvirus](https://blog.dkvirus.top/frontend/typescript/tsconfig1.html)
3. [TypeScript Deep Dive，by Basarat](https://jkchao.github.io/typescript-book-chinese/)
4. [TypeScript official docs: Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
