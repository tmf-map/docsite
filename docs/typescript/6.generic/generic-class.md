---
title: Generic Class
---

## 泛型类

`ts`支持创建泛型类来约束类中成员的类型，并提高类的可扩展性。如下例所示：

```ts
class KeyValuePair<T, U> {
  private key: T;
  private val: U;

  setKeyValue(key: T, val: U): void {
    this.key = key;
    this.val = val;
  }

  display(): void {
    console.log(`Key = ${this.key}, val = ${this.val}`);
  }
}

let kvp1 = new KeyValuePair<number, string>();
kvp1.setKeyValue(1, 'Steve');
kvp1.display(); //Output: Key = 1, Val = Steve

let kvp2 = new KayValuePair<string, string>();
kvp2.SetKeyValue('CEO', 'Bill');
kvp2.display(); //Output: Key = CEO, Val = Bill
```

例子中使用泛型创建了泛型类`KeyValuePair`，`KeyValuePair`的类型变量为`<T, U>`。在创建`KeyValuePair`类的实例时，需要为`T`和`U`传入对应的参数类型`new KeyValuePair<number, string>()`。

## 泛型类实现泛型接口

在[Generic Interface](/docs/typescript/6.generic/generic-interface#类实现泛型接口)中我们举了一个类实现泛型接口的例子，但该类只能实现`IKeyValueProcessor<number, string>`类型的接口，扩展性很差。为了增加类的可扩展性，可以用泛型类来改造`kvProcessor`类：

```ts
interface IKeyValueProcessor<T, U> {
  process(key: T, val: U): void;
}
// 改造后的类
class kvProcessor<T, U> implements IKeyValueProcessor<T, U> {
  process(key: T, val: U): void {
    console.log(`Key = ${key}, val = ${val}`);
  }
}

let proc: IKeyValueProcessor<number, string> = new kvProcessor();
proc.process(1, 'Bill');
```

由改造后的代码可知，泛型类`kvProcessor`实现了泛型接口`IKeyValueProcessor`，但是没有为`<T, U>`赋予特定的类型，因此`kvProcessor`类可以实现`T`和`U`是任何类型的泛型接口。因为`proc`是属于接口类型，所以`new kvProcessor`后不用添加`<number, string>`。

## 参考资料

- [TypeScript Generic Class - Tutorials Teacher](https://www.tutorialsteacher.com/typescript/typescript-generic-class)
- [typeScript handbook](https://www.typescriptlang.org/docs/handbook/generics.html)
