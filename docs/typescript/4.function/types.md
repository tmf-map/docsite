---
title: Types
---

import Img from '@site/src/components/Img';

In TypeScript, if we define function likes in JavaScript, there will be a hint that tell us we should define the type of parameter.

```ts
let add = (a, b) => a + b; // Parameter 'a' implicitly has an 'any' type, but a better type may be inferred from usage.
```

Generally, there are 4 ways that we can define the type of function:

1. Function definition
2. Function expression
3. Type aliases
4. Interface

## Type can be used only once

### Function definition

```ts
function add(a: number, b: number) {
  return a + b;
}
```

We need to declare the specific type of each parameter, but we can omit the returned type of function if the parameters are same type. TypeScript can infer the returned type automatically:

<Img w="435" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/L5TxGX.png' alt='FXqca5'/>

### Function expression

We can define the type of variable in function expression. There are 2 ways as the following example shows:

```ts
let add: (a: number, b: number) => number = function (a, b) {
  return a + b;
};

// or

let add: (a: number, b: number) => number;
add = function (a, b) {
  return a + b;
};
```

:::caution

We **cannot** omit the returned type as the type definition and function defintion are separated, so TS cannot infer the returned type from the type of parameter.

:::

## Type can be used many times

### Type aliases

Type aliases create a new name for a type. Aliasing doesn’t actually create a new type - it creates a new **name** to refer to that type. Look the following example:

```ts
type Add = (a: number, b: number) => number;

let add: Add = function (a, b) {
  return a + b;
};
```

### Interface

TypeScript interface is also used to define a type of a function. This ensures the function signature. We needn't to add the function name and declare the parameter is enough.

```ts
interface Add {
  (a: number, b: number): number; // note that `:` not `=>`
}

let add: Add = function (a, b) {
  return a + b;
};
```

## Summary

1. Function definition: the directest way
2. Function expression: a little complicated
3. Type aliases: likes function expression but add alias
4. Interface: more powerful

## References

1. [TypeScript in action, By Liang Xiao](https://time.geekbang.org/course/detail/211-108568)
