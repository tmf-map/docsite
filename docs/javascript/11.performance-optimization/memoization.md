---
title: 缓存与记忆化
---

## 什么是记忆化

> 通过使用记忆化，遇到相同的输入会立即触发内部缓存命中直接返回结果。

```text
记忆化 -> 内部函数级缓存 -> 避免重复计算
```

:::caution

单词是 memoize 不是 memorize 。

:::

## 同步缓存

```js
function memoize(fn) {
  let cache = {};
  return (...args) => {
    let n = args[0]; // just taking one argument here
    if (n in cache) {
      console.log('Fetching from cache');
      return cache[n];
    }
    console.log('Calculating result');
    let result = fn(n);
    cache[n] = result;
    return result;
  };
}
```

```js
// a simple pure function to get a value adding 10
const add = n => n + 10;
console.log('Simple call', add(3));

const memorizedAdd = memoize(add);
console.log(memorizedAdd(3)); // Calculating result
console.log(memorizedAdd(3)); // Fetching from cache
console.log(memorizedAdd(4)); // Calculating result
console.log(memorizedAdd(4)); // Fetching from cache
```

为了简化生成密匙的逻辑，简单的记忆化仅限于一元函数。对于需要记忆化多个参数的函数可以使用柯里化，来避免缓存层给函数增加额外的开销和复杂度。

## 异步缓存
