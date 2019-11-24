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

setTimeout()和setInterval ()主要是自身会执行动画效果，它们在里面放入function和时间参数，然后即可以设置事件，比如点击按钮开始执行动画。定时器的具体使用请参阅：[JavaScript 定时器](/docs/javascript/9.async-programming/timer)

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

动画变慢的结果其实是采用增量的方式来执行了动画，为了更精确的控制动画，更合适的方法是将动画与时间关联起来。

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

<Hint type="warning">定时器在某些情况下也会出现降速的情况，具体参见[《定时器降速》](/docs/javascript/9.async-programming/timer#定时器降速)。因此不要指望一点误差也没有。</Hint>
