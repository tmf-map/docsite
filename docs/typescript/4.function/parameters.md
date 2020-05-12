---
title: Parameters
---

### Optional Parameter

Optional parameter sometimes is very useful. For example, like when you want pass 2 or 3 parameters to `add` function:

```ts
function add(a: number, b: number) {
  return a + b;
}
add(1, 2); // OK
add(1, 2, 3); // Error: Expected 2 arguments, but got 3.
```

Above will cause a error, in this scenario we can use optional parameter:

```ts
function add(a: number, b: number, c?: number) {
  return c ? a + b + c : a + b;
}
add(1, 2); // OK
add(1, 2, 3); // OK
```

:::caution

We must declare the optional parameters after the required parameters.

```ts
function add(a: number, b?: number, c: number) {
  // Error: A required parameter cannot follow an optional parameter.
  return b ? a + b : a;
}
```

:::

### Default Parameter

```ts
function add(a: number, b = 1, c: number, d = 2) {
  return a + b + c + d;
}

add(1, undefined, 1);
```

In the above example, we must pass `undefined` as the second parameter because `c` is required. Parameter `d` is unnecessary because there is no required parameter behind this.

:::caution

When calls a function, default parameter can not be omitted if there is required parameter behind it.

:::

### Rest Parameter

Similar to ES6, we can also use rest in typescript but need to define the type of rest, we can use array type. See the following example:

```ts
function add(a: number, ...rest: number[]) {
  return a + rest.reduce((acc, cur) => acc + cur);
}

add(1, 2, 3, 4, 5, 6);
```

:::caution

Remember rest parameters must come last in the function definition, otherwise the TypeScript compiler will show an error.

:::

The following will cause an error:

```ts
function add(...rest: number[], a: number) {
  // Error: A rest parameter must be last in a parameter list.
  return a + rest.reduce((acc, cur) => acc + cur);
}
```

## References

1. [TypeScript in action, By Liang Xiao](https://time.geekbang.org/course/detail/211-108568)
