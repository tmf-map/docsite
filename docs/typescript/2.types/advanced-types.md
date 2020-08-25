---
title: Advanced Types
---

高级类型，即 TypeScript 为了保障语言的灵活性，所引入的一些语言特性，这些特性将有助于我们应对复杂多变的开发场景，让类型变得更加灵活多变，也可以将其看成是类型通过某种“运算”，产生新的类型。

## 交叉类型（Intersection Types）

交叉类型是将多个类型合并为一个新类型，新的类型具有这多个类型的所有属性，我们可以通过这种方式获取所需的所有类型的特性。例如：

```ts
interface DogInterface {
  run(): void;
}

interface CatInterface {
  climb(): void;
}

let pet: DogInterface & CatInterface = {
  // pet 具有 DogInterface 和 CatInterface 的所有属性
  run() {},
  climb() {}
};
```

`DogInterface & CatInterface` 类型同时是 `DogInterface` 和 `CatInterface` 类型，则这个类型的对象同时拥有了这两种类型的所有属性。交叉类型多用于 `mixins` 和其它不适合典型的面向对象模型的地方。

:::tip

虽然从名称上看交叉类型取的是类型交集，实际上取的是类型的**并集**。

:::

## 联合类型（Union Types）

联合类型与交叉类型类似，都可以拥有多个类型，但是联合类型声明的类型并不确定，可以是几种类型之一。用竖线 `|` 分隔每个类型，比如：

```ts
let a: number | string | boolean = 'abc';
```

所以 `a` 可以是 `number`， `string`，或 `boolean` 任意一种类型。

### 数字/字符串字面量联合类型

有时候我们不仅需要限制变量的类型，还需要限制变量在某一个具体的范围内，这里我们就需要用到字面量的联合类型，比如：

```ts
type Gender = 'male' | 'female';
type Score = 1 | 2 | 3 | 4 | 5; // 电影打分
```

### 对象联合类型

```ts
interface DogInterface {
  run(): void;
}

interface CatInterface {
  climb(): void;
}

class Dog implements DogInterface {
  run() {}
  eat() {}
}
class Cat implements CatInterface {
  climb() {}
  eat() {}
}

let pet: Dog | Cat = new Cat();
pet.eat(); // OK
pet.climb(); // OK
pet.run(); // Error: Property 'run' does not exist on type 'Cat'.

function getPet(isDog) {
  let pet = isDog ? new Dog() : new Cat();
  pet.eat(); // OK
  pet.climb(); // Error: Property 'climb' does not exist on type 'Dog | Cat'.
  pet.run(); // Error: Property 'run' does not exist on type 'Dog | Cat'.
  return pet;
}
```

:::tip

虽然从名称上看联合类型是取所有类型的并集，在以上例子中实际上只能访问类型的**交集**。

:::

### 可区分的联合类型

这种类型本质上讲是结合了联合类型和字面量类型的一种类型保护方法，它的核心思想是如果是一个类型是多个类型的联合类型，并且每个类型之间有一个公共的属性，那我们就可以凭借这个公共属性创建类型保护区块，比如：

```ts
interface Square {
  category: 'square';
  size: number;
}
interface Rectangle {
  category: 'rectangle';
  width: number;
  height: number;
}
type Shape = Square | Rectangle;

function area(s: Shape) {
  switch (s.category) {
    case 'square': // 区块1
      return s.size * s.size;
    case 'rectangle': // 区块2
      return s.width * s.height;
  }
}
```

通过两个接口的公有属性，我们就可以创建不同的类型保护区块。以上代码不做升级的话，是没有问题的，但是如果以后某一天我们需要加入新的类型，比如：

```ts
interface Circle {
  category: 'circle';
  radius: number;
}
type Shape = Square | Rectangle | Circle;
```

加入新的类型之后，`area` 函数也没有报错，但是如果运行以下代码，将会是 `undefined`：

```ts
area({category: 'circle', radius: 3});
```

那如何让错误能够提前显示呢？这里有两种方法：

#### 方法一：明确函数的返回值类型

```ts
function area(s: Shape): number {}
```

