---
title: Overloading
---

## Basic usage

TypeScript provides the concept of function overloading. You can have multiple functions with the same name but different parameter types and return type.

```ts
function add(a: string, b: string): string;
function add(a: number, b: number): number;

function add(a: any, b: any): any {
  return a + b;
}

add('Hello ', 'World'); // returns "Hello World"
add(10, 20); // returns 30
```

In the above example, we have the same function `add()` with two function declarations and one function implementation.

:::tip

The number of parameters should be the **same**.

:::

The last function should have the function implementation. Since the return type can be either string or number as per the first two function declarations, we must use compatible parameters and return type as `any` in the function definition.

:::tip

Function implementation should have **compatible** types for all declarations.

:::

Function overloading with different number of parameters and types with same name is not supported. However, you can also use rest parameters like this:

```ts
function add(...rest: number[]): number;
function add(...rest: string[]): string;
```

In addition, only one function implementation is supported:

```ts
function display(a: string, b: string): void {
  //Compiler Error: Duplicate function implementation
  console.log(a + b);
}

function display(a: number): void {
  //Compiler Error: Duplicate function implementation
  console.log(a);
}
```

To summarize, in order to achieve function overloading, we must declare all the functions with possible signatures. Also, function implementation should have compatible types for all declarations.

## Best practices

Don’t put more general overloads before more specific overloads:

:::caution

```ts
function fn(x: any): any;
function fn(x: HTMLElement): number;
function fn(x: HTMLDivElement): string;
```

:::

Do sort overloads by putting the more general signatures after more specific signatures:

:::tip

```ts
function fn(x: HTMLDivElement): string;
function fn(x: HTMLElement): number;
function fn(x: any): any;
```

:::

## References

1. [Tutorials Teacher: TypeScript Function Overloading](https://www.tutorialsteacher.com/typescript/function-overloading)
2. [TypeScript Official Docs: Do's and Don'ts - Function Overloads](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#function-overloads)
