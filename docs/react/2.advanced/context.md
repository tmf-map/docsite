---
id: context
title: Context
sidebar_label: Context
---

Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。在一个典型的 React 应用中，数据是通过 props 属性由上向下（由父及子）的进行传递的，但这对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），这是应用程序中许多组件都所需要的。 Context 提供了一种在组件之间共享此类值的方式，而不必通过组件树的每个层级显式地传递 props 。

## 何时使用 Context

Context 设计目的是为共享那些被认为对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。例如，在下面的代码中，我们通过一个 `theme` 属性手动调整一个按钮组件的样式：

```jsx
function ThemedButton(props) {
  return <Button theme={props.theme} />;
}

// 中间组件
function Toolbar(props) {
  // Toolbar 组件必须添加一个额外的 theme 属性
  // 然后传递它给 ThemedButton 组件
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}
```

使用 context, 我可以避免通过中间元素传递 props：

```jsx
// 创建一个 theme Context,  默认 theme 的值为 light
const ThemeContext = React.createContext('light');

function ThemedButton(props) {
  // ThemedButton 组件从 context 接收 theme
  return (
    <ThemeContext.Consumer>
      {theme => <Button {...props} theme={theme} />}
    </ThemeContext.Consumer>
  );
}

// 中间组件
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
```

:::caution

不要仅仅为了避免在几个层级下的组件传递 props 而使用 context，它是被用于在多个层级的多个组件需要访问相同数据的情景，即 **组件复用** 的场景。

:::

## API

### React.createContext

```js
const MyContext = React.createContext(defaultValue);
```

创建一对 `{ Provider, Consumer }`。当 React 渲染 context 组件 _Consumer_ 时，它将从组件树的上层中最接近的匹配的 _Provider_ 读取当前的 context 值。

如果上层的组件树没有一个匹配的 Provider，而此时你需要渲染一个 Consumer 组件，那么你可以用到 `defaultValue` 。这有助于在不封装它们的情况下对组件进行测试。

### Context.Provider

```jsx
<MyContext.Provider value={/* some value */}>
```

React 组件允许 Consumers 订阅 context 的改变。

接收一个 `value` 属性传递给 Provider 的后代 Consumers。**一个 Provider 可以联系到多个 Consumers**。Providers 可以被嵌套以覆盖组件树内更深层次的值。

### Context.Consumer

```jsx
<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>
```

一个可以订阅 context 变化的 React 组件。

接收一个**函数作为子节点**（即 Render Props）。 函数接收当前 context 的值并返回一个 React 节点。传递给函数的 value 将等于组件树中上层 context 的**最近的 Provider 的 `value` 属性**。如果 context 没有 Provider ，那么 value 参数将等于被传递给 `createContext()` 的 `defaultValue` 。

每当 Provider 的值发生改变时, 作为 Provider 后代的所有 Consumers 都会重新渲染。 从 Provider 到其后代的 Consumers 传播不受 `shouldComponentUpdate` 方法的约束，因此即使祖先组件没有更新，后代 Consumer 也会被更新。

:::good

因为内部通过使用与 `Object.is` 相同的算法比较新值和旧值来确定变化。所以为了避免一些可能触发意外的渲染，可以将提升 `value` 到父节点的 state 里。

:::

因为 context 使用 `reference identity` 确定何时重新渲染，在 Consumer 中，当一个 Provider 的父节点重新渲染的时候，有一些问题可能触发意外的渲染。例如下面的代码，所有的 Consumer 在 Provider 重新渲染之时，每次都将重新渲染，因为一个新的对象总是被创建对应 Provider 里的 `value：`

```jsx
class App extends React.Component {
  render() {
    return (
      <Provider value={{something: 'something'}}>
        <Toolbar />
      </Provider>
    );
  }
}
```

为了防止这样, 提升 `value` 到父节点的 state 里:

```jsx
class App extends React.Component {
  constructor(props) {
    this.state = {
      value: {something: 'something'}
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```