当返回值是 `undefined` 的时候会立即报错提示

#### 方法二：利用 `never` 类型

```ts
function area(s: Shape) {
  switch (
    s.category // 在某些代码中用 typeof 也是同理
  ) {
    case 'square': // 区块1
      return s.size * s.size;
    case 'rectangle': // 区块2
      return s.width * s.height;
    default:
      return ((e: never) => {
        throw new Error(e);
      })(s); // Error: Argument of type 'Circle' is not assignable to parameter of type 'never'.
  }
}
```

检查 `s` 是不是 `never` 类型，如果是`never` 类型，则说明前面的所有分支都被覆盖了，这个分支就永远不会走到。如果不是 `never` 类型，则说明前面的分支有遗漏，此时我们再补上 circle 分支即可。

:::tip

交叉类型和联合类型的区别：

| 交叉类型 | 联合类型 |
| --- | --- |
| 适合做对象的混入 | 使类型具有一定的**不确定性**，从而增强代码的灵活性 |
| 每次都是多个类型的合并类型 | 一次只能是一种类型 |

联合类型灵活度较高，在实际项目中，使用场景比交叉类型广泛得多。

:::

## 索引类型（Index types）

介绍索引类型之前，我们先了解一下 JS 中会用到的 `pluck` 函数，也可以叫做 `getValuesByKeys`：从对象中选取一些属性的值组成一个新的数组。

```ts
function pluck(obj: any, keys: string[]) {
  return keys.map(n => obj[n]);
}

let obj = {a: 1, b: 2, c: 3};
pluck(obj, ['a', 'b']); // [1, 2]
pluck(obj, ['e', 'b']); // [undefined, undefined] No Error
```

当取 `obj` 中不存在的属性时，TS 并没有报错，那怎么样才能让 TS 能够对其进行类型约束呢？这里就需要用到索引类型，我们先了解以下关于索引类型的几个概念：

### 索引查询操作符 `keyof T`

```ts
keyof T // 表示对象 T 的所有公共属性的字面量的联合类型
```

比如：

```ts
interface Obj {
  a: number;
  b: string;
}

let key: keyof Obj; // 即 let key: "a" | "b"
```

### 索引访问操作符 `T[K]`

```ts
T[K]; // 表示对象 T 的属性 K 所代表的类型
```

比如：

```ts
let value: Obj['a']; // 即 let value: number
```

### 泛型约束 `T extends U`

```ts
T extends U // 表示泛型变量 T 可以继承类型 U 来获得某些属性
```

清楚了以上三个概念后，我们现在就来改造一下 `pluck` 函数，首先我们想把它改造成一个泛型函数，并对其做一些约束：

`keys` 里面的元素只能是 `obj` 具有的属性

```ts
function pluck<T, K>(obj: T, keys: K[]) {
  return keys.map(n => obj[n]);
}
```

然后再对 K 进行进一步约束：

```ts
function pluck<T, K extends keyof T>(obj: T, keys: K[]) {
  return keys.map(n => obj[n]);
}
```

再对函数返回值进行约束，首先是一个数组 `[]`，其次元素类型是属性 K 对应的类型，即 `T[K]`：

```ts
function pluck<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(n => obj[n]);
}
```

这样我们就通过索引类型把 `pluck` 函数改造好了，现在再 get `obj` 中不存在的属性时，TS 的类型检查就会及时报错：

```ts
pluck(obj, ['e', 'b']); // Error: Type '"e"' is not assignable to type '"a" | "b" | "c"'.
```

由此可以看到，索引类型可以实现对象属性的查询和访问，然后再配合泛型约束就能够使我们建立对象、对象属性以及属性值之间的约束关系。

### 索引签名（Index Signatures）

JavaScript 中通过索引访问对象的时候，传入的索引如果不是字符串类型，是对象类型，会先隐式地调用 `toString` 方法将索引转换为字符串类型，然后再做索引。

而在 TypeScript 中，如果传入的索引是对象类型，则会抛出下面示例中的错误，所以用户必须明确的写出 `toString()`方法。

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

## 映射类型（Mapped Types）

### 含义

