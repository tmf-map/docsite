---
title: 原型和原型链
---

import Img from '@site/src/components/Img';

<Img w="700" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/4iriid.jpg'/>

- \***\*proto\*\***:
  - 每个对象都有，但并非标准，Chrome 外的其他浏览器不一定有，一些书中用 `[[prototype]]` 或 `[[proto]]` 替代。
- **prototype**:
  - 函数才有，注意不是构造函数才有。
  - constructor 属性的对象，不是空对象。

例：

<Img w="250" align="left" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/C1PIOI.jpg'/>

```js
function Foo(name) {
  this.name = name;
}

Foo.prototype.getName = function () {
  return this.name;
};

// 通过new 关键字调用，那么Foo就是构造函数，而不是大写F决定的
// new 关键字的内部设置实例的__proto__指向构造函数的prototype
// 即foo.__proto__ === Foo.prototype
let foo = new Foo('kimi');
```

实例对象的`__proto__`指向自己构造函数的`prototype`。`obj.__proto__.__proto__...`的原型链由此产生，包括我们的操作符 **`instanceof` 正是通过探测 `obj.__proto__.__proto__... ===构造函数.prototype` 来验证 obj 是否是该构造函数的实例**。

随着一层层地上溯，所有对象的原型最终都可以上溯到`Object.prototype`，即`Object`构造函数的`prototype`属性。也就是说，所有对象都继承了`Object.prototype`的属性。这就是所有对象都有`valueOf`和`toString`方法的原因，因为这是从`Object.prototype`继承的。

`Object.prototype`的原型是 null。null 没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是 null。取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的`Object.prototype`还是找不到，则返回 undefined。如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做`“覆盖”（overriding）`，这也是多态的基础。

注意，一级级向上，在整个原型链上寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。**如果寻找某个不存在的属性，将会遍历整个原型链。**
