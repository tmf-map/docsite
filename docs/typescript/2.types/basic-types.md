---
title: Basic Types
---

import Img from '../../../src/components/Img';

## Type Annotations

- **What**: Like type declaration in Java.
- **How**: Syntax as following:

```ts
variable: type;
```

## ES/TS Primitive Types

### boolean

```ts
let bool: boolean = true;
```

### number

```ts
let num: number = 123;
```

### string

```ts
let str: string = 'abc';
```

### symbol

Starting with ECMAScript 2015, `symbol` is a primitive data type, just like `number` and `string`. `symbol` values are created by calling the `Symbol` constructor. In TypeScript, it supports these two ways to define the symbol variables:

```ts
let s1: symbol = Symbol(); // OK
let s2 = Symbol(); // OK

s2 = 1; // Error, Type '1' is not assignable to type 'symbol'.
```

Indeed, TS can infer the s2 type:

<Img w="280" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/D3twOQ.png' alt='D3twOQ'/>

### undefined & null

In TypeScript, both `undefined` and `null` actually have their own types named `undefined` and `null` respectively. They’re not extremely useful on their own:

```ts
let und: undefined = undefined;
let nul: null = null;

und = 1; // Error, Type '1' is not assignable to type 'undefined'.
nul = 1; // Error, Type '1' is not assignable to type 'null'.
```

By default `null` and `undefined` are **subtypes** of all other types. That means you can assign `null` and `undefined` to something like `number`.

```ts
let num: number = 1;
num = undefined; // OK
num = null; // OK
```

However, when using the `--strictNullChecks` flag, `null` and `undefined` are only assignable to any and their respective types (the one exception being that `undefined` is also assignable to `void`). This helps avoid many common errors. In cases where you want to pass in either a `number` or `null` or `undefined`, you can use the union type `number | null | undefined`.

:::good

We encourage the use of `--strictNullChecks` when possible.

:::

But for the purposes of this handbook, we will assume it is turned off.

## ES/TS Reference Types

### object

`object` is a type that represents the non-primitive type, i.e. anything that is not `number`, `string`, `boolean`, `bigint`, `symbol`, `null`, or `undefined`.

```ts
let obj: object = {x: 1, y: 2}; // (I)
obj.x = 3; // Error, Property 'x' does not exist on type 'object'.
```

As we haven't define the specific types for obj, but why are there no errors in line `(I)`? It's so weird. At last, we can correct it by redefining the type like below:

```ts
let obj: {x: number; y: number} = {x: 1, y: 2};
obj.x = 3; // OK
```

But it's weird when we use it as following:

```ts
let obj: object = {x: 1, y: 2};
obj['x'] = 2; // OK if `--noImplicitAny` is not given
```

### object vs. Object vs. {}

Perhaps confusingly, TypeScript defines several types that have a similar name but represent different concepts:

- object
- Object
- {}

We've already looked at the new object type above. Let's now discuss what `Object` and `{}` represent.

#### The Object Type

TypeScript defines another type with almost the same name as the new object type, and that's the Object type. While `object` (lowercased) represents **all non-primitive types**, Object (uppercased) describes **functionality that is common to all JavaScript objects**. That includes the `toString()` and the `hasOwnProperty()` methods, for example.

Within the `lib.es6.d.ts` file shipping with TypeScript, the Object type is defined as follows:

```ts
interface Object {
  // ...

  /** Returns a string representation of an object. */
  toString(): string;

  /** Returns a date converted to a string using the current locale. */
  toLocaleString(): string;

  /** Returns the primitive value of the specified object. */
  valueOf(): Object;

  // ...
}
```

However, variables of type Object only allow you to assign **any value** (if `--strictNullChecks` is not given) to them. You can’t call arbitrary methods on them, even ones that actually exist:

```ts
let prettySure: Object = 4; // OK
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

:::good

Avoid using `Object` in favor of the non-primitive object type, please use the non-primitive `object` type ([added in TypeScript 2.2](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#object-type)).

:::

#### The Empty Type {}

There's yet another type which is quite similar: `{}`, the empty type. It describes an object that **has no members on its own**. TypeScript issues a compile-time error when you try to access arbitrary properties on such an object:

```ts
let obj = {}; // Type {}

obj.prop = 'value'; // Error, Property 'prop' does not exist on type '{}'.
```

However, you can still use all properties and methods defined on the Object type, which are implicitly available via JavaScript's prototype chain:

```ts
let obj = {}; // Type {}