通过映射类型我们可以从一个现有的类型衍生出一个新的类型。在映射类型里，新类型以相同的形式去转换旧类型里每个属性。 例如，把一个类型的所有属性都变成可选或只读：

```ts
interface Obj {
  a: string;
  b: number;
  c: boolean;
}
```

我们想把以上接口的所有属性变为只读，有一个快速的方法，首先定义一个新的类型别名：

```ts
type ReadonlyObj = Readonly<Obj>;
```

这个类型别名由 TS 内置的泛型接口衍生而来，接口的名称就是 `Readonly`，接口要传入的类型就是我们指定的 `Obj`，此时，我们会发现，新的成员和旧的成员都是相同的，但所有的属性变成了 `readonly`。

### `Readonly<T>`

我们再看下其在 TS 内置的类库是怎么实现的：

```ts
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

`Readonly` 是一个泛型接口，而且是一个可索引类型的泛型接口，它的索引签名是 `[P in keyof T]`，其中：

- `keyof T` 是索引类型的查询操作符，它表示类型 T 的所有属性的联合类型
- `P in` 相当于执行了一次 `for-in` 操作，它会将变量 P 依次地绑定到 T 的所有属性上
- 索引签名的返回值就是一个索引访问操作符 `T[P]`，表示属性 P 所指定的类型
- 最后再加上 `readonly` 就把所有属性变成了只读

### `Partial<T>`

Partial 可以把一个接口的所有属性都变成可选的：

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

```ts
type OptionalObj = Partial<Obj>;
```

原理和 Readonly 的实现基本是一样的，只不过把 `readonly` 变成了 `?`。

### `Pick<T, K extends keyof T>`

Pick 映射类型可以抽取 Object 的一些子集：

```ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

第一个参数是 T，代表我们要抽取的对象，第二个参数是 K，K 有一个约束即来自 T 所有属性字面量的联合类型，新的类型属性一定要从 K 中选取，

```ts
type PickObj = Pick<Obj, 'a' | 'b'>;
// equals
type PickObj = {
  a: number;
  b: string;
};
```

我们可以看到 a 和 b 就会单独抽取出来 形成一个新的类型。

:::tip

`Readonly`, `Partial`, `Pick` 只会作用于 Obj 的属性，而不会引用新的属性，它们仅存在修饰符上的差异，源类型与新类型之间有兼容关系。官方统称为：`同态（homomorphic）转换`。

:::

### `Record<K extends keyof any, T>`

下面再介绍一种映射类型，它会创建一些新的属性：

```ts
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

```ts
type RecordObj = Record<'x' | 'y', Obj>;
// equals
type RecordObj = {
  x: Obj;
  y: Obj;
};
```

第一个参数 `x` 和 `y` 不来自于 Obj，是一个新的类型，第二个参数是一个已知的类型 Obj，这样新的类型有一些属性，由 Record 的第一个参数所指定，这些属性的类型是一个已知的类型，由第二个参数所指定。这种类型就是一个非同态类型。

:::tip

Record 产生了新的属性，属于`非同态（non-homomorphic）转换`。

:::

:::tip

映射类型的本质是一种`预先定义的泛型接口`，通常还会结合索引类型获取对象的属性和属性值，从而将一个对象映射成所需要的结构。

:::

## 条件类型（Conditional Types）

### 基本条件类型

[TypeScript 2.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html) 引入了条件类型，即由条件表达式决定具体的类型：

```ts
T extends U ? X : Y
```

语义类似于三目运算符，若 `T` 是 `U` 的子类型，则为 `X` 类型，否则就是 `Y` 类型。条件类型使得类型具有不唯一性，同样也增加了语言的灵活性。例如：

```ts
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
```

这里我们定义一个类型别名：`TypeName`，它是一个条件类型，而且是一个条件类型的嵌套，它会依次判断 T 的类型，然后返回不同的字符串。

```ts
type T1 = TypeName<string>; // type T1 = "string"
type T2 = TypeName<string[]>; // type T1 = "object"
```

:::tip

如果条件的真假无法确定（无法确定 `T` 是不是 `U` 的子类型），此时为`X | Y`类型，因为条件类型无非两种可能类型，这样可以确保其一定合法。

// TODO make below example simpler  
如果 T 或 U 含有类型变量，就要等到类型变量都有对应的具体类型后才能得出条件类型的结果。例如：

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

其中 a 的类型为`U extends Foo ? string : number`（即条件不确定的情况），因为`f(x)`中`x`的类型 U 尚不确定，无从得知`U`是不是`Foo`的子类型。但条件类型无非两种可能类型，所以`let b: string | number = a;`一定是合法的（无论`x`是什么类型）。

:::

### 分配式条件类型

分配式条件类型（Distributive conditional types）就是类型 T 如果是一个联合类型情况下，这时候结果类型会变成多个条件类型的联合类型：

```ts
(A | B) extends U ? X : Y
// 等价于
(A extends U ? X : Y) | (B extends U ? X : Y)
```

:::tip

分配式条件类型满足`分配律`。

:::

```ts
type T3 = TypeName<string | string[]>; // type T3 = "string" | "object"
```

利用分配式条件类型特性可以帮助我们实现一些类型的复杂运算，例如提取某些类型，排除某些类型等。下面介绍 5 个常用的官方预置(`lib.d.ts`)条件类型。

### `Exclude<T, U>`

Exclude 的作用就是从类型 T 中过滤掉可以赋值给类型 U 的类型。定义如下：

```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```

```ts
type T4 = Exclude<'a' | 'b' | 'c', 'a' | 'e'>; // type T4 = "b" | "c"

