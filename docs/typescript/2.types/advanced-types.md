---
title: Advanced Types
---

## 交叉类型（Intersection Types）

交叉类型是将多个类型合并为一个类型。 我们可以把现有的多种类型叠加到一起成为一种类型，以获取所需的所有类型的特性。 例如，`Person & Serializable & Loggable`类型同时是`Person`、`Serializable`和`Loggable`类型，则这个类型的对象同时拥有了这三种类型的所有成员。交叉类型多用于 `mixins` 和其它不适合典型的面向对象模型的地方。下面的例子简要地展示了如何创建一个 mixin：

```ts
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result;
}

let jim = extend({ name: 'Jim' }, { log(): ... });
let n = jim.name;
jim.log();
```

## 联合类型（Union Types）

联合类型与交叉类型类似，都可以拥有多个类型。区别是：**联合类型一次只能是一种类型；而交叉类型每次都是多个类型的合并类型**。联合类型表示一个值可以是几种类型之一。用竖线 `|` 分隔每个类型，所以 `number | string | boolean`表示一个值可以是 `number`， `string`，或 `boolean`。

联合类型在实际项目中，使用场景比交叉类型广泛得多。

- 字符串填充：

```ts
function padLeft(value: string, padding: number | string) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }
  if (typeof padding === 'string') {
    return padding + value;
  }
  return value;
}

padLeft('Hello world', 4);
```

- 常见例子，常量的联合类型，五分制考试打分：

```ts
type Scores = 1 | 2 | 3 | 4 | 5;

function rating(score: Scores) {
  console.log(`Set score ${score}`);
}

rating(3);
```

## 索引类型（Index types）

使用索引类型，编译器就能够检查使用了动态属性名的代码。 例如，一个常见的 JavaScript 模式是从对象中选取属性的子集。

```js
function pluck(o, names) {
  return names.map(n => o[n]);
}
```

`pluck函数`能从`对象o`中摘出来`names`指定的那部分属性，存在 2 个类型约束：

- 参数`names`中只能出现`o`具有的属性

- 返回类型取决于参数`o`所包含的属性值的类型

这两条约束都可以通过泛型来描述。

```ts
interface pluck {
  <T, K extends keyof T>(o: T, names: K[]): T[K][];
}

let obj = {a: 1, b: '2', c: false};
// 参数检查
// Type 'n' is not assignable to type '"a" | "b" | "c"'.
pluck(obj, ['n']);
// 返回类型推断
let xs: (string | number)[] = pluck(obj, ['a', 'b']);
```

下面的例子展示了如何通过`索引类型查询`和`索引访问`操作符，在 TypeScript 里使用`pluck`函数：

```ts
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
  name: string;
  age: number;
}
let person: Person = {
  name: 'Jarid',
  age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
```

编译器会检查字符串`'name'`是否真的是`Person`的一个属性。 这个例子中还引入了几个新的类型操作符。 首先是`keyof T`，**索引类型查询操作符**。对于任何类型 T，`keyof T`的结果为 `T上已知的公共属性名的联合`。 例如：

```ts
let personProps: keyof Person; // 'name' | 'age'
```

此时`keyof Person`与 `'name' | 'age'` 是可以相互替换的，但是如果添加了其它的属性到 Person，例如 `address: string`，那么 `keyof Person` 会自动变为 `'name' | 'age' | 'address'`。可以在诸如 pluck 这样的通用上下文中使用 keyof，在这种情况下,使用之前可能无法提前知道属性名称，但编译器会检查是否传入了正确的属性名给`pluck`：

```ts
pluck(person, ['age', 'unknown']); // error, 'unknown' is not in 'name' | 'age'
```

第二个操作符是 `T[K]`， **索引访问操作符**。在这里，类型语法反映了表达式语法。 这意味着 `person['name']` 具有类型 `Person['name']` — 在上面的例子里则为 `string类型`。但是，就像索引类型查询一样，你可以在普通的上下文里使用 `T[K]`，这正是它的强大所在。 你只要确保类型变量 `K extends keyof T`就可以了。 例如下面 `getProperty函数`的例子：

```ts
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]; // o[name] is of type T[K]
}
```

`getProperty`里的 `o: T`和 `name: K`，意味着 `o[name]: T[K]`。当返回 `T[K]`的结果，编译器会实例化键的真实类型，因此`getProperty`的返回值类型会随着需要的属性改变。

```ts
let name: string = getProperty(person, 'name');
let age: number = getProperty(person, 'age');
let unknown = getProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'
```

