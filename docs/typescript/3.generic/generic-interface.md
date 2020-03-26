---
title: Generic Interface
---

## 泛型接口

泛型不仅可以应用在函数中，还可以在接口中使用，本节将通过以下三个方面介绍泛型接口的应用：

- 泛型接口作为对象类型
- 泛型接口作为对象类型
- 类实现泛型接口

### 泛型接口作为对象类型

之前我们提到使用对象接口可以作为变量类型来定义变量。与之类似，泛型接口同样也可以被用来定义变量类型。如下所示：

```ts
interface KeyPair<T, U> {
  key: T;
  value: U;
}

let kv1: KeyPair<number, string> = {key: 1, value: 'Steve'}; // OK
let kv2: KeyPair<number, number> = {key: 1, value: 12345}; // OK
```

在上例中定义了一个泛型接口`KeyPair`，并通过`<T, U>`来约束接口成员`key`和`value`的类型。当使用`KeyPair`定义变量时，需要分别为变量类型`T`和`U`赋予具体的类型，如`<number, string>`。

泛型接口中的类型变量`<T, U>`是可以接受默认值的。当没有为`<T, U>`指定具体的类型时，它们将使用默认类型。例如：

```ts
interface KeyPair<T = number, U = string> {
  key: T;
  value: U;
}

let kv1: KeyPair = {key: 1, value: 'Steve'}; // OK
```

### 泛型接口作为函数类型

与定义函数接口相似，使用泛型定义函数接口如下所示：

```ts
interface KeyValueProcessor<T, U> {
  (key: T, val: U): void;
}
```

上例中定义了泛型接口`KeyValueProcessor`，其定义了一个匿名的泛型函数签名`(key: T, val: U): void`，这使我们能够使用匹配该签名的任何函数。

```ts
function processNumKeyPairs(key: number, value: number): void {
  console.log('processNumKeyPairs: key = ' + key + ', value = ' + value);
}

function processStringKeyPairs(key: number, value: string): void {
  console.log('processStringKeyPairs: key = ' + key + ', value = ' + value);
}

let numKVProcessor: KeyValueProcessor<number, number> = processNumKeyPairs;
numKVProcessor(1, 12345); //Output: processNumKeyPairs: key = 1, value = 12345

let strKVProcessor: KeyValueProcessor<number, string> = processStringKeyPairs;
strKVProcessor(1, 'Bill'); //Output: processStringKeyPairs: key = 1, value = Bill
```

上面的代码中定义了函数`processNumKeyPairs`和`processStringKeyPairs`，因为定义的函数与泛型`KeyValueProcessor`签名相匹配，可以将函数分别赋值给`numKVProcessor`和`strKVProcessor`。

但是上面的代码依旧有些缺陷，函数`processNumKeyPairs`和`processStringKeyPairs`其实可以利用泛型被合并成一个泛型函数，这样就不必为了不同的数据类型定义多份函数。如下所示：

```ts
function processKeyPairs<T, U>(key: T, value: U): void {
  console.log(`processKeyPairs: key = ${key}, value = ${value}`);
}

let numKVProcessor: KeyValueProcessor<number, number> = processKeyPairs;
numKVProcessor(1, 12345);

let strKVProcessor: KeyValueProcessor<number, string> = processKeyPairs;
strKVProcessor(1, 'Bill');
```

## 类实现泛型接口

与类实现接口相似，类也可以实现泛型接口。

```ts
interface IKeyValueProcessor<T, U> {
  process(key: T, val: U): void;
}

class kvProcessor implements IKeyValueProcessor<number, string> {
  process(key: number, val: string): void {
    console.log(`Key = ${key}, val = ${val}`);
  }
}

let proc: IKeyValueProcessor<number, string> = new kvProcessor();
proc.process(1, 'Bill');
```

由上例可知，我们使用`kvProcessor`类实现了接口`IKeyValueProcessor`，**同时确定了接口参数`T`和`U`的类型**。`kvProcessor`类的内部必须实现接口中定义的函数。在实例化`kvProcessor`类时，类的实例为泛型接口类型`IKeyValueProcessor`。

## 参考链接

- [TypeScript Generic Interface - Tutorials Teacher](https://www.tutorialsteacher.com/typescript/typescript-generic-interface)
- [typeScript handbook](https://www.typescriptlang.org/docs/handbook/generics.html)
- [TypeScript 开发实战，by 梁宵](https://time.geekbang.org/course/intro/211)
