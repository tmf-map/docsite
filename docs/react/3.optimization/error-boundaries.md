---
title: Error Boundaries
sidebar_label: Error Boundaries
---

import Img from '../../../src/components/Img';import Hint from '../../../src/components/Hint';

In the past, JavaScript errors inside components used to corrupt React’s internal state and cause it to emit cryptic errors on next renders. These errors were always caused by an earlier error in the application code, but React did not provide a way to handle them gracefully in components, and could not recover from them. When these errors occur, your app always displays an empty page like this: <Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/nVraRt.png'/>

The error messages in your console are confusing and difficult to resolve. Typical symptoms include stack traces that thread through dark regions of the React internals.

## Introducing Error Boundaries

A JavaScript error in a part of the UI shouldn’t break the whole app. To solve this problem for React users, React 16 introduces a new concept of an “error boundary”.

Error boundaries are React components that **catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI** instead of the component tree that crashed. Error boundaries catch errors during rendering, **in lifecycle methods, and in constructors of the whole tree below them**.

> **Note**
>
> Error boundaries do **not** catch errors for:
>
> - Event handlers ([learn more](https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers))
> - Asynchronous code (e.g. `setTimeout` or `requestAnimationFrame` callbacks)
> - Server side rendering
> - Errors thrown in the error boundary itself (rather than its children)

A class component becomes an error boundary if it defines either (or both) of the lifecycle methods static `getDerivedStateFromError()` or `componentDidCatch()`. Use static `getDerivedStateFromError()` to render a fallback UI after an error has been thrown. Use `componentDidCatch()` to log error information.

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

Then you can use it as a regular component:

```js
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

Error boundaries work like a JavaScript `catch {}` block, but for components. Only class components can be error boundaries. In practice, most of the time you’ll want to declare an error boundary component once and use it throughout your application.

Note that **error boundaries only catch errors in the components below them in the tree**. An error boundary can’t catch an error within itself. If an error boundary fails trying to render the error message, the error will propagate to the closest error boundary above it. This, too, is similar to how `catch {}` block works in JavaScript.

## Live Demo

```jsx live noInline
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null, errorInfo: null};
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{whiteSpace: 'pre-wrap'}}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {counter: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }

  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

function App() {
  return (
    <div>
      <p>
        <b>
          This is an example of error boundaries in React 16.
          <br />
          <br />
          Click on the numbers to increase the counters.
          <br />
          The counter is programmed to throw when it reaches 5. This simulates a
          JavaScript error in a component.
        </b>
      </p>
      <hr />
      <ErrorBoundary>
        <p>
          These two counters are inside the same error boundary. If one crashes,
          the error boundary will replace both of them.
        </p>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr />
      <p>
        These two counters are each inside of their own error boundary. So if
        one crashes, the other is not affected.
      </p>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
    </div>
  );
}

render(<App />);
```

As we can see, the API surface of error boundaries is simple: any React component becomes an error boundary when it implements the new lifecycle method, `componentDidCatch()`.

## Where to Place Error Boundaries

The granularity of error boundaries is up to you. You may wrap top-level route components to display a “Something went wrong” message to the user, just like server-side frameworks often handle crashes. You may also wrap individual widgets in an error boundary to protect them from crashing the rest of the application.

## New Behavior for Uncaught Errors

This change has an important implication. **As of React 16, errors that were not caught by any error boundary will result in unmounting of the whole React component tree.**

We debated this decision, but in our experience it is worse to leave corrupted UI in place than to completely remove it. For example, in a product like Messenger leaving the broken UI visible could lead to somebody sending a message to the wrong person. Similarly, it is worse for a payments app to display a wrong amount than to render nothing.

This change means that as you migrate to React 16, you will likely uncover existing crashes in your application that have been unnoticed before. Adding error boundaries lets you provide better user experience when something goes wrong.

For example, Facebook Messenger wraps content of the sidebar, the info panel, the conversation log, and the message input into separate error boundaries. If some component in one of these UI areas crashes, the rest of them remain interactive.

We also encourage you to use JS error reporting services (or build your own) so that you can learn about unhandled exceptions as they happen in production, and fix them.

## Component Stack Traces

React 16 prints all errors that occurred during rendering to the console in development, even if the application accidentally swallows them. In addition to the error message and the JavaScript stack, it also provides component stack traces. Now you can see where exactly in the component tree the failure has happened: <Img w="700" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Mj6C0E.png'/>

You can also see the filenames and line numbers in the component stack trace. This works by default in Create React App projects.If you don’t use Create React App, you can add [this plugin](https://www.npmjs.com/package/babel-plugin-transform-react-jsx-source) manually to your Babel configuration. Note that it’s intended only for development and **must be disabled in production**.

<Hint type="tip">
Component names displayed in the stack traces depend on the `Function.name` property. If you support older browsers and devices which may not yet provide this natively (e.g. IE 11), consider including a `Function.name` polyfill in your bundled application, such as `function.name-polyfill`. Alternatively, you may explicitly set the `displayName` property on all your components.
</Hint>

## How About try/catch?

`try / catch` is great but it only works for imperative code:

```js
try {
  showButton();
} catch (error) {
  // ...
}
```

Error boundaries exist because ↓↓↓ **doesn’t work** with the JSX rendering model:

```js
<div>
  { try {
    <CoolComplicatedComponent/>
  } catch(error){
    handleChildError(error)
    }
  }
</div>
```

Error boundaries preserve the declarative nature of React, and behave as you would expect. For example, even if an error occurs in a `componentDidUpdate` method caused by a `setState` somewhere deep in the tree, it will still correctly propagate to the closest error boundary.

## How About Event Handlers?

Error boundaries **do not** catch errors inside event handlers.

React doesn’t need error boundaries to recover from errors in event handlers. Unlike the render method and lifecycle methods, the event handlers don’t happen during rendering. So if they throw, React still knows what to display on the screen.

If you need to catch an error inside event handler, use the regular JavaScript `try / catch` statement:

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    try {
      // Do something that could throw
    } catch (error) {
      this.setState({error});
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Caught an error.</h1>;
    }
    return <div onClick={this.handleClick}>Click Me</div>;
  }
}
```

Note that the above example is demonstrating regular JavaScript behavior and doesn’t use error boundaries.

## Naming Changes from React 15

React 15 included a very limited support for error boundaries under a different method name: `unstable_handleError`. This method no longer works, and you will need to change it to `componentDidCatch` in your code starting from the first 16 beta release.

For this change, React has provided a [codemod](https://github.com/reactjs/react-codemod#error-boundaries) to automatically migrate your code.

## References

1. [Error Boundaries -- React](https://reactjs.org/docs/error-boundaries.html)
2. [How to use Error Boundaries in React 16 @Ben Vinegar](https://scotch.io/tutorials/how-to-use-error-boundaries-in-react-16)
