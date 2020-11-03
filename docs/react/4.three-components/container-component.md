---
title: Container Component
---

## What's the container

Redux 的一个重要思想是将组件主要分为 **container（容器型） 组件**和 **presentational（展示型） 组件**。

- container 主要是为 presentational 组件提供一个 **数据容器**，这里的数据包括属性和方法（需要 dispatch 的方法，和不需要 dispatch 的方法）。
- presentational 组件仅仅作为拿到数据（血液）后的展示作用，上承接 container 传过来的数据，下接 ui 组件。

一个完整 React App 的组件树，根节点即 mountNode，叶子节点应该是 presentational 组件或 ui 组件，中间的节点是 container 组件，主要用与传递和监听数据，作为一个数据的中间容器。

<Img w="700" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Qi9Owo.png' alt='Qi9Owo'/>

## Get started to Redux

To use Redux, you should start by wrapping your entire application in a `<Provider>` component to make the store available throughout the component tree:

```jsx
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

From there, you may import any of the listed React Redux APIs and use them within your function components.

## HOC

### connect

```js
connect(
  [mapStateToProps],
  [mapDispatchToProps],
  [mergeProps],
  [options]
)(Component);
```

connect: 一个柯里化函数，函数将被调用两次。

1. 第一次是设置参数，第一次调用的时候 4 个参数都是可选。
2. 第二次是组件与 Redux store 连接。

connect 函数不会修改传入的 React 组件，返回的是一个新的已与 Redux store 连接的组件。

:::good

- `mapStateToProps` 和 `mapDispatchToProps` 里面的对象保持扁平化，不要发生嵌套。
- `connect` 的参数名字可以自定义，但推荐使用默认的参数名字。

:::

### mapStateToProps

- **mapStateToProps\(state, ownProps?\): stateProps** 在 store 发生改变的时候才会调用，然后把返回的结果作为组件的 props。

:::tip

- 该函数 return 的对象里面的值有变化才会引起其所对应的 Component 的更新。
- mapStateToProps 可以不传，如果不传，组件不会监听 store 的变化，也就是说 store 的更新不会引起 Component 的更新。

:::

### mapDispatchToProps

`mapDispatchToProps(dispatch, ownProps?): dispatchProps`

里面主要是事件绑定的方法，方法里面可以通过 `dispatch` 调用 `action` 。

### mergeProps

- **mergeProps\(stateProps, dispatchProps, ownProps\): props** 用来指定这三个 props 的合并规则，合并的结果作为组件的 props。如果要指定这个函数，建议不要太复杂。

```jsx
const mapStateToProps = state => ({
  page: selector.getPage(state)
});
const mapDispatchToProps = dispatch => ({
  deleteDiscount(page, lineId) {
    dispatch(asyncAction.deleteDiscount(page, lineId));
  }
});
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    deleteDiscount: dispatchProps.deleteDiscount.bind(null, stateProps.page)
  });
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Table);
```

:::bad

使用 ES2015 的 **Object.assign** 方法来做 props 的合并，第一个参数传空对象。

:::

### options

里面主要关注 pure。

- _\[pure = true\] \(Boolean\)_: 如果为 true，connector 将执行 shouldComponentUpdate 并且浅对比 mergeProps 的结果，避免不必要的更新，前提是当前组件是一个“**纯**”组件，它不依赖于任何的输入或 state 而只依赖于 props 和 Redux store 的 state。**默认值为 true**。
- _\[withRef = false\] \(Boolean\)_: 如果为 true，connector 会保存一个对被被包含的组件实例的引用，该引用通过 `getWrappedInstance()` 方法获得。**默认值为 false**。
- **Component** 就是要被连接的 React 组件。

## Hooks

React's new ["hooks" APIs](https://reactjs.org/docs/hooks-intro.html) give function components the ability to use local component state, execute side effects, and more.

React Redux now offers a set of hook APIs as an alternative to the existing `connect()` Higher Order Component. These APIs allow you to subscribe to the Redux store and dispatch actions, without having to wrap your components in `connect()`.

:::tip

These hooks were first added in react-redux@7.1.0

:::

### `useSelector()`

```js
const result: any = useSelector(selector: Function, equalityFn?: Function)
```

Allows you to extract data from the Redux store state, using a selector function.

:::good

The selector function should be [pure](https://en.wikipedia.org/wiki/Pure_function) since it is potentially executed multiple times and at arbitrary points in time.

:::

The selector is approximately equivalent to the [`mapStateToProps` argument to `connect`](../using-react-redux/connect-mapstate) conceptually, such as:

```ts
const mapStateToProps = state => ({
  name: state?.user?.name
});
// equals to
const name = useSelector((state: RootState) => state?.user?.name);
```

Please note that:

- The selector will be called with the entire Redux store state as its only argument.
- The selector will be run whenever the function component renders (unless its reference hasn't changed since a previous render of the component so that a cached result can be returned by the hook without re-running the selector).
- The selector will also subscribe to the Redux store, and run your selector whenever an action is dispatched.

However, there are some differences between the selectors passed to `useSelector()` and a `mapStateToProps` function:

- The selector may return any value as a result, not just an object. The return value of the selector will be used as the return value of the `useSelector()` hook.
  ```ts
  const name = useSelector((state: RootState) => state?.user?.name);
  const age = useSelector((state: RootState) => state?.user?.age);
  // or
  const {name, age} = useSelector((state: RootState) => state?.user);
  ```
- When an action is dispatched, `useSelector()` will do a reference comparison of the previous selector result value and the current result value. If they are different, the component will be forced to re-render. If they are the same, the component will not re-render.
- The selector function does _not_ receive an `ownProps` argument. However, props can be used through closure or by using a curried selector:
  ```ts
  const User: React.FC<Props> = props => {
    const name = useSelector(
      (state: RootState, props) => props?.name || state?.user?.name
    );
    // ...
  };
  ```
- Extra care must be taken when using memoizing selectors (see examples below for more details).
- `useSelector()` uses strict `===` **reference equality** checks by default, not shallow equality (see the following section for more details).

You may call `useSelector()` multiple times within a single function component. Each call to `useSelector()` creates an individual subscription to the Redux store. Because of the React **update batching** behavior used in React Redux v7, a dispatched action that causes multiple `useSelector()`s in the same component to return new values _should_ only result in a **single re-render**.

### `useDispatch()`

```js
const dispatch = useDispatch();
```

This hook returns a reference to the `dispatch` function from the Redux store. You may use it to dispatch actions as needed.

:::tip

like in [React's useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer), the returned `dispatch` function identity is stable and won't change on re-renders (unless you change the `store` being passed to the `<Provider>`, which would be extremely unusual).

:::

```jsx
import React from 'react';
import {useDispatch} from 'react-redux';

