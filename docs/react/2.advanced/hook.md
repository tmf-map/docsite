---
title: Hook
sidebar_label: Hook
---

import Hint from '../../../src/components/Hint';

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 存在的意义

Hook 的出现，就代表了它要解决一些 class 组件的缺陷或者不足，那么我们先来看看 class 组件有什么不足或者问题存在：

| 问题 | 解决方案 | 缺点 | Hook |
| --- | --- | --- | --- |
| 1.`this` 指向问题 | 匿名函数 | 每次都创建新的函数，子组件重复不必要渲染 | 函数无 `this` 指向问题 |
|  | `bind` | 需要写很多跟逻辑、状态无关的代码 |  |
| 2.生命周期繁琐 | 无 |  | `useEffect` 将三者合体简化 |
| 3.生命周期内逻辑臃肿 | 无 |  | 多个 `useEffect` 来细分逻辑 |
| 4.逻辑难以复用 | 通过继承解决 | 不支持多继承 | 自定义 Effect Hook |
|  | 通过 HOC 解决 | 会增加额外的组件嵌套，也会有一些性能影响 |  |
|  | 渲染属性 | 同上、层级臃肿、性能影响 |  |

当然，Hook 是一把双刃剑，用的好自己能够达到效果，用的不好反而会降低开发效率和质量，那么我们接下来看看如用更好地使用 Hook 。

## useState

### 一个例子

看一个例子，我们分解来看到底 state hook 做了什么：

```jsx
import {useState} from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### 声明状态

```jsx
import {useState} from 'react';

function Example() {
  const [count, setCount] = useState(0);
}
```

`useState` 是 React 自带的一个 Hook 函数，它的作用就是用来声明状态变量。 `useState` 这个函数接收的参数是我们的状态初始值（initial state），它返回了一个数组，这个数组的第 `[0]` 项是当前当前的**状态值**，第 `[1]` 项是可以改变状态值的**方法函数**。

所以我们做的事情其实就是，声明了一个状态变量 `count` ，把它的初始值设为 0，同时提供了一个可以更改 `count` 的函数 `setCount` 。

### 读取状态

```jsx
<p>You clicked {count} times</p>
```

很简单，因为我们的状态 `count` 就是一个单纯的变量而已，我们再也不需要写成`{this.state.count}`这样了。

### 更新状态

```jsx
<button onClick={() => setCount(count + 1)}>Click me</button>
```

当用户点击按钮时，我们调用 `setCount` 函数，这个函数接收的参数是修改过的新状态值。接下来的事情就交给 React 了，React 将会重新渲染我们的 `Example` 组件，并且使用的是更新后的新的状态，即 `count=1` 。这里我们要停下来思考一下， `Example` 本质上也是一个普通的函数，为什么它可以记住之前的状态？

### 多个状态

首先，useState 是可以多次调用的，所以我们完全可以这样写：

```js
function ExampleWithManyStates() {
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{text: 'Learn Hook'}]);
}
```

其次， `useState` 接收的初始值没有规定一定要是 `string/number/boolean` 这种简单数据类型，它完全**可以接收对象或者数组作为参数**。最后，React 也给我们提供了一个 `useReducer` 的 hook ，如果你更喜欢 Redux 式的状态管理方案的话。

<Hint type="warning">之前我们的 `this.setState` 做的是**合并状态**后返回一个新状态，而 `useState` 是直接**替换**老状态后返回新状态。</Hint>

从 `ExampleWithManyStates` 函数我们可以看到， `useState` 无论调用多少次，相互之间是独立的。这一点至关重要。为什么这么说呢？

其实我们看 Hook 的“形态”，有点类似之前被官方否定掉的 Mixins 这种方案，都是提供一种“插拔式的功能注入”的能力。而 Mixins 之所以被否定，是因为**Mixins 机制是让多个 Mixins 共享一个对象的数据空间**，这样就很难确保不同 Mixins 依赖的状态不发生冲突。

<Hint type="tip">每一个 hook 都是相互独立的，**不同组件调用同一个 hook 也能保证各自状态的独立性。**这就是两者的本质区别了。</Hint>

### 怎么保证多个 useState 的相互独立

还是看上面给出的 `ExampleWithManyStates` 例子，我们调用了三次`useState` ，每次我们传的参数只是一个值（如 42，'banana'），我们根本没有告诉 React 这些值对应的 key 是哪个，那 React 是怎么保证这三个 `useState` 找到它对应的 state 呢？

<Hint type="tip">React 是根据 `useState` 出现的顺序来定的。</Hint>

我们具体来看一下：

```js
//第一次渲染
useState(42); //将age初始化为42
useState('banana'); //将fruit初始化为banana
useState([{text: 'Learn Hook'}]); //...

