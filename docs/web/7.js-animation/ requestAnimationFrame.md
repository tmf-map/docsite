---
id: requestAnimationFrame
title: requestAnimationFrame
sidebar_label: requestAnimationFrame
---
## requestAnimationFrame
```js
requestAnimationFrame(callback)
```

像setTimeout、setInterval一样，requestAnimationFrame是一个全局函数。调用requestAnimationFrame后，它会要求浏览器根据自己的频率进行一次Repaint。

它接收一个回调函数作为参数，在即将开始的浏览器重绘时，会调用这个函数，并会给这个函数传入调用回调函数时的时间作为参数。由于requestAnimationFrame的功效只是一次性的，所以若想达到动画效果，则必须连续不断的调用requestAnimationFrame，就像我们使用setTimeout来实现动画所做的那样。

requestAnimationFrame函数会返回一个id，可以把它作为参数传入cancelAnimationFrame函数来取消 requestAnimationFrame 的回调。跟setTimeout的clearTimeout很相似。 可以这么说，requestAnimationFrame其实就是setTimeout的性能增强版。
```
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
[codesandbox demo](https://codesandbox.io/s/jsdonghuayunsuyundong-5sxqh)
```js
class App extends React.Component {
  state = {
    width: 90,
    height: 90,
    backgroundColor: "red"
  };
  linerMove = () => {
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
        <button onClick={this.linerMove}>匀速运动</button>
        <div id="box" style={{ ...this.state }} />
      </div>
    );
  }
}
```