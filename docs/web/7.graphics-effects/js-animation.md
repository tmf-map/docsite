---
title: JS 动画
sidebar_label: JS 动画
---

import Hint from '../../../src/components/Hint';

## JS 动画原理

动画效果可以通过两种方式来实现：一种是通过 JS 间接的操作 CSS，每隔几秒执行一次，另外一种是利用纯 CSS 实现，该方法在 CSS3 成熟后广泛应用。这里主要讲 JS 里面的动画:

JS 动画用的最多的 3 个 api 就是：

1. setInterval() / clearInterval()
2. setTimeout() / clearTimeout()
3. requestAnimationFrame()

setTimeout()和 setInterval ()主要是自身会执行动画效果，它们在里面放入 function 和时间参数，然后即可以设置事件，比如点击按钮开始执行动画。定时器的具体使用请参阅：[JavaScript 定时器](/docs/javascript/9.async-programming/timer)

## requestAnimationFrame

```js
requestAnimationFrame(callback);
```

像 setTimeout、setInterval 一样，requestAnimationFrame 是一个全局函数。调用 requestAnimationFrame 后，它会要求浏览器根据自己的频率进行一次 Repaint。

它接收一个回调函数作为参数，在即将开始的浏览器重绘时，会调用这个函数，并会给这个函数传入调用回调函数时的时间作为参数。由于 requestAnimationFrame 的功效只是一次性的，所以若想达到动画效果，则必须连续不断的调用 requestAnimationFrame，就像我们使用 setTimeout 来实现动画所做的那样。

requestAnimationFrame 函数会返回一个 id，可以把它作为参数传入 cancelAnimationFrame 函数来取消 requestAnimationFrame 的回调。跟 setTimeout 的 clearTimeout 很相似。 可以这么说，requestAnimationFrame 其实就是 setTimeout 的性能增强版。

```html
<button id="btn">清除</button>
```

```js
var id;
var time = new Date();

requestAnimationFrame(function step() {
  console.log(new Date() - time);
  time = new Date();
  id = requestAnimationFrame(step);
});

btn.onclick = function () {
  cancelAnimationFrame(id);
};
```

当 setTimeout、setInterval 甚至是 requestAnimationFrame 在循环里面要做很长的处理时，就会出现动画时间变慢的结果，使它本该在固定时间内结束而结果却是不尽人意的延迟：

```js
function step() {
  var temp = div.offsetLeft + 2;
  div.style.left = temp + 'px';
  window.requestAnimationFrame(step);
  for (var i = 0; i < 50000; i++) {
    console.log('再牛逼的定时器也得等到我执行完才能执行');
  }
}
window.requestAnimationFrame(step);
```

动画变慢的结果其实是采用增量的方式来执行了动画，为了更精确的控制动画，更合适的方法是将动画与时间关联起来。

## 示例：匀速运动

```jsx live
class App extends React.Component {
  constructor() {
    this.state = {
      width: 90,
      height: 90,
      backgroundColor: 'red'
    };
  }
  linerMove() {
    let begin = 0;
    let steps = 10;
    let target = 300;
    let timer = null;
    timer = setInterval(() => {
      begin += steps;
      if (begin >= target) {
        begin = target;
        clearInterval(timer);
      }
      this.setState({
        marginLeft: begin
      });
    }, 100);
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.linerMove.bind(this)}>点击开始</button>
        <div id="box" style={{...this.state}} />
      </div>
    );
  }
}
```

<Hint type="warn">定时器在某些情况下也会出现降速的情况，具体参见[《定时器降速》](/docs/javascript/9.async-programming/timer#定时器降速)。因此不要指望一点误差也没有。</Hint>