export const CounterComponent = ({value}) => {
  const dispatch = useDispatch();

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => dispatch({type: 'increment-counter'})}>
        Increment counter
      </button>
    </div>
  );
};
```

When passing a callback using `dispatch` to a child component, you should memoize it with [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback), just like you should memoize any passed callback. This avoids unnecessary rendering of child components due to the changed callback reference. You can safely pass `[dispatch]` in the dependency array for the `useCallback` call - since `dispatch` won't change, the callback will be reused properly (as it should). For example:

```jsx
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

export const CounterComponent = ({value}) => {
  const dispatch = useDispatch();
  const incrementCounter = useCallback(
    () => dispatch({type: 'increment-counter'}),
    [dispatch]
  );

  return (
    <div>
      <span>{value}</span>
      <MyIncrementButton onIncrement={incrementCounter} />
    </div>
  );
};

export const MyIncrementButton = React.memo(({onIncrement}) => (
  <button onClick={onIncrement}>Increment counter</button>
));
```

### `useStore()`

```js
const store = useStore();
```

This hook returns a reference to the same Redux store that was passed in to the `<Provider>` component.

This hook should probably not be used frequently. Prefer `useSelector()` as your primary choice. However, this may be useful for less common scenarios that do require access to the store, such as replacing reducers:

```jsx
import React from 'react';
import {useStore} from 'react-redux';

