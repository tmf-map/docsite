---
id: state
title: 状态
sidebar_label: 状态
---

import Hint from '../../../src/components/Hint'

## state v.s. props

* `state` 是组件自身的状态，组件自己维护，也可以从父组件传递而来。
* `props` 是传递来的状态，可以是从父组件传递而来，也可以是组件自身绑定的属性。

可以通过 ES2018 的对象扩展运算符，将父组件的信息以更简洁的方式快速地传递给子组件：

```jsx
<Component {...props} />
```

通过这种方式，不用考虑性能的问题，通过 babel 转义后的 `... 运算符` 性能和原生的一致。

<Hint type="best">请只传递 component 需要的 props，不要滥用。传得太多，或者层次传得太深，都会加重 shouldComponentUpdate 里面的数据比较负担，因此请慎用spread attributes。</Hint>


## prop-types

prop-types用来检查组件的属性，当你给属性传递了无效值时，JavsScript 控制台将会打印警告。出于性能原因，prop-types 只在**开发模式**下进行检查。

```text
prop-types // 包名
propTypes // 组件属性名
PropTypes // 类名
```

<Hint type="warning">命名，尤其是后面两个p的大小写</Hint>


## defaultProps

`defaultProps` 用来确保 `this.props.name` 在父组件没有特别指定的情况下，有一个初始值。类型检查发生在 `defaultProps` 赋值之后，所以类型检查也会应用在 `defaultProps` 上面。

## setState

### 哪些周期可以使用？

* did 的生命周期都可以。
* will 的生命周期只有`componentWillReceiveProps`、`componentWillMount` ，且这两个周期都将要废弃。

### 如何修改 state？

在合适的生命周期内调用 `this.setState()` 函数。

<Hint type="must">绝对不要直接修改 this.state，这不仅是一种低效的做法，而且修改的状态有可能被之后的 setState 操作覆盖。</Hint>


<Hint type="warning">setState 方法只适用于 class 类型的组件，函数式组件一般无法调用该方法。</Hint>