### 索引签名（Index types and index signatures）

JavaScript 中通过索引访问对象的时候，传入的索引如果不是字符串类型，是对象类型，会先隐式地调用`toString`方法将索引转换为字符串类型，然后再做索引。而在 TypeScript 中，如果传入的索引是对象类型，则会抛出下面示例中的错误，所以用户必须明确的写出 `toString()`方法。

```ts
const obj = {
  toString() {
    return 'Hello';
  }
};

const foo: any = {};

// ERROR: 索引签名必须为 string, number....
foo[obj] = 'World';

// FIX: TypeScript 强制你必须明确这么做：
foo[obj.toString()] = 'World';
```

声明一个索引签名。例如：假设我们想确认存储在对象中的任何内容都符合 `{ message: string }`的结构，可以通过`[index: string]: { message: string }`来实现：

```ts
const foo: {
  [index: string]: {message: string};
} = {};

// 储存的东西必须符合结构
// ok
foo['a'] = {message: 'some message'};

// Error, 必须包含 `message`
foo['a'] = {messages: 'some message'};

// 读取时，也会有类型检查
// ok
foo['a'].message;

// Error: messages 不存在
foo['a'].messages;
```

:::tip

索引签名的名称（如：`{ [index: string]: { message: string } }` 里的 `index` ）除了可读性外，并没有任何意义。例如：如果有一个用户名，可以使用 `{ username: string}: { message: string }`，这有利于下一个开发者理解你的代码。

:::

## 映射类型（Mapped types）

通过映射类型我们可以从一个现有的类型衍生出一个新的类型。在映射类型里，新类型以相同的形式去转换旧类型里每个属性。 例如，把一个类型的所有属性都变成可选或只读：

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
type Partial<T> = {
  [P in keyof T]?: T[P];
};

let obj = {a: 1, b: '2'};
let constObj: Readonly<typeof obj>;
let optionalObj: Partial<typeof obj>;

// 错误 Cannot assign to 'a' because it is a read-only property.
constObj.a = 2;
// 错误 Type '{}' is missing the following properties from type '{ a: number; b: string; }': a, b
obj = {};
// 正确
optionalObj = {};
```

```ts
// 找一个“类型集”
type Keys = 'a' | 'b';
// 通过类型映射得到新类型 { a: boolean, b: boolean }
type Flags = {[K in Keys]: boolean};
```

`[K in Keys]`形式上与索引签名类似，只是融合了`for...in`语法。其中：

- `K`：类型变量，依次绑定到每个属性上，对应每个属性名的类型

- `Keys`：字符串字面量构成的联合类型，表示一组属性名（的类型）

- `boolean`：映射结果类型，即每个属性值的类型

类似的，`[P in keyof T]`只是以`keyof T`为（属性名）类型集，从而对现有类型做映射得到新类型

另外，Partial 与 Readonly 都能够完整保留源类型信息（从输入的源类型中取属性名及值类型，仅存在修饰符上的差异，源类型与新类型之间有兼容关系），称为`同态（homomorphic）转换`，而 Stringify 丢弃了源属性值类型，属于`非同态（non-homomorphic）转换`。

### 由映射类型进行推断

对类型做映射相当于类型层面的包装，现在了解了如何包装一个类型的属性，那么接下来就是如何拆包：

```ts
function unproxify<T>(t: Proxify<T>): T {
  let result = {} as T;
  for (const k in t) {
    result[k] = t[k].get();
  }
  return result;
}

let originalProps = unproxify(proxyProps);
```

拆包推断只适用于同态的映射类型。 如果映射类型不是同态的，那么需要给拆包函数一个明确的类型参数。

`TypeScript 2.8`在`lib.d.ts`里增加了一些预定义的有条件类型：

- `Exclude<T, U>` -- 从 T 中剔除可以赋值给 U 的类型
- `Extract<T, U>` -- 提取 T 中可以赋值给 U 的类型
- `NonNullable<T>` -- 从 T 中剔除 null 和 undefined
- `ReturnType<T>` -- 获取函数返回值类型
- `InstanceType<T>` -- 获取构造函数类型的实例类型

```ts
// 示例：
type T00 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // "b" | "d"
type T01 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // "a" | "c"

type T02 = Exclude<string | number | (() => void), Function>; // string | number
type T03 = Extract<string | number | (() => void), Function>; // () => void

type T04 = NonNullable<string | number | undefined>; // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>; // (() => string) | string[]

function f1(s: string) {
  return {a: 1, b: s};
}

