---
title: Singleton
sidebar_label: Singleton
---

import Hint from '../../../src/components/Hint'
import Img from '../../../src/components/Img'

## What is singleton

The Singleton pattern is known because it restricts instantiation of a class to a single object. Classically, the Singleton pattern can be implemented by creating a class with a method that creates a new instance of the class if one doesn't exist. In the event of an instance already existing, it simply returns a reference to that object.

Singleton pattern not only can reduce unnecessary memory overhead, but also play significant role in reducing global function and variable conflicts.

## Basic singleton in JS

Even if you don't know too much about singleton, I believe that you've used it. Let's take a look at the following code:

```js
const foo = {
  doSomethingA: function () {},
  doSomethingB: function () {}
}
```

Creating objects with object literals is common in JS. The above object encapsulates two methods of doing something in the form of object literals. Only one object(`foo`) is exposed globally, and when needed, it is simply a `foo.doSomethingA()` call. The `foo` object is the simplest singleton pattern. The way you create objects in JS is very flexible, allowing you to instantiate an object directly through object literals, whereas other object-oriented languages must instantiate using classes. So, `foo` here is already an instance, and the `let` and `const` feature in ES6 that does not allow repeated declarations ensures that `foo` cannot be assigned.

## Lazy singleton

Suppose the following cases:

1. The object requires some private variables and private methods.
2. The object itself is quite complicated, so it will take additional time to create before usage.

So, it is no longer possible to use object literals to create singleton. Instead, we need to instantiate the object as a constructor.

### ES5

Here's how to transform the above `foo` object by **IIFE** and constructor in ES5 syntax.

```js
let Singleton = (function(name) {
  let instance = null;
  
  function init() {
    this.name = name,
    this.doSomething = function() {} // method
  }
  
  return function() {
    if(!instance) {
      instance = new init();
    }
    return instance;
  }
})()
```

The above `Singleton` is actually a **IIFE**, `instance` as the instance is initially assigned to `null`, `init` is actually a constructor, used to instantiate the object, the immediate execution of the function returns an anonymous function to determine whether the instance is created, only when `Singleton()` is called to instantiate the instance.

Because the return of the **IIFE** is a function, the instance is created only when called. This is called **lazy singleton**. Instead of creating instance when loaded, the instance will be created if needed. The first instantiated instance object is always returned if called again.

```js
let instanceA = Singleton();
let instanceB = Singleton();
console.log(instanceA === instanceB); //true
```

In addition, the singleton in JS usually is to manage shared application state, such as using a singleton as the source of config settings for a web app on the client side for anything initiated with an API key, storing data in memory in a client-side web application (e.g. stores in Redux). So, `Singleton` can be seen as `Store` and `instance` as shared `data` to some extent.

### ES6

```js
class Singleton {
  constructor(name) {
    this.name = name;
  }
  // method
  doSomething () {}
  //static method
  static getInstance(name) {
    if(!this.instance) {
      this.instance = new Singleton(name);
    }
    return this.instance;
  }
}
```

```js
let instanceA = Singleton.getInstance('');
let instanceB = Singleton.getInstance('')

console.log(instanceA === instanceB); //true
```

## Singleton in React

We should keep backdrop single when the aside is nested. See below example:

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/singleton-aside.gif'/>

The aside can be nested in multiple layers. But the backdrop should only have one because it should be transparent with black, otherwise it will overlap and become darker. We can simply implement singleton by react as following:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class Backdrop extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hasExisted: !!document.getElementsByClassName('dialog__backdrop')[0]
    }
  }
  handleClick = () => {
    this.props.onClick && this.props.onClick();
  }
  render () {
    return !this.state.hasExisted ? ReactDOM.createPortal(
      <div
        className="dialog__backdrop"
        onClick={this.handleClick}
      />,
      document.body
    ) : null;
  }
}

export default Backdrop;
```

## Reference

1. [Learning JavaScript Design Patterns, by Addy Osmani](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)
2. [JavaScript Design Patterns: The Singleton, by Samier Saeed](https://www.sitepoint.com/javascript-design-patterns-singleton/)
