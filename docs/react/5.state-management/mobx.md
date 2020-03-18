---
title: MobX
sidebar_label: MobX
---

import Img from '../../../src/components/Img';

MobX 是一个简单的、可扩展的状态管理库。

## 设计理念

> Anything that can be derived from the application state, should be derived. Automatically.  
> 任何源自应用状态的东西都应该自动地获得。

也就是说，只要是跟状态相关的东西，在状态发生变化时，就应该自动完成状态相关的事情，比如，自动更新 UI、缓存数据、请求 server 端等。

相比于 Redux，它更加轻量，整体是一个[观察者模式](/docs/design-patterns/3.behavior-pattern/observer)的架构，存储`state`的`store`是被观察对象，使用`state`的组件是观察者。

## 核心概念

- **Observable state 可观察状态**  
  `state`是驱动应用的数据。MobX 可以将绝大多数类型（基本类型、数组、对象等）的值变成可观察的。

- **Derivation 衍生**

  - **Computed values 计算值**

    `Computed values`是使用纯函数，从`state`中推导出的值。计算范围可以从简单的字符串到复杂的对象。计算值会懒惰地对状态变化作出反应。

  - **Reactions 反应**

    `Reactions`是当状态改变时，需要自动发生的副作用，比如更新 UI、打印日志等。

- **Actions 动作**  
  `Actions`是唯一可以修改状态的东西，并可能有其他副作用。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/mobx_flow.png' alt='mobx_flow'/>

这张图解释了 MobX 这个体系中的各个角色的作用和关系。MobX 和 Redux 一样，采用单向数据流。首先用户事件产生一个`Action`。`Action`会修改`State`，接着`State`的更新可能会引起重新计算`Computed Value`，也可能会触发`Reactions`自动发生一些副作用，比如 UI 将自动重新渲染。

其中，`State`的更新是同步的，在`Action`修改`State`后新的`State`可以立即被获取。而`Computed value`采取延迟更新，只有当它被使用的时候才会被重新计算值。当使用`Computed value`的组件被卸载时，它会被自动回收。

:::tip

注意，不同于 Flux 架构里的`Actions`，MobX 里的`Actions`是可以直接修改状态的，可以理解为前者是名词而后者是动词。MobX 会将状态变为可观察的而非不可变的，状态可以直接被`Actions`修改，这也是它与 Redux 一个主要的不同点。

:::

让我们来看一个最简单的例子来进一步理解这些概念：

```js
class Person {
  @observable firstName = 'Michel';
  @observable lastName = 'Weststrate';
  @observable nickName;

  @computed get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

const michel = new Person();

// Reaction: log the profile info whenever it changes
autorun(() => console.log(person.nickName ? person.nickName : person.fullName));

// Example React component that observes state
const profileView = observer(props => {
  if (props.person.nickName) return <div>{props.person.nickName}</div>;
  else return <div>{props.person.fullName}</div>;
});

// Action:
setTimeout(() => (michel.nickName = 'mweststrate'), 5000);

React.render(React.createElement(profileView, {person: michel}), document.body);
```

这个例子通过判断`Person`对象是否存在`nickName`属性来界定展示在界面(`profileView`)上的内容是`nickName`还是`fullName`。

它们的依赖关系大概如下：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/例子的图.jpg' width='500' alt='例子的图'/>

该图中蓝色的是`Observable state`，绿色是`Computed value`。注意该图中的`fullName`，它同时充当`observable`和`observer`两个角色，这正是`Computed value`的特殊性。`fullName`由可观察状态`firstName`和`lastName`自动衍生得出。同样，`profileView`由`fullName`和`nickName`衍生得出。`Action`修改了状态`nickName`，状态变更使`profileView`自动产生副作用————更新 React 组件树及打印日志。

MobX 会将依赖关系树最低限度定义。一旦`profileView`有了`nickName`，且不再受`fullName`影响时，它们之间的观察者关系就会被清除，如下图：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/例子的图2.' width='500' alt='例子的图2.'/>

此时`profileView`只观察`nickName`，而`fullName`处于 lazy mode 不再观察`firstName`和`lastName`。

## TodoList

[官方例子](https://mobx.js.org/getting-started.html)

### /TodoListStore

```tsx
import {observable, action, computed} from 'mobx';

class Todo {
  id = Math.random();

  @observable title;
  @observable finished = false;

  constructor(title) {
    this.title = title;
  }
}

class TodoList {
  @observable todos = [];

  @computed get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  @action
  addTodo(title) {
    if (!title) return;
    this.todos.push(new Todo(title));
  }
}

const todoListStore = new TodoList();

export default todoListStore;
```

### /TodoListView

```tsx
import * as React from 'react';
import {inject, observer} from 'mobx-react';

const TodoView = ({todo}) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onChange={() => (todo.finished = !todo.finished)}
    />
    {todo.title}
  </li>
);

@inject('todoListStore')
@observer
class TodoListView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      item: ''
    };

    this.addNewTodo = this.addNewTodo.bind(this);
  }

  setItem(newItem) {
    this.setState({
      item: newItem
    });
  }

  addNewTodo() {
    if (this.state.item) {
      this.props.todoListStore.addTodo(this.state.item);
      this.setState({
        item: ''
      });
    }
  }

  render() {
    const {todos, unfinishedTodoCount} = this.props.todoListStore;

    return (
      <div>
        <input
          type="text"
          value={this.state.item}
          onChange={e => this.setItem(e.target.value)}
        />
        <button onClick={() => this.addNewTodo()}>add</button>
        <ul>
          {todos.map(todo => (
            <TodoView todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {unfinishedTodoCount}
      </div>
    );
  }
}

export default TodoListView;
```

```tsx
import React from 'react';
import {render} from 'react-dom';
import TodoListView from './TodoListView';
import todoListStore from './TodoListStore';
import {Provider} from 'mobx-react';

render(
  <Provider todoListStore={todoListStore}>
    <TodoListView />
  </Provider>,
  document.body
);
```

## 与 Redux 的对比

- **函数式 vs 面向对象**

  Redux 遵循函数式编程，而 MobX 更偏向面向对象编程

- **单一 store vs 多 store**

  Redux 应用中，数据都存放在唯一的 store 中，MobX 通常按模块划分成多个独立的 store

- **JavaScript 对象 vs 可观察对象**

  Redux 默认使用原生的对象存储数据，因此需要手动追踪所有状态对象变更。而 MobX 使用可观察对象，可以自动触发监听

- **不可变 Immutable vs 可变 Mutable**

  Redux 中状态对象是不可变的，而 MobX 是可变的，可以直接修改

MobX 的优点在于，学习成本小，模版代码少。这是因为 MobX 本身进行了很多抽象和封装。但这也造成了 MobX 很多用法非常 magic，不好调试，结果也难以预测。

在小型项目中使用 MobX 是非常方便快捷的。大型项目中，可维护性和规范性更好的 Redux 更有优势。

## 参考链接

1. [MobX](https://mobx.js.org/README.html)
2. [Becoming fully reactive: an in-depth explanation of MobX @Michel Weststrate](https://hackernoon.com/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254)
3. [你需要 Mobx 还是 Redux？@熊建刚](https://juejin.im/post/5a7fd72c5188257a766324ae)