class C {
  x = 0;
  y = 0;
}

type T10 = ReturnType<() => string>; // string
type T11 = ReturnType<(s: string) => void>; // void
type T12 = ReturnType<<T>() => T>; // {}
type T13 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T14 = ReturnType<typeof f1>; // { a: number, b: string }
type T15 = ReturnType<any>; // any
type T16 = ReturnType<never>; // any
type T17 = ReturnType<string>; // Error
type T18 = ReturnType<Function>; // Error

type T20 = InstanceType<typeof C>; // C
type T21 = InstanceType<any>; // any
type T22 = InstanceType<never>; // any
type T23 = InstanceType<string>; // Error
type T24 = InstanceType<Function>; // Error
```

注意：`Exclude类型`是建议的`Diff类型`的一种实现。使用 Exclude 这个名字是为了避免破坏已经定义了 Diff 的代码，并且这个名字能更好地表达类型的语义。没有增加`Omit<T, K>类型`，是因为它可以很容易地用`Pick<T, Exclude<keyof T, K>>`来表示。

## 条件类型（Conditional Types）

TypeScript 2.8 引入了条件类型，增强了表达`非均匀类型映射（non-uniform type mapping）`的能力。条件类型能够根据类型兼容关系（即条件）从两个类型中选出一个：

```ts
T extends U ? X : Y
```

语义类似于三目运算符，若`T`是`U`的子类型，则为`X`类型，否则就是`Y`类型。另外，还有一种情况是条件的真假无法确定（无法确定`T`是不是`U`的子类型），此时为`X | Y`类型，例如：

```ts
declare function f<T extends boolean>(x: T): T extends true ? string : number;

// x 的类型为 string | number
let x = f(Math.random() < 0.5);
```

另外，如果 T 或 U 含有类型变量，就要等到类型变量都有对应的具体类型后才能得出条件类型的结果。例如：

```ts
interface Foo {
  propA: boolean;
  propB: boolean;
}
declare function f<T>(x: T): T extends Foo ? string : number;

function foo<U>(x: U) {
  // a 的类型为 U extends Foo ? string : number
  let a = f(x);
  let b: string | number = a;
}
```

其中 a 的类型为`U extends Foo ? string : number`（即条件不确定的情况），因为`f(x)`中`x`的类型 U 尚不确定，无从得知`U`是不是`Foo`的子类型。但条件类型无非两种可能类型，所以`let b: string | number = a;`一定是合法的（无论`x`是什么类型）

### 可分配条件类型（Distributive conditional types）

`可分配条件类型（distributive conditional type）`中被检查的类型是个`裸类型参数（naked type parameter）`。其特殊之处在于满足`分配律`：

```ts
(A | B | C) extends U ? X : Y
等价于
(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
```

例如：

```ts
// 嵌套的条件类型类似于模式匹配
type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends Function
  ? 'function'
  : 'object';

// T 类型等价于联合类型 string" | "function
type T = TypeName<string | (() => void)>;
```

另外，在`T extends U ? X : Y`中，`X`中出现的`T`都具有`U`类型约束：

```ts
type BoxedValue<T> = {value: T};
type BoxedArray<T> = {array: T[]};
type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;

// T 类型等价于联合类型 BoxedValue<string> | BoxedArray<boolean>
type T = Boxed<string | boolean[]>;
```

上例中`Boxed<T>`的 True 分支具有`any[]`类型约束，因此能够通过索引访问（`T[number]`）得到数组元素的类型

### 条件类型中的类型推断

在条件类型的 extends 子句中，可以通过 infer 声明引入一个将被推断的类型变量，例如：

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

上例中引入了类型变量`R`表示函数返回类型，并在 True 分支中引用，从而提取出返回类型。

### 预定义的条件类型

TypeScript 还内置了一些常用的条件类型：

```ts
// 从 T 中去掉属于 U 的子类型的部分，即之前示例中的 Diff
type Exclude<T, U> = T extends U ? never : T;
// 从 T 中筛选出属于 U 的子类型的部分，之前示例中的 Filter
type Extract<T, U> = T extends U ? T : never;
// 从 T 中去掉 null 与 undefined 部分
type NonNullable<T> = T extends null | undefined ? never : T;
// 取出函数类型的返回类型
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
// 取出构造函数类型的示例类型
type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;
```

## References

1. [TypeScript 中文网: 高级类型](https://www.tslang.cn/docs/handbook/advanced-types.html)
2. [TypeScript official docs: Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
3. [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/)
