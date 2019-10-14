---
id: portal
title: Portal
sidebar_label: Portal
---

import Hint from '../../../src/components/Hint'

## 什么是 Portal?

Portal 中文即“传送门”的意思，来看一张电影剧照，不用多说，你应该能猜出来是什么意思：

<div align="center">
   <img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/p2474141533.jpg'/>
   <p>图：《<a href="https://movie.douban.com/subject/3025375/">奇异博士</a>》中的传送门</p>
</div>

官方定义：Portals 提供了一种很好的将子节点渲染到父组件以外的 DOM 节点的方式。

```jsx
ReactDOM.createPortal(child, container)
```

第一个参数 `child` 是任何[可渲染的 React 子元素](https://reactjs.org/docs/react-component.html#render)，例如一个元素，字符串或 `fragment` 。第二个参数 `container` 则是一个真实的 DOM 元素。

## 为什么需要 Portal?

React Portal 之所以叫 Portal，因为做的就是和“传送门”一样的事情：**在 JSX 中 `render` 到一个组件里面去，实际改变的是网页上另一处的 DOM 结构**。

在 React 的世界中，一切都是组件，用组件可以表示一切界面中发生的逻辑，不过，有些特例处理起来还比较麻烦，比如某个组件在渲染时，在某种条件下需要显示一个 Dialog，这该怎么做呢？

最直观的做法，就是直接在 JSX 中把 Dialog 画出来，像下面代码的样子：

```jsx
<div>
   <p>this is p</p>
   { needDialog ? <Dialog /> : null }
</div>
```

我们写的 Dialog 组件是这样渲染的话，那么 Dialog 最终渲染产生的 DOM 将会出现在 JSX 相应定义的地方:

```jsx
<div>
   <p>this is p</p>
   <div class="dialog">Dialog Content</div>
</div>
```

这样写会有什么问题呢？对于 Dialog ，从用户感知角度，应该是一个独立的组件，通常应该显示在屏幕的最中间，现在 Dialog 被包在其他组件中，要用 CSS 的 `position` 属性控制 Dialog 位置，就要求从 Dialog 往上一直到 `body` 没有其他 `position: relative` 的元素干扰，这有点难为作为通用组件的 Dialog，毕竟谁管得住所有组件不用 `position` 。另外 Dialog 的样式，因为包在其他元素中，各种样式纠缠，CSS 样式会变得难以维护。

这样写 Dialog 组件虽然能满足基本需求，但局限很多，维护代价也比较高，有没有其他办法？

有一个其他办法，就是在 React 组件树的最顶层留一个元素专属于 Dialog，然后通过 Redux 或 Context 或其他什么通讯方式给这个 Dialog 发送信号，让 Dialog 显示或者不显示。

<div align="center">
   <img width="480" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/yjyy0B.png'/>
</div>

这种方法看起来还凑合着，但是无疑增加了代码之间的耦合，维护成本是可想而知的。而且如果我们把 Dialog 做成一个通用组件，希望里面的内容完全定制，这就更加麻烦了，看如下代码：

```jsx
<div>
  <p>this is p</p>
  { needDialog ?
    <Dialog>
       <header>Any Header</header>
       <section>Any content</section>
    </Dialog>
    : null }
</div>
```

如果以上代码想写成 `signal` 的方式传递，要传递的东西会变得更加复杂，也缺乏灵活性。

<Hint type="tip">当我们既希望在组件的 JSX 中选择使用 Dialog ，把 Dialog 用得像一个普通组件一样，但是又希望 Dialog 内容显示在另一个地方，就需要 Portal 上场了。</Hint>

## React v16 中的 Portal

Portal 就是建立一个“**传送门**”，让 Dialog 这样的组件在表示层和其他组件没有任何差异，但是渲染的东西却像经过传送门一样出现在另一个地方。

<div align="center">
   <img width="480" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/0F52fx.png'/>
</div>

在 v16 中，使用 Portal 创建 Dialog 组件简单多了，不需要牵扯到 `componentDidMount` 、 `componentDidUpdate` ，也不用调用 API 清理 Portal，关键代码在  `render` 中，像下面这样就行。

```jsx
import React from 'react';
import { createPortal } from 'react-dom';

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    const doc = window.document;
    this.node = doc.createElement('div');
    doc.body.appendChild(this.node);
  }

  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }

  render() {
    return createPortal(
      <div class="dialog">
        {this.props.children}
      </div>, //塞进传送门的JSX
      this.node //传送门的另一端DOM node
    );
  }
}
```

假设在 `Parent` 组件中是这样进行调用的:

```jsx
render() {
  return (
    <div onClick={this.handleClick}>
      <p>this is p</p>
      <Dialog>
        <div className="dialog">
          <button>Click</button>
        </div>
      </Dialog>
    </div>
  );
}
```

那么实际渲染出来的 DOM 大概如下图所示，不难发现在 p 之后定义的 `Dialog` 实际被传送到了 body 下面：

<img width="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/MIG83K.png'/>

## 通过 Portal 进行事件冒泡

v16 之前的 React Portal 实现方法，有一个小小的缺陷，就是 Portal 是单向的，内容通过 Portal 传到另一个出口，在那个出口 DOM 上发生的事件是不会冒泡传送回进入那一端的。

也就是说，这样的代码：

```jsx
<div onClick={handleDialogClick}>
   <Dialog>
     What ever shit
   </Dialog>
</div>
```

在 Dialog 画出的内容上点击， `handleDialogClick` 是不会被触发的。当然，这只是一个小小的缺陷，大部分场景下事件不传过来也没什么大问题。

<Hint type="tip">在 v16 中，通过 Portal 渲染出去的 DOM，事件是会传送门的入口端冒泡出来的，上面的 `handleDialogClick` 也就会被调用到了。[Run in CodePen](https://codepen.io/muwenzi/pen/xxxZYER)</Hint>

## 参考资料

1. [React 官方文档（中文）：Portals](https://zh-hans.reactjs.org/docs/portals.html)
2. [传送门：React Portal，作者：程墨Morgan](https://zhuanlan.zhihu.com/p/29880992)
