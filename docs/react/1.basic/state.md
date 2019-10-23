---
id: state
title: 状态
sidebar_label: 状态
---

import Hint from '../../../src/components/Hint'
import Img from '../../../src/components/Img'

React 的状态包括组件的外部状态（props）和组件的内部状态（state），二者发生改变的时候都会更新组件。

## state v.s. props

* `state` 是组件自身的状态，组件自己维护，也可以从父组件传递而来。
* `props` 是传递来的状态，可以是从父组件传递而来，也可以是组件自身绑定的属性。

可以通过 ES2018 的对象扩展运算符，将父组件的信息以更简洁的方式快速地传递给子组件：

```jsx
<Component {...props} />
```

通过这种方式，不用考虑性能的问题，通过 babel 转义后的 `... 运算符` 性能和原生的一致。

<Hint type="best">请只传递 component 需要的 props，不要滥用。传得太多，或者层次传得太深，都会加重 `shouldComponentUpdate` 里面的数据比较负担，因此请慎用 spread attributes。</Hint>


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

### 一个例子

当使用 `this.setState()` 时，React 会调用 render 方法来重新渲染 UI。先看一个例子：

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  
  componentDidMount() {
    this.setState({count: this.state.count + 1});
    console.log(this.state.count);    // 第 1 次 log

    this.setState({count: this.state.count + 1});
    console.log(this.state.count);    // 第 2 次 log

    setTimeout(() => {
      this.setState({count: this.state.count + 1});
      console.log(this.state.count);  // 第 3 次 log

      this.setState({count: this.state.count + 1});
      console.log(this.state.count);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
```

最后结果是 `0 0 2 3`

`setState` 通过一个队列机制来实现 state 更新，当执行 `setState()` 时，会将 `nextState` 浅合并到当前 state 后放入**状态队列**，而不会立即更新 state，队列机制可以高效的批量更新 state。

### 两种调用方式

#### 方式一:

```js
setState(nextState[, callback])
```

<Hint type="best">`setState()` 的第二个参数为可选的回调函数，它将在 setState 完成合并并重新渲染组件后执行。通常，我们建议使用 `componentDidUpdate` 来代替此方式。</Hint>

<Hint type="warning">出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。</Hint>

<Hint type="warning">setState 方法只适用于 class 类型的组件，函数式组件一般无法调用该方法。</Hint>

<Hint type="must">不要直接修改 `this.state` 的值，否则不会放入状态队列，当下一次调用 `setState` 对状态队列进行合并时，之前对 `this.state` 的修改将会被忽略，造成无法预知的错误。</Hint>

举个例子：

```js
// 假设 state.count === 0
this.setState({count: state.count + 1});
this.setState({count: state.count + 1});
this.setState({count: state.count + 1});
// state.count === 1, 而不是 3
```

本质上等同于：

```js
// 假设 state.count === 0
Object.assign(state,
  {count: state.count + 1},
  {count: state.count + 1},
  {count: state.count + 1}
)
// {count: 1}
```

#### 方式二:

```js
setState(updater[, callback])
```

参数一为带有形式参数的 updater 函数：`(prevState, props) => nextState`

```js
this.setState((prevState, props) => ({
  count: prevState.count + 1
}))
this.setState((prevState, props) => ({
  count: prevState.count + 1
}))
this.setState((prevState, props) => ({
  count: prevState.count + 1
}))
// {count: 3}
```

这种函数式 `setState()` 工作机制类似 Redux 中的 reducer 函数：

```js
function reducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload.name
      }
    // ...
  }
}
```

<Hint type="best">如果是下一个 state 依赖前一个 state 的话，推荐给 setState 传 function 。</Hint>

### 循环调用风险

当调用 setState 时，实际上是会执行 `enqueueSetState` 方法，并会对 `partialState` 及 `_pendingStateQueue` 队列进行合并操作，最终通过 `enqueueUpdate` 执行 `state` 更新。

而 `performUpdateIfNecessary` 获取 `_pendingElement` 、 `_pendingStateQueue` `、_pendingForceUpdate` ，并调用 `reaciveComponent` 和 `updateComponent` 来进行组件更新。

<Hint type="must">`did` 的生命周期都可以。但不能在 `shouldComponentUpdate` 或 `componentWillUpdate` 里调用 `this.setState` 方法。</Hint>

这是因为在 `shouldComponentUpdate` 或 `componentWillUpdate` 方法里调用 `this.setState` 时，`this._pendingStateQueue != null`，则 `performUpdateIfNecessary` 方法就会调用 `updateComponent` 方法进行组件更新，而 `updateComponent` 方法又会调用 `shouldComponentUpdate` 和 `componentWillUpdate` 方法，因此造成循环调用，使得浏览器内存占满后崩溃。

<Img width="300" align="center" legend="图：循环调用" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/gz0v4j.png'/>

### setState 源码

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

### setState 调用栈

既然 `setState` 是通过 `enqueueUpdate` 来执行 state 更新的，那 `enqueueUpdate` 是如何实现更新 state 的呢？

<Img width="500" align="center" legend="图：setState 简化调用栈" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/IPUdYv.jpg'/>

上面这个流程图是一个简化的 `setState` 调用栈，注意其中核心的状态判断，在源码([ReactUpdates.js](https://github.com/facebook/react/blob/35962a00084382b49d1f9e3bd36612925f360e5b/src/renderers/shared/reconciler/ReactUpdates.js#L199))中

```js
function enqueueUpdate(component) {
  // ...

  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }

  dirtyComponents.push(component);
}
```

若 `isBatchingUpdates` 为 false 时，所有队列中更新执行 `batchUpdate` ，否则，把当前组件（即调用了 setState 的组件）放入 `dirtyComponents` 数组中。先不管这个 `batchingStrategy` ，开始的例子中 4 次 setState 调用表现之所以不同，这里逻辑判断起了关键作用。

> 因为在 `componentDidMount` 中调用 setState 时， `batchingStrategy` 的 `isBatchingUpdates` 已经被设为 `true` ，所以两次 setState 的结果并没有立即生效，而是被放进了 `dirtyComponents` 中。这也解释了两次打印 `this.state.count` 都是 0 的原因，新的 state 还没有被应用到组件中。

> 而 `setTimeout` 中的两次 setState ，因为没有前置的 `batchedUpdate` 调用，所以 `batchingStrategy` 的 `isBatchingUpdates` 标志位是 `false` ，也就导致了新的 state 马上生效，没有走到 `dirtyComponents` 分支。也就是 `setTimeout` 中第一次 setState 时，`this.state.count` 为 1，而 setState 完成后打印时 `this.state.count` 变成了 2。第二次 setState 同理。

如果是由 React 引发的事件处理（比如通过 onClick 引发的事件处理），调用 setState 不会同步更新 `this.state` ，除此之外的 setState 调用会同步执行 `this.state` 。所谓“除此之外”，指的是绕过 React 通过 `addEventListener` 直接添加的事件处理函数，还有通过 `setTimeout` / `setInterval` 产生的异步调用。

在 React 的 setState 函数实现中，会根据一个变量 `isBatchingUpdates` 判断是直接更新 `this.state` 还是放到队列中回头再说，而 `isBatchingUpdates` 默认是 false，也就表示 setState 会同步更新 `this.state`，但是，有一个函数 `batchedUpdates` ，这个函数会把 `isBatchingUpdates` 修改为 true，而当 React 在调用事件处理函数之前就会调用这个 `batchedUpdates` ，造成的后果，就是由 React 控制的事件处理过程 setState 不会同步更新 `this.state`。

## 参考资料

1. [深入 setState 机制, by sisterAn](https://github.com/sisterAn/blog/issues/26)
1. [揭密React setState, by 黄qiong](https://imweb.io/topic/5b189d04d4c96b9b1b4c4ed6)
