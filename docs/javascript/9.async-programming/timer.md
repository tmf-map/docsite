---
title: 定时器
sidebar_label: 定时器
---

import Img from '../../../src/components/Img'; import Hint from '../../../src/components/Hint';

有时我们并不想立即执行一个函数，而是等待特定一段时间之后再执行，目前有两种方式可以实现：

- `setTimeout` 将函数的执行推迟到一段时间之后再执行。
- `setInterval` 让函数间隔一定时间周期性执行。

这两个方法并不存在于 JavaScript 的规范中。但是大多数运行环境都有内置的定时器，而且也提供了这两个方法的实现。目前来讲，所有浏览器，包括 Node.js 都支持这两个方法。

## setTimeout

用法：

```js
let timerId = setTimeout(func|code, delay[, arg1, arg2...])
```

参数说明：

- `func|code`：想要执行的函数或代码字符串。一般传入的都是函数，介于某些历史原因，代码字符串也支持，但是不建议使用这种方式。
- `delay`：执行前的延时，以**毫秒**为单位。
- `arg1`，`arg2...`：要传入被执行函数（或代码字符串）的参数列表（IE9 以下不支持）。

在下面这个示例中，`showAlert()` 方法会在 1 秒后执行：

```jsx live
() => {
  function showAlert() {
    alert('Hello');
  }
  return <button onClick={() => setTimeout(showAlert, 1000)}>Click Me</button>;
};
```

带参数的情况：

```jsx live
() => {
  function showAlert(phrase1, phrase2) {
    alert(phrase1 + ', ' + phrase2);
  }
  return (
    <button onClick={() => setTimeout(showAlert, 1000, 'Hello', 'World')}>
      Click Me
    </button>
  );
};
```

如果第一个参数位传入的是字符串，JavaScript 会自动为其创建一个函数。

所以这么写也是可以的：

```js
setTimeout("alert('Hello')", 1000);
```

但是，毕竟这种方式并不推崇，所以建议还是用函数方式：

```js
setTimeout(() => alert('Hello'), 1000);
```

## clearTimeout

`setTimeout` 在调用时会返回一个定时器的编号（不同环境返回的不一定是正整数），接下来用 `timerId` 来取消调度。

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```

在下面代码中，我们设定了一个定时器，紧接着取消了该定时器（中途反悔了），所以最后什么也没发生：

```js
let timerId = setTimeout(() => alert('never happens'), 1000);
alert(timerId); // 定时器 id

