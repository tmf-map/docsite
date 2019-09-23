---
id: redux
title: Redux
sidebar_label: Redux
---

## Redux 三大理念

Redux是有自己的**三大理念的（Three Principles）**，所以我们的最佳实践都是基于这三个理念：

1. **Single source of truth**：应用程序的所有 state 应该被保存在单个 store 中。
2. **State is read-only**: state 不能被直接修改，只能通过触发 action 来修改。 
3. **Changes are made with pure functions**: 使用**纯函数式**的 reducer 来处理数据修改逻辑。纯函数意味着没有 side effect，也就是处理逻辑不能依赖于全局变量，只能依赖于传入的参数；不能修改传入的参数，返回的应该是一个全新的对象。

