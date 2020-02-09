---
title: Enum
sidebar_label: Enum
---

import Img from '../../../src/components/Img';

import Hint from '../../../src/components/Hint';

枚举（Enum）类型经常被用于取值在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。枚举类型变量使用`enum`字段来定义。

## 数字枚举

```ts
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}
```

上述定义了一个简单的数字枚举，对于没有初始化的数字枚举类型来说，第一个枚举成员会被赋值为`0`，后面的成员值为其上一个枚举成员的值加`1`。

修改上面的语句为：

```ts
enum Days {
  Sun = 7,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}

console.log(Days['Sun']); // 7
console.log(Days['Mon']); // 1
console.log(Days['Tue']); // 2
console.log(Days['Sat']); // 6
```

由例子的结果可以看出，未手动赋值的枚举项会接着上一个枚举项递增。

```ts
enum Days {
  Sun = 3,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}

console.log(Days['Sun'] === 3); // true
console.log(Days['Wed'] === 3); // true
console.log(Days[3] === 'Sun'); // false
console.log(Days[3] === 'Wed'); // true
```

通过上面的代码可以看出，当赋值的枚举项数字较小时，可能会被后面枚举项的初始值覆盖，此时通过值只能找到后面的枚举项。

<Hint type="bad">对枚举项赋值较小会被后面的枚举项值覆盖</Hint>

## 数字枚举和反向映射

数字枚举除了具有上述功能外，还具有**反向映射**功能，如下所示：

```ts
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}

console.log(Days['Sun']); // 0
console.log(Days[Days['Sun']]); // Sun
console.log(Days[0]); // Sun
```

由上面的式子可以看出，'Sun'-> 0 属于正向映射，而 Days["Sun"] -> 'Sun'属于反向映射，其中 Days["Sun"] === 0。

是不是很不解为什么数字枚举可以**反向映射**？其实这和数字枚举的内部实现有关。上面的式子可以编译为：

```js
var Days;
(function(Days) {
  Days[(Days['Sun'] = 0)] = 'Sun';
  Days[(Days['Mon'] = 1)] = 'Mon';
  Days[(Days['Tue'] = 2)] = 'Tue';
  Days[(Days['Wed'] = 3)] = 'Wed';
  Days[(Days['Thu'] = 4)] = 'Thu';
  Days[(Days['Fri'] = 5)] = 'Fri';
  Days[(Days['Sat'] = 6)] = 'Sat';
})(Days || (Days = {}));

console.log(Days); // {0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat", Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6}
```

由上面编译的结果可知，对于枚举变量`Days`是由`JS`中的对象实现的。`Days`的枚举成员和对应的值分别作为 Days 的`key: value`，然后又作为`value: key`存到`Days`对象中，实现了反向映射功能。

## 字符串枚举

字符串枚举要求每一个枚举项都必须使用字符串，或另外一个字符串枚举成项进行初始化。

```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
```

编译为：

```js
var Direction;
(function(Direction) {
  Direction['Up'] = 'UP';
  Direction['Down'] = 'DOWN';
  Direction['Left'] = 'LEFT';
  Direction['Right'] = 'RIGHT';
})(Direction || (Direction = {}));
```

与数字枚举项相比，字符串数据项没有**反向映射**，但是字符串枚举可以提供一个运行时更有意义的值。

## 异构枚举

异构枚举即枚举项既包含字符串枚举项，又包括数字枚举项。如下所示：

```ts
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'YES'
}
```

<Hint type="warn">除非业务上真的需要这种枚举类型，否则不建议使用异构枚举。</Hint>

## 常数项和计算所得项

```ts
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = '123'.length
}
```

上面的例子展示了枚举变量 FileAccess 各项值的类型，那么如何判断常数项和计算所得项呢？

**判断条件：**

- 枚举项初始化未赋值
- 常量枚举表达式（值主要为数字或字符串）
- 对之前定义的常数项的引用
- 一元运算符 +, -, ~其中之一应用在了常量枚举表达式
- 常量枚举表达式做为二元运算符 +, -, \*, /, %, <<, >>, >>>, &, |, ^的操作对象

符合上述条件之一的便属于常数项，不符合上述任一条件的即为计算所得项。

如果紧接在计算所得项后面的是未赋值的项，那么它就会因为无法获得初始值而报错：

```ts
enum Color {
  Red = 'red'.length,
  Green,
  Blue
} //error TS1061: Enum member must have initializer.
```

<Hint type="tip">枚举变量中，计算所得项后面不可以定义未赋值的项</Hint>

## const 枚举

在某些需求很严格的情况下，为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用`const`枚举，`const`枚举是指使用 `const enum` 定义的枚举类型，如下所示：

```ts
const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right
];
```

编译为：

```ts
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算所得项。当包含计算所得项时，系统会提示出错，如下所示：

```ts
const enum Color {
  Red,
  Green,
  Blue = 'blue'.length
}
// index.ts(1,38): error TS2474: In 'const' enum declarations member initializer must be constant expression.
```

## 参考链接

1. [TypeScipt Document](https://www.tslang.cn/docs/handbook/enums.html)
2. [TypeScript 入门教程，by xcatliu](https://ts.xcatliu.com/advanced/enum#wai-bu-mei-ju)
3. [TypeScript in action, By Liang Xiao](https://time.geekbang.org/course/detail/211-108549)
