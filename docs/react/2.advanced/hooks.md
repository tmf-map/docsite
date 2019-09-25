---
id: hooks
title: Hooks
sidebar_label: Hooks
---

## 什么是State Hooks？

看一个例子，我们分解来看到底state hooks做了什么：

```jsx
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### 声明一个状态变量

```jsx
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
```

`useState`是react自带的一个hook函数，它的作用就是用来声明状态变量。`useState`这个函数接收的参数是我们的状态初始值（initial state），它返回了一个数组，这个数组的第`[0]`项是当前当前的**状态值**，第`[1]`项是可以改变状态值的**方法函数**。

所以我们做的事情其实就是，声明了一个状态变量count，把它的初始值设为0，同时提供了一个可以更改count的函数setCount。

### 读取状态值

```jsx
<p>You clicked {count} times</p>
```

很简单，因为我们的状态count就是一个单纯的变量而已，我们再也不需要写成`{this.state.count}`这样了。

### 更新状态

```jsx
<button onClick={() => setCount(count + 1)}>
  Click me
</button>
```

当用户点击按钮时，我们调用setCount函数，这个函数接收的参数是修改过的新状态值。接下来的事情就交给react了，react将会重新渲染我们的Example组件，并且使用的是更新后的新的状态，即`count=1`。这里我们要停下来思考一下，Example本质上也是一个普通的函数，为什么它可以记住之前的状态？

### 假如一个组件有多个状态值怎么办？

首先，useState是可以多次调用的，所以我们完全可以这样写：

```javascript
function ExampleWithManyStates() {
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
}
```

其次，useState接收的初始值没有规定一定要是string/number/boolean这种简单数据类型，它完全**可以接收对象或者数组作为参数**。最后，react也给我们提供了一个`useReducer`的hook，如果你更喜欢redux式的状态管理方案的话。

> **注意**：之前我们的`this.setState`做的是**合并状态**后返回一个新状态，而`useState`是直接**替换**老状态后返回新状态。


从`ExampleWithManyStates`函数我们可以看到，`useState`无论调用多少次，相互之间是独立的。这一点至关重要。为什么这么说呢？

其实我们看hook的“形态”，有点类似之前被官方否定掉的Mixins这种方案，都是提供一种“插拔式的功能注入”的能力。而mixins之所以被否定，是因为**Mixins机制是让多个Mixins共享一个对象的数据空间**，这样就很难确保不同Mixins依赖的状态不发生冲突。

而现在我们的hook，一方面它是直接用在function当中，而不是class；另一方面每一个hook都是相互独立的，**不同组件调用同一个hook也能保证各自状态的独立性。**这就是两者的本质区别了。

### React是怎么保证多个useState的相互独立的？

还是看上面给出的`ExampleWithManyStates`例子，我们调用了三次`useState`，每次我们传的参数只是一个值（如42，‘banana’）_，_我们根本没有告诉react这些值对应的key是哪个，那react是怎么保证这三个useState找到它对应的state呢？

> **Tips**：React是根据`useState`出现的顺序来定的。


我们具体来看一下：

```javascript
  //第一次渲染
  useState(42);  //将age初始化为42
  useState('banana');  //将fruit初始化为banana
  useState([{ text: 'Learn Hooks' }]); //...

  //第二次渲染
  useState(42);  //读取状态变量age的值（这时候传的参数42直接被忽略）
  useState('banana');  //读取状态变量fruit的值（这时候传的参数banana直接被忽略）
  useState([{ text: 'Learn Hooks' }]); //...
```

假如我们改一下代码：

```javascript
let showFruit = true;
function ExampleWithManyStates() {
  const [age, setAge] = useState(42);
  
  if(showFruit) {
    const [fruit, setFruit] = useState('banana');
    showFruit = false;
  }
 
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
}
```

这样一来：

```javascript
  //第一次渲染
  useState(42);  //将age初始化为42
  useState('banana');  //将fruit初始化为banana
  useState([{ text: 'Learn Hooks' }]); //...

  //第二次渲染
  useState(42);  //读取状态变量age的值（这时候传的参数42直接被忽略）
  // useState('banana');  
  useState([{ text: 'Learn Hooks' }]); //读取到的却是状态变量fruit的值，导致报错
```

> **强制**：React规定我们必须把hooks写在函数的最外层，不能写在`ifelse`等条件语句当中，来确保hooks的执行顺序一致。


## Effect Hooks

我们在上一节的例子中增加一个新功能：

```jsx
import { useState, useEffect } from 'react';

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
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

