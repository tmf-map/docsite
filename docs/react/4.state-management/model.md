---
id: model
title: Model
sidebar_label: Model
---

Model 是 Rematch 中的概念，主要用来简化 Redux，它将 Reducer, Action 放到了一起形成了 model 概念，并移除了定义起来非常繁琐鸡肋的 type。且内部支持异步功能，不需要引入 `redux-thunk`。

在 store 定义的时候不需要手动去加载[Redux Devtools](https://github.com/zalmoxisus/redux-devtools-extension)，Rematch具有开箱即用的Redux Devtools。不需要配置。详情见：[https://rematch.gitbook.io/handbook/ji-qiao/untitled](https://rematch.gitbook.io/handbook/ji-qiao/untitled)

需要注意的是 effect 的函数定义：

`effects: { [string]: (payload, rootState) }`

例如：

```javascript
{
  effects: {
    logState(payload, rootState) {
      console.log(rootState)
    }
  }
}
```

`rootState` 其实就相当于 `getState` 用来获取当前状态树的所有状态。注意它是在第二个参数，当该函数需要传多个参数的时候，可以将它们封装在一个对象里面作为 payload。

采用 model 的方式，可以直接进行链式 dispatch，这将移除以前 dispatch 时对action 函数的引入。例如：

```javascript
import { dispatch } from '@rematch/core'

// old
dispatch({ type: 'count/increment', payload: 1 }) // or maybe action function
// new
dispatch.count.increment(1)
```

更多请参考 Rematch 的使用文档：[https://rematch.gitbook.io/handbook/](https://rematch.gitbook.io/handbook/)