//第二次渲染
useState(42); //读取状态变量age的值（这时候传的参数42直接被忽略）
useState('banana'); //读取状态变量fruit的值（这时候传的参数banana直接被忽略）
useState([{text: 'Learn Hook'}]); //...
```

假如我们改一下代码：

```js
let showFruit = true;
function ExampleWithManyStates() {
  const [age, setAge] = useState(42);

  if (showFruit) {
    const [fruit, setFruit] = useState('banana');
    showFruit = false;
  }

  const [todos, setTodos] = useState([{text: 'Learn Hook'}]);
}
```

这样一来：

```js
//第一次渲染
useState(42); //将age初始化为42
useState('banana'); //将fruit初始化为banana
useState([{text: 'Learn Hook'}]); //...

//第二次渲染
useState(42); //读取状态变量age的值（这时候传的参数42直接被忽略）
// useState('banana');
useState([{text: 'Learn Hook'}]); //读取到的却是状态变量fruit的值，导致报错
```

<Hint type="must">React 规定我们必须把 hook 写在函数的最外层，不能写在 `ifelse` 等条件语句当中，来确保 hook 的执行顺序一致。</Hint>

## useEffect

### 解剖图

<img style={{border: "1px solid #eee"}} src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/hook-structure.png'/>

### 生命周期

`useState` 只是让函数组件具有使用 state 的能力，那我们要解决 class 组件存在的问题，先来解决生命周期臃肿的问题。假设有这样一个需求，组件在状态更新的时候改变 `document.title`，在以前我们会这样写代码：

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({count: this.state.count + 1})}>
          Click me
        </button>
      </div>
    );
  }
}
```

我们写的有状态组件，通常会产生很多的副作用（Side Effect），比如发起 ajax 请求获取数据，添加一些监听的注册和取消注册，手动修改 DOM 等等。**我们之前都把这些副作用的函数写在生命周期函数钩子里**。现在使用 hook 改写以上代码：

```jsx
import {useState, useEffect} from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 类似于componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 更新文档的标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

<Hint type="tip">可以将 `useEffect` 看成是 `componentDidMount` ， `componentDidUpdate` 和 `componentWillUnmount` 三者的合体。</Hint>

<Hint type="warning">如果 `useEffect` 没有返回函数，那么 `componentWillUnmount` 的时候是不会执行 `useEffect`。</Hint>

我们再梳理一遍下面代码的逻辑：

```jsx
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
}
```

首先，我们声明了一个状态变量 `count` ，将它的初始值设为 0。然后我们告诉 React，我们的这个组件有一个副作用。我们给 `useEffect` hook 传了一个匿名函数，这个匿名函数就是我们的副作用。

在这个例子里，我们的副作用是调用 Browser API 来修改文档标题。当 React 要渲染我们的组件时，它会先记住我们用到的副作用。等 React 更新了 DOM 之后，它再依次执行我们定义的副作用函数。

<Hint type="warning">`useEffect` 中定义的副作用函数的执行不会阻碍浏览器更新视图，也就是说这些函数是**异步**执行的，而之前的 `componentDidMount` 或 `componentDidUpdate` 中的代码则是同步执行的。</Hint>

这种安排对大多数副作用说都是合理的，但有的情况除外，比如我们有时候需要先根据 DOM 计算出某个元素的尺寸再重新渲染，这时候我们希望这次重新渲染是同步发生的，也就是说它会在浏览器真的去绘制这个页面前发生。

### 减少 useEffect 的执行

每次重新渲染都要执行一遍这些副作用函数，显然是不经济的。怎么跳过一些不必要的计算呢？我们只需要给 `useEffect` 传第二个参数即可。用第二个参数来告诉 React 只有当这个参数的值发生改变时，才执行我们传的副作用函数（第一个参数）：

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 只有当count的值发生变化时，才会重新执行`document.title`这一句
```