export const CounterComponent = ({value}) => {
  const store = useStore();

  // EXAMPLE ONLY! Do not do this in a real app.
  // The component will not automatically update if the store state changes
  return <div>{store.getState()}</div>;
};
```

### Custom context

The `<Provider>` component allows you to specify an alternate context via the `context` prop. This is useful if you're building a complex reusable component, and you don't want your store to collide with any Redux store your consumers' applications might use.

To access an alternate context via the hooks API, use the hook creator functions:

```js
import React from 'react';
import {
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook
} from 'react-redux';

const MyContext = React.createContext(null);

// Export your custom hooks if you wish to use them in other files.
export const useStore = createStoreHook(MyContext);
export const useDispatch = createDispatchHook(MyContext);
export const useSelector = createSelectorHook(MyContext);

const myStore = createStore(rootReducer);

export function MyProvider({children}) {
  return (
    <Provider context={MyContext} store={myStore}>
      {children}
    </Provider>
  );
}
```

### Equality Comparisons and Updates

When the function component renders, the provided selector function will be called and its result will be returned from the `useSelector()` hook. (A cached result may be returned by the hook without re-running the selector if it's the same function reference as on a previous render of the component.)

However, when an action is dispatched to the Redux store, `useSelector()` only forces a re-render if the selector result appears to be different than the last result. As of v7.1.0-alpha.5, the default comparison is a strict `===` reference comparison. This is different than `connect()`, which uses **shallow equality** checks on the results of `mapState` calls to determine if re-rendering is needed. This has several implications on how you should use `useSelector()`.

With `mapStateToProps`, all individual fields were returned in a combined object. It didn't matter if the return object was a new reference or not - `connect()` just compared the individual fields. With `useSelector()`, **returning a new object every time will always force a re-render by default**. If you want to retrieve multiple values from the store, you can:

:::good

- Call `useSelector()` multiple times, with each call returning a single field value.
  ```ts
  const name = useSelector((state: RootState) => state?.user?.name);
  const age = useSelector((state: RootState) => state?.user?.age);
  ```
- Use the `shallowEqual` function from React-Redux as the `equalityFn` argument to `useSelector()`, like:

  ```js
  import {shallowEqual, useSelector} from 'react-redux';

  // later
  const user = useSelector((state: RootState) => state?.user, shallowEqual);
  ```

  The optional comparison function also enables using something like Lodash's `_.isEqual()` or Immutable.js's comparison capabilities.

- Use Reselect or a similar library to create a memoized selector that returns multiple values in one object, but only returns a new object when one of the values has changed.

  ```js
  import React from 'react';
  import {useSelector} from 'react-redux';
  import {createSelector} from 'reselect';

  const selectNumOfDoneTodos = createSelector(
    state => state.todos,
    todos => todos.filter(todo => todo.isDone).length
  );

  export const DoneTodosCounter = () => {
    const NumOfDoneTodos = useSelector(selectNumOfDoneTodos);
    return <div>{NumOfDoneTodos}</div>;
  };

  export const App = () => {
    return (
      <>
        <span>Number of done todos:</span>
        <DoneTodosCounter />
      </>
    );
  };
  ```

  See more at: https://react-redux.js.org/api/hooks#using-memoizing-selectors

:::

As mentioned earlier, by default `useSelector()` will do a **reference equality comparison** of the selected value when running the selector function after an action is dispatched, and will only cause the component to re-render if the selected value changed.

However, unlike `connect()`, `useSelector()` does not prevent the component from re-rendering **due to its parent re-rendering**, even if the component's props did not change.

If further performance optimizations are necessary, you may consider wrapping your function component in [React.memo()](/docs/react/4.three-components/container-component):

```jsx
const CounterComponent = ({name}) => {
  const counter = useSelector(state => state.counter);
  return (
    <div>
      {name}: {counter}
    </div>
  );
};

export const MemoizedCounterComponent = React.memo(CounterComponent);
```

## Reference

1. [React Redux official docs: Hooks](https://react-redux.js.org/api/hooks)
