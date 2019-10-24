---
id: redux
title: Redux
sidebar_label: Redux
---

## 思想精华一：巧用 reduce 函数

### 什么是 reduce

### 实现一个 reduce

先看一下最基本的 reduce 函数是如何实现的

```js
// reduce :: (a -> b -> a) -> a -> [b] -> a
function reduce(reducer, initialData, allData) {
  let accumulator = initialData;
  for (let i = 0; i < allData.length; i++) {
    let curData = allData[i]
    accumulator = reducer(accumulator, curData)
  }
  return accumulator;
}
reduce((a, b) => a + b, 0, [1, 2, 3, 4, 5]) // 15
reduce((a, b) => a + b, 10, [1, 2, 3, 4, 5]) // 25
```

### 从 reduce 到 redux

此时替换几个概念，本质上是不变的：

- accumulator -> state
- allData -> eventStream
- curData -> action

```js
// redux :: (a -> b -> a) -> a -> [b] -> a
function redux(reducer, initialState, eventStream) {
  let state = initialState;
  let action;
  for (let i = 0; i < eventStream.length; i++) {
    let action = eventStream[i];
    state = reducer(state, action);
  }
  return state;
}
```

```js
// reducer :: a -> b -> a
function reducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload.name
      }
    case 'SET_AGE':
      return {
        ...state,
        age: action.payload.age
      }
  }
}

const initialState = {name: 'Kimi', age: 18};

const eventStream = [
  {type: 'SET_NAME', payload: {name: 'Robbie'}},
  {type: 'SET_AGE', payload: {age: 16}}
];

redux(reducer, initialState, eventStream) // {name: 'Robbie', age: 16}
```

以上就是 Redux 最最最基本的一个雏形，当然有这些肯定还是不够的，在后面的章节中我们再一步步给它加强。从这里可以看出 Redux 的命名也可能取自 `reduce + x` 的组合，一般和 React 相关的会用 `x` 比如 `jsx`, `mdx` 等。虽然现在的 redux 也不依赖 react ，但不可否认其兴起和 react 的流行也息息相关。

## Redux 三大理念

Redux是有自己的**三大理念的（Three Principles）**，所以我们的最佳实践都是基于这三个理念：

1. **Single source of truth**：应用程序的所有 state 应该被保存在单个 store 中。
2. **State is read-only**: state 不能被直接修改，只能通过触发 action 来修改。 
3. **Changes are made with pure functions**: 使用**纯函数式**的 reducer 来处理数据修改逻辑。纯函数意味着没有 side effect，也就是处理逻辑不能依赖于全局变量，只能依赖于传入的参数；不能修改传入的参数，返回的应该是一个全新的对象。

