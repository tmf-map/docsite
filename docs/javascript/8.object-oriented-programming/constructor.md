---
title: 构造函数
sidebar_label: 构造函数
---

## 什么是构造函数？

new 关键字调用的是构造函数，而不是说函数首字母大写就是构造函数。

如果有这样一个函数：

function Foo () {} Foo.prototype.name = '123'

那么 Foo 是不是构造函数呢？还是那句话，**没有经过 new 调用的话，就不是**

```js
var foo = Foo(); // foo: undefined
```

另外为了避免混淆，以下构造函数不用英文 Constructor 表示，而是中文，避免与 prototype 里面的 constructor 属性相混淆。

## 构造函数

构造函数里的属性在实例中是不共享的。

```js
function Cat(name, color) {
  this.name = name;
  this.color = color;
  this.meow = function() {
    console.log('喵喵');
  };
}

var cat1 = new Cat('大毛', '白色');
var cat2 = new Cat('二毛', '黑色');

cat1.meow === cat2.meow;
// false
```

## 原型对象

原型对象（protototype 本质上还是一个对象）上的属性在实例中是共享的。

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

cat1.color; // 'white'
cat2.color; // 'white'

Animal.prototype.color = 'yellow';

cat1.color; // "yellow"
cat2.color; // "yellow"
```

原型对象的作用，就是定义所有实例对象共享的属性和方法。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象。
