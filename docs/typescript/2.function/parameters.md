---
title: Parameters
sidebar_label: Parameters
---

### Alternative Parameter

```ts
add(1, 2, 3); // Error: Expected 2 arguments, but got 3.
```

```ts
function add(a: number, b?: number) {
  return b ? a + b : a;
}
```

:::caution

We must declare the alternative parameters after the required parameters.

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

:::tip

Please note that we must pass undefined as second parameter because `c` is required and parameter `d` is unnecessary because there is no required parameter behind this.

:::

### Rest Parameter

Similar to ES6, we can also rest in typescript but need to define the type of rest such as using array. See the following example:

```ts
function add(a: number, ...rest: number[]) {
  return a + rest.reduce((acc, cur) => acc + cur);
}

add(1, 2, 3, 4, 5, 6);
```
