---
title: 宏任务和微任务
---

import Img from '../../../src/components/Img';

我们先来看一道有关事件循环的前端面试题：

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');
```

输出结果为：

<Img w="160" align="left" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/image89.png'/>

在 JS 引擎执行过程中，进入执行阶段后，代码的执行顺序如下：

```text
宏任务(同步任务) →  微任务 →  渲染 → 宏任务(异步任务)
```

进入 ES6 或 Node 环境中，JS 的任务分为两种，分别是宏任务（macro-task）和微任务（micro-task），在最新的 ECMAScript 中，微任务称为 jobs，宏任务称为 task。

## 宏任务

宏任务（macro-task/task）又按执行顺序分为同步宏任务和异步宏任务（这是两个宏任务）。理解宏任务中同步任务和异步任务的执行顺序，那么就相当于理解了 JS 异步执行机制–事件循环（Event Loop）。

### 同步宏任务

同步任务指的是在 JS 引擎主线程上按顺序执行的任务，只有前一个任务执行完毕后，才能执行后一个任务，形成一个执行栈（函数调用栈）。

```js
console.log('script start');
console.log('script end');
```

### 异步宏任务

异步任务指的是不直接进入 JS 引擎主线程，而是满足触发条件时，相关的线程将该异步任务推进任务队列(task queue)，等待 JS 引擎主线程上的任务执行完毕，空闲时读取执行的任务，例如

- 异步 Ajax
- DOM 事件
- setTimeout/setInterval
- I/O
- UI rendering
- postMessage
- MessageChannel
- setImmediate(Node.js 环境)

### setTimeout

[点击查看](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)`setTimeout`语法

```js
setTimeout(function () {
  console.log('setTimeout');
}, 0);
```

每一个`setTimeout`在执行时，会返回一个唯一 ID。我们在使用时，常常会使用一个变量将这个唯一 ID 保存起来，用以传入`clearTimeout`，清除定时器。

我们都知道`setTimeout`和`setInterval`是异步任务的定时器，需要添加到任务队列等待主线程执行，那么使用`setTimeout`模拟实现`setInterval`，会有区别吗？

如果感兴趣，想深入了解两者的不同，可以[点击此处查看](https://thinkbucket.github.io/docsite/blog/setTimeout-or-setInterval)

#### setTimeout 应用拓展

1. [防抖和节流教程](https://css-tricks.com/debouncing-throttling-explained-examples/)
2. [防抖源码实现](https://github.com/ThinkBucket/codebox/blob/master/src/debounce.js)
3. [节流源码实现](https://github.com/ThinkBucket/codebox/blob/master/src/throttle.js)

## 微任务

微任务（micro-task/job）是在`es6和node环境`中出现的一个任务类型，如果不考虑 es6 和 node 环境的话，我们只需要理解宏任务事件循环的执行过程就已经足够了，但是到了 es6 和 node 环境，我们就需要理解微任务的执行顺序了。

微任务（micro-task）的 API 主要有:

- Promise.then
- async/await
- process.nextTick(Node.js 环境)
- Object.observer
- MutationObserver

**微任务可以理解是在当前宏任务执行结束后立即执行的任务。也就是说，在当前宏任务后，下一个宏任务之前，在渲染之前。**

所以它的响应速度相比`setTimeout（setTimeout是task）`会更快，因为无需等渲染。也就是说，在某一个 macrotask 执行完后，就会将在它执行期间产生的所有 microtask 都执行完毕（在渲染前）。

### Promise 和 async 立即执行

我们知道 Promise 中的异步体现在 then 和 catch 中，所以写在 Promise 中的代码是被当做同步任务立即执行的。而在 async/await 中，在出现 await 出现之前，其中的代码也是立即执行的。那么出现了 await 时候发生了什么呢？

### await 做了什么

从字面意思上看 await 就是等待，await 等待的是一个表达式，这个表达式的返回值可以是一个 promise 对象也可以是其他值。

很多人以为 await 会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上 await 是一个让出线程的标志。await 后面的表达式会先执行一遍，将 await 后面的代码加入到 microtask 中，然后就会跳出整个 async 函数来执行后面的代码。

由于 async await 本身就是 promise+generator 的语法糖，所以 await 后面的代码是 microtask。所以对于本题中的

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
```

等价于

```js
async function async1() {
  console.log('async1 start');
  Promise.resolve(async2()).then(() => {
    console.log('async1 end');
  });
}
```

可以简单理解为：async 函数在 await 之前的代码同步执行（可以理解为 await 之前的代码属于 new Promise 时传入的代码），await 之后的所有代码都是在 Promise.then 中的回调
