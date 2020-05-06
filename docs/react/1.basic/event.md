---
id: event
title: 事件
sidebar_label: 事件
---

## 合成事件与原生事件

### 合成事件

在 JSX 中直接绑定的事件，如

```jsx
<a ref="aTag" onClick={e => this.handleClick(e)}>
  UPDATE
</a>
```

这里的 `handleClick` 事件就是合成事件。

VirtualDOM 在内存中是以 **对象** 的形式存在，React 基于 VirtualDOM 实现了一个 SyntheticEvent（合成事件）层，我们所定义的事件处理器会接收到一个 SyntheticEvent 对象的实例（比如`handleChange(reactEvent)`），且与原生的浏览器事件有同样的接口。

:::caution

React 使用事件委托机制，会将所有的事件都绑定在最外层\(`document`\)元素上，依赖事件的冒泡机制完成委派，在冒泡阶段处理事件，不支持捕获阶段处理事件。

:::

:::good

阻止合成事件间的冒泡，用 `e.stopPropagation()` 。

:::

### 原生事件

通过 JS 原生代码绑定的事件，如：

```javascript
document.body.addEventListener('click', e => {
  // 通过e.target判断阻止冒泡
  if (e.target && e.target.matches('a')) {
    return;
  }
  console.log('body');
});
// 或
this.refs.update.addEventListener('click', e => {
  console.log('update');
});
```

Q：为什么有时候还需要原生事件？

A：react 的 app 一般是挂在 body 下面某个 div 结点上，如果我想将事件绑定在 body 上（比如监听 body 的滚动事件，window 的 resize 事件）就需要用原生事件。实际上，react 合成事件只是原生 DOM 事件的一个子集，它仅仅实现了 [DOM Level 3](https://www.w3.org/TR/DOM-Level-3-Events/) 的事件接口，并且统一了浏览器的兼容问题，有些事件 React 并没有实现。

Q：在什么生命周期才可以绑定原生事件？

A：组件挂载完成之后，即 componentDidMount。

:::bad

一定要在组件卸载（componentWillUnmount）时手动移除，否则很可能出现内存泄漏的问题，而合成事件不需要，因为 react 内部已经帮你自动处理了。

:::

:::caution

合成事件中阻止事件冒泡是没办法阻止原生事件的冒泡。即使是 reactEvent.nativeEvent.stopPropagation\(\)。

:::

reactEvent 是封装好的事件，它是在 document 的回调里进行封装，并执行回调的。而原生的监听，在 document 接收到冒泡时早就执行完了。`reactEvent.nativeEvent.stopPropagation()` 方法实际上是在最外层节点上调用了原生的 stopPropagation， 只阻止了 document 的冒泡。

:::caution

原生事件中阻止冒泡是可以阻止合成事件的冒泡。

:::

:::good

阻止合成事件与最外层 document 上的事件间的冒泡，用 `e.nativeEvent.stopImmediatePropagation()` 。

:::

:::good

阻止合成事件与除最外层 document 上的原生事件上的冒泡，通过判断 e.target 来避免。

:::

## 合成事件的绑定

对于 **合成事件** 根据组件事件绑定的创建时间主要有两类方法：

### 方式一：render 时绑定

渲染时绑定主要有三种：

#### bind 显式绑定方式：

```jsx
onChange = {this.handleChange.bind(this)}
```

:::caution

这种方法有一个潜在的性能问题：当组件每次重新渲染时，都会有一个新的函数创建。

:::

但是在真正的开发场景中，由此引发的性能问题往往不值一提（除非是大型组件消费类应用或游戏）。

#### 箭头函数隐式绑定：

这种方法其实和第一种类似，我们可以利用 ES6 箭头函数 **隐式** 绑定 this：

```jsx
onChange = {e => this.handleChange(e)}
```

:::caution

这种方法与第一种方法一样，同样存在潜在的性能问题。

:::

:::good

函数式组件优先使用箭头函数隐式绑定 this。

:::

#### 双冒号隐式绑定：

ES next **Stage-0** 中 [Function bind syntax](https://github.com/zenparsing/es-function-bind) 提案：

```jsx
onChange = {::this.handleChange}
```

函数绑定运算符是并排的两个双冒号（ :: ），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即 this 对象），绑定到右边的函数上面。如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。

:::caution

该方法不能带参数。

:::

:::tip

babel 会将该方法转译成 `.bind(this)` 的方式。

:::

### 方式二：创建实例时绑定

#### constructor 内绑定：

constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。 所以我们可以：

```jsx
constructor(props) {
  super(props);
  this.handleChange = this.handleChange.bind(this);
}
```

就个人习惯而言，与前两种方法相比，constructor 内绑定在可读性和可维护性上也许有些欠缺。 同时，我们知道在 constructor 声明的方法不会存在实例的原型上，而属于实例本身的方法。每个实例都有同样一个 handleChange，这本身也是一种重复和浪费。

缺点：即使不用到 state，也需要添加类构造函数来绑定 this，代码量多； 添加参数要在构造函数中 bind 时指定，不在 render 中。

:::caution

组件实例会重复绑定该方法。

:::

:::good

class 类型的组件优先使用该方法，也是性能最好的。

:::

演示例子，可以打开浏览器控制来查看结果：

```jsx live
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // you can uncomment this line
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // this will refer to window not undefined because there is no 'use strict'
    console.log(this);
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

#### class 属性中使用 = 和箭头函数：

这个方法依赖于 ES next 的新特性，请参考：[https://tc39.github.io/proposal-class-public-fields/](https://tc39.github.io/proposal-class-public-fields/)

```jsx
handleChange = () => {
  // call this function from render
  // and this.whatever in here works fine.
};
```

总结一下这种方式的优点：

- 使用箭头函数，有效绑定了 this；
- 没有方式一的潜在性能问题；
- 避免了 constructor 内绑定的组件实例重复问题；