上面这个示例中，我们传入 `[count]` 作为第二个参数。这个参数是什么作用呢？如果 count 的值是 5，而且我们的组件重渲染的时候 `count` 还是等于 5，React 将对前一次渲染的 [5] 和后一次渲染的 [5] 进行比较。因为数组中的所有元素都是相等的(`5 === 5`)，React 会跳过这个 effect，这就实现了性能的优化。

<Hint type="tip">如果数组中有多个元素，即使只有一个元素发生变化，React 也会执行 `useEffect` 。</Hint>

`useEffect` 的第二个参数，有三种情况：

- 什么都不传，组件每次渲染和更新都会调用，相当于 `componentDidMount`, `componentDidUpdate` 和 `componentWillUnmount`
- 传入一个空数组 `[]` , 只会在首次渲染时调用一次，相当于 `componentDidMount` 和 `componentWillUnmount`
- 传入一个数组，其中包括变量，只有这些变量变动时， `useEffect` 才会执行

<Hint type="warning">当我们第二个参数传一个空数组 `[]` 时，这种用法可能带来 Bug，少用。</Hint>

第二个参数，可以传递 `props` ，例如：

```jsx
useEffect(() => {
  console.log(`You clicked times`);
  document.title = `You clicked times`;
}, [props.time]);
```

