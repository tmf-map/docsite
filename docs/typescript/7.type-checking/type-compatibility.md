---
title: Type Compatibility
---

TS 允许将一些不同类型的变量相互赋值，虽然某种程度上可能会产生一些不可靠的行为，但增加了语言的**灵活性**，毕竟它的祖宗 JS 就是靠灵活性起家的，而灵活性已经深入前端的骨髓，有时会不得不做一些妥协。

当一个类型 Y 可以被赋值给另一个类型 X 时，我们就可以说**类型 X 兼容类型 Y**。

```text
X (目标类型) = Y (源类型)
```

## Primitive type compatibility

原始类型的兼容性主要关注三点：

### null/undefined

strict 模式下 `null/undefined` 不可以赋值给任意其他类型，但可以被其他任意类型赋值：

```ts
let str: string = 'str';
let nl = null;

str = nl; // Error: Type 'null' is not assignable to type 'string'.
nl = str; // OK
```

如果想避免以上错误，可以关闭以下选项：

```json title="tsconfig.json" {2}
{
  "strictNullChecks": false
}
```

此时 `s` 是可以被赋值为 `null` 的，我们就可以说 `null` 是 `string` 的子类型：

```ts
let str: string = 'str';
let vd: void;

str = null; // OK
vd = null; // OK
vd = undefined; // OK
```

但是不可以赋值给 `never`：

```ts
let nev: never;
nev = null; // Error: Type 'null' is not assignable to type 'never'.
```

### any

`any` 类型可以赋值给任意其他类型（`never` 类型除外），也可以被其他任意类型赋值：

```ts
let ay: any = 'str';
let num: number;

num = ay; // OK
ay = num; // OK
ay = vd; // OK
```

### never

任何类型都不能赋值给 `never`:

```ts
let nev: never;
let nl = null;

nev = num; // Error
nev = vd; // Error
nev = ay; // Error
nev = nl; // Error
```

但在非 strict 模式下 never 可以赋值给任意值：

```ts
ay = nev; // OK
vd = nev; // OK
num = nev; // OK
nl = nev; // OK
```

以上是最基本的类型兼容，类型兼容还广泛应用于 enum, interface, class, function, generic 等。

## Enum

Enum 的规则比较简单，我们先定义两个 enum：

```ts
enum Fruit {
  Apple,
  Banana
}
enum Color {
  Red,
  Yellow
}
```

enum 和 number 是可以完全兼容的：

```ts
let fruit: Fruit.Apple = 3; // OK
let no: number = Fruit.Apple; // OK
```

enum 之间是完全不兼容的：

```ts
let color: Color.Red = Fruit.Apple; // Error: Type 'Fruit.Apple' is not assignable to type 'Color.Red'.
```

## Interface

后面的讨论我们会减少使用目标类型，源类型，谁兼容谁，这些术语，因为它们比较绕，可能过一会你就忘记了谁是谁。我们先想想怎么用图去表示：

<Img w="270" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/eSIaVD.png' alt='eSIaVD'/>

不同大小的圆圈代表不同的类型或者成员的多少，先记住以上图的轮廓，我们再来看一个最简单的例子：

```ts
interface X {
  a: any;
  b: any;
}

interface Y {
  a: any;
  b: any;
  c: any;
}

let x: X = {a: 1, b: 2};
let y: Y = {a: 1, b: 2, c: 3};
x = y; // OK
y = x; // Error: Property 'c' is missing in type 'X' but required in type 'Y'.
```

从以上例子可以看出 `y` 可以赋值给 `x`，但 `x` 不能赋值给 `y`。其实就是说 `y` 只要具备 `a` 和 `b`，就可以赋值给 `x` 类型。

TypeScript 类型兼容性是基于 Structural Typing 。它是一种仅根据成员来关联类型的方式，而不是由继承自特定的类或实现特定的接口决定，这与 C# 或 Java 的 Nominal Typing 不太一样。

究其原因，TypeScript 类型系统的设计是也基于 JavaScript 代码通常是如何编写的。由于 JS 广泛使用函数表达式和对象字面量等匿名对象，因此利用 Structural 类型系统而不是 Nominal 类型系统可以更自然地表示 JS 中存在的各种类型间的关系。

