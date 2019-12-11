---
title: 函数参数
sidebar_label: 函数参数
---

## 传参方式

JS 粗略的说是按值传递，准确的说，JS 中的原始类型按值传递，引用类型按共享传递的(call by sharing，也叫按对象传递、按对象共享传递，本质上也是按值传递)。最早由 Barbara Liskov. 在 1974 年的 GLU 语言中提出。该求值策略被用于 Python、Java、Ruby、JS 等多种语言。

归纳到一起可以说是按值传递，本质上传递的是变量的值的拷贝。请注意，这里所说的按值传递不是传统意义上的按值传递，在 JS 中一切都要区分是基础类型还是引用类型，JS 基本上都在遵守这个原则（比如浅拷贝、深拷贝），当然函数传参也不例外，一定要区分变量类型，这是前提。

<div align="center">
    <img width="330" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/wVo2dl.jpg'/>
</div>

- **原始类型**：传统的按值传递，拷贝的是实际的值，拷贝一份从此各奔东西。
- **引用类型**：值指的是该对象所指向的内存地址的值的拷贝，拷贝了一个对象快捷方式，而不是其所代表的实际值。
  - **修改变量的某个属性**，原始对象也会修改。
  - **将该对象重新赋值**，原始对象不改，相当于与原始对象“断链”，也是从此各奔东西。

```js
function changeStuff(a, b, c) {
  a = a * 10;
  b.item = 'changed';
  c = {item: 'changed'};
}

var num = 10;
var obj1 = {item: 'unchanged'};
var obj2 = {item: 'unchanged'};

changeStuff(num, obj1, obj2);

console.log(num); //10
console.log(obj1.item); //changed
console.log(obj2.item); //unchanged
```

几种传值方式：

- **按值传递（Pass by value）**：在按值传递中，传递给函数参数是函数被调用时所传实参的拷贝。在按值传递中实际参数被求值，其值被绑定到函数中对应的变量上（通常是把值复制到新内存区域）
- **按引用传递（Pass by reference）**：在按引用传递中，传递给函数的是它的实际参数的隐式引用而不是实参的拷贝。通常函数能够修改这些参数（比如赋值），而且改变对于调用者是可见的。
- **传共享调用（Call by sharing）**：还有一种求值策略叫做传共享调用（Call-by-sharing/Call by object/Call by object-sharing）。传共享调用和传引用调用的不同之处是，该求值策略传递给函数的参数是对象的引用的拷贝，即对象变量地址的拷贝。

#### 1. 变量初始化

```js
var num = 10;
var obj1 = {item: 'unchanged'};
var obj2 = {item: 'unchanged'};
```

<div align="center">
    <img width="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/CsgaPj.jpg'/>
</div>

#### 2.调用函数

```js
changeStuff(num, obj1, obj2);
```

<div align="center">
    <img width="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/m49aQl.jpg'/>
</div>

#### 3.执行函数体

```js
a = a * 10;
b.item = 'changed';
c = {item: 'changed'};
```

<div align="center">
    <img width="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/MfyA1P.jpg'/>
</div>

## 参数默认值

ES6 借鉴了 python 的语法，主要两点：1，对象嵌套多层结构，如何设置内层默认值。2，可不可以像 python 一样跨位置传参，不然，后面的位置还要补齐前面位置的值。
