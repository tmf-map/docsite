---
title: Types
sidebar_label: Types
---

## How to define a type of function

TypeScript interface is also used to define a type of a function. This ensures the function signature. Generally, there are 4 types of define function:

### Directly way

```ts
function add(x: number, y: number) {
  return x + y;
}
```

We need to declare the specific type of each parameter, but can overlook the returned type since typescript will do this.

### Use **variable** to define the type of function

```ts
let add: (x: number, y: number) => number = function(x, y) {
  return x + y;
};
// or
let add: (x: number, y: number) => number;
add = function(x, y) {
  return x + y;
};
```

We **cannot** overlook the returned type since.

### Type Aliases

Type aliases create a new name for a type. Aliasing doesn’t actually create a new type - it creates a new name to refer to that type. Look the following example:

```ts
type Add = (x: number, y: number) => number;
let add: Add = function(x, y) {
  return x + y;
};
```

### interface as function type

We needn't to add the function name and declare the parameter is all right.

```ts
interface add {
  (x: number, y: number): number;
}
```

## Heterogeneous interface

```ts
interface Lib {
  (): void;
  version: string;
  doSomething(): void;
}
```
