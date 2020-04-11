---
title: 构造器/构造函数
sidebar_label: 构造器/构造函数
---

为了与普通函数区别，构造函数名字的第一个字母通常大写。

构造函数的特点有两个：

- 函数体内部使用了 this 关键字，代表了所要生成的对象实例。
- 生成对象的时候，必须使用 new 命令。

构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即 this 对象），将其“构造”为需要的样子。

如果构造函数内部有 return 语句，而且 return 后面跟着一个**对象**，new 命令会返回 return 语句指定的对象；否则，就会不管 return 语句，返回 this 对象。

- 创建一个空对象，作为将要返回的对象实例。
- 将这个空对象的原型，指向构造函数的 prototype 属性。
- 将这个空对象赋值给函数内部的 this 关键字。
- 开始执行构造函数内部的代码。

在 JavaScript 中实现，new 运算符大致如下所示（更精确的实现稍微复杂一点）：

```js
function newOperator(constructor, arrayWithArgs) {
  var context = Object.create(constructor.prototype);
  constructor.apply(context, arrayWithArgs);
  return context;
}
```

new 命令本身就可以执行构造函数，所以后面的构造函数可以带括号，也可以不带括号。下面两行代码是等价的，但是为了表示这里是函数调用，推荐使用括号。

```js
// 推荐的写法
var v = new Vehicle();
// 不推荐的写法
var v = new Vehicle();
```

另外注意：如果忘记 new 则会导致 this 指向全局对象，这种情况下，构造函数就变成了普通函数，并不会生成实例对象。而且由于后面会说到的原因，this 这时代表全局对象，将造成一些意想不到的结果。

```js
var Vehicle = function () {
  this.price = 1000;
};

var v = Vehicle();
v; // undefined
price; // 1000
```

可以使用严格模式来避免该意外情况。另一个解决办法，构造函数内部判断是否使用 new 命令，如果发现没有使用，则直接返回一个实例对象。

```js
function Fubar(foo, bar) {
  if (!(this instanceof Fubar)) {
    return new Fubar(foo, bar);
  }

  this._foo = foo;
  this._bar = bar;
}

Fubar(1, 2)._foo(
  // 1
  new Fubar(1, 2)
)._foo; // 1
```

## new.target

函数内部可以使用 new.target 属性。如果当前函数是 new 命令调用，new.target 指向当前函数，否则为 undefined。

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
