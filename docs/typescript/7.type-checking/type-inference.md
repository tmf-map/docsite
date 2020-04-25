---
title: Type Inference
---

## Introduction

In the previous chapters, we learned about type, interface, class and generic. For typing, we have introduced "duck typing", in this chapter, we will have a deep dive in type checking which is important when passing parameters, assignment and calling specific functions.

Type checking is often used in these scenarios:

- Type inference
- Type compatibility
- Type Protection

In this chapter, we will cover type inference in TypeScript. Namely, we’ll discuss where and how types are inferred.

## Type Inference

In the previous chapter, we learned about type annotation. However, it is not mandatory to annotate type. In TypeScript, there are several places where type inference is used to provide type information when there is no explicit type annotation.

### 1. Basic type inference

Basic type inference is a fundamental type inference in TypeScript, types are inferred by TypeScript compiler when:

#### (a) Initialize variables

This kind of inference takes place when initializing variables and members. For example, in this code

```ts
let a; // let a: any
```

```ts
let a = 1; // let a: number = 1
a = 'abc'; // Error
```

For `null` and `undefined`:

```ts
let a = 1; // let a: number = 1
a = null; // Error
a = undefined; // Error
```

:::tip

You need to turn off below option to make it works:

```json title="tsconfig.json" {3}
{
  // ...
  "strictNullChecks": false
}
```

```ts
let a = 1; // let a: number = 1
a = null; // OK
a = undefined; // OK
```

:::

```ts
let a = []; // let a: any[]
let b = [1]; // let b: number[]
```

#### (b) Set parameter default values

```ts
let c = (x = 1) => {}; // (parameter) x: number
```

#### (c) Determine function return types

```ts
let c = (x = 1) => x + 1; // let c: (x?: number) => number
```

### 2. Best common type inference

When a type inference is made from several expressions, the types of those expressions are used to calculate a “best common type” which can be compatible with current all types. For example,

```ts
let x = [1, null]; // OK
```

To infer the type of `x` in the example above, we must consider the type of each array element. Here we are given two choices for the type of the array: `number` and `null`. The best common type algorithm considers each candidate type, and picks the type that is compatible with all the other candidates.

Because the best common type has to be chosen from the provided candidate types, there are some cases where types share a common structure, but no one type is the super type of all candidate types. For example:

```ts
let zoo = [new Rhino(), new Elephant(), new Snake()];
```

Ideally, we may want zoo to be inferred as an Animal[], but because there is no object that is strictly of type Animal in the array, we make no inference about the array element type. To correct this, instead explicitly provide the type when no one type is a super type of all other candidates:

```ts
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
```

:::tip

When no best common type is found, the resulting inference is the union array type, `(Rhino | Elephant | Snake)[]`.

:::

### 3. Contextual type inference

The above inferences are from right to left, that is, the variable type on the left side of the expression is inferred according to the value on the right side of the expression. Type inference also works in "**the other direction**" in some cases in TypeScript. This is known as "contextual typing". Contextual typing occurs when the type of an expression is implied by its location which is often used in event handler. For example:

```ts
window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.button); //<- OK
  console.log(mouseEvent.kangaroo); //<- Error!
};
```

Here, the TypeScript type checker used the type of the `window.onmousedown` function to infer the type of the function expression on the right hand side of the assignment. When it did so, it was able to infer the [type](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) of the `mouseEvent` parameter, which does contain a `button` property, but not a `kangaroo` property.

See more details in [TS: Contextual Typing](https://www.typescriptlang.org/docs/handbook/type-inference.html), [TS: Inferring the types](https://www.typescriptlang.org/docs/handbook/functions.html#inferring-the-types).

:::caution

Actually, above does not work in the newest TypeScript.

:::

## Type assertions

Type assertions are a way to tell the compiler “trust me, I know what I’m doing.” That means type assertion allows you to set the type of a value and tell the compiler **not to infer it**.

This is when you, as a programmer, might have a better understanding of the type of a variable than what TypeScript can infer on its own. Such a situation can occur when you might be porting over code from JavaScript and you may know a more accurate type of the variable than what is currently assigned. Let's see below example first:

```ts
let foo = {};
foo.bar = 1; // Error: Property 'bar' does not exist on type '{}'.
```

To resolve this issue, we need to use type assertion. Normally, there are two ways to do type assertion in TypeScript:

### 1. `as Type`

```ts
interface Foo {
  bar: number;
}

let foo = {} as Foo;
foo.bar = 1; // OK
```

Sometimes also pay close attention to type assertion can not be used indiscriminately, see following code:

```ts
interface Foo {
  bar: number;
}

let foo = {} as Foo; // OK, but is not as we expected.
```

The above code does not strictly constraint a bar attribute according to the type convention which will cause some potential error when using `foo.bar`.

:::good

`let foo: Foo = {};` is better than `let foo = {} as Foo;`

```ts
interface Foo {
  bar: number;
}

let foo: Foo = {}; // Error: Property 'bar' is missing in type '{}' but required in type 'Foo'.
```

:::

### 2. `<Type>`

```ts
interface Foo {
  bar: number;
}

let foo = <Foo>{};
foo.bar = 1;
```

This is often used in the scenario likes following:

```ts
let a: any = '123';
let b: number = (<string>a).length;
```

:::caution

When using TypeScript with JSX, only `as-style` assertions are allowed. Because JSX is embeddable in XML like a syntax. It creates a conflict while using type assertion with brackets in JSX.

:::

Type assertion is very flexible and effective when porting over old code, but need to avoid abusing it.

## Reference

1. [TypeScript in action, By Liang Xiao](https://time.geekbang.org/course/detail/211-110284)
2. [Type Assertion in TypeScript - Tutorials Teacher](https://www.tutorialsteacher.com/typescript/typescript-void)
3. [TypeScript official docs: Type assertions](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions)
