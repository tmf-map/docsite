---
title: Type Protection
---

## What's type protection

Before introducing type protection, let's look at an example, we want to call the printing method after creating the instance:

```ts
enum Type {
  Strong,
  Week
}

class Java {
  helloJava() {
    console.log('Hello Java');
  }
}

class JavaScript {
  helloJavaScript() {
    console.log('Hello JavaScript');
  }
}

function getLanguage(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript(); // let lang: Java | JavaScript
  // Error: Property 'helloJava' does not exist on type 'Java | JavaScript'.
  if (lang.helloJava) {
    lang.helloJava(); // Error: Property 'helloJava' does not exist on type 'JavaScript'.
  } else {
    lang.helloJavaScript(); // Error: Property 'helloJavaScript' does not exist on type 'Java'.
  }
  return lang;
}

getLanguage(Type.Strong);
```

To resolve above issues, we can use type protection. TypeScript can guarantee that a variable belongs to a certain type in a specific block. You can safely use the properties or methods of this type in the block.

## How to create type protection context

### `instanceof`

```ts {4}
function getLanguage(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  // OK
  if (lang instanceof Java) {
    lang.helloJava(); // OK, this is block one
  } else {
    lang.helloJavaScript(); // OK, this is block two
  }
  return lang;
}
```

TypeScript will create two different blocks automatically and `lang` in each block has different methods accorrding to the type:

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/OoL0mF.png' alt='OoL0mF'/>

### `in`

This keyword can determine whether the specified property is in the specified object or its prototype chain. See more in [MDN: in operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)

```ts {4}
function getLanguage(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  // OK
  if ('helloJava' in lang) {
    lang.helloJava(); // OK
  } else {
    lang.helloJavaScript(); // OK
  }
  return lang;
}
```

### `typeof`

For demonstration purposes, we can add second parameter `x: string | number` in `getLanguage()`:

```ts {4,5,7}
function getLanguage(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  // OK
  if (typeof x === 'string') {
    x.length; // OK, this is block one
  } else {
    x.toFixed(); // OK, this is block two
  }
  return lang;
}

getLanguage(Type.Strong, '');
```

In the block one, the type of `x` is `string` so we can call the method under `String`. In the block two, `x` is `number`, so it can have an access to `toFixed()`.

### Type protection function

We can also create a type protection function. The returned type of this function is a special type which is called a **type predicate**. When returning, we must judge whether the object has `hellojava` method. Here we also need to use type assertions:

```ts
function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined;
}
```

Then we can use this function in `getLanguage`:

```ts
// OK
if (isJava(lang)) {
  lang.helloJava(); //OK
} else {
  lang.helloJavaScript(); //OK
}
```

## Reference

1. [TypeScript in action, By Liang Xiao](https://time.geekbang.org/course/detail/211-110289)
2. [MDN: in operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)