obj.toString(); // "[object Object]"
```

Similar to `Object`, you can also assign **any value** (if `--strictNullChecks` is not given) to `{}` type, but please **don't do that** which will cause some potential issues.

### Array

TypeScript, like JavaScript, allows you to work with arrays of values. Array types can be written in one of two ways.

#### 1. `elemType[]`

In the first, you use the type of the elements followed by [] to denote an array of that element type:

```ts
let arr1: number[] = [1, 2, 3];
```

#### 2. `Array<elemType>`

The second way uses a generic Array type which is predefined in typescript.

```ts
let arr2: Array<number> = [1, 2, 3];
```

But how should we do if we want to use different types in one array?

We can use union type to define the elements' types:

```ts
let arr3: Array<number | string> = [1, 2, 3, 'a'];
```

### Function

See more at [Function -> Types](/docs/typescript/4.function/types) section.

## TS Special Types

### void

Similar to languages like Java, `void` is used where there is no data type. For example, in return type of functions that do not return any value:

```ts
function sayHi(): void {
  console.log('Hi!');
}

let speech: void = sayHi();
console.log(speech); //Output: undefined
```

There is no meaning to assign void to a variable, as only `null` or `undefined` is assignable to void (only if `--strictNullChecks` is not specified):

```ts
let nothing: void = undefined;
nothing = null; // OK if `--strictNullChecks` is not given
let num: void = 1; // Error
```

### any

TypeScript has type-checking and compile-time checks. However, we do not always have prior knowledge about the type of some variables, especially when there are user-entered values from third party libraries. In such cases, we need a provision that can deal with dynamic content. The `any` type comes in handy here.

```ts
let x; // Variable 'x' implicitly has an 'any' type, but a better type may be inferred from usage.
// or
let x: any;

x = 123;
x = 'abc';
x = {};
x = () => {};
```

Similarly, you can create an array of type `any[]` if you are not sure about the types of values that can contain this array.

```ts
let arr = [123, 'abc'];
// or
let arr: any[] = [123, 'abc'];
```

With the intent of compatibility of JS, `any` may be useful in some scenarios, but we should not count on it.

:::good

We should use `any` as less as possible.

:::

### never

The `never` type is used when you are sure that something is never going to occur. For example, you write a function which will not return to its end point or always throws an exception.

```ts
function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}

function endless(): never {
  while (true) {
    console.log('I always does something and never ends.');
  }
}
```

`never` type is used to indicate the value that will **never occur or return** from a function.

### Tuple

Tuple is a special type of array which allows you to express an array with **a fixed number** of elements whose **types are known**, but need not be the same.

<Img w="300" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/typescript-tuple.jpg" alt="typescript-tuple"/>

```ts
let tuple1: [number, string] = [1, 'a']; // OK

// Order Change
let tuple2: [number, string] = ['a', 1]; // Error

// Element Type Change
let tuple3: [number, string] = ['a', 'b']; // Error

// Add New Element
let tuple4: [number, string] = [1, 'a', 'b']; // Error

// Same Types
let tuple5: [number, number] = [1, 1]; // OK, but use `number[]` will be better
```

In addition, we cannot cross its boundary to access the element:

```ts
tuple1[2]; // Error, Tuple type '[number, string]' of length '2' has no element at index '2'.
```

As we all know we can't add new element in tuple by literal, but it looks a bit weird when use `push()`:

```ts
tuple1.push(2); // OK
console.log(tuple1); // [1, 'a', 2]
tuple1[2]; // Error, Tuple type '[number, string]' of length '2' has no element at index '2'.
```

:::bad

Use `push()` method in tuple is a bad idea.

:::

In the following scenario, you should pay more attention on the middle variable:

```ts
let aa = [1, 'a'];
let tuple: [number, string] = aa; // Type '(string | number)[]' is missing the following properties from type '[number, string]': 0, 1
```

TS will infer the type of `aa` as following shows:

<Img w="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/CnKoW1.png' alt='CnKoW1'/>

We can correct this error via removing middle variable `aa` or redefining the type of `aa`:

```ts
let aa: [number, string] = [1, 'a'];
let tuple: [number, string] = aa; // OK
```

## References

1. [TypeScript Data Type - Tutorials Teacher](https://www.tutorialsteacher.com/typescript/typescript-void)
2. [TypeScript official docs: Basic Types](http://www.typescriptlang.org/docs/handbook/basic-types.html)
3. [TypeScript official docs: Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
4. [TypeScript in action, By Liang Xiao](https://time.geekbang.org/course/detail/211-108545)
5. [The object Type in TypeScript, By Marius Schulz](https://mariusschulz.com/blog/the-object-type-in-typescript)
