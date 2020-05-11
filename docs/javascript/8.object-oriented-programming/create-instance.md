---
title: 创建实例
---

## 从构造函数创建：new

new 会**劫持**所有普通函数并用构造对象的形式来调用它。

**new 命令使用需要注意的点：**

- new 命令总是返回一个对象，要么是实例对象，要么是 return 语句指定的对象。比如 return 语句返回的是字符串，所以 new 命令就忽略了该语句，返回实例对象 this。
- new 命令执行时，构造函数内部的 this，就代表了新生成的实例对象，如果没有使用 new 调用该函数那么 this 会指向执行上下文，比如全局对象。
- new 命令本身就可以执行构造函数，所以后面的构造函数可以带括号，也可以不带括号。下面两行代码是等价的，但是为了表示这里是函数调用，推荐使用括号。

```js
// 推荐的写法
var v = new Vehicle();
// 不推荐的写法
var v = new Vehicle();
```

**如何保证构造函数必须与 new 命令一起使用？**

方法一：构造函数内部使用严格模式，即第一行加上 use strict。这样的话，一旦忘了使用 new 命令，直接调用构造函数就会报错。

```js
function Fubar(foo, bar) {
  'use strict';
  this._foo = foo;
  this._bar = bar;
}

Fubar();
// TypeError: Cannot set property '_foo' of undefined
```

由于严格模式中，**函数内部的 this 不指向全局对象**，默认等于`undefined`。

方法二：函数内部可以使用 new.target 属性。如果当前函数是 new 命令调用，new.target 指向当前函数，否则为 undefined。

```js
function f() {
  console.log(new.target === f);
}

f(); // false
new f(); // true
```

使用这个属性，可以判断函数调用的时候，是否使用 new 命令。

```js
function f() {
  if (!new.target) {
    throw new Error('请使用 new 命令调用！');
  }
  // ...
}

f(); // Uncaught Error: 请使用 new 命令调用！
```

### new 命令的原理

使用 new 命令时，它后面的函数依次执行下面的步骤。

1. 创建一个空对象，作为将要返回的对象实例。
2. 将这个空对象的原型，指向构造函数的 prototype 属性。
3. 将这个空对象赋值给函数内部的 this 关键字。
4. 开始执行构造函数内部的代码。

就是说，构造函数内部，**this 指的是一个新生成的空对象**，所有针对 this 的操作，都会发生在这个空对象上。构造函数之所以叫“构造函数”，就是说这个函数的目的，**就是操作一个空对象（即 this 对象），将其“构造”为需要的样子**。

new 命令简化的内部流程，可以用下面的代码表示。

```js
function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
 // 将 arguments 对象转为数组
 var args = [].slice[al].call(arguments);
 // 取出构造函数
 var constructor = args.shift()[am];
 // 创建一个空对象，继承构造函数的 prototype 属性
 var context[an] = Object.create(constructor.prototype);
 // 执行构造函数
 var result = constructor.apply(context, args[ao]);
 // 如果返回结果是对象，就直接返回，否则返回 context 对象
 return (typeof result === 'object' && result != null) ? result : context;
}

// 实例
var actor = _new(Person, '张三', 28);
```

## 从实例创建：constructor

先介绍一下`prototype`对象里的`constructor`属性，默认指向`prototype`对象所在的构造函数。请注意**由构造函数创建出来的实例实际上是没有`constructor`属性，因为它是`prototype`的一个属性**，而`prototype`是构造函数所特有的。但实例可以通过**原型链委托继承**的方式来继承该属性：

```js
function P() {}
var p = new P();

p.constructor === P; // true
p.constructor === P.prototype.constructor; // true
p.hasOwnProperty('constructor'); // false
```

上面代码中，p 是构造函数 P 的实例对象，但是 p 自身没有`constructor`属性，该属性其实是读取原型链上面的`P.prototype.constructor`属性。

`constructor`属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。

```js
function F() {}
var f = new F();

f.constructor === F; // true
f.constructor === RegExp; // false
```

构造函数作为模板，可以生成实例对象。但是，**有时拿不到构造函数，只能拿到一个现有的实例。我们可以用 a 的`constructor`方法去创建一个新的实例。**

```js
function A() {}
var a = new A();

var b = new a.constructor(); // 其实相当于new A()
b instanceof A; // true
```

<div >
    <img width="436" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/image15.png" />
</div>

这使得在实例方法中，调用自身的构造函数成为可能。

```js
Constructor.prototype.createCopy = function () {
  return new this.constructor();
};
```

上面代码中，createCopy 方法调用构造函数，新建另一个实例。

## 从实例创建：Object.create

`Object.create` 主要是用来从**一个对象创建出另一个对象，并且保留该对象的原型链继承关系**。它会凭空创建一个“新”对象并把新对象内部的`__proto_`\_关联到你指定的对象。它以现有的对象为基础，而在 JS 中无论是字面量对象还是 new 出来的对象实例本质上都是 Object 构造函数的实例。所以**从一个对象创建出另一个对象可以理解成“从一个实例 duplicate 另一个实例实例”。**

```js
var person1 = {
  name: '张三',
  age: 38,
  greeting: function () {
    console.log("Hi! I'm " + this.name + '.');
  }
};

var person2 = Object.create(person1);

person2.name; // 张三
person2.greeting(); // Hi! I'm 张三
```

上面代码中，对象 person1 是 person2 的模板，后者继承了前者的属性和方法。

相关拓展：[Object.create 和 new 区别](https://www.google.com/url?q=https://blog.csdn.net/blueblueskyhua/article/details/73135938&sa=D&ust=1570507768637000)