:::tip

其实本质上就是动态语言的类型检查原则：[鸭式变形法](/docs/typescript/3.interface/as-object-array-type#duck-typing)，总结一下就是：多的可以赋值给少的。

:::

不过还是有点绕，我们可以增强一下最一开始的图：

<Img w="270" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/GqKI1h.png' alt='GqKI1h'/>

## Class

Class 和 Interface 相似，只比较结构，本质上也是 Duck Typing。但是要注意的是静态成员和构造函数是不参与比较的，如果两个类具有相同的实例成员，那么他们实例就可以完全兼容。

```ts
class A {
  constructor(p: number, q: number) {}
  id: number = 1;
}

class B {
  static s = 1;
  constructor(p: number) {}
  id: number = 2;
}

let aa = new A(1, 2);
let bb = new B(1);
aa = bb; // OK
bb = aa; // OK
```

如果含有私有成员，就会导致不能相互兼容：

```ts {4,11}
class A {
  constructor(p: number, q: number) {}
  id: number = 1;
  private name: string = '';
}

class B {
  static s = 1;
  constructor(p: number) {}
  id: number = 2;
  private name: string = '';
}

let aa = new A(1, 2);
let bb = new B(1);

aa = bb; // Error: Types have separate declarations of a private property 'name'.
bb = aa; // Error: Types have separate declarations of a private property 'name'.
```

但即使有私有成员，子类也是可以赋值给父类的：

```ts {17-19}
class A {
  constructor(p: number, q: number) {}
  id: number = 1;
  private name: string = '';
}

class B {
  static s = 1;
  constructor(p: number) {}
  id: number = 2;
  private name: string = '';
}

let aa = new A(1, 2);
let bb = new B(1);

class C extends A {
  gender: string = ''；
}

let cc = new C(1, 2);
aa = cc; // OK
cc = aa; // Error: Property 'gender' is missing in type 'A' but required in type 'C'.
```

如果子类中含有其它属性或方法，父类是不可以赋值给子类的，因为如果子类实例调用该方法会取不到而报错。

如果子类实际上并没有扩展父类，那么彼此之间其实是可以相互兼容的。

:::tip

Class 的类型兼容其实也是 Duck Typing，需要注意的是**静态成员**和**构造函数**是不参与比较的，如果有私有成员，那么只有父类和子类之间是可以兼容的，如果子类扩写了父类，还是遵循“**多的可以赋值给少的**”原则，即子类实例可以赋值给父类实例。

:::

Duck Typing/Structual Typing 其实也包含父子类继承，“**多的可以赋值给少的**”的原则同样适用，子类实例可以赋值给父类实例，父类是少的（left），子类是多的（right），如下图所示：

<Img w="270" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cAt667.png' alt='cAt667'/>

## Function

### Bivariance

要了解函数的类型兼容我们先了解一个很烧脑的概念，看以下例子：

```ts
let handler1 = (a: number) => {};
let handler2 = (a: number, b: number, c: number) => {};

handler2 = handler1; // OK
handler1 = handler2; // Error: Type '(a: number, b: number, c: number) => void' is not assignable to type '(a: number) => void'.
```

是不是感觉哪里不对？和之前介绍的“多的可以赋值给少的”貌似不一样。的确，和之前介绍的确实看起来相悖，这主要是因为 TypeScript 在 `strictFunctionTypes` 选项启用时对函数的 Input 即函数参数的检查是**逆变（contravariance）**而非**双变（bivariance）**。 关于变型 (variance) 对与函数类型意义的相关背景, 请查看[协变（covariance）和逆变（contravariance）是什么？](https://www.stephanboyer.com/post/132/what-are-covariance-and-contravariance)

总而言之，因为有不一样的类型，即“变”，才会需要类型兼容，而类型兼容主有两种主要的方式：协变和逆变。

:::tip

类型 A 赋值给类型 B 的过程，这就是“变”，如果是同一个类型就谈不上变了。而协变就是协助变化，即采用最直接自然的方式，即 Duck Typing，也就是以上说的“多的赋值给少的”。

:::

协变(covariance)：多的可以赋值给少的：

<Img w="270" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/GqKI1h.png' alt='GqKI1h'/>

逆变(contravariance)：少的可以赋值给多的：

<Img w="270" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/1aSCxc.png' alt='1aSCxc'/>

双变(Bivariance)：协变和逆变都支持。

:::good

`--strictFunctionTypes` 默认配置是 `false`, 即函数（standalone functions not methods）参数采用的是双变，但并不是很安全，`strictFunctionTypes` 建议设为 `true`：

```json title="tsconfig.json" {2}
{
  "strictFunctionTypes": true
}
```

:::

此时你肯定会想，为什么 strict 模式下函数 input 采用的是逆变而不是协变？

这主要和 JavaScript 的设计有关，在 JS 中调用函数的时候传较少的参数是非常普遍的，比如 `forEach` 函数：

```js
let items = [1, 2, 3];

// Don't force these extra parameters
items.forEach((item, index, array) => console.log(item));

// Should be OK!
items.forEach(item => console.log(item));
```

TS 也遵循了这一点，这样做也很方便，我们就不需要把一个不精确的类型断言成精确类型了。

有了以上知识的铺垫，我们再看函数的类型兼容就不会显得那么“特殊”了。函数的类型兼容性主要看三个方面：

1. 函数参数的个数
2. 函数参数的类型
3. 函数的返回值

之前函数之间直接赋值的例子，可能在实际中并不常用，但函数参数的传递却是经常发生的，其实和函数之间的赋值也是相同的，下面我们先写一个高阶函数 `hof` 来模拟实际中的一些场景:

```ts
type Handler = (a: number, b: number) => void;

function hof(handler: Handler) {
  return handler;
}
```

### Numbers of parameters

根据上文介绍的，函数的 input 参数 strict 模式打开后是采用逆变的方式，即“少的可以赋值给多的”原则，再来看以下的例子表现，就很清晰了：

```ts
let handler1 = (a: number) => {};
hof(handler1); // OK

let handler2 = (a: number, b: number, c: number) => {};
hof(handler2); // Error: Argument of type '(a: number, b: number, c: number) => void' is not assignable to parameter of type 'Handler'.
```

以上是固定参数，如果函数中含有可选参数或者剩余参数是否也会遵循该原则呢？

```ts
let a = (p1: number, p2: number) => {};
let b = (p1?: number, p2?: number) => {};
let c = (...args: number[]) => {};
```

我们先想一下，固定参数、剩余参数、可选参数之间按照参数多少排序是什么样的？

```text
固定参数函数参数个数 = 含有剩余参数的函数参数个数 ≥ 含有可选参数的函数参数个数
```

也即：

```text
a = c ≥ b
```

有了这个顺序，我们会发现函数之间的赋值依然遵循之前提到的“少的可以赋值给多的”原则：

```ts
a = b; // OK
a = c; // OK
```

```ts
b = c; // Error
b = a; // Error
```

```ts
c = a; // OK
c = b; // OK
```

### Types of parameters

如果函数参数的个数满足以上兼容性的要求后，这仅仅是跨过了其中一道门槛，还要继续比较对应的函数类型。先看参数是原始类型时的兼容性：

```ts {4}
let handler3 = (aa: string, bb: number) => {};
hof(handler3);
// Argument of type '(aa: string, bb: number) => void' is not assignable to parameter of type 'Handler'.
//  Types of parameters 'aa' and 'a' are incompatible.
//    Type 'number' is not assignable to type 'string'.
```

:::caution

TypeScript(version 2.x/3.x) 对以上代码的错误的第 3 行描述中，个人认为方向是反了，应该是 `Type 'string' is not assignable to type 'number'.` (TBD)

:::

下面我们看看参数是引用类型时的兼容性，以 interface 为例:

```ts
interface Point3D {
  x: number;
  y: number;
  z: number;
}
interface Point2D {
  x: number;
  y: number;
}

let p3d = (point: Point3D) => {};
let p2d = (point: Point2D) => {};
p3d = p2d; // OK
p2d = p3d; // Error: Types of parameters 'point' and 'point' are incompatible.Property 'z' is missing in type 'Point2D' but required in type 'Point3D'.
```

成员个数少的可以赋值给成员个数多的，即“少的可以赋值给多的”，依然遵循以上函数 input 参数的逆变机制。

### Type of returned value

以上介绍的逆变是用在函数的 input 参数，而对于 output 返回值仍然采用的是协变模式，即：

<Img w="480" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/kRs88T.png' alt='kRs88T'/>

看一个例子，加深一下：

```ts
let f = () => ({name: 'Kimi'});
let g = () => ({name: 'Kimi', age: '18'});
f = g; // OK
g = f; // Error: Property 'age' is missing in type '{ name: string; }' but required in type '{ name: string; age: string; }'.
```

协变其实也就是 Duck Typing，成员少的可以兼容成员多的。

### Overloading

函数的重载也会检查类型兼容性，看下面例子：

```ts
// 函数重载的列表
function overload(a: number, b: number): number;
function overload(a: string, b: string): string;

// 函数重载的实现
function overload(a: any, b: any): any {
  // ...
}
```

程序运行的时候编译器会查找重载列表，找到第一个匹配的，来执行下面的函数。所以在重载列表中，函数的参数要多于实现函数的参数，而且返回值类型也要符合相应的要求，以下例子就会报错：

```ts
// 函数重载的列表
function overload(a: number): number; // Error: This overload signature is not compatible with its implementation signature.
function overload(a: string, b: string): string;

// 函数重载的实现
function overload(a: any, b: any): any {
  // ...
}
```

增加一个参数或者删掉返回值都会不兼容的。

## Generic

### Generic interface

```ts
interface Empty<T> {}

let obj1: Empty<number> = {}; // OK
let obj2: Empty<string> = {}; // OK
obj1 = obj2; // OK
```

以上例子我们会发现 TS 并没有报错，这是因为此时泛型接口中没有任何成员。我们再添加一个成员：

```ts {2}
interface Empty<T> {
  value: T;
}

let obj1: Empty<number> = {}; // Error: Property 'value' is missing in type '{}' but required in type 'Empty<number>'.
let obj2: Empty<string> = {}; // Error: Property 'value' is missing in type '{}' but required in type 'Empty<number>'.
obj1 = obj2; // Error: Type 'Empty<string>' is not assignable to type 'Empty<number>'.
```

此时 TS 就会报错，也就是只有泛型接口 T 使用的时候才会检查兼容性。

### Generic function

如果两个泛型函数定义相同，没有指定类型参数，它们之间也是可以相互兼容的。

```ts
let log1 = <T>(x: T): T => {
  console.log('x');
  return x;
};
let log2 = <U>(y: U): U => {
  console.log('y');
  return y;
};

log1 = log2;
```

泛型的类型兼容其实远比以上介绍的要复杂，关于泛型协变和逆变的话题可以先参考以下相关资料，以后再作详细介绍。

- [Unsafe implicit conversion of generics in TypeScript](https://stackoverflow.com/questions/47850513/unsafe-implicit-conversion-of-generics-in-typescript)

> Currently, TypeScript treats property values and generic types as covariant, meaning they are fine for reading but not fine for writing.

- [Proposal: covariance and contravariance generic type arguments annotations](https://github.com/Microsoft/TypeScript/issues/10717)
- [Covariance / Contravariance Annotations](https://github.com/Microsoft/TypeScript/issues/1394)

## Reference

1. [TypeScript official docs: Type Compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)
1. [TypeScript 类型兼容](https://www.softwhy.com/article-10195-1.html)
1. [Stackoverflow: Unsafe implicit conversion of generics in TypeScript](https://stackoverflow.com/a/47850736)
1. [TypeScript 手册翻译系列 10-类型兼容性，作者：一配](https://my.oschina.net/1pei/blog/513833)
1. [[扩展阅读] 鸭子类型（duck typing）](https://fishc.com.cn/thread-51471-1-1.html)
1. [TypeScript in action, By Liang Xiao](https://time.geekbang.org/course/detail/100032201-110399)
