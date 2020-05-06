---
title: 类型转换
sidebar_label: 类型转换
---

import Img from '../../../src/components/Img';

## 手动类型转换

### 将任意类型的值转为原始类型的值

`Number` 、 `String` 和 `Boolean` 如果不作为构造函数调用（即调用时不加 new ），常常用于将任意类型的值显式地转为数值、字符串和布尔值：

```js
Number(123); // 123
String('abc'); // "abc"
Boolean(true); // true
```

这也解释新增的 `Symbol()` ，前面没有 new，因为调用的根本不是构造函数。

### 将原始类型的值转为包装对象

所谓“包装对象”，就是分别与数值、字符串、布尔值相对应的`Number` 、 `String` 、 `Boolean` 三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象：

```js
new Number(123);
new String('abc');
new Boolean(true);
```

总结一下，这三个对象作为构造函数使用（带有 new）时，可以将原始类型的值转为对象；作为普通函数使用时（不带有 new），可以将任意类型的值，转为原始类型的值。

下面我们主要关注自动转换部分。我们知道 JS 是一种“动态弱类型”的语言，。

动态，变量没有类型限制，可以随时赋予任意值：

```js
var x = y ? 1 : 'a';
```

上面代码中，变量 x 到底是数值还是字符串，取决于另一个变量 y 的值。y 为 true 时，x 是一个数值；y 为 false 时，x 是一个字符串。这意味着，x 的类型没法在编译阶段就知道，必须等到运行时才能知道。

弱类型主要涉及的就是类型的隐式转换，运算时候对类型的容忍度。

JS 中虽然变量的数据类型是不确定的，但是各种运算符对数据类型是有要求的。如果运算符发现，运算子的类型与预期不符，就会自动转换类型。比如，减法运算符预期左右两侧的运算子应该是数值，如果不是，就会自动将它们转为数值。

## 自动转成包装对象

对象是 JavaScript 语言最主要的数据类型，三种原始类型的值——数值、字符串、布尔值——在一定条件下，也会自动转为对象，也就是原始类型的“**包装对象**”。

<Img width="400" align="left" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/H28otE.jpg' />

包装对象的最大目的，首先是使得 JavaScript 的对象涵盖所有的值，其次使得**原始类型的值可以方便地调用某些方法**。比如可以使用 Object 对象提供的 valueOf 方法和 toString 方法：

### valueOf()

`valueOf` 方法返回包装对象实例对应的原始类型的值。

```js
new Number(123).valueOf(); // 123
new String('abc').valueOf(); // "abc"
new Boolean(true).valueOf(); // true
```

### toString()

`toString` 方法返回对应的字符串形式。

```js
new Number(123).toString(); // "123"
new String('abc').toString(); // "abc"
new Boolean(true).toString(); // "true"
```

原始类型的值调用各种包装对象的属性和方法。这时，JavaScript 引擎会自动将原始类型的值转为包装对象实例，在使用后立刻销毁实例。比如，字符串可以调用 `length` 属性，返回字符串的长度：

<Img width="250" align="left" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/4TWRnN.jpg'/>

```js
// 等同于
var strObj = new String(str);
// String {
//   0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"
// }
strObj.length; // 3
strObj = null;
```

:::tip

包装对象实例会自动销毁。这意味着，下一次调用字符串的属性时，实际是调用一个新生成的对象，而不是上一次调用时生成的那个对象。

:::

:::caution

数值类型要想自动转成包装对象需要加上括号，否则会当成小数点处理。

:::

<Img width="250" align="left" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/aURQwt.jpg'/>

三种包装对象除了提供很多实例方法，还可以在原型上添加自定义方法和属性，供原始类型的值直接调用。

比如，我们可以新增一个 `double` 方法，使得字符串和数字翻倍。

```js
String.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

'abc'.double();
// abcabc
```

## 自动转成字符串

主要发生在字符串的加法运算时。当一个值为字符串，另一个值为非字符串，则后者转为字符串。但要注意：

```js
'1' + 2 + '3' + 4; // '1234' 遇到字符串就会拼接
4 + 3 + 2 + '1'; // '91' 先加在一起再拼接
```

## 自动转换数值

JavaScript 遇到预期为数值的地方，就会将参数值自动转换为数值。系统内部会自动调用 Number 函数。

对于两个数的四则运算和模运算，如果存在字符串，则将字符串转为数字来计算，加法是个例外，他会做数字与字符串的链接返回字符串。如果运算存在到对象，调用对象的 valueOf()转为数字，如果 valueOf()返回值是 Number 类型直接运算，否则调用对象的 toString 方法，按照字符串规则运算。对于 null 和 undefined 会调用 Number(null)和 Number(undefined)转为 Number 类型的 0 和 NaN

```js
1 + [] ⇔  1 + ''  ⇔  '1'
1 + {}  //  "1[object Object]"
'5' * [] ⇔  '5' * '' ⇔ 5 * 0 //0
```

:::tip

除了加法运算符 `+` 有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值。

:::

```js
'5' - '2'; // 3
'5' * '2'; // 10
true - 1; // 0
false - 1; // -1
'1' - 1; // 0
'5' * []; // 0
false / '5'; // 0
'abc' - 1; // NaN
null + 1; // 1
undefined + 1; // NaN
```

:::caution

`null` 转为数值时为 0，而 `undefined` 转为数值时为 `NaN` 。

:::

一元运算符(! !!除外)也会把运算子转成数值。一元运算符的本质是调用 Number 方法,Number 方法的规则是：字符串如果全是数字组成转为数字，存在非数字子串转为 NaN。对于 Null 和 undefined 转为 0 和 NaN. 对于对象类型，调用对应的 valueOf 方法，如果 valueOf 的结果不是 number 类型，调用 toString,在转为数字类型。

```js
var obj =
  {
    valueOf: function () {
      return {};
    },
    toString: function () {
      return '2';
    }
  } + obj; //2
```

```js
+true - // 1
false + // 0
'abc' - // NaN
'abc' + // NaN
[] + // 0
['12'] + // 12
{} + //NaN
null + // 0
undefined + //NaN
new Date() + // Date.now()
'   1   ' + // 1
'1.2e2' + // 120
new Set() + //NaN
  new Map(); //NaN
```

## 自动转成布尔

if 语句和三目运算符的条件部分会将非布尔值的参数自动转换为布尔值。系统内部会自动调用 Boolean 函数。

因此除了以下五个值(六个假值 还有一个 false)，其他都是自动转为 true 。

```js
undefined;
null;
0 + 0 - 0;
NaN;
('');
```

一元运算符 `!` `!!` 可以将任意值转为对应的布尔值。

```js
!!undefined; // false
!!null; // false
!!0; // false
!!''; // false
!!NaN; // false
!!1; // true
!!'false'; // true
!![]; // true
!!{}; // true
!!function () {}; // true
!!/foo/; // true
```