// 分解步骤
// Step1: Exclude<"a", "a" | "e"> | Exclude<"b", "a" | "e"> | Exclude<"c", "a" | "e">
// Step2: never | "b" | "c"
// Step3: "b" | "c"
```

:::tip

使用 Exclude 这个名字是为了避免破坏已经定义了 Diff 的代码，并且这个名字能更好地表达类型的语义。没有增加`Omit<T, K>类型`，是因为它可以很容易地用`Pick<T, Exclude<keyof T, K>>`来表示。

:::

### `NonNullable<T>`

我们可以基于 Exclude 再作扩展，过滤掉类型中不需要的类型，比如说 `undefined` 和 `null`:

```ts
/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;
```

```ts
type T5 = NonNullable<string | number | undefined | null>; // type T5 = string | number
```

### `Extract<T, U>`

Extract 和 Exclude 正好相反：

```ts
/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;
```

```ts
type T6 = Extract<'a' | 'b' | 'c', 'a' | 'e'>; // type T6 = "a"
```

### `ReturnType<T>`

ReturnType 和以上实现不太一样，它用来获取函数的返回值类型：

```ts
/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

```ts
function f1(s: string) {
  return {a: 1, b: s};
}

type T7 = ReturnType<() => string>; // string
type T8 = ReturnType<(s: string) => void>; // void
type T9 = ReturnType<<T>() => T>; // {}
type T10 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T11 = ReturnType<typeof f1>; // { a: number, b: string }
type T12 = ReturnType<any>; // any
type T13 = ReturnType<never>; // any
type T14 = ReturnType<string>; // Error
type T15 = ReturnType<Function>; // Error
```

在条件类型的 extends 子句中，可以通过`infer`关键字引入一个待推断或者延迟推断的类型变量，例如：

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

上例中引入了类型变量`R`表示函数返回类型，并在 True 分支中引用，从而提取出返回类型。

### `InstanceType<T>`

InstanceType 用来获取构造函数的返回值类型：

```ts
/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;
```

```ts
class C {
  x = 0;
  y = 0;
}

type T16 = InstanceType<typeof C>; // C
type T17 = InstanceType<any>; // any
type T18 = InstanceType<never>; // any
type T19 = InstanceType<string>; // Error
type T20 = InstanceType<Function>; // Error
```

## 小结

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/advanced-types.png' alt='advanced-types'/>

## References

1. [TypeScript 中文网: 高级类型](https://www.tslang.cn/docs/handbook/advanced-types.html)
2. [TypeScript official docs: Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
3. [TypeScript official docs: TypeScript 2.8 - Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types)
4. [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/)
