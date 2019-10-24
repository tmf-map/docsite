---
id: middleware
title: Middleware
sidebar_label: Middleware
---

import Hint from '../../../src/components/Hint'
import Img from '../../../src/components/Img'

## 思想精华三：中间件思想与洋葱模型

### 在 dispatch 过程中穿过 middleware

- state -> 洋葱的中心
- middleware -> 洋葱的一层一层皮
- dispatch -> 剥开洋葱到达中心的“工具”

<Img width="400" legend="图：middleware 洋葱模型" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/middleware.png'/>

我们需要对 dispatch 做一个增强，让其每调用一次都穿过所有的 middleware，假设将这个增强的函数定义为:

```js
enhanceDispatchByMiddleware(store, [middleware1, middleware2])
```

在我们之前的代码 `demo.js` 的基础上，创建了2个中间件，一个用来记录日志，一个用来捕获错误：

```js
// Middleware1
const logger = store => next => action => {
  console.log('m1 left part:', store.getState())
  console.log('m1 left part:', next)
  next(action)
  console.log('m1 right part:', store.getState())
  console.log('m1 right part:', next)
}
// Middleware2
const collectError = store => next => action => {
  console.log('m2 left part:', store.getState())
  console.log('m2 left part:', next)
  next(action)
  console.log('m2 right part:', store.getState())
  console.log('m2 right part:', next)
}
enhanceDispatchByMiddleware(store, [logger, collectError])
```

我们注意到中间件是一个柯里化的函数：

```js
const logger = store => next => action => {}
```

其实每个中间件

```diff
+ function enhanceDispatchByMiddleware (store, middlewares) {
+   middlewares.forEach(middleware => {
+     let next = store.dispatch
+     store.dispatch = middleware(store)(next) // store cuz some middleware need getState
+   })
+ }
export {
  createStore,
+ enhanceDispatchByMiddleware
}
```

最终的输出结果是这样的：

<img width="450" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Qr0Qgd.png'/>



### 抽象出 applyMiddleware

```diff
- function enhanceDispatchByMiddleware (store, middlewares) {
+ function applyMiddleware (middlewares) {
+   return function (store) {
      middlewares.forEach(middleware => {
        let next = store.dispatch
        store.dispatch = middleware(store)(next) // store cuz some middleware need getState
      })
+     return store
+   }
  }

- function createStore(reducer, initialState) {
+ function createStore (reducer, initialState, enhancers) {
+   funtion createStoreWithoutEnhancers (reducer, initialState) {
      let state = initialState;
      return {
        getState: function () {
          return state;
        },
        dispatch: function(action) {
          state = reducer(state, action)
        }
      }
+   }
+   const store = createStoreWithoutEnhancers(reducer, initialState)
+   return enhancers(store)
  }
```

```diff
- const store = createStore(reducer, initialState)
- enhanceDispatchByMiddleware(store, [logger, collectError])
+ const enhancers = applyMiddleware([logger, collectError])
+ const store = createStore(reducer, initialState, enhancers)
```

### 纠正 middleware 的顺序

```diff
function applyMiddleware (middlewares) {
  return function (store) {
-   middlewares.forEach(middleware => {
+   middlewares.reverse().forEach(middleware => {
      let next = store.dispatch
      store.dispatch = middleware(store)(next) // store cuz some middleware need getState
    })
    return store
  }
}
```

请慎用自定义的 redux-middleware，错误的配置可能会影响到其他 middleware。

![dispatch workflow](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/D5qAHg.jpg)

```javascript
applyMiddleware(m1, m2, m3)
```

<Hint type="warning">在执行middleware的时候顺序是从左至右，即：m1, m2, m3。在 Rematch 的 middlewares 数组中的顺序也是从左至右。</Hint>

## redux-observables

[https://github.com/redux-observable/redux-observable](https://github.com/redux-observable/redux-observable)
