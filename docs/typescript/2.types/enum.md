---
title: Enum
sidebar_label: Enum
---

枚举（Enum）类型经常被用于取值在一定范围内的场景，比如一周只能有七天，[角色权限设计](https://www.cnblogs.com/bjxingch/articles/6561236.html)等。枚举类型变量使用`enum`字段来定义，枚举成员的值可以是数字或者字符串，并且枚举成员是只读的。

枚举按照类型划分，主要分为以下三种：

- [数字枚举（Numeric enum）](/docs/typescript/1.types/enum#数字枚举)
- [字符串枚举（String enum）](/docs/typescript/1.types/enum#字符串枚举)
- [异构枚举（Heterogeneous enum）](/docs/typescript/1.types/enum#异构枚举)

## 数字枚举

### 自动递增

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

上述定义了一个简单的数字枚举，**对于没有初始化的数字枚举类型来说，第一个枚举成员会被赋值为`0`，后面的成员值为其上一个枚举成员的值加`1`**。

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

由例子的结果可以看出，未手动赋值的枚举成员会接着上一个枚举成员递增。

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

通过上面的代码可以看出，当手动赋值的枚举成员数字较小时，可能会被后面成员值覆盖，此时通过值只能找到后面的枚举成员。

:::caution

当枚举成员较多时，如果对枚举成员赋值较小，很可能会被后面的枚举成员值覆盖。

:::

### 反向映射

正向映射是指由`key`求出`value`的过程，而反向映射是指由`value`求出`key`的过程。数字枚举除了具有上述功能外，还具有**反向映射**功能，如下所示：

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

console.log(Days['Sun']); //(1)
console.log(Days[Days['Sun']]); //(2)
console.log(Days[0]); //(3)
```

运行结果为：

```
0
Sun
Sun
```

由上面的例子可以看出，语句（1）中由`key`值`'Sun'`求出属性值`0` 属于正向映射，而（2）中由`key`值`Days['Sun']`求出属性值`'Sun'`属于反向映射，其中 `Days['Sun']`===`0`。

是不是很不解为什么数字枚举可以**反向映射**？其实这和数字枚举的内部实现有关。上面的式子可以编译为：

```js
var Days;
(function (Days) {
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

由上面编译的结果可知，对于枚举中的`Days`是由`JS`中的对象实现的。`Days`的枚举成员和对应的值分别作为 Days 的`key: value`，然后又作为`value: key`存到`Days`对象中，实现了反向映射功能。

## 字符串枚举

字符串枚举要求每一个枚举成员的值都必须是字符串，或者是对其它字符串枚举成员的引用。

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
(function (Direction) {
  Direction['Up'] = 'UP';
  Direction['Down'] = 'DOWN';
  Direction['Left'] = 'LEFT';
  Direction['Right'] = 'RIGHT';
})(Direction || (Direction = {}));
```

与数字枚举相比，字符串枚举没有**反向映射**，但是字符串枚举可以提供一个运行时更有意义的值。

## 异构枚举

异构枚举即枚举成员既包含字符串成员，又包括数字成员。如下所示：

```ts
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'YES'
}
```

:::caution

除非业务上真的需要这种枚举类型，否则不建议使用异构枚举。

:::

## 枚举成员

在枚举类型中，枚举成员通常分为**常数项**和**计算所得项**两种。下面的例子展示了两种成员类型的用法：

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

上例注释`computed member`之前的枚举成员都是常数项，而之后的枚举成员为计算所得项，那么如何判断常数项和计算所得项呢？

**判断条件：**

- 枚举成员初始化未赋值
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

:::tip

在枚举中，计算所得项后面不可以定义未赋值的项

:::

## 常量枚举

在某些需求很严格的情况下，为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用**常量枚举**，**常量枚举**是指使用 `const enum` 定义的枚举类型，**它的枚举成员都是常数项**，如下所示：

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

:::tip

如果枚举成员都是常数项时，可以考虑使用`const enum`来定义枚举变量。

:::

## 作为变量类型

在`TS`中，枚举和枚举成员可以作为一种类型存在，即**已经定义好的枚举变量和枚举成员可以作为变量类型来定义变量**。例如在函数中，**枚举类型变量可以作为函数的返回类型**，如下例所示：

```ts
enum PrintMedia {
  Newspaper = 1,
  Newsletter,
  Magazine,
  Book
}

function getMedia(mediaName: string): PrintMedia {
  if (mediaName === 'Forbes' || mediaName === 'Outlook') {
    return PrintMedia.Magazine;
  }
}

let mediaType: PrintMedia = getMedia('Forbes'); // returns Magazine
```

在上面的例子中，我们声明了一个枚举`PrintMedia`，然后我们定义了一个参数为`string`类型的函数`getMedia`，当函数中的`if`语句判断为真时，函数调用后的返回值为枚举类型`PrintMedia`。

使用枚举定义变量时，**不同的枚举定义的变量是不可以比较的**，例如：

```ts
enum E {
  a,
  b
}
enum F {
  a,
  b
}

let e: E = 3;
let f: F = 3;

console.log(e === f); // This condition will always return 'false' since the types 'E' and 'F' have no overlap.
```

上例中，虽然变量`E`和变量`F`的成员相同，但是用两者定义变量时，可以看作两种不同的类型。当两者之间的比较时，编译器会报错。

此外即使同一个枚举中不同枚举成员定义的变量也是不可以比较的。

## 参考链接

1. [TypeScipt Document](https://www.tslang.cn/docs/handbook/enums.html)
2. [TypeScript 入门教程，by xcatliu](https://ts.xcatliu.com/advanced/enum#wai-bu-mei-ju)
3. [TypeScript in action, by Liang Xiao](https://time.geekbang.org/course/detail/211-108549)
4. [TypeScript Data Type - Enum, by Tutorials Teacher](https://www.tutorialsteacher.com/typescript/typescript-enum)
