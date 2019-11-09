---
title: JS 动画
sidebar_label: JS 动画
---

import Hint from '../../../src/components/Hint'

## JS 动画原理

动画效果可以通过两种方式来实现：一种是通过JS间接的操作CSS，每隔几秒执行一次，另外一种是利用纯CSS实现，该方法在CSS3成熟后广泛应用。这里主要讲JS里面的动画:

JS动画用的最多的3个api就是：

1. setInterval() / clearInterval()
2. setTimeout() / clearTimeout()
3. requestAnimationFrame()

## 定时器

setTimeout()和setInterval ()主要是自身会执行动画效果，它们在里面放入function和时间参数，然后即可以设置事件，比如点击按钮开始执行动画。定时器在JS基础部分主要研究的是异步编程相关的，这里我们主要关注一下它们的API部分：

```js
var timerID = setTimeout(function[, delay, param1, parm2...])
```

`param1, ..., paramN (可选)
附加参数，一旦定时器到期，它们会作为参数传递给function`

返回值timerID是一个正整数，表示定时器的编号。这个值可以传递给clearTimeout()来取消该定时器。

需要注意的是setTimeout()和setInterval()共用一个编号池，技术上，clearTimeout()和 clearInterval() 可以互换。但是，为了避免混淆，不要混用取消定时函数。

在同一个对象上（一个window或者worker），setTimeout()或者setInterval()在后续的调用不会重用同一个定时器编号。但是不同的对象使用独立的编号池。

### this 指向

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

<Hint type="warning">在严格模式下，`setTimeout` 的回调函数里面的 this 仍然默认指向 `window` 对象， 并不是 `undefined` 。</Hint>

### 取消定时器的方法

```js
window.clearInterval(intervalID)
```

intervalID就是刚才的timerID，要注意的是这并不是清除定时器，而是终止其执行，有点类似for循环里面的break的作用。clearTimeout也是类似。

### clearInterval(timer) 和 timer=null 区别

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

## requestAnimationFrame

```js
requestAnimationFrame(callback)
```

像setTimeout、setInterval一样，requestAnimationFrame是一个全局函数。调用requestAnimationFrame后，它会要求浏览器根据自己的频率进行一次Repaint。

它接收一个回调函数作为参数，在即将开始的浏览器重绘时，会调用这个函数，并会给这个函数传入调用回调函数时的时间作为参数。由于requestAnimationFrame的功效只是一次性的，所以若想达到动画效果，则必须连续不断的调用requestAnimationFrame，就像我们使用setTimeout来实现动画所做的那样。

requestAnimationFrame函数会返回一个id，可以把它作为参数传入cancelAnimationFrame函数来取消 requestAnimationFrame 的回调。跟setTimeout的clearTimeout很相似。 可以这么说，requestAnimationFrame其实就是setTimeout的性能增强版。

```html
<button  id="btn">清除</button>
```

```js
var id;
var time = new Date();

requestAnimationFrame(function step(){
    console.log(new Date() - time);
    time = new Date();
    id = requestAnimationFrame(step);
});

btn.onclick = function (){
    cancelAnimationFrame(id)
}
```

当setTimeout、setInterval甚至是requestAnimationFrame在循环里面要做很长的处理时，就会出现动画时间变慢的结果，使它本该在固定时间内结束而结果却是不尽人意的延迟：

```js
function step() {
  var temp = div.offsetLeft + 2;
  div.style.left = temp + "px";
  window.requestAnimationFrame(step);
  for (var i = 0; i < 50000; i++) {
    console.log("再牛逼的定时器也得等到我执行完才能执行")
  }
}
window.requestAnimationFrame(step);
```

动画变慢的结果其实是采用增量的方式来执行了动画，为了更精确的控制动画，更合适的方法是将动画与时间关联起来

## 示例：匀速运动

```jsx live
class App extends React.Component {
  constructor () {
    this.state = {
      width: 90,
      height: 90,
      backgroundColor: "red"
    };
  }
  linerMove() {
    let begin = 0;
    let steps = 10;
    let target = 300;
    let timer = null;
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      begin += steps;
      if (begin >= target) {
        begin = target;
        window.clearInterval(timer);
      }
      this.setState({
        marginLeft: begin
      });
    }, 100);
  };
  render() {
    return (
      <div className="App">
        <button onClick={this.linerMove.bind(this)}>点击开始</button>
        <div id="box" style={{ ...this.state }} />
      </div>
    );
  }
}
```