clearTimeout(timerId);
alert(timerId); // 还是那个 id 没变（并没有因为调度被取消了而变成 null）
```

<Hint type="warning">这并不是清除定时器，而是终止其执行，有点类似 for 循环里面的 break 的作用。clearTimeout 也是类似。</Hint>

从 `alert` 的输出来看，定时器 id 在浏览器中是一串数字，然而在其他运行环境下可能是别的东西。就比如 Node.js 返回的是一个定时器对象，这个对象包含一系列方法。

这个方法没有统一的规范定义，但也无伤大雅。针对浏览器环境，定时器在 HTML5 的标准中有详细描述，详见 [WebApp APIs: Timers](https://www.w3.org/TR/html5/webappapis.html#timers)。

## setInterval

`setInterval` 方法和 `setTimeout` 的用法是相同的：

```js
let timerId = setInterval(func|code, delay[, arg1, arg2...])
```

所有参数的意义也是相同的，不过 `setTimeout` 只执行一次，`setInterval` 是每间隔一定时间周期性执行。

<Hint type="warning">setTimeout 和 setInterval 共用一个编号池。</Hint>

在同一个对象上（一个 window 或者 worker），setTimeout 或者 setInterval 在后续的调用不会重用同一个定时器编号。但是不同的对象使用独立的编号池。

## clearInterval

想要阻止后续调用，我们需要调用 `clearInterval(timerId)`。技术上，clearTimeout 和 clearInterval 可以互换。但是，为了避免混淆，不要混用取消定时函数。

下面的例子中，每间隔 2 秒就会输出一条消息。5 秒之后，输出停止：

```jsx live
() => {
  function start() {
    // 每 2 秒重复一次
    let timerId = setInterval(() => alert('tick'), 2000);
    // 5 秒之后停止
    setTimeout(() => {
      clearInterval(timerId);
      alert('stop');
    }, 5000);
  }
  return <button onClick={() => start()}>Start</button>;
};
```

Chrome 在显示 `alert/confirm/prompt` 时，内部的定时器仍旧会继续滴答。所以，在执行以上代码时，如果在一定时间内没有关掉 `alert` 弹窗，那么在你关闭弹窗后，Chrome 会立即显示下一个 `alert` 弹窗（前提是距离上一次执行超过了 2 秒）。

#### clearInterval(timerId) 和 timerId = null 区别

`clearInterval(timerId)` 清除了 timer 指向的定时器。`timerId = null` 是修改 `timerId` 的指向，使 `timerId` 这个变量不指向某个定时器，然而并没有终止这个定时器的执行，定时器依旧在运行。

```js
let timerId = setInterval(function() {
  alert();
  timerId = null;
}, 1000);
```

这段代码依然会不断运行。

## 周期性定时器

要想达到周期性调度有两种方式。

### 方式一：setInterval

```jsx live
() => {
  const [time, setTime] = useState();
  function start() {
    setInterval(() => setTime(new Date().getSeconds()), 2000);
  }
  return (
    <>
      <button onClick={() => start()}>Start</button>
      <div>{time}</div>
    </>
  );
};
```

### 方式二：递归版 setTimeout

```jsx live
() => {
  const [time, setTime] = useState();
  function start() {
    let delay = 2000;
    setTimeout(function tick() {
      // (*)
      setTime(new Date().getSeconds());
      setTimeout(tick, delay);
    }, delay);
  }
  return (
    <>
      <button onClick={() => start()}>Start</button>
      <div>{time}</div>
    </>
  );
};
```

<Hint type="warning">如果 `(*)` 没有用 `setTimeout` 的话，那么会第一次将会同步执行。</Hint>

#### 优点一：更灵活

递归版的 `setTimeout` 其实要比 `setInterval` 灵活的多，采用这种方式可以根据当前执行结果来安排下一次调用。

譬如，我们要实现一个服务，每间隔 5 秒向服务器请求数据，如果服务器过载了，那么就要降低请求频率，比如将间隔增加到 10, 20, 40 秒等：

```js
let delay = 5000;

