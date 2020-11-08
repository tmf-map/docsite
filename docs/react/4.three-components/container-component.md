---
title: Container Component
---

## What's the container

The current suggested best practice in Redux is to categorize your components as “presentational” or “container” components, and extract a connected container component wherever it makes sense. Container provides a data "container" for presentational components which is only used to display the data (props look like blood).

<Img w="700" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Qi9Owo.png' alt='Qi9Owo'/>

Whenever you feel like you're duplicating code in parent components to provide data for same kinds of children, time to extract a container. Generally as soon as you feel a parent knows too much about “personal” data or actions of its children, time to extract a container.

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

The `connect()` function connects a React component to a Redux store. It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.

It does not modify the component passed to it; instead, it returns **a new**, **connected** component that wraps the component you passed in.

```js
connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)(MyComponent);
```

Actually, `connect()` is a curried function which will be called twice:

1. The first time is to set the parameters, and the 4 parameters are optional at the first call.
2. The second time is to connect the component to the Redux store.

:::good

- The objects in `mapStateToProps` and `mapDispatchToProps` should be kept flat and do not nest.
- The parameter name of `connect` can be customized, but it is recommended to use the default parameter name.

:::

### mapStateToProps

`mapStateToProps?: (state, ownProps?) => stateProps`

### state

If your `mapStateToProps` function is declared as taking one parameter, it will be called whenever the store state changes, and given the store state as the only parameter.

```js
const mapStateToProps = state => ({todos: state.todos});
```

#### ownProps

If your `mapStateToProps` function is declared as taking two parameters, it will be called whenever the store state changes or when the wrapper component receives new props (based on shallow equality comparisons). It will be given the store state as the first parameter, and the wrapper component's props as the second parameter.

The second parameter is normally referred to as `ownProps` by convention.

```js
const mapStateToProps = (state, ownProps) => ({
  todo: state.todos[ownProps.id]
});
```

#### Returns

Your `mapStateToProps` function should return a plain object that contains the data the component needs:

- Each field in the object will become a prop for your actual component
- The values in the fields will be used to determine if your component needs to re-render

For example:

```js
function mapStateToProps(state) {
  return {
    a: 42,
    todos: state.todos,
    filter: state.visibilityFilter
  };
}

// component will receive: props.a, props.todos, and props.filter
```

This object, normally referred to as `stateProps`, will be merged as props to your connected component. If you define `mergeProps`, it will be supplied as the first parameter to `mergeProps`.

:::tip

`mapStateToProps` does not have to be passed to `connect`. If it is not passed, the component will not monitor the changes of the store, which means that the update of the store will not cause the update of the Component.

:::

#### Return Values Determine If Your Component Re-Renders

The return of the `mapStateToProps` determine whether the connected component will re-render. React Redux internally implements the `shouldComponentUpdate` method such that the wrapper component re-renders precisely when the data your component needs has changed. By default, React Redux decides whether the contents of the object returned from `mapStateToProps` are different using `===` comparison (a "shallow equality" check) on each fields of the returned object. If any of the fields have changed, then your component will be re-rendered so it can receive the updated values as props. Note that returning a mutated object of the same reference is a common mistake that can result in your component not re-rendering when expected.

To summarize the behavior of the component wrapped by `connect` with `mapStateToProps` to extract data from the store:

|  | `(state) => stateProps` | `(state, ownProps) => stateProps` |
| --- | --- | --- |
| `mapStateToProps` runs when: | store `state` changes | store `state` changes <br /> or <br />any field of `ownProps` is different |
| component re-renders when: | any field of `stateProps` is different | any field of `stateProps` is different <br /> or <br /> any field of `ownProps` is different |

#### Only Return New Object References If Needed

React Redux does shallow comparisons to see if the `mapStateToProps` results have changed. It’s easy to accidentally return new object or array references every time, which would cause your component to re-render even if the data is actually the same.

Many common operations result in new object or array references being created:

- Creating new arrays with `someArray.map()` or `someArray.filter()`
- Merging arrays with `array.concat`
- Selecting portion of an array with `array.slice`
- Copying values with `Object.assign`
- Copying values with the spread operator `{ ...oldState, ...newData }`

