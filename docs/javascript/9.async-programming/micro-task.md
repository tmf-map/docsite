---
title: 微任务
sidebar_label: 微任务
---

## 前言
微任务（micro-task/job）是在`es6和node环境`中出现的一个任务类型，如果不考虑es6和node环境的话，我们只需要理解宏任务事件循环的执行过程就已经足够了，但是到了es6和node环境，我们就需要理解微任务的执行顺序了。

微任务（micro-task）的API主要有:

- Promise.then
- async/await
- process.nextTick(Node.js 环境)
- Object.observer
- MutationObserver

**微任务可以理解是在当前宏任务执行结束后立即执行的任务。也就是说，在当前宏任务后，下一个宏任务之前，在渲染之前。**

所以它的响应速度相比`setTimeout（setTimeout是task）`会更快，因为无需等渲染。也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）。


## Promise和async立即执行

我们知道Promise中的异步体现在then和catch中，所以写在Promise中的代码是被当做同步任务立即执行的。而在async/await中，在出现await出现之前，其中的代码也是立即执行的。那么出现了await时候发生了什么呢？


## await做了什么

从字面意思上看await就是等待，await 等待的是一个表达式，这个表达式的返回值可以是一个promise对象也可以是其他值。


很多人以为await会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上await是一个让出线程的标志。await后面的表达式会先执行一遍，将await后面的代码加入到microtask中，然后就会跳出整个async函数来执行后面的代码。


由于async await 本身就是promise+generator的语法糖，所以await后面的代码是microtask。所以对于本题中的
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
    })
}
```

可以简单理解为：

async函数在await之前的代码同步执行（可以理解为await之前的代码属于new Promise时传入的代码）
await之后的所有代码都是在Promise.then中的回调