let timerId = setTimeout(function request() {
  //...send request...

  if (request failed due to server overload) {
    // 下一次执行的间隔是当前的 2 倍
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```

如果不时有一些占用 CPU 的任务，我们可以通过衡量执行时间来安排下次调用是应该提前还是推迟。

#### 优点二：更准确

递归版 `setTimeout` 能保证每次执行间的延时都是准确的，`setInterval` 却不能够。

下面来比较两段代码，一个是用 `setInterval`：

```js
let i = 1;
setInterval(function() {
  func(i++);
}, 100);
```

另一个用递归版 `setTimeout`：

```js
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
```

对 `setInterval` 而言，内部的定时器会每间隔 100 毫秒执行一次 `func(i)`：

<Img w="470" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/setinterval-interval.svg'/>

<Hint type="warning">使用 `setInterval` 时，`func` 函数的**实际调用间隔**要比代码给出的间隔时间要短。因为 `func` 的执行时间抵消掉了一部分间隔时间。</Hint>

> 如果 `func` 的执行时间超出了 100 毫秒呢？

这时候，JavaScript 引擎会等待 `func` 执行完，然后向定时器询问是否时间已到，如果是，那么**立马**再执行一次。极端情况下，如果函数每次执行时间都超过 `delay` 设置的时间，那么每次调用之间将**毫无停顿**，比如上面介绍 setInterval 的时候举的例子，用户停顿时间超过 2s 将会没有时间间隔就立马弹出下一个 alert。

再来看递归版 `setTimeout`：

<Img w="470" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/settimeout-interval.svg'/>

<Hint type="warning">递归的 `setTimeout` 能确保固定的时间间隔（定时器降速的情况除外）。</Hint>

这是因为下一次调用是在前一次调用完成时再调度的。

<Hint type="best">尽量递归版 `setTimeout` ，它比 `setInterval` 用起来更加灵活，同时也能保证每一轮执行的最小时间间隔。</Hint>

## setTimeout(fn, 0)

还有一种特殊的用法：`setTimeout(fn, 0)`，即 0 延时调度，可以用来安排在当前代码（同步宏任务和微任务）执行完时，需要尽快执行的函数（异步宏任务）。

下面例子中，代码会先输出 "Hello"，然后紧接着输出 "World"：

```js
setTimeout(() => alert('World'), 0);

alert('Hello');
```

### 给浏览器渲染的机会

`setTimeout(fn, 0)` 可以使得进程繁忙时也能让浏览器抽身做其它事情，例如绘制进度条。

我们知道浏览器在所有脚本执行完后，才会开始“重绘（Repaint）”过程。如果运行一个非常耗时的函数，即便在这个函数中改变了文档内容，除非这个函数执行完，那么变化是不会立刻反映到页面上的。

以下是一个示例：

```html
<div id="progress"></div>

<script>
  let i = 0;
  let progress = document.getElementById('progress');

  function count() {
    for (let j = 0; j < 1e6; j++) {
      i++;
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

运行后会发现，`i` 值只在整个计数过程完成后才显示。

接下来用 `setTimeout` 对任务进行分割，这样就能在每一轮运行的间隙观察到变化了，效果要好得多：

```html
<div id="progress"></div>

<script>
  let i = 0;
  let progress = document.getElementById('progress');

  function count() {
    // 每次只完成一部分 (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e9) {
      setTimeout(count, 0);
    }
  }

  count();
</script>
```

之前在《宏任务和微任务》中也提到执行的大致流程：

```text
宏任务(同步任务) →  微任务 →  渲染 → 宏任务(异步任务)
```

这样渲染会在不断进行中，就可以观察到 `<div>` 里 `i` 值的增长过程了。

### 分割 CPU 高占用的任务

`setTimeout(fn, 0)` 将耗费 CPU 的任务分割成多块，这样脚本运行不会进入“挂起”状态。

譬如，一个语法高亮脚本（用来给示例代码着色）会占用非常大的 CPU 资源。为了给代码进行高亮显示，它首先要进行代码分析，然后创建一堆着色后的元素，再将其添加到页面文档中 —— 文本量很大时，耗费时间也会很长。有时候甚至会导致浏览器“挂起”，这种情况是显然不能接受的。

所以，我们不妨将长文本分割成几部分处理。首先处理前 100 行，然后用 `setTimeout(...,0)` 安排接下来 100 行的处理，以此类推。

为了方便理解，来考虑一个稍微简单点的例子。比如我们有个函数，从 `1` 数到 `1e9`。

运行时，会观察到 CPU 挂起，服务器端 JS 表现的尤为明显。如果在浏览器下运行，试试点击页面的其他按钮，你会发现整个 JavaScript 的执行都暂停了，除非等这段代码运行完，否则什么也做不了。

```js
let i = 0;
let start = Date.now();

function count() {
  // 执行一个耗时的任务
  for (let j = 0; j < 1e9; j++) {
    i++;
  }
  alert('Done in ' + (Date.now() - start) + 'ms');
}

count();
```

机会好的话，浏览器还会显示“the script takes too long（页面脚本执行时间过长）”这样的警告（实际上不太可能，毕竟给的数字也不是特别大）。

下面用 `setTimeout` 分割任务：

```js
let i = 0;
let start = Date.now();

function count() {
  // 先完成一部分任务(*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert('Done in ' + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count, 0); // 安排下一次任务 (**)
  }
}

count();
```

现在，浏览器的 UI 界面即使在“计数”正在进行的情况下也能正常工作了。

`(*)` 处代码是这么一步步完成任务的：

1. 第一次做：`i=1...1000000` 的计数。
2. 第二次做：`i=1000001..2000000` 的计数。
3. ...等等，其中 `while` 语句检查 `i` 是否刚好能被 `1000000` 整除。

如果任务还没完成，在代码 `(**)` 处安排下一次调用。

`count` 函数调用的间隙足以让 JavaScript 引擎“缓口气了”，浏览器趁这段时间可以对用户的操作作出回应。

<Hint type="warning">用 `setTimeout` 进行分割和没用这两种做法在速度方面平分秋色，总的计数过程所花的时间几乎没什么差别。</Hint>

为了进一步阐述，对上面做一下改进。将定时器挪到 `count()` 函数开头位置：

```js
let i = 0;
let start = Date.now();

function count() {
  // 现在将调度放在开头
  if (i < 1e9 - 1e6) {
    setTimeout(count, 0); // 安排下一次调用
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert('Done in ' + (Date.now() - start) + 'ms');
  }
}

count();
```

因为知道 `count()` 不会只执行一次，所以这一次在计数开始前就安排好下一次计数任务。

如果你自己跑一遍，会观察到这次的耗时要短上不少。

## 其它

### 定时器降速

浏览器内部的定时器会因各种原因而出现降速情况，譬如：

- CPU 过载。
- 浏览器页签切换到了后台模式。
- 笔记本电脑用的是电池供电。

<Hint type="warning">在浏览器环境下，嵌套定时器的运行频率是受限制的。根据 [HTML5 标准](https://www.w3.org/TR/html5/webappapis.html#timers)：经过 5 重嵌套之后，定时器运行间隔强制要求至少达到 4ms。</Hint>

为了省电，对于那些不处于当前窗口的页面，浏览器会将时间间隔扩大到 1000ms。另外，如果笔记本电脑处于电池供电状态，Chrome 和 IE 9 以上的版本，会将时间间隔切换到系统定时器，大约是 15.6ms。

下面用具体示例来阐述。其中 `setTimeout` 每次都在 `0ms` 后就再安排一次递归，每次调用都会在 `times` 数组中记录上一次调用的实际时间。所以，最终延时如何？下面来揭晓：

```jsx live
() => {
  const [result, setResult] = useState();
  function start() {
    let start = (curr = prev = Date.now());
    let times = [];
    let delay = 0;
    setTimeout(function tick() {
      curr = Date.now();
      times.push(curr - prev); // 保存调用时间间隔
      if (curr - start < 100) {
        prev = curr;
        setTimeout(tick, delay); // 没超过 100 毫秒则再进行调用
      } else {
        setResult(times); // // 100 毫秒之后，显示延时信息
      }
    }, delay);
  }
  return (
    <>
      <button onClick={() => start()}>Start</button>
      <div>调用时间间隔(ms): {result && result.join(',')}</div>
    </>
  );
};
```

通过 Demo 我们会发现前面 4 次的间隔都是小于 4ms 的（代码运行本身也要占用一定的时间），从第 5 次开始后面的时间间隔都不会低于 4ms。这也是因为历史原因以及很多脚本都依赖于这个机制才得以存在至今。

<Hint type="warning">所有的调度方法都不能**保证**延时的准确性，所以万不可过于依赖它的延迟精度。</Hint>

服务端 JS 就没这个限制了，而且除此之外还有其他办法来调度这种即时异步任务，例如 Node.JS 的 [process.nextTick](https://nodejs.org/api/process.html) 和 [setImmediate](https://nodejs.org/api/timers.html)。所以这个提醒也只是针对浏览器环境。

### 垃圾回收

当一个函数传入 `setInterval/setTimeout` 时，内部会为其创建一个引用，保存在定时器中。这样，即使这个函数没有被引用，也能防止垃圾回收器（GC）将其回收。

```js
setTimeout(function() {
  // 在定时器调用这个函数之前，这个函数将一直存在于内存中
}, 100);
```

对于 `setInterval`，传入的函数也是存在于内存中，直到 `clearInterval` 被调用。

这里还要提到一个副作用。如果函数引用了外部变量，那么只要这个函数还存活着，外部变量也会随之存活（闭包），这样就可能会占用多于方法自身所需要的内存。所以，如果某个函数不需要再被调度，即使是个很小的函数，最好也将其取消。

### this

由 setTimeout 调用的代码运行在与所在函数完全分离的执行环境上。这会导致，这些代码中包含的 this 关键字在严格模式和非严格模式都会指向 window (或全局)对象。

```js
var obj = {
  a: 2,
  foo: function() {
    'use strict';
    console.log(this.a);
  }
};
var a = 1;
setTimeout(obj.foo, 0); // 1
```

<Hint type="warning">在严格模式下，`setTimeout` 的回调函数里面的 this 仍然默认指向 `window` 对象， 并不是 `undefined` 。</Hint>

## 参考资料

1. [JavaScript 编程语言：调度：setTimeout 和 setInterval，作者：Ilya Kantor](https://zh.javascript.info/settimeout-setinterval)
