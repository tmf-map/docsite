---
id: lifecycle
title: 生命周期
---

import Img from '../../../src/components/Img';

## React v16.3 之前

### 生命周期图

<Img width="650" legend="图：React < v16.3 生命周期图" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/react-v15-lifecycle.svg'/>

- 虚线框是在 v17 版本后废弃的生命周期。

### 父子组件加载顺序

假设有 Parent 和 Child 两个组件如下，那么先输出哪一个呢？

```jsx
class Child extends React.Component {
  componentWillMount() {
    console.log('componentWillMount: Child');
  }
  componentDidMount() {
    console.log('componentDidMount: Child');
  }
  render() {
    return <div>child</div>;
  }
}

class Parent extends React.Component {
  componentWillMount() {
    console.log('componentWillMount: Parent');
  }
  componentDidMount() {
    console.log('componentDidMount: Parent');
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
component.componentWillMount && component.componentWillMount();
componentToRealDOM(component);
component.componentDidMount && component.componentDidMount();
```

## React v16.3 之后

### 生命周期图

新的生命周期图如下图（[源自](https://github.com/wojtekmaj/react-lifecycle-methods-diagram)）所示：

<Img legend="图：React > v16.3 生命周期图" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/n5LYwH.png'/>

React v16.3，引入了两个新的生命周期函数：

- **static getDerivedStateFromProps**：取代 `componentWillMount` 和 `componentWillReceiveProps`
- **getSnapshotBeforeUpdate**：取代 `componentWillUpdate`

这两个生命周期虽然是新加的，但并不太常用。它们偶尔会很方便，但是大部分情况下可能都不需要它们。

React 也为下面三个生命周期钩子加上了 `UNSAFE` 标记:

- **UNSAFE_componentWillMount**
- **UNSAFE_componentWillReceiveProps**
- **UNSAFE_componentWillUpdate**

:::caution

React 团队计划在 17.0 中彻底废弃掉这几个 API。

:::

### getDerivedStateFromProps

```js
static getDerivedStateFromProps(props, state)
```

:::tip

`getDerivedStateFromProps` 的存在只有一个目的：让组件在 props 变化时更新 state。

:::

`getDerivedStateFromProps` 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

`Derived [dɪ'raɪvd]` 取“衍生的，派生的”之意，此方法适用于罕见的用例，即 state 的值在任何时候都取决于 props。例如，实现 `<Transition>` 组件可能很方便，该组件会比较当前组件与下一组件，以决定针对哪些组件进行转场动画。

派生状态会导致代码冗余，并使组件难以维护。 确保你已熟悉这些简单的替代方案：

- 如果你需要执行副作用（例如，数据提取或动画）以响应 props 中的更改，请改用 `componentDidUpdate` 。
- 如果只想在 prop 更改时重新计算某些数据，请使用 memoization helper 代替。
- 如果你想在 prop 更改时“重置”某些 state，请考虑使组件完全受控或使用 key 使组件完全不受控代替。

### getSnapshotBeforeUpdate

```js
getSnapshotBeforeUpdate(prevProps, prevState);
```

`getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。

:::tip

此生命周期的任何返回值将作为参数传递给 `componentDidUpdate()`。

:::

此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。应返回 snapshot 的值（或 `null`）。例如：

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
    return <div ref={this.listRef}>{/* ...contents... */}</div>;
  }
}
```

在上述示例中，重点是从 `getSnapshotBeforeUpdate` 读取 `scrollHeight` 属性，因为 “render” 阶段生命周期（如 `render`）和 “commit” 阶段生命周期（如 `getSnapshotBeforeUpdate` 和 `componentDidUpdate`）之间可能存在延迟。

## 为什么要弃用一些 API

### 为何移除 componentWillMount

:::caution

在 React 未来的版本中，[异步渲染机制(Concurrent Mode)](https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html)可能会**导致单个组件实例可以多次调用该方法**。

:::

很多开发者目前会将事件绑定、异步请求等写在 componentWillMount 中，一旦异步渲染时 componentWillMount 被多次调用，将会导致：

- 进行重复的时间监听，无法正常取消重复的 Listener，更有可能**导致内存泄漏**
- 发出重复的异步网络请求，**导致 IO 资源被浪费**
- 在服务端渲染时，componentWillMount 会被调用，但是会因忽略异步获取的数据而**浪费 IO 资源**

:::good

React 推荐将原本在 componentWillMount 中的网络请求移到 componentDidMount 中。

:::

至于这样会不会导致请求被延迟发出影响用户体验，[React 团队是这么解释](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html)的：

> There is a common misconception that fetching in componentWillMount lets you avoid the first empty rendering state. In practice this was never true because React has always executed render immediately after componentWillMount. If the data is not available by the time componentWillMount fires, the first render will still show a loading state regardless of where you initiate the fetch. This is why moving the fetch to componentDidMount has no perceptible effect in the vast majority of cases.

componentWillMount、render 和 componentDidMount 方法虽然存在调用先后顺序，但在大多数情况下，几乎都是在很短的时间内先后执行完毕，几乎不会对用户体验产生影响。

### 为何移除 componentWillUpdate

大多数开发者使用 componentWillUpdate 的场景是配合 componentDidUpdate，分别获取 rerender 前后的视图状态，进行必要的处理。但随着 React 新的 `suspense`、`time slicing`、`异步渲染`等机制的到来，render 过程可以被分割成多次完成，还可以被暂停甚至回溯，**这导致 componentWillUpdate 和 componentDidUpdate 执行前后可能会间隔很长时间**，足够使用户进行交互操作更改当前组件的状态，这样可能会导致难以追踪的 BUG。

React 新增的 `getSnapshotBeforeUpdate` 方法就是为了解决上述问题，它所带来的好处：

- **状态信息更可靠**：getSnapshotBeforeUpdate 方法是在 componentWillUpdate 后（如果存在的话），在 React 真正更改 DOM 前调用的，它获取到组件状态信息更加可靠。
- **节约内存，效率更高**：getSnapshotBeforeUpdate 调用的结果会作为第三个参数传入 componentDidUpdate，避免了 componentWillUpdate 和 componentDidUpdate 配合使用时将组件临时的状态数据存在组件实例上浪费内存，getSnapshotBeforeUpdate 返回的数据在 componentDidUpdate 中用完即被销毁，效率更高。

## 参考资料

1. [谈谈新的 React 新的生命周期钩子，作者：IMWeb HuQingyang](https://imweb.io/topic/5b8cacaa7cd95ea863193572)
