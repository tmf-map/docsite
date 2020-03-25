---
title: Generic Function
sidebar_label: Generic Function
---

## 概述

泛型即不预先确定的数据类型，具体的类型在使用的时候才能确定。本节将学习`ts`中的泛型函数。

在软件工程中，开发定义良好且可重用的组件是非常重要的，因为这确保了程序的灵活性和长期可扩展性。使用泛型可以创建可重用的组件，一个组件可以支持多种类型的数据，而用户就可以根据自己的需要的数据类型来使用组件。

## 泛型函数

概述中泛型的概念比较抽象，我们可以通过一个例子来简化理解。

如下例所示，`identity`函数返回传入的参数，但是这个函数的可重用性很差，只能支持`number`类型。

```js
function identity(arg: number): number {
  return arg;
}
```

为了支持更多的类型，我们可以将参数设置为联合类型或者`any`类型。

```js
function identity(arg: any): any {
  return arg;
}
```

但是如果使用`any`类型就失去类型控制的意义，我们无法得知输入和返回的类型是否相同，这也与`ts`的设计理念背道而驰。

为了解决该问题，我们可以使用泛型中的类型变量`T`，通过类型变量来捕捉函数的传入类型，同时控制函数的返回值类型。如下所示：

```js
function identity<T>(arg: T): T {
  return arg;
}
```

上例中的`identity`可以称作泛型，`T` 可以使用于多个类型，并且不会像`any`一样丢失信息。

调用泛型函数有两种方式，第一种是指定`T`的具体类型：

```js
let output = identity < string > 'myString'; // type of output will be 'string'
```

第二种是利用类型推断：

```js
let output = identity('myString'); // type of output will be 'string'
```

使用类型推断并没有明确传入的具体类型，编译器通过查看传递参数的类型，然后推断出`T`应该设置的类型。

:::good

推荐使用第二种方式调用泛型函数，类型推断不仅可以简化代码，而且还可以提高代码的可读性。

:::

### 创建泛型函数

泛型函数和普通函数的定义一样，除了通过上面的方法定义外，还可以通过泛型函数表达式、类型别名以及接口的形式来定义泛型函数。例如使用泛型类型别名来定义：

```js
type Id = <T>(arg: T) => T;

let myID: Id = function(arg) {
  return arg;
};
```

### 多类型变量

我们可以使用不同的名称指定多个类型变量，如下所示：

```js
function displayType<T, U>(id: T, name: U): void {
  console.log(typeof id + ', ' + typeof name);
}

displayType < number, string > (1, 'Steve'); // number, string
```

我们也可以只让部分参数使用类型变量：

```js
function displayType<T>(id: T, name: string): void {
  console.log(typeof id + ', ' + typeof name);
}

displayType < number > (1, 'Steve'); // number, string
```

### 类型变量的属性和方法

使用泛型时，类型变量`T`是一个通用类型，传入的参数有可能是`ts`类型中的任何类型。

```js
function loggingIdentity<T>(arg: T): T {
  arg.toString(); // OK
  arg.length; //  Error: T doesn't have .length
  console.log(arg);
}
```

在上例中，`arg.toString()`在编译的时候不会出错，而`arg.length`却会报错，这是因为任何类型都包含`toString()`方法，而`length`方法却只被特定的类型所拥有。

当我们参数类型`T`改为`T`类型的数组时，代码将可以编译成功。

```js
function loggingIdentity<T>(arg: T[]): T[] {
  arg.toString(); // OK
  arg.length; //  Error: T doesn't have .length
  console.log(arg);
}
```

:::warn

通过上面的两个例子我们可以看出，在使用泛型类型并调用类型特定的方法或属性时要慎重使用。

:::

### 类型约束

上面提到在使用泛型类型并调用类型特定的方法或属性时要慎重使用，因为函数参数调用的方法不一定适用于任何类型。而泛型约束的作用就是约束`T`的类型。如下例所示：

```js
class Person {
    firstName: string;
    lastName: string;

    constructor(fname:string,  lname:string) {
        this.firstName = fname;
        this.lastName = lname;
    }
}

function display<T extends Person>(per: T): void {
    console.log(`${ per.firstName} ${per.lastName}` );
}
var per = new Person("Bill", "Gates");
display(per); //Output: Bill Gates

display("Bill Gates");//Compiler Error
```

例子中`display`函数是一个泛型函数，类型变量`T`继承了`Person`类，因此函数参数类型必须时`Person`的实例或者继承自`Person`类，否则将会提示出错。

## 参考连接

- [TypeScript - Generic, by tutorialsteacher](https://www.tutorialsteacher.com/typescript/typescript-generic)
- [typeScript handbook](https://www.typescriptlang.org/docs/handbook/generics.html)
- [TypeScript 开发实战，by 梁宵](https://time.geekbang.org/course/intro/211)
