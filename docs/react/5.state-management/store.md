---
id: store
title: Store
sidebar_label: Store
---

import Hint from '../../../src/components/Hint'

## Store 和 reducer

Store 其实和 reducer 息息相关。

一个Redux app中只有一个store，所有的数据都在这个store中，而通过：

```javascript
createStore(reducer, [initState]) // initState 是可选参数
```

也就是说决定 store 的是reducer，reducer 决定 store中存放什么样的数据、处理什么样的数据、处理数据的方式。

Store 在创建的时候内部会执行 `dispatch({ type: ActionTypes.INIT })`，用来初始化整个 Store 的数据结构，同时获取 Reducer 中的默认数据。

之所以能拿到全部的数据结构，是因为在 `dispatch({ type: ActionTypes.INIT })` 的时候，所有的Reducer 都会执行，并根据 Reducer 的 combine 结构生成数据。

<Hint type="warning">在 Redux 内，每执行一次 dispatch，所有的 Reducer 都会执行。</Hint>


## Store 的数据设计

<Hint type="best">应用状态应该尽可能扁平化，或者使用 [normalizr](https://github.com/paularmstrong/normalizr) 工具，依据定义的 schema 设计应用的数据结构。</Hint>


<Hint type="best">Store 应该只存储不可以被计算出的数据，储存尽可能少的 state，而让 Selector 去计算推导的数据和需要缓存的数据。</Hint>


对于可以从其他数据中计算出来的，就不要在 Store 中重复存储一份了，直接在 Selector 中计算出来就可以了。因为冗余数据的同步维护，是非常费力并且容易出错的。

临时数据不一定要进 Store。例如查询结果这种数据，可以直接放在 React 组件的 state 中。但如果查询结果需要被缓存，切换页面回来后还能看到，那还是要进 Store。

