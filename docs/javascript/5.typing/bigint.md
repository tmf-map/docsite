---
title: BigInt
---

## The problem in number

In some special scenarios, the backend may return such a string:

```js
'{"value": 9223372036854775807}'; // 19-digits
```

If you use `JSON.parse ()` to parse directly:

```js
JSON.parse('{"value": 9223372036854775807}');
// {value: 9223372036854776000}
```

We will find that the value responded by the backend is too large. In JavaScript, all numbers are saved as `64-bit` float, which results in two restrictions on the representation of the values:

### 53: Precision

The largest integer, JavaScript is able to exactly represent with `number`, is `2**53`. There is also a constant `Number.MAX_SAFE_INTEGER` available you can access from your code that returns `2**53 - 1`, the largest integer where you can add `1` and still get an exact result:

```js
Number.MAX_SAFE_INTEGER; // 9007199254740991, 2**53 -1
Number.MAX_SAFE_INTEGER + 1; // 9007199254740992
Number.MAX_SAFE_INTEGER + 2; // 9007199254740992 (wrong!!!)
```

:::tip

The precision of the value can only reach 53 binary digits (equivalent to 16 decimal digits).

:::

Integers larger than this range cannot be accurately represented by JavaScript, which makes JavaScript unsuitable for accurate scientific and financial calculations.

```js
2 ** 53 === 2 ** 53 + 1; // true
```

### 1024: Infinity

Any value greater than or equal to `2**1024` that cannot be represented by JavaScript and returns `Infinity`.

```js
2 ** 1024; // Infinity
```

## What's BigInt

Before solve above problem, let's know more about `BigInt`.