Put these operations in [memoized selector functions](https://redux.js.org/recipes/computing-derived-data#creating-a-memoized-selector) to ensure that they only run if the input values have changed. This will also ensure that if the input values _haven't_ changed, `mapStateToProps` will still return the same result values as before, and `connect` can skip re-rendering.

For more reference:

- [Usage Guidelines](https://react-redux.js.org/using-react-redux/connect-mapstate#usage-guidelines)
- [mapStateToProps and Performance](https://react-redux.js.org/using-react-redux/connect-mapstate#mapstatetoprops-and-performance)
- [Behavior and Gotchas](https://react-redux.js.org/using-react-redux/connect-mapstate#behavior-and-gotchas)

### mapDispatchToProps

`mapDispatchToProps?: Object | (dispatch, ownProps?) => dispatchProps`

It's the second parameter to `connect()` may either be an [object](https://react-redux.js.org/api/connect#object-shorthand-form)(each field is an action creator), a function, or not supplied. Your component will receive `dispatch` by default, i.e., when you do not supply a second parameter to connect():

```js
// do not pass `mapDispatchToProps`
connect()(MyComponent);
connect(mapState)(MyComponent);
connect(mapState, null, mergeProps, options)(MyComponent);
```

In most scenarios, we define a `mapDispatchToProps` as a function, it will be called with a maximum of two parameters:

- `dispatch: Function`
- `ownProps?: Object`

#### dispatch

If your `mapDispatchToProps` is declared as a function taking one parameter, it will be given the dispatch of your store.

```js
const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    increment: () => dispatch({type: 'INCREMENT'}),
    decrement: () => dispatch({type: 'DECREMENT'}),
    reset: () => dispatch({type: 'RESET'})
  };
};
```

#### ownProps

```js
const mapDispatchToProps = (dispatch, ownProps) => {
  toggleTodo: () => dispatch(toggleTodo(ownProps.todoId));
};
```

### mergeProps

`mergeProps?: (stateProps, dispatchProps, ownProps) => props`

It is used to specify the merging rules of these three props, and the merged result is used as the component's props.

If specified, defines how the final props for your own wrapped component are determined, it is recommended not to be too complicated. If you do not provide mergeProps, your wrapped component receives `{ ...ownProps, ...stateProps, ...dispatchProps }` by default.

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

:::caution

Pass an empty object as the first parameter when using **Object.assign** method to merge props.

:::

### options

`options?: Object`

```js
{
  context?: Object,
  pure?: boolean,
  areStatesEqual?: Function,
  areOwnPropsEqual?: Function,
  areStatePropsEqual?: Function,
  areMergedPropsEqual?: Function,
  forwardRef?: boolean,
}
```

#### context

React-Redux v6 allows you to supply a custom context instance to be used by React-Redux. You need to pass the instance of your context to both `<Provider />` and your connected component. You may pass the context to your connected component either by passing it here as a field of option, or as a prop to your connected component in rendering.

```js
// const MyContext = React.createContext();
connect(mapStateToProps, mapDispatchToProps, null, {context: MyContext})(
  MyComponent
);
```

#### pure

default value: `true`

Assumes that the wrapped component is a “pure” component and does not rely on any input or state other than its props and the selected Redux store’s state.

When `options.pure` is true, `connect` performs several **shallow equality** checks that are used to **avoid unnecessary** calls to `mapStateToProps`, `mapDispatchToProps`, `mergeProps`, and ultimately to `render`. These include `areStatesEqual`, `areOwnPropsEqual`, `areStatePropsEqual`, and `areMergedPropsEqual`. While the defaults are probably appropriate 99% of the time, you may wish to override them with custom implementations for performance or other reasons.

For more option details, see https://react-redux.js.org/api/connect#options-object

### Using in TypeScript

The following example is using [Rematch](/docs/react/5.state-management/model), you can also use original Redux, see more details on [official docs](https://react-redux.js.org/using-react-redux/static-typing).

```ts title="store.ts"
import middlewares from '@/middlewares';
import models from '@/models';
import {init, RematchRootState, RematchDispatch} from '@rematch/core';

const store = init({
  models,
  redux: {
    middlewares: [...middlewares]
  }
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<typeof models>;
export type RootState = RematchRootState<typeof models>;

export default store;
```

Because **types can be defined in any order**, you can declare your component before declaring the connector if you want.

```tsx title="MyComponent.tsx"
// alternately, declare `type Props = Props From Redux & {backgroundColor: string}`
interface Props extends PropsFromRedux {
  backgroundColor: string;
}

const mapStateToProps = (state: RootState) => ({
  isOn: state.isOn
});

// myComponent is one of models
const mapDispatchToProps = ({myComponent: {toggleOn}}: Dispatch) => ({
  toggleOn
});

const MyComponent: React.FC = (props: Props) => (
  <div style={{backgroundColor: props.backgroundColor}}>
    <button onClick={props.toggleOn}>
      Toggle is {props.isOn ? 'ON' : 'OFF'}
    </button>
  </div>
);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MyComponent);
```

As of v7.1.2, the `@types/react-redux` package exposes a helper type, `ConnectedProps`, that can extract the return types of `mapStateToProps` and `mapDispatchToProps` from the first function. This means that if you split the connect call into **two steps**, all of the "props from Redux" can be inferred automatically without having to write them by hand. While this approach may feel unusual if you've been using React-Redux for a while, it does simplify the type declarations considerably.

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

1. [React Redux official docs: connect()](https://react-redux.js.org/api/connect)
2. [React Redux official docs: Hooks](https://react-redux.js.org/api/hooks)
