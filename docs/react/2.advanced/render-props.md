---
id: render-props
title: Render Props
sidebar_label: Render Props
---

Render Props 是指一种在 React 组件之间使用一个值为函数的 prop 在 React 组件间共享代码的简单技术。

渲染属性指的是使用一个值为函数的prop来传递需要动态渲染的nodes或组件。如下面的代码可以看到我们的`DataProvider`组件包含了所有跟状态相关的代码，而`Cat`组件则可以是一个单纯的展示型组件，这样一来`DataProvider`就可以单独复用了。

```jsx
import Cat from 'components/cat'
class DataProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { target: 'Zac' };
  }

  render() {
    return (
      <div>
        {this.props.render(this.state)}
      </div>
    )
  }
}

<DataProvider render={data => (
  <Cat target={data.target} />
)}/>
```

虽然这个模式叫Render Props，但不是说非用一个叫render的props不可，习惯上大家更常写成下面这种：

```jsx
<DataProvider>
  {data => (
    <Cat target={data.target} />
  )}
</DataProvider>
```

[React Router](https://reacttraining.com/react-router/web/api/Route/Route-render-methods) 是一个典型使用 render props 的库 

> **注意**：如果在 render 方法里创建函数，那么使用 render prop 会抵消使用 PureComponent 带来的优势。这是因为浅 prop 比较对于新 props 总会返回 false，并且在这种情况下每一个 render 对于 render prop 将会生成一个新的值。


另外这种模式，会增加我们代码的层级关系和耦合程度，不利于代码的维护。可以考虑用 Hooks 替代。

