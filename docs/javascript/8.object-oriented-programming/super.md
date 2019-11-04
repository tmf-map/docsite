---
title: super
sidebar_label: super
---

import Hint from '../../../src/components/Hint'

## 为什么要使用 super

`this` 是由调用者决定的。子类自己的 `this` 对象，必须先通过父类的构造函数完成构造，得到与父类同样的**实例属性和方法**，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用 `super` 方法，子类就得不到 `this` 对象，那么对子类的进行加工，加上子类自己的实例属性和方法就无法实现。

<Hint type="must">要想在子类中使用 `this` 得先调用 `super()` 将父类 `constructor` 定义的属性和方法挂到自己的 `this` 上后再进行扩展。</Hint>

## super 的两种用法与含义

`super` 这个关键字有两种用法：作为函数或对象使用，分别指代：**父类构造函数**和**父类原型对象**。

### 作为函数使用

作为函数用只能用在子类的构造函数之中，代表父类的构造函数。ES2015 中子类的构造函数规定必须要执行一次 `super` 函数。另外如果子类没有指定构造函数，ES2015 会提供默认的类构造函数。因此，没有必要提供一个空构造函数或一个简单地委托给它的父类的构造函数，如下例所示：

```js
class A {
   constructor () {
   }
}

class A extends B {
   /*eslint no-useless-constructor: "error"*/
   constructor (...args) {
     super(...args);
   }
}
```

<Hint type="warning">`super` 虽然代表了父类 A 的构造函数，但是返回的是子类 B 的实例，即 `super` 内部的 `this` 指的是 B 的实例，因此 `super()` 在这里相当于 `A.prototype.constructor.call(this)` 。</Hint>

```js
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B
```

上面代码中， `new.target` 指向当前正在执行的函数。可以看到，在 `super()` 执行时，它指向的是子类 B 的构造函数，而不是父类 A 的构造函数。也就是说， `super()` 内部的 `this` 指向的是 B 。

作为函数时， `super()` 只能用在子类的构造函数之中，用在其他地方就会报错。

```js
class A {}

class B extends A {
  m() {
    super(); // 报错
  }
}
```

### 作为对象使用

作为对象时在普通方法中，指向的是**父类原型对象**，而或父类的非实例或 `this` 。在静态方法中，指向父类。

```js
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B();
```

上面代码中，子类 B 当中的 `super.p()` ，就是将 `super` 当作一个对象使用。这时， `super` 在普通方法之中，指向 `A.prototype` ，所以 `super.p()` 就相当于 `A.prototype.p()` 。

<Hint type="warning">由于 `super` 指向父类的原型对象，所以定义在父类**实例上的方法或属性**，是无法通过 `super` 调用的。</Hint>

```js
class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}

let b = new B();
b.m // undefined
```

上面代码中，p 是父类 A 实例的属性， `super.p` 就引用不到它。

## React class 中的 super

### React 中使用继承 super(props) 的目的

React 也必须遵循 JS ，强制在 `constructor` 中必须先调用 `super` 才能引用 `this` 。

<Hint type="must">在 React class `constructor` 中使用 `this.props` 得先调用 `super(props)` 。</Hint>

### 为什么要传递 props 参数

是为了在 `constructor` 中 使用 `this.props` 。这样在除了 `constructor` 的地方，都可以调用 `this.props`，比如 lifecycle，custom methods。

### 能用 super() 代替 super(props) 吗

最好不要，毕竟这样写在逻辑上并不明确确，React 会在**构造函数执行完毕后**给 `this.props` 赋值。如果这样写使得 `this.props` 在 `super` 调用一直到构造函数结束期间值为 `undefined` ，如下代码所示：

```jsx
class Button extends React.Component {
 constructor(props) {
   super(); // 😬 我们忘了传入 props
   console.log(props);      // ✅ {}
   console.log(this.props); // 😬 undefined
 }
 // ...
}
```

<Hint type="warning">如果我们没有传递参数，React 会在我们的类组件 `constructor` **调用之后**，为我们的组件实例分配 `props` 。</Hint>

<Hint type="best">React 官方文档里面有一句 [Class components should always call the base constructor with props](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class).</Hint>

## 更多阅读

1. [ECMAScript 6 入门：Class 的继承，作者：阮一峰](http://es6.ruanyifeng.com/#docs/class-extends#super-%E5%85%B3%E9%94%AE%E5%AD%97)
2. [Why Do We Write super(props)? By Dan](https://www.google.com/url?q=https://overreacted.io/zh-hans/why-do-we-write-super-props/&sa=D&ust=1570507768778000)
