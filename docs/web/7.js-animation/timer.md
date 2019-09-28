---
id: timer
title: 定时器
sidebar_label: 定时器
---

setTimeout()和setInterval ()主要是自身会执行动画效果，它们在里面放入function和时间参数，然后即可以设置事件，比如点击按钮开始执行动画。定时器在JS基础部分主要研究的是异步编程相关的，这里我们主要关注一下它们的API部分：

```js
var timerID = setTimeout(function[, delay, param1, parm2...])
```

`param1, ..., paramN (可选)
附加参数，一旦定时器到期，它们会作为参数传递给function`

返回值timerID是一个正整数，表示定时器的编号。这个值可以传递给clearTimeout()来取消该定时器。

需要注意的是setTimeout()和setInterval()共用一个编号池，技术上，clearTimeout()和 clearInterval() 可以互换。但是，为了避免混淆，不要混用取消定时函数。

在同一个对象上（一个window或者worker），setTimeout()或者setInterval()在后续的调用不会重用同一个定时器编号。但是不同的对象使用独立的编号池。

## 关于"this"的问题

由setTimeout()调用的代码运行在与所在函数完全分离的执行环境上。这会导致，这些代码中包含的 this 关键字在严格模式和非严格模式都会指向 window (或全局)对象。

```js
var obj = {
  a: 2,
  foo: function() {
      'use strict'
      console.log(this.a)
    }
}
var a = 1
setTimeout(obj.foo, 0) // 1
```

*备注：在严格模式下，setTimeout( )的回调函数里面的this仍然默认指向window对象， 并不是undefined。*

## 取消定时器的方法：

```js
window.clearInterval(intervalID)
```

intervalID就是刚才的timerID，要注意的是这并不是清除定时器，而是终止其执行，有点类似for循环里面的break的作用。clearTimeout也是类似。

## clearInterval(timer) 和 timer=null 区别

clearInterval(timer)清除了timer指向的定时器，timer=null，是修改timer的指向，是timer这个变量不指向某个定时器，然而并没有清除这个定时器，不到终止计时器的作用，定时器依旧可以使用。

```js
var timer = setInterval(function(){
  alert()
  timer = null;
}, 1000);
```
这段代码依然会不断运行。

## setTimeout和setInterval区别
与setTimeout不同，你并不能保证到了时间间隔，代码就准能执行。如果你调用的函数需要花很长时间才能完成，那某些调用会被直接忽略。

如果确实要保证事件“匀速”被触发，那可以用希望的延迟减去上次调用所花时间，然后将得到的差值作为延迟动态指定给setTimeout。 不过，要注意的是JavaScript的计时器并不是非常精确。因此你不可能得到绝对“平均”的延迟，即使使用setInterval也不行，原因很多（比如垃圾回收、JavaScript是单线程的，等等）。此外，当前浏览器也会将最小的超时时间固定在4ms到15ms之间。因此不要指望一点误差也没有。

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/hm3Yaq.png)