我们对比着看一下，如果没有hooks，我们会怎么写？

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
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

我们写的有状态组件，通常会产生很多的副作用（side effect），比如发起ajax请求获取数据，添加一些监听的注册和取消注册，手动修改dom等等。我们之前都把这些副作用的函数写在生命周期函数钩子里，比如`componentDidMount`，`componentDidUpdate`和`componentWillUnmount`。而现在的`useEffect`就相当与这些声明周期函数钩子的集合体。它以一抵三。

同时，由于前文所说hooks可以反复多次使用，相互独立。所以我们合理的做法是，给每一个副作用一个单独的`useEffect`钩子。这样一来，这些副作用不再一股脑堆在生命周期钩子里，代码变得更加清晰。

### useEffect做了什么？

我们再梳理一遍下面代码的逻辑：

```jsx
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```

首先，我们声明了一个状态变量`count`，将它的初始值设为0。然后我们告诉react，我们的这个组件有一个副作用。我们给`useEffect`hook传了一个匿名函数，这个匿名函数就是我们的副作用。

在这个例子里，我们的副作用是调用browser API来修改文档标题。当react要渲染我们的组件时，它会先记住我们用到的副作用。等react更新了DOM之后，它再依次执行我们定义的副作用函数。

这里要注意几点：

第一，react首次渲染和之后的每次渲染都会调用一遍传给`useEffect`的函数。而之前我们要用两个声明周期函数来分别表示首次渲染（`componentDidMount`），和之后的更新导致的重新渲染（`componentDidUpdate`）。

第二，`useEffect`中定义的副作用函数的执行不会阻碍浏览器更新视图，也就是说这些函数是**异步**执行的，而之前的`componentDidMount`或`componentDidUpdate`中的代码则是同步执行的。

这种安排对大多数副作用说都是合理的，但有的情况除外，比如我们有时候需要先根据DOM计算出某个元素的尺寸再重新渲染，这时候我们希望这次重新渲染是同步发生的，也就是说它会在浏览器真的去绘制这个页面前发生。

### useEffect怎么解绑一些副作用?

这种场景很常见，当我们在`componentDidMount`里添加了一个注册，我们得马上在`componentWillUnmount`中，也就是**组件被注销之前**清除掉我们添加的注册，否则**内存泄漏**的问题就出现了。

怎么清除呢？让我们传给`useEffect`的副作用函数返回一个新的函数即可。这个新的函数将会在组件下一次重新渲染之后执行。这种模式在一些pubsub模式的实现中很常见。看下面的例子：

```jsx
import { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // 一定注意下这个顺序：告诉react在下次重新渲染组件之后，同时是下次调用ChatAPI.subscribeToFriendStatus之前执行cleanup
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

这里有一个点需要重视！这种解绑的模式跟`componentWillUnmount`不一样。`componentWillUnmount`只会在组件被销毁前执行一次而已，而`useEffect`里的函数，每次组件渲染后都会执行一遍，包括副作用函数返回的这个清理函数也会重新执行一遍。所以我们一起来看一下下面这个问题。

### 为什么要让副作用函数每次组件更新都执行一遍？

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

我们在`componentDidMount`注册，再在componentWillUnmount清除注册。但假如这时候`props.friend.id`变了怎么办？我们不得不再添加一个`componentDidUpdate`来处理这种情况：

```jsx
...
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
...
```

看到了吗？很繁琐，而我们但useEffect则没这个问题，因为它在每次组件更新后都会重新执行一遍。所以代码的执行顺序是这样的：

```text
1.页面首次渲染
2.替friend.id=1的朋友注册

3.突然friend.id变成了2
4.页面重新渲染
5.清除friend.id=1的绑定
6.替friend.id=2的朋友注册
...
```

### 怎么跳过一些不必要的副作用函数

按照上一节的思路，每次重新渲染都要执行一遍这些副作用函数，显然是不经济的。怎么跳过一些不必要的计算呢？我们只需要给useEffect传第二个参数即可。用第二个参数来告诉react只有当这个参数的值发生改变时，才执行我们传的副作用函数（第一个参数）。

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 只有当count的值发生变化时，才会重新执行`document.title`这一句
```

当我们第二个参数传一个空数组\[\]时，其实就相当于只在首次渲染的时候执行。也就是`componentDidMount`加`componentWillUnmount`的模式。不过这种用法可能带来bug，少用。

