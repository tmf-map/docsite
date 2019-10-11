---
title: super
sidebar_label: super
---
super这个关键字有两种用途：父类构造函数和父类原型对象/父类对象。

1. 作为函数用只能用在子类的构造函数之中，代表父类的构造函数。ES6 中子类的构造函数规定必须要执行一次super函数。另外如果子类没有指定构造函数，ES2015 会提供默认的类构造函数。因此，没有必要提供一个空构造函数或一个简单地委托给它的父类的构造函数，如下例所示：
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

注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)。

2. 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
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

**调用 super 的原因：**

首先this谁调用，就是谁。这个规则，一直都没有被违背。子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象，那么对子类的进行加工，加上子类自己的实例属性和方法就无法实现。


**React 中使用继承super(props) 的目的：**

React 也必须遵循 JS ，强制的 在 constructor 中必须先调用 super 才能引用 this


但为什么要传递 props 参数 ?


是为了在 constructor 中 使用 this.props。即使我们没有传递参数，React 也会在我们的类组件 constructor 调用之后，为我们的组件实例分配 props。这样在除了 constructor 的地方，都可以调用 this.props，比如 lifecycle，custom methods。


**这意味着你能够用 super() 代替 super(props) 吗？**

最好不要，毕竟这样写在逻辑上并不明确确然，React 会在构造函数执行完毕之后给 this.props 赋值。但如此为之会使得 this.props 在 super 调用一直到构造函数结束期间值为 undefined。

```js
class Button extends React.Component {
 constructor(props) {
   super(); // 😬 我们忘了传入 props
   console.log(props);      // ✅ {}
   console.log(this.props); // 😬 未定义
 }
 // ...
}
```
React文档，里面有一段 Class components should always call the base constructor with props.


Dan 最近写的一篇文章 [Why Do We Write super(props)?](https://www.google.com/url?q=https://overreacted.io/zh-hans/why-do-we-write-super-props/&sa=D&ust=1570507768778000)