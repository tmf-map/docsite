---
title: As object or array type
---

import Img from '../../../src/components/Img';

Interface in TypeScript can be used to define a type and also to implement it in the class. The most scenarios can be summarized as following:

- as object type definition
- as array type definition
- as function type definition
- interface extends interface
- class implements interface

In this section, we mainly focus on the object and array type definition using interface. As function type definition will be introduced in [Function: Types](/docs/typescript/3.function/types#interface) section.

Interface likes contract which defines the structure of the object, array, function and also class. However, we need to note that the TypeScript compiler does not convert interface to JavaScript. It uses interface for type checking.

## Interface as object type

### Normal case

TypeScript uses an interface to ensure the proper structure of an object. The following interface `Person` defines a type of a variable:

```ts
interface Person {
  name: string;
  age: number;
}
```

In the above example, an interface `Person` includes two properties `name` and `age`. Let's define some variables using this interface type:

```ts
let p1: Person = {name: 'kimi', age: 20}; // OK
let p2: Person = {name: 'kimi', a: 20}; // Error: 'a' does not exist in type 'Person'.
let p3: Person = {name: 'kimi', age: '100'}; // Error: Type 'string' is not assignable to type 'number'.
```

### Indexable types

Indexable types have an _index signature_ that describes the types we can use to index into the object, along with the corresponding return types when indexing. Let’s take an example:

```ts
interface Person {
  name: string;
  age: number;
  [index: string]: any;
}
```

```ts
let p1: Person = {name: 'kimi', age: 20, gender: 'male'}; // OK
let p2: Person = {name: 'kimi', age: 20, id: 888}; // OK
```

There are two types of supported index signatures: `string` and `number`. It is possible to support both types of indexers.

:::good

Recommend to use string indexer in object and numeric indexer in array.

:::

Please pay more attention to return type, see following examplea:

```ts
interface Person {
  name: string; // Error: Property 'name' of type 'string' is not assignable to string index type 'number'.
  age: number; // OK
  [index: string]: number;
}
```

```ts
interface Person {
  name: string; // OK
  age: number; // Error: Property 'age' of type 'number' is not assignable to string index type 'string'.
  [index: string]: string;
}
```

You can imagine the `[index: string]: string` as the types' "**BOSS**" in interface, if others match the "**BOSS**" pattern, the returned type must be compatible with "**BOSS**" otherwise will cause an error.

In addition, properties of different types are acceptable if the index signature is a union of the property types:

```ts
interface Person {
  name: string; // OK
  age: number; // OK
  [index: string]: string | number;
}
```

### Optional properties

Sometimes, we may declare an interface with excess properties but may not expect all objects to define all the given interface properties. We can have optional properties, marked with a `?`:

```ts
interface Person {
  name: string;
  age: number;
  gender?: string;
}
```

In such cases, objects of the interface may or may not define these properties:

```ts
let p1: Person = {name: 'kimi', age: 20}; // OK
let p2: Person = {name: 'kimi', age: 20, gender: 'male'}; // OK
```

### Readonly properties

TypeScript provides a way to mark a property as read only. This means that once a property is assigned a value, it cannot be changed!

```ts
interface Person {
  name: string;
  readonly age: number;
}

let p1: Person = {name: 'kimi', age: 20};

p1.age = 18; // Error: Cannot assign to 'age' because it is a read-only property.
```

## Interface as array type

An interface can also define the type of an array where you can define the type of index as well as values.

### Indexable types

```ts
interface StringArray1 {
  [index: number]: string;
}

let strArr: StringArray1 = [123]; // Error: Type 'number' is not assignable to type 'string'.

strArr[0] = 123; // Type '123' is not assignable to type 'string'.
strArr['0'] = 123; // OK
```

In the above example, we can find that if the type of `index` is `number`, we will only check the array literal and `strArr[0]`, not includes `strArr["1"]`.

```ts
interface StringArray2 {
  [index: string]: string;
}

let strArr: StringArray2 = [123]; // Error: Type 'number' is not assignable to type 'string'.

strArr[0] = 123; // Error: Type '123' is not assignable to type 'string'.
strArr['0'] = 123; // Error: Type '123' is not assignable to type 'string'.
```

:::tip

Above, `strArr[0] = 123` also causes an error because TS will convert numeric indexer to string indexer automatically. In a way, `[index: string]: string` is equivalent to `[index: string | number]: string`(FYI, the syntax is incorrect).

:::

### Readonly properties

At this time, you may wonder what's the difference between the [array types in Basic Types](/docs/typescript/1.types/basic-types#array) and interface indexable types, they both can be used to define the type of array.

Besides the difference mentioned above, we can also use `readonly` before index which would like this:

```ts
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let strArr: ReadonlyStringArray = ['abc'];
strArr[1] = 'def'; // Error!
```

## Duck typing

We sometimes get some excess fields besides the contract with backend API. How will TypeScript handle this?

```ts
interface Person {
  name: string;
  age: number;
}

function handleResult(result: Person) {
  console.log(result.name, result.age);
}

const result = {name: 'Kimi', age: 20, gender: 'male'}; // OK

handleResult(result);
```

In the above example, we can find that there is no error in the end. Since TypeScript uses a kind of type checking called "**duck typing**" or "**structural subtyping**".

> If it walks like a duck and it quacks like a duck, then it must be a duck.

In other words, don’t check whether it IS-a duck, check whether it QUACKS-like-a duck, WALKS-like-a duck, etc.

<Img w="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ducktyping.png' legend="Duck typing from <Haskell: el Lenguaje Funcional>" origin="http://www.cs.us.es/~fsancho/?e=110" alt='ducktyping'/>

Thus, in TypeScript we only need to pass in the object that meets the necessary conditions of the interface. It will pass the type checking even if the excess fields are passed in.

:::bad

It will cause an error if we pass in object literal.

```ts
interface Person {
  name: string;
  age: number;
}

function handleResult(result: Person) {
  console.log(result.name, result.age);
}

handleResult({name: 'Kimi', age: 20, gender: 'male'}); // Error: Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

:::

Besides the above method which pass in object variable to avoid causing error, we can also use type assertion would look like:

```ts
handleResult({name: 'Kimi', age: 20, gender: 'male'} as Result); // OK
```

We can also use the indexable types and it's more flexible. Let's take an example:

```ts
interface Person {
  name: string;
  age: number;
  [index: string]: any;
}

// ...

handleResult({name: 'Kimi', age: 20, gender: 'male'}); // OK
```

## References

1. [Tutorials Teacher: TypeScript Interface](https://www.tutorialsteacher.com/typescript/typescript-interface)
2. [TypeScript in action, By Liang Xiao](https://time.geekbang.org/course/detail/211-108568)
3. [Wikipedia: Duck typing](https://en.wikipedia.org/wiki/Duck_typing)
4. [TypeScript Official Docs: Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
