---
id: model
title: Model
---

## What's Rematch?

Model 是 Rematch 中的概念，主要用来简化 Redux，它将 state, reducers, async actions 以及 action creators 放到了一起形成了 model 概念，并移除了定义起来非常繁琐鸡肋的 type。且内部支持异步功能，不需要引入 `redux-thunk`。

```bash npm2yarn
npm install @rematch/core
```

:::note

Rematch 官方文档：https://rematch.github.io/rematch/#/README?id=rematch

:::

## Step 1: Init

在 store 定义的时候不需要手动去加载[Redux Devtools](https://github.com/zalmoxisus/redux-devtools-extension)，Rematch 具有开箱即用的 Redux Devtools。不需要配置。

```js
import {init} from '@rematch/core';
import * as models from './models';

const store = init({
  models
});

export default store;
```

在 `init` 的时候也可以加入 [plugins](https://github.com/rematch/rematch/tree/e4fe17537a947bbe8a9faf1e0e77099beb7fef91/docs/plugins.md) 和 [redux](https://rematch.github.io/rematch/#/api-reference/reduxapi)（redux 项目共存，逐步迁移或需要 middleware 时使用）

## Step 2: Models

model 是 Rematch 中的核心概念，先看一个例子：

```js
export const count = {
  state: 0, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      return state + payload;
    }
  },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch.count.increment(payload);
    }
  })
};
```

`rootState` 其实就相当于 `getState` 用来获取当前状态树的所有状态。注意它是在第二个参数，当该函数需要传多个参数的时候，可以将它们封装在一个对象里面作为 `payload`。

另外 `incrementAsync` 里面如果有 return value 的话也可以在调用的时候选用异步的写法，比如:

```js
dispatch.xxx.incrementAsync().then(data => {
  data; // 就是 `incrementAsync` 中 return 的值
  props.count; // 假设 `incrementAsync` 改变了状态树中的 count，此时拿到的 count 也是最新的
});
```

:::caution

init 中定义 middleware 的时候要注意不要影响 effects 中异步调用的顺序，否则以上 then 的调用顺序将不再是异步。

:::

## Step 3: Dispatch

采用 model 的方式，可以直接进行链式 dispatch，这将移除以前 dispatch 时对 action 函数的引入。例如：

```js
import {dispatch} from '@rematch/core';

// old
dispatch({type: 'count/increment', payload: 1}); // or maybe action function
// new
dispatch.count.increment(1);
dispatch.count.incrementAsync(1); // after delay
```

## Step 4: View

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import store from './store';

const Count = props => (
  <div>
    The count is {props.count}
    <button onClick={props.increment}>increment</button>
    <button onClick={props.incrementAsync}>incrementAsync</button>
  </div>
);

const mapState = state => ({
  count: state.count
});

const mapDispatch = ({count: {increment, incrementAsync}}) => ({
  increment: () => increment(1),
  incrementAsync: () => incrementAsync(1)
});

const CountContainer = connect(mapState, mapDispatch)(Count);

ReactDOM.render(
  <Provider store={store}>
    <CountContainer />
  </Provider>,
  document.getElementById('root')
);
```

## Examples

- [JavaScript](https://codesandbox.io/s/rematch-count-demo-b2now)
- [TypeScript](https://codesandbox.io/s/rematch-typescript-example-dl74s)