`time` 的更新也会执行 `useEffect`，另外可以启用 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 中的 [exhaustive-deps](https://github.com/facebook/react/issues/14920) 规则，这样 `useEffect` 里面若有依赖的变量，比如 `count`，没在 deps 数组里面声明则会出现以下警告并给出修复建议，空数组也是会提示的：

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/wlmFn7.png'/>

另外，由于前文所说 Hook 可以反复多次使用，相互独立。所以相对合理的做法是：

<Hint type="best">给每一个副作用一个单独的 `useEffect` 钩子。这样一来，这些副作用不再一股脑堆在生命周期钩子里，代码变得更加清晰。一些不必要的 `useEffect` 函数也可以避免。</Hint>

### 解绑一些副作用

这种场景很常见，当我们在 `componentDidMount` 里添加了一个注册，我们得马上在 `componentWillUnmount` 中，也就是**组件被注销之前**清除掉我们添加的注册，否则**内存泄漏**的问题就出现了。

怎么清除呢？看下面的例子：

```jsx
import {useState, useEffect} from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // 一定注意下这个顺序：告诉 React 在下次重新渲染组件之后，同时是下次调用ChatAPI.subscribeToFriendStatus 之前执行 cleanup
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

**为什么要在 effect 中返回一个函数？** 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅这些紧密性比较强的逻辑放在一起。它们都属于 effect 的一部分。

**React 何时清除 effect？** `componentDidUpdate` + `componentWillUnmount`。首次不执行，React 会在执行当前 effect 之前对上一个 effect 进行清除，这也解释了为什么每次更新的时候都要运行 `useEffect` 。

<Hint type="tip">并不是必须为 effect 中返回的函数命名。这里我们将其命名为 `cleanup` 是为了表明此函数的目的，但其实也可以返回一个箭头函数或者给起一个别的名字。</Hint>

<Hint type="tip">`useEffect` 可以在组件渲染后实现各种不同的副作用。有些副作用可能需要清除，则需要返回一个函数。有些 effect 可能不必清除，所以不需要返回函数。</Hint>

<Hint type="warning">这种解绑的模式跟 `componentWillUnmount` 不一样。 `componentWillUnmount` 只会在组件被销毁前执行一次而已，而 `useEffect` ，每次组件渲染后都会执行一遍 `useEffect` 里的函数，包括返回的 `cleanup` 函数也会重新执行一遍。</Hint>

### 为什么每次更新的时候都要运行 useEffect

我们先看以前的模式：

```jsx
componentDidMount() {
  ChatAPI.subscribeToFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}

componentWillUnmount() {
  ChatAPI.unsubscribeFromFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}
```

我们在 `componentDidMount` 注册，再在 `componentWillUnmount` 清除注册。但假如这时候 `props.friend.id` 变了怎么办？我们不得不再添加一个 `componentDidUpdate` 来处理这种情况：

```jsx
componentDidUpdate(prevProps) {
  // 先把上一个friend.id解绑
  ChatAPI.unsubscribeFromFriendStatus(
    prevProps.friend.id,
    this.handleStatusChange
  );
  // 再重新注册新但friend.id
  ChatAPI.subscribeToFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}
```

看到了吗？很繁琐，而我们但 `useEffect` 则没这个问题，因为它在每次组件更新后都会重新执行一遍。所以代码的执行顺序是这样的：

```text
1.页面首次渲染
2.替friend.id=1的朋友注册

3.突然friend.id变成了2
4.页面重新渲染
5.清除friend.id=1的绑定
6.替friend.id=2的朋友注册
...
```

## 自带的 Hook

除了上文重点介绍的 `useState` 和 `useEffect` ，React 还给我们提供来很多有用的 Hook ：

- useContext
- useReducer
- useCallback
- useMemo
- useRef
- useImperativeMethods
- useLayoutEffect
- useDebugValue

更多查阅[官方介绍](https://zh-hans.reactjs.org/docs/hooks-reference.html)

## 自定义 Hook

为什么要自己去写一个 Effect Hooks ? 这样我们才能把可以复用的逻辑抽离出来，变成一个个可以随意插拔的“插销”，哪个组件要用来，我就插进哪个组件里，下面看一个官网的例子。

假如这个时候我们又有一个朋友列表 `FriendListItem` 也需要显示是否在线的信息，这时就需要用到 `FriendStatus` 中的这段逻辑：

```jsx
const [isOnline, setIsOnline] = useState(null);

useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```

在 React 中有两种流行的方式来共享组件之间的状态逻辑: **Render-Props** 和**高阶组件**，现在让我们来看看 Hook 是如何在让你不增加组件的情况下解决相同问题的。

### 提取自定义 Hook

当我们想在两个函数之间共享逻辑时，我们会把它提取到第三个函数中。而组件和 Hook 都是函数，所以也同样适用这种方式。

我们将公共的部门提取出来，新建一个 `useFriendStatus` 的 Hook 专门用来判断某个 id 是否在线。

<Hint type="must">自定义 Hook 必须以 “use” 开头，不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了 [Hook 的规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)。</Hint>

```jsx
import {useState, useEffect} from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

React 组件不同的是，自定义 Hook 不需要具有特殊的标识。我们可以自由的决定它的参数是什么，以及它应该返回什么（如果需要的话）。换句话说，它就像一个正常的函数，函数内部可以调用其他的 Hook。

### 使用自定义 Hook

我们一开始的目标是在 `FriendStatus` 和 `FriendListItem` 组件中去除重复的逻辑，即：这两个组件都想知道好友是否在线。

现在我们已经把这个逻辑提取到 `useFriendStatus` 的自定义 Hook 中，然后就可以使用它了：

```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```jsx
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{color: isOnline ? 'green' : 'black'}}>{props.friend.name}</li>
  );
}
```

仔细观察，你会发现我们没有对其行为做任何的改变，我们只是将两个函数之间一些共同的代码提取到单独的函数中。**自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性**。

**在两个组件中使用相同的 Hook 会共享 state 吗？**不会。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

**自定义 Hook 如何获取独立的 state？**每次调用 Hook，它都会获取独立的 state。由于我们直接调用了 `useFriendStatus` ，从 React 的角度来看，我们的组件只是调用了 `useState` 和 `useEffect` 。 正如我们在之前了解到的一样，我们可以在一个组件中多次调用 `useState` 和 `useEffect` ，它们是完全独立的。

通过以上例子会发现自定义 Hook 的基石还是 `useState` 和 `useEffect` 。更多内容请[阅读官方](https://zh-hans.reactjs.org/docs/hooks-custom.html#tip-pass-information-between-hooks)。

## 参考阅读

1. [React Hook 官方文档](https://zh-hans.reactjs.org/docs/hooks-intro.html)
2. [呕心沥血，一文看懂 react hooks，作者：landluck](https://juejin.im/post/5d985deae51d4577f9285c2f)
3. [30 分钟精通 React 今年最劲爆的新特性—React Hooks，作者：zach5078](https://segmentfault.com/a/1190000016950339)
4. [2019 年了，整理了 N 个实用案例帮你快速迁移到 React Hooks(收藏慢慢看系列)，作者：_sx_](https://juejin.im/post/5d594ea5518825041301bbcb#heading-52)
5. [精读《useEffect 完全指南》，作者：黄子毅](https://juejin.im/post/5c9827745188250ff85afe50)
6. [useEffect 源码解析](https://react.jokcy.me/book/hooks/hooks-use-effect.html)
