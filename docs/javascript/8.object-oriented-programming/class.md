---
title: class
sidebar_label: class
---

前言： ES6 中引入了类似传统面向对象语言中“class”的概念。实际上这些关键字只是一些语法糖，底层实现还是通过原型链之间的委托关联关系实现继承。通过[Babel 的转译](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYGwhgzhAEAKCmAnCB7AdtA3gKGtY6EALogK7BEqIAUaYAtvAJRa57REAWAlhAHR1GAXkHwAPmIBEAEXgAzMKRBFJAbjYBfNpQDKJbmgDm1JjnbRE8IqUQYA5ADkG8AFx2A1F14Dn6vFq1sUEgYACEUAE9oeAAPIng0ABMYBGR0M3xCEnJKGlFTNjwIUgAHJFpnJj92L35DBMT4ITtwiLtqrTxdfSMTDLxLa1toYrLEPm7EA2Mmd0loAFpoAHEG10lPHjq1juwNIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015&prettier=true&targets=&version=7.4.5&externalPlugins=)可以发现可以映射到 ES5 的寄生组合继承。

## ES5 和 ES6 在继承上的差别

1. 子类 this 生成顺序不同。ES5 的继承，先生成了子类实例，再调用父类的构造函数修饰子类实例。ES6 的继承，先生成父类实例，再调用子类的构造函数修饰父类实例。

   而这种差别可以直接体现在原生构造函数的继承上，原来我们很难自定义一个 Array 的子类：

```js
function MyArray() {
  Array.apply(this, arguments); //先有子类的this,然后在子类this基础上，调用父类constructor来处理this
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    value: MyArray,
    writable: true,
    enumerable: false,
    configurable: true
  }
});
```

但完全无法使用 Array 对象的一些方法属性

```js
//test
var colors = new MyArray();
colors[0] = 'red';
colors.length; // 0

colors.length = 0;
colors[0]; // "red"
```

为什么呢？因为， Array.apply(this, arguments);是因为子类无法获得原生构造函数的内部属性，通过 Array.apply()或者分配给原型对象都不行。原生构造函数会忽略 apply 方法传入的 this，也就是说，原生构造函数的 this 无法绑定，导致拿不到内部属性。

ES6 继承 Array：

```js
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray();
//test
var colors = new MyArray();
colors[0] = 'red';
colors.length; // 1

colors.length = 0;
colors[0]; // undefined
```

主要是 this 对象创建顺序不同

ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 this 上面（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

注意：

```js
class NewObj extends Object {
  constructor() {
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
o.attr === true; // false
```

上面代码中，NewObj 继承了 Object，但是无法通过 super 方法向父类 Object 传参。这是因为 ES6 改变了 Object 构造函数的行为，一旦发现 Object 方法不是通过 new Object()这种形式调用，ES6 规定 Object 构造函数会忽略参数。

2. **子类**proto**指向不同**。子类可以直接通过**proto**寻址到父类。核心目的是实现静态方法继承。

```js
class Super {}
class Sub extends Super {}

const sub = new Sub();

Sub.__proto__ === Super; // true
```

而通过 ES5 的方式，Sub.proto === Function.prototype

```js
function Super() {}
function Sub() {}

Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;

var sub = new Sub();

Sub.__proto__ === Function.prototype; // true
```

在在 babel 解析中\_inherits 的实现大概是这样的，注意最后一句：

```js
function _inherits(subClass, superClass) {
  subClass.prototype = Object.create(Foo.prototype, {
    constructor: {
      value: subClass, // 将constructor指向子类
      writable: true,
      configurable: true // babel 没有enumerable: false why?
    }
  });
  subClass.__proto__ = superClass;
}
```

ES6 继承对应的原型链其实是这样的： ![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/HETr4Z.png)

3. class 不会“变量提升”，类似于 let、const 声明变量，但会进入暂时性死区。

```js
var Foo = function () {
  this.foo = 21;
};

{
  const foo = new Foo(); // ReferenceError: Foo is not defined
  class Foo {
    constructor() {
      this.foo = 37;
    }
  }
}
```

4. class 声明内部会启用严格模式。

```js
// 引用一个未声明的变量
function Bar() {
  baz = 42; // it's ok
}
const bar = new Bar();

class Foo {
  constructor() {
    fol = 42; // ReferenceError: fol is not defined
  }
}
const foo = new Foo();
```

5. class 的所有方法（包括静态方法和实例方法）都是不可枚举的。

```js
// 引用一个未声明的变量
function Bar() {
  baz = 42; // it's ok
}
const bar = new Bar();

class Foo {
  constructor() {
    fol = 42; // ReferenceError: fol is not defined
  }
}
const foo = new Foo();
```

6. class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。

```js
function Bar() {
  this.bar = 42;
}
Bar.prototype.print = function () {
  console.log(this.bar);
};

const bar = new Bar();
const barPrint = new bar.print(); // it's ok

class Foo {
  constructor() {
    this.foo = 42;
  }
  print() {
    console.log(this.foo);
  }
}
const foo = new Foo();
const fooPrint = new foo.print(); // TypeError: foo.print is not a constructor
```
