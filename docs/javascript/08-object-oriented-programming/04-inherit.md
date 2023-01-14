---
title: 原型链继承
---

JS 相比于其他面向类的语言，在实现继承时并没有真正对构造类进行复制。严格来说，JS 才是真正的面向对象语言，而不是面向类语言。它所实现的继承，都是通过每个函数创建之初就存在的`prototype属性进行关联、委托`，从而建立联系，间接的实现继承，实际上不会复制父类。

JS 的继承都基于两种方式：

1. 通过原型链继承，即子类的原型指向父类的实例从而实现原型共享。
2. 通过构造函数继承，即通过 js 的 apply、call 实现子类调用父类的属性、方法。

原型链方式可以实现所有属性方法共享，但无法做到属性、方法独享（例如 Sub1 修改了父类的函数，其他所有的子类 Sub2、Sub3...想调用旧的函数就无法实现了）；

而借用构造函数除了能独享属性、方法外还能在子类构造函数中传递参数，但代码无法复用。

总体而言就是可以实现所有属性方法独享，但无法做到属性、方法共享（例如，Sub1 新增了一个函数，然后想让 Sub2、Sub3...都可以用的话就无法实现了，只能 Sub2、Sub3...各自在构造函数中新增）。

## 组合继承

组合继承就是把以上两种继承方式一起使用，把共享的属性、方法用原型链继承实现，独享的属性、方法用借用构造函数实现。

```js
// 定义父类
function Super(name) {
  this.name = name;
}
// 定义共享属性、方法
Super.prototype.getName = function () {
  return this.name;
};

// 定义子类
function Sub(name, age) {
  // 独享的属性、方法用借用构造函数继承实现
  Super.call(this, name);
  this.age = age;
}

// 共享的属性、方法用原型链继承实现
Sub.prototype = new Super();

var sub = new Sub('Kimi', 18);

console.log(sub.name); // 'Kimi'
console.log(sub.age); // 18
```

构造继承关键在于，通过在子类的内部调用父类，即通过使用 apply()或 call()方法可以在将来新创建的对象上获取父类的成员和方法。

组合继承几乎完美实现了 js 的继承；为什么说是“几乎”？因为组合继承有一个小 bug，**实现的时候调用了两次父类构造函数，性能上和副作用上都存在一些问题，于是“寄生继承”就出来了**。

## 寄生继承

寄生继承属于第一种通过原型链的方式继承，但是不用实例化父类了，直接实例化一个临时副本实现了相同的原型链继承。（即子类的原型指向父类副本的实例从而实现原型共享）

关键方法：

- ES5: [Object.create()](https://www.google.com/url?q=http://javascript.ruanyifeng.com/oop/object.html%23toc2&sa=D&ust=1570507768698000)，底层也是调用了 new，但是 new 的是一个空构造函数。

```js
Object.create = function (proto) {
  function F() {}
  F.prototype = proto;
  return new F();
};
```

- ES6: Object.setPrototypeOf

```js
Object.setPrototypeOf = function (Sub, Super) {
  Sub.__proto__ = Super;
  return Sub;
};
```

## 寄生组合继承

“寄生组合继承”用了“寄生继承”修复了“组合继承”的小 bug，让 js 完美实现继承了

特点：委托继承，是一种`间接继承`，不会复制父类。

```js
// 定义父类
function Super(name) {
  this.name = name;
}
// 定义共享属性、方法
Super.prototype.getName = function () {
  return this.name;
};

// 定义子类
function Sub(name, age) {
  // 独享的属性、方法用借用构造函数继承实现
  Super.call(this, name);
  this.age = age;
}
// 共享的属性、方法用原型链继承实现
Sub.prototype = Object.create(Super.prototype, {
  constructor: {
    value: Sub,
    writable: true,

    enumerable: false, // constructor不可枚举
    configurable: true
  }
});

var sub = new Sub('Kimi', 18);

console.log(sub.name); // 'Kimi'
console.log(sub.age); // 18
```

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/image78.png)
