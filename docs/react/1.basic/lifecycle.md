---
id: lifecycle
title: 生命周期
sidebar_label: 生命周期
---

import Hint from '../../../src/components/Hint'
import Img from '../../../src/components/Img'

## React < v16.3

### 生命周期图

<Img width="700" legend="图：React < v16.3 生命周期图" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/WGGaWn.png'/>

- 红色是在 v17 版本后废弃的生命周期。
- 细字体的声明周期是不常用的，加粗是常用的。

### 父子组件加载顺序

假设有 Parent 和 Child 两个组件如下，那么先输出哪一个呢？

```jsx
class Child extends React.Component {
  componentWillMount() {
    console.log("componentWillMount: Child");
  }
  componentDidMount() {
    console.log("componentDidMount: Child");
  }
  render() {
    return <div>child</div>;
  }
}

class Parent extends React.Component {
  componentWillMount() {
    console.log("componentWillMount: Parent");
  }
  componentDidMount() {
    console.log("componentDidMount: Parent");
  }
  render() {
    return (
      <div>
        <Child />
      </div>
    );
  }
}
```

[在线 Demo](https://codesandbox.io/s/parent-child-lifecycle-fkkrg) ，结果输出如下：

```text
componentWillMount: Parent
componentWillMount: Child
componentDidMount: Child
componentDidMount: Parent
```

其实源码实现类似以下的过程：

```js
component.componentWillMount && component.componentWillMount()
componentToRealDOM(component)
component.componentDidMount && component.componentDidMount()
```

## React > v16.3

### 生命周期图

新的生命周期图如下图（[源自](https://github.com/wojtekmaj/react-lifecycle-methods-diagram)）所示：

<Img legend="图：React > v16.3 生命周期图" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/n5LYwH.png'/>

- 细字体的声明周期是不常用的，加粗是常用的。

React v16.3，引入了两个新的生命周期函数：

* **static getDerivedStateFromProps**
* **getSnapshotBeforeUpdate**

这两个生命周期虽然是新加的，但并不太常用。它们偶尔会很方便，但是大部分情况下可能都不需要它们。

<Hint type="tip">`getDerivedStateFromProps` 实际上就是用来取代以前的 `componentWillMount` 和 `componentWillReceiveProps` 。</Hint>

随着 `getDerivedStateFromProps` 的推出，同时 Deprecate 了一组生命周期 API，包括：

- **componentWillMount**
- **componentWillReceiveProps**
- **componentWillUpdate**

### getDerivedStateFromProps

```js
static getDerivedStateFromProps(props, state)
```

<Hint type="tip">`getDerivedStateFromProps` 的存在只有一个目的：让组件在 props 变化时更新 state。</Hint>

`getDerivedStateFromProps` 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

`Derived [dɪ'raɪvd]` 取“衍生的，派生的”之意，此方法适用于罕见的用例，即 state 的值在任何时候都取决于 props。例如，实现 `<Transition>` 组件可能很方便，该组件会比较当前组件与下一组件，以决定针对哪些组件进行转场动画。

派生状态会导致代码冗余，并使组件难以维护。 确保你已熟悉这些简单的替代方案：

- 如果你需要执行副作用（例如，数据提取或动画）以响应 props 中的更改，请改用 `componentDidUpdate` 。
- 如果只想在 prop 更改时重新计算某些数据，请使用 memoization helper 代替。
- 如果你想在 prop 更改时“重置”某些 state，请考虑使组件完全受控或使用 key 使组件完全不受控代替。

### getSnapshotBeforeUpdate

```js
getSnapshotBeforeUpdate(prevProps, prevState)
```

`getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 `componentDidUpdate()`。

此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。

应返回 snapshot 的值（或 `null`）。例如：

```jsx
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 我们是否在 list 中添加新的 items ？
    // 捕获滚动​​位置以便我们稍后调整滚动位置。
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
    // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
    //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
}
```

在上述示例中，重点是从 `getSnapshotBeforeUpdate` 读取 `scrollHeight` 属性，因为 “render” 阶段生命周期（如 `render`）和 “commit” 阶段生命周期（如 `getSnapshotBeforeUpdate` 和 `componentDidUpdate`）之间可能存在延迟。

