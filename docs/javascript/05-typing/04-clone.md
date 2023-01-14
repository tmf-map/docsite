---
title: 拷贝
---

## 浅拷贝 shallowClone

```js
function shallowClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (obj instanceof Set) {
    let objClone = new Set();
    obj.forEach(item => objClone.add(item));
    return objClone;
  }
  if (obj instanceof Map) {
    let objClone = new Map();
    obj.forEach((value, key) => objClone.set(key, value));
    return objClone;
  }
  const keys = Object.keys(obj);
  let objClone = Array.isArray(obj) ? [] : {};
  if (keys.length < 1) {
    return objClone;
  }
  keys.forEach(key => (objClone[key] = obj[key]));
  return objClone;
}
```

## 深拷贝 deepClone

判断数据类型 + 循环递归

```js
function deepClone(obj, hash = new WeakMap()) {
  // Primitive Type
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  // Date
  if (obj instanceof Date) {
    return new Date(obj);
  }
  //RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  // Set
  if (obj instanceof Set) {
    let objClone = new Set();
    obj.forEach(item => objClone.add(deepClone(item)));
    return objClone;
  }
  // Map
  if (obj instanceof Map) {
    let objClone = new Map();
    obj.forEach((value, key) => objClone.set(deepClone(key), deepClone(value)));
    return objClone;
  }
  // search hash map
  if (hash.has(obj)) return hash.get(obj);

  // Array Object
  const keys = Object.keys(obj);
  let objClone = Array.isArray(obj) ? [] : {};
  if (keys.length < 1) {
    return objClone;
  }
  // add key->value to hash
  hash.set(obj, objClone);

  keys.forEach(key => {
    objClone[key] =
      typeof obj[key] === 'object'
        ? deepClone(obj[key], hash)
        : deepClone(obj[key]);
  });
  return objClone;
}
```

这里有个点大家要注意下，对于 function 类型，这里是直接赋值的，还是共享一个内存值。这是因为函数更多的是完成某些功能，有个输入值和返回值，而且对于上层业务而言更多的是完成业务功能，并不需要真正将函数深拷贝。

但是 function 类型要怎么拷贝呢？

javascript 深拷贝(deepClone) https://www.google.com/url?q=https://segmentfault.com/a/1190000006687581&sa=D&ust=1570449321569000

https://github.com/muwenzi/Program-Blog/issues/62
