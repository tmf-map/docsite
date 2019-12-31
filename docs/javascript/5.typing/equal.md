---
title: 比较
sidebar_label: 比较
---

import Hint from '../../../src/components/Hint';

## == 和 ===

```js
undefined == null // true
undefined === null // false
[] == [] // false
[] === [] // false
{} === {} // false
```

`==` 的比较规则：

- 存在布尔值，两侧都转成数字
- 字符串和数字，都转成数字
- 有一个对象，调 `valueOf()` ，如果 `valueOf()` 不是数字类型，调用 `toString()` 。然后和另一个值比较
- 都是对象，是同一引用才相等
- `null` 和 `undefined` 任何时候不会做转换为其他值，但是 `null == undefined`
- 如果存在 `NaN`, 两侧不相等

```js
false == 0 // true
true == 1

'12' == 12 // true

[12] == 12 // true
[12] == '12' // true

[12] == [12] // false
{a: 12} == {a: 12} //false

null == 0 // false
undefined == 0 //false
null == undefined // false

NaN == NaN // false
```

## 关系运算符比较

- 存在布尔值，两侧都转成数字
- 字符串和数字，都转成数字
- 都是字符串,按字典序比较
- 如果是数组，数组调用 `toString()` 转字符串，再和另一个值比
- 如果是其它对象返回 `false`
- [如果存在 `null` ， `null` 转为 0](https://stackoverflow.com/questions/2910495/why-null-0-null-0-but-not-null-0)
- 如果存在 `undefined` 返回 `false`
- 如果存在 `NaN` 返回 `false`

```js
true > 0  // true
'12' >  2 // true

'12' > '2' // false
'b' > 'abbb' // true

[12] > '2' //false
[12] >= '12' // true
[12] > 2 // true

{a: 1} < {b: 2} //false

null > 0 || null < 0 //false
null >= 0 && null <= 0 //true

undefined >= 0 || undefined <= 0 // false
```

<Hint type="warning">引用类型都是地址的比较，而非真实值的比较</Hint>

其实我们自己可以重写 `shouldComponentUpdate` 这个函数，使得其能够对任何事物进行比较，也就是深比较（通过一层一层的递归进行比较），深比较是很耗时的，一般不推荐这么干，因为要保证比较所花的时间少于重新渲染的整个组件所花的时间 `shouldComponentUpdate`, redux 状态树的比较是什么比较？

## Object.is 等值比较

|  | 解释 | 基础类型 | 引用类型 | +0 和-0 | NaN 和 NaN |
| --- | --- | --- | --- | --- | --- |
| == | 相等运算符 | 值的比较（会自动转换数据类型） | 引用地址比较 | true | false |
| === | 严格相等运算符 | 值+类型的比较（不会自动转换数据类型） | 引用地址比较 | true | false |
| Object.is | (a,b) | 同值相等比较 | 值+类型的比较（不会自动转换数据类型） | 引用地址比较 | false | true |

`undefined` 和 `null` 与自（严格）相等。

ES6 之前缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等（指的是+0 和-0，NaN 和 NaN 的情况，引用类型还是引用比较）。

ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is 就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

```js
Object.is('foo', 'foo'); // true
Object.is({}, {}); // false
```

不同之处只有两个：一是+0 不等于-0，二是 NaN 等于自身。

```js
+0 === -0; //true
NaN === NaN; // false

Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
```

## 浅比较 shallowEqual

```js
function shallowEqual(a, b) {
  // 三等判断出是true，那肯定是true
  if (a === b) return true;
  if (Object.is(a, NaN)) return Object.is(b, NaN);

  // 三等判断出是false，只要其中一个是原始类型，那这个false是有效的
  // ps：如果a,b都是函数的话统统不等
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a === null || b === null) return false;

  // 相同类的实例才继续，否则就没必要比了
  if (a.__proto__ !== b.__proto__) return false;
  if (a instanceof Date) return +a === +b;
  if (a instanceof RegExp) return '' + a === '' + b;
  if (a instanceof Set) return shallowEqual([...a], [...b]);
  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (let key of a.keys()) {
      if (a.get(key) !== b.get(key)) return false;
    }
    return true;
  }

  // 先看看a, b的大小，不一样也没必要比了
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  // 对其属性再进行递归比较
  return aKeys.every(k => a[k] === b[k]);
}
```

## 深比较 deepEqual

1. 对于非引用类型：数字、字符串、 `null` 、 `undefined` 、布尔类型，使用 `===` 操作既可以判断出来。对于特殊的 `NaN === NaN` 为 false 和 `0 === -0` 为 true 这两种情况要特殊处理。这里我们不讨论这两种情况，因为我觉的这两种值没有意义，业务中也不会出现这两种值，但是他们在 `_.isEqual` 下是相等的。
2. 对于日期类型、正则类型不能使用 `===` 处理，需要单独做处理。
3. 对于 Object 和 Array 类型则需要递归处理， `Object` 和 `Array` 的元素可能包括任何数据类型。
4. 如何实现对 `Set()` 、 `Map()` 、类数组对像等其他类型的实现。

```js
function deepEqual(a, b) {
  // 三等判断出是true，那肯定是true
  if (a === b) return true;
  if (Object.is(a, NaN)) return Object.is(b, NaN);

  // 三等判断出是false，只要其中一个是原始类型，那这个false是有效的
  // ps：如果a,b都是函数的话统统不等，lodash是这个效果
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  // 当a和b中一个是object,另一个是null
  if (a === null || b === null) return false;

  // 相同类的实例才继续，否则就没必要比了
  if (a.__proto__ !== b.__proto__) return false;
  if (a instanceof RegExp) return '' + a === '' + b;
  if (a instanceof Date) return +a === +b;
  if (a instanceof Set || a instanceof Map) return deepEqual([...a], [...b]);

  // 先看看a, b的大小，不一样也没必要比了
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;

  // a, b都是空对象
  if (keys.length === 0) return true;

  // 对其属性再进行递归比较
  return keys.every(k => deepEqual(a[k], b[k]));
}
```
