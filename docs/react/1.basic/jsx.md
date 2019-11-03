---
id: jsx
title: JSX
sidebar_label: JSX
---

import Hint from '../../../src/components/Hint'

## JSX 基础概念

### 形态

```jsx
const element = <h1>Hello, world!</h1>;
```

JSX， 乍看起来可能比较像是模版语言，但本质上是 JS 的一种扩展，完全是在 JS 内部实现的。 主要用来描述用户界面，常见于 render 方法里面的 return 和一些用户界面相关变量定义。

你可以任意地在 JSX 当中使用 [JS 表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)，在 JSX 当中的表达式要包含在`单大括号 {}`里。

<Hint type="best">对于需要换行的 JSX 代码，在其外面加上一个小括号\(\)，这样可以防止 [分号自动插入](http://stackoverflow.com/q/2846283) 的 bug，且便于 JSX 代码的换行对齐。</Hint>

### 属性

你可以使用引号来定义以字符串为值的属性：

```jsx
const element = <div tabIndex="0"></div>;
```

也可以使用大括号来定义以 JS 表达式为值的属性：

```jsx
const element = <img src={user.avatarUrl}></img>;
```

<Hint type="warning">如果使用大括号包裹的 JS 表达式时就不要再到外面套引号了。否则 JSX 会将引号当中的内容识别为字符串而不是表达式。</Hint>

<Hint type="best">使用 `camelCase` 小驼峰命名来定义属性的名称，而不是使用 HTML 的属性名称。因为 JSX 的特性更接近 JavaScript 而不是 HTML 。</Hint>

### 嵌套

如果 JSX 标签是闭合式的，那么你需要在结尾处用 `/>`, 就好像 XML/HTML 一样：

```jsx
const element = <img src={user.avatarUrl} />;
```

JSX 标签同样可以相互嵌套：

```jsx
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX 代表 Objects

Babel 转译器会把 JSX 转换成一个名为 `React.createElement()` 的方法调用。

下面两种代码的作用是完全相同的：

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```jsx
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` 这个方法首先会进行一些避免 bug 的检查，之后会返回一个类似下面例子的对象：

```jsx
// 注意: 以下示例是简化过的（不代表在 React 源码中是这样）
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```

这样的对象被称为 “`React 元素`”。它代表所有你在屏幕上看到的东西。React 通过读取这些对象来构建 DOM 并保持数据内容一致。

有关元素渲染更新的内容请参考：[React 官方文档：元素渲染](https://doc.react-china.org/docs/rendering-elements.html)。

## 条件渲染

条件渲染大体有两种，一种是 JS 写法，它在 render 方法里面写多个 return 语句，那么你可以将逻辑放在 JS 中判断，和一般的 JS 中的 if-else 语句写法无异。另一种就是 JSX 写法，render 方法里面只有一个 return 语句，可以通过用 `单大括号 {}` 包裹代码在 JSX 中嵌入任何 [JS 表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)，这种相对更为简洁。当然也可以采用两种组合式的写法。

### JS 写法

```jsx
const renderComponent = props => {
  if (props.isFirstTime) {
    return (
      <div>
        This is homepage
        <span>Hello, World</span>
      </div>
    )
  }
  return <div>This is homepage</div>
}
```

<Hint type="best">一般开发中建议不要使用该写法，除非不同条件下 return 的 v-dom 没有公共部分。</Hint>

### JSX 写法：与运算

```jsx
const renderComponent = props => {
  return (
    <div>
      This is homepage
      {!!props.isFirstTime && <span>Hello, World</span>}
    </div>
  )
}
```

<Hint type="best">逻辑与运算要使用 !! 进行显式强制转换，防止某些假值被渲染出来，[demo](https://codepen.io/muwenzi/pen/YjNYYp?editors=0010)。</Hint>

### JSX 写法：三目运算

```jsx
const renderComponent = props => {
  return (
    <div>
      This is homepage
      {props.isFirstTime ? <span>Hello, World</span> : <span>See you again</span>}
    </div>
  )
}
```

<Hint type="best">三目运算的判断可以不用加 !! ，因为其肯定会渲染后面二者之一。</Hint>

## 列表渲染

### map

列表的渲染要使用 JS 数组实例方法 `.map()` ，不能使用 forEach，因为它不会将需要渲染的 react-dom return 出来，而 map 是有返回值的。

```jsx
const renderListItems = props => {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <ul>{numbers.map((number) => <li>{number}</li>}</ul>
  )
}
```

### key

写动态子组件时，如果没有给动态子项添加 key prop，则会报一个警告：

```text
Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of 'renderListItems'. See [https://fb.me/react-warning-keys](https://fb.me/react-warning-keys) for more information.
```

这个警告指的是，如果每一个组件是一个数组或迭代器的话，那么必须有一个唯一的 key prop。那么这个key prop 是做什么的？

* react 利用 key 来识别组件，它是一种身份标识。keys 是 react 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。
* react 根据 key 来决定是销毁重新创建组件还是更新组件

直接用数组的 index 是非常低效的做法。我们在生产环境下常常犯这样的错，这个 key 是每次用来做 Virtual-Dom diff 的，如果使用 index 作为 key 就相当于用了一个随机键，那么不论有没有相同的项，更新都会重新渲染。

在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性。

* key 相同，若组件属性有所变化，则 react 只更新组件对应的属性，没有变化则不更新。
* key 不同，则 react 先销毁该组件（有状态组件的componentWillUnmount会执行），然后重新创建该组件（constructor和componentWillUnmount都会执行）

<Hint type="best">不要使用 index 作为 key prop。</Hint>

