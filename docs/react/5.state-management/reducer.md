---
id: reducer
title: Reducer
sidebar_label: Reducer
---

import Hint from '../../../src/components/Hint';

## 什么是 Reducer ?

用于修改 Store 的**纯函数**。

<Hint type="bad">Reducer 一定要是纯函数，禁止使用非纯函数。</Hint>

<Hint type="good">Reducer 函数应该尽量简单，只是修改 Store 的操作，尽量不写业务代码。</Hint>

## Reducer 模块化

<Hint type="good">不同的模块应该有不同的 Reducer，最后通过 combineReducers 来 combine 到一起。</Hint>

【问题】Reducer 的划分后之间的状态共享问题？否则一个 Reducer 会越来越大，case 的情况会越来越多，拆分后如何能很好地进行 Reducer 之间的通信和状态共享？

## Immutable

复杂数据的深度拷贝是很花性能的，这个时候就可以使用 Immutable 来解决这个问题。Immutable 不可改变的意思。对 Immutable 生成的数据进行操作之后总是返回一个新的数据，原有的数据不会改变。

```javascript
import Immutable from 'immutable';
const map1 = Immutable.Map({a: 1, b: 2, c: 3});
const map2 = map1.set('b', 50);
map1.get('b'); // 2
map2.get('b'); // 50
```

Immutable 通过**结构共享**来解决的数据拷贝时的性能问题，数据被 set 的时候，Immutable 会只 clone 它的父级别以上的部分，其他保持不变，这样大家可以共享同样的部分，可以大大提高性能。如图所示：

![Immutable 数据更新机制动态效果图](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/immutable.gif)

最后橙色的节点是结构共享的部分。

Immutable 有两个库：

- [immutable-js](https://github.com/facebook/immutable-js)：Facebook 的项目，比较重，取数据必须用函数，对数据有极高的性能要求时用。
- [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)：精简版的 Immutable，取数据可以直接点取，大部分情况使用该库即可。

<Hint type="bad">Reducer 初始化 initialState 时必须使用 Immutable 的数据类型，防止在 Reducer 外的其他地方对 Store 发生修改操作。</Hint>

<Hint type="good">Reducer 初始化 initialState 时使用 **immutable-js** 时建议用 Immutable.Map 方法而不是 fromJS 方法，效率更高。</Hint>