`BigInt` ([ES2020](https://github.com/tc39/proposal-bigint)) is a built-in **object** that provides a way to represent whole numbers larger than `2**53 - 1`, which is the largest number JavaScript can reliably represent with the Number primitive and represented by the `Number.MAX_SAFE_INTEGER` constant. `BigInt` can be used for arbitrarily large integers.

:::tip

There is no restriction on the number of digits, and any digit integer can be accurately represented.

:::

```js
const a = 2172141653n;
const b = 15346349309n;

// Result maintains precision even with 20-digits
a * b; // 33334444555566667777n

// Normal number cannot maintain precision
Number(a) * Number(b); // 33334444555566670000
```

:::danger

Cannot add `n` after decimal:

```js
0.1n; // Uncaught SyntaxError: Invalid or unexpected token
```

:::

`BigInt` can also be expressed in various bases, all with the suffix `n`.

```js
0b1101n; // Binary
0o777n; // Octonary
0xffn; // Hex
```

`BigInt` and normal number are not equal:

```js
42n === 42; // false
```

When tested against `typeof`, a `BigInt` will give `"bigint"`:

```js
typeof 123n; // 'bigint'
```

Also unsupported is the unary operator (+), [in order to not break asm.js](https://github.com/tc39/proposal-bigint/blob/master/ADVANCED.md#dont-break-asmjs).

```js
-42n; // OK
+42n; // Uncaught TypeError: Cannot convert a BigInt value to a number
```

You can use the `toString ()` method to convert to a `string`, and the suffix `n` will be removed automatically:

```js
let a = 123n;
a.toString(); // "123"
```

## Solution1: Sending number as string in raw string

This solution is easier to be implemented in frontend while a little complicated in backend. It has to convert the `String` to `long` when server get the value. Let's see the overview workflow first:

<Img legend="Figure 1: sending number as string" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/2glLcY.png' alt='2glLcY'/>

Unfortunately, JSON does not support `BigInt`. If you try to serialize an object with `BigInt` values in it, the methods `JSON.stringify()` throw errors:

```js
// Serialize
JSON.stringify({value: 9223372036854775807n});
// Uncaught TypeError: Do not know how to serialize a BigInt at Object.stringify
```

Another issue is that `JSON.parse` will return a value of string when deserialize, actually what we want is `BigInt`:

```js
// Deserialize
JSON.parse('{"value": "9223372036854775807"}');
// {value: "9223372036854775807"} but we want {value: 9223372036854775807n}
```

Next we will add `reviver` or `replacer` function in `JSON` to resolve above issues.

### Serialization: `JSON.stringify()`

As we have seen in the above section, serializing an object with `JSON.stringify()` throws an error if it contains properties with `BigInt` values. Fortunately, this method also supports a second optional parameter called `replacer`. A function that is called for each `key/value` pair. In this `replacer` function, we check the data type, and when it's a `BigInt` convert it to a `string`:

```js
function stringifyReplacer(key, value) {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
}
```

And now when we call `JSON.stringify()` with `stringifyReplacer`, it will returned the value as we expected:

```js
JSON.stringify({value: 9223372036854775807n}, stringifyReplacer);
// '{"value": "9223372036854775807"}'
```

You can also implement your own `toJSON` method on `BigInt.prototype` if needed:

```js
BigInt.prototype.toJSON = function () {
  return this.toString();
};
```

Instead of throwing, `JSON.stringify` now produces a string like this:

```js
JSON.stringify({value: 9223372036854775807n});
// '{"value": "9223372036854775807"}'
```

### Deserialization: `JSON.parse()`

As mentioned above, if we simply call `JSON.parse()` on `JSON`, we get back a `string`, but we want an object with a `BigInt` property.

The `JSON.parse()` method supports an optional second parameter called `reviver`. This is a function that is called for each `key/value` pair. Here we check if the value is a `string`, contains just numbers, and the letter `n` at the end. If that is the case, convert it to a `BigInt`:

```js
function parseReviver(key, value) {
  if (typeof value === 'string' && /^\d+/.test(value)) {
    return BigInt(value);
  }
  return value;
}
```

Let's see what will be returned if we call `JSON.parse()` with `parseReviver`:

```js
JSON.parse('{"value": "9223372036854775807"}', parseReviver);
// {value: 9223372036854775807n}
```

## Solution2: Sending number directly in raw string

This solution is a bit hard to be implemented in frontend but the benefit is that no code needs to changed in backend. Below is the overview workflow of this solution:

<Img legend="Figure 2: sending number directly" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/qNCEQX.png' alt='qNCEQX'/>

### Use `text()` in fetch

Unfortunately, the `json()` method of the `fetch` response object does not support the `reviver` argument, so we can't use this pattern:

```js
const response = await fetch('fetchData');
const obj = response.json();
```

Instead, we have to access the raw string response with `text()`:

```js
const response = await fetch('fetchData');
const obj = response.text();
```

### Use `json-bigint`

We recommend [json-bigint](https://www.npmjs.com/package/json-bigint) to handle serialization and deserialization as the following shows:

```js
import JOSNbig from 'json-bigint';

JSONbig.parse('{"value": 9223372036854775807}');
// {value: 9223372036854775807n}
JSONbig.stringify({value: 9223372036854775807n});
// '{"value": 9223372036854775807}'
```

In addition, below is a simple implementation for `parse`, you can use as a reference:

```js
let handleString = stringData =>
  stringData.replace(/:\s*([-+Ee0-9.]+)/g, ': "uniqueprefix$1"');

let parse = stringData =>
  JSON.parse(handleString(stringData), (key, value) => {
    // only changing strings
    if (typeof value !== 'string') return value;
    // only changing number strings
    if (!value.startsWith('uniqueprefix')) return value;
    // chip off the prefix
    value = value.slice('uniqueprefix'.length);
    // pick your favorite arbitrary-precision library
    return BigInt(value);
  });

parse('{"value": 9223372036854775807}');
// {value: 9223372036854775807n}
```

## Browser compatibility

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/7NmdZp.png' alt='7NmdZp'/>

:::tip

Currently, all modern browsers except **Safari** support it.

:::

## References

1. [MDN: BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
2. [ECMAScript 6: Number, By Ruanyifeng](https://es6.ruanyifeng.com/#docs/number#BigInt-%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)
3. [JavaScript BigInt and JSON, By Ralscha](https://golb.hplar.ch/2019/01/js-bigint-json.html)
4. [High-precision calculation of JavaScript with Bigint of JSON.parse, By relsoul](https://juejin.im/post/5af3f84bf265da0b7c074be6)
5. [StackOverflow: alternative to JSON.parse() for maintaining decimal precision? By AuxTaco](https://stackoverflow.com/questions/47916160/alternative-to-json-parse-for-maintaining-decimal-precision)
