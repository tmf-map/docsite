---
id: presentational-component
title: presentational 组件
sidebar_label: presentational 组件
---

presentational 组件理论上可以全部为函数式组件，状态的监听和控制基本上由 Redux 控制即可。

> **推荐**：presentational 组件可以嵌套粒度更小的函数式组件，避免该 presentational 组件 v-dom 过大。


> **强制**：更小粒度的函数式组件的命名以类似 renderComponent 这样方式命名。


> **强制**：更小粒度的函数式组件的 props 参数前面要加下划线，即 \_props 。否则会需要冗余的 PropType 验证。


