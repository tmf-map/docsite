---
id: lifecycle
title: 生命周期
sidebar_label: 生命周期
---

import Hint from '../../../src/components/Hint'
import Img from '../../../src/components/Img'

## React < v16.3

### 生命周期图

<Img width="700" legend="图：React < v16.3 生命周期图" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/VtURUQ.png'/>

红色是在未来 v17 版本后将要废弃的生命周期。

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

### setState 循环调用风险

当调用 `setState` 时，实际上是会执行 `enqueueSetState` 方法，并会对 `partialState` 及 `_pendingStateQueue` 队列进行合并操作，最终通过 `enqueueUpdate` 执行 `state` 更新。

而 `performUpdateIfNecessary` 获取 `_pendingElement` 、 `_pendingStateQueue` `、_pendingForceUpdate` ，并调用 `reaciveComponent` 和 `updateComponent` 来进行组件更新。

<Hint type="must">不能在 `shouldComponentUpdate` 或 `componentWillUpdate` 里调用 `this.setState` 方法。</Hint>

这是因为在 `shouldComponentUpdate` 或 `componentWillUpdate` 方法里调用 `this.setState` 时，`this._pendingStateQueue != null`，则 `performUpdateIfNecessary` 方法就会调用 `updateComponent` 方法进行组件更新，而 `updateComponent` 方法又会调用 `shouldComponentUpdate` 和 `componentWillUpdate` 方法，因此造成循环调用，使得浏览器内存占满后崩溃。

<Img width="300" align="center" legend="图：循环调用" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/gz0v4j.png'/>

setState 源码：

```js
ReactComponent.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState)
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState')
  }
}

enqueueSetState: function(publicInstance, partialState) {
  var internalInstance = getInternalInstanceReadyForUpdate(
    publicInstance,
    'setState'
  )
  if (!internalInstance) {
    return
  }
  
  // 更新队列合并操作
  var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue=[])
  queue.push(partialState)
  enqueueUpdate(internalInstance)
}

// 如果存在 _pendingElement、_pendingStateQueue、_pendingForceUpdate，则更新组件
performUpdateIfNecessary: function(transaction) {
  if (this._pendingElement != null) {
    ReactReconciler.receiveComponent(this, this._pendingElement, transaction, this._context)
  }
  
  if (this._pendingStateQueue != null || this._pendingForceUpdate) {
    this.updateComponent(transaction, this._currentElement, this._currentElement,
      this._context, this._context)
  }
}
```

## React > v16.3

React v16.3，引入了两个新的生命周期函数：

* **getDerivedStateFromProps**
* **getSnapshotBeforeUpdate**

<Hint type="tip">`getDerivedStateFromProps` 实际上就是用来取代以前的 `componentWillMount` 和 `componentWillReceiveProps` 。</Hint>

随着 `getDerivedStateFromProps` 的推出，同时 Deprecate 了一组生命周期 API，包括：

- **componentWillMount**
- **componentWillReceiveProps**
- **componentWillUpdate**

### 生命周期图

新的生命周期图如下图（[源自](https://github.com/wojtekmaj/react-lifecycle-methods-diagram)）所示：

<Img legend="图：React > v16.3 生命周期图" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/n5LYwH.png'/>

## 参考资料

1. [深入 setState 机制, by sisterAn](https://github.com/sisterAn/blog/issues/26)
1. [react-lifecycle-methods-diagram](https://github.com/wojtekmaj/react-lifecycle-methods-diagram)