### Context.displayName

Context 对象接受一个 `displayName` 字符串属性。 React DevTools 用这个字段去来确定要为 Context 显示的内容。.

例如, 以下组件将在 DevTools 中显示为 MyContext:

```jsx
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools
```

// TODO: add screenshots

### Class.contextType

可以将由 `React.createContext()` 创建的 context 对象赋值给 class 的 `contextType` 属性。 然后使用 `this.context` 即可拿到该值，你可以在任何生命周期方法（包括 render 函数）中使用 `this.context`。如下例所示：

```jsx
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* perform a side-effect at mount using the value of MyContext */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* render something based on the value of MyContext */
  }
}
MyClass.contextType = MyContext;
```

:::caution

使用这个 API，你只能订阅单个 context。 如果你想订阅多个 context，请参阅 [使用多个 Contexts](#使用多个-context)。

:::

如果你在使用实验性的 `public class fields` 语法, 你可以使用 `static class field` 来初始化你的 `contextType`:

```jsx
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* render something based on the value */
  }
}
```

### useContext

`useContext` 是 react 中三大基础 [hooks](https://reactjs.org/docs/hooks-reference.html) 之一，使用方式如下：

```jsx
const value = useContext(MyContext);
```

`useContext` 接收一个 context 对象然后返回该 context 的值。当 `<MyContext.Provider>` 更新时，此 Hook 将触发重新渲染。

:::tip

不要忘记传入的参数是 Context。

:::

- Correct: useContext(MyContext)
- Incorrect: useContext(MyContext.Consumer)
- Incorrect: useContext(MyContext.Provider)

当 context 值更改时，调用 useContext 的组件将始终重新渲染。如果重新渲染组件代价比较大，则可以[使用 `useMemo` 对其进行优化](https://github.com/facebook/react/issues/15156#issuecomment-474590693)，其实在 react-redux 内部也是如此。

```jsx
function Button() {
  let appContextValue = useContext(AppContext);
  let theme = appContextValue.theme; // Your "selector"

  return useMemo(() => {
    // The rest of your rendering logic
    return <ExpensiveTree className={theme} />;
  }, [theme]);
}
```

另外，`useContext(MyContext)` 仅仅用来读取 context 的值和订阅其更新，但仍然需要使用 `<MyContext.Provider>` 。

:::tip

`useContext(MyContext)` 等价于 class 中的 `static contextType = MyContext` 或者 `MyContext.Consumer`。

:::

## Examples

### 使用多个 Context

为了保持 Context 的快速渲染，React 需要使每个 context consumer 成为树中一个单独的节点:

```jsx
// Theme context, default to light theme
const ThemeContext = React.createContext('light');

// Signed-in user context
const UserContext = React.createContext({
  name: 'Guest'
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // App component that provides initial context values
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// A component may consume multiple contexts
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => <ProfilePage user={user} theme={theme} />}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```

:::caution

如果经常将两个或多个 context 值一起使用，你可以考虑使用 render props 的方法。

:::

更加复杂的例子请参考：https://reactjs.org/docs/context.html#examples

## Context 在 react-redux 中的应用

其实原理机制很普通，也是应用 `React.createContext` 方法：

```js
ReactReduxContext = React.createContext(null);
```

封装了一下 Provider：

```jsx
function Provider({store, context, children}) {
  // ...
  const Context = context || ReactReduxContext;
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
```

在 `connect` HOC 里面本质上的代码与以下实现类似：

```jsx
function connect (mapStateToProps, mapDispatchToProps) {
  return function wrap(WrappedComponent) {
    return function ConnectComponent(props) {
      return (
        <Context.Consumer>
          {store => (
            <WrappedComponent
              {...props}
              {...mapStateToProps(store.getState(), props)}
              {...mapDispatchToProps(store.dispatch, props)}
            />)
          }
        <Context.Consumer>
      )
    }
  }
}
```

详细实现请参考源码：https://github.com/reduxjs/react-redux
