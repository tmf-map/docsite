---
title: 事件系统
sidebar_label: 事件系统
---

import Hint from '../../../src/components/Hint'; import Img from '../../../src/components/Img';

## 事件系统概述

### 基础概念

JavaScript 和 HTML 之间的交互是通过事件来实现的。事件，就是文档或浏览器窗口之间发生的一些交互瞬间。可以使用侦听器（或处理程序）来监听事件，以便事情发生时执行相应的代码。

一个完整的事件系统，通常存在以下三个角色：

- 事件对象，用于储存事件的状态。
- 事件源对象，当前事件在操作的对象，如元素节点，文档对象，window 对象，XMLHttpRequest 对象等。
- 事件监听函数，当一个事件源生成一个事件对象时，它会调用相应的回调函数进行操作。

通俗点讲，事件源对象相当于”当事人“，事件监听函数相当于”监护人“，事件对象相当于”事故详情“。一个事件可以理解为，当事人出了点事，至于什么事情（被打了，还是被抢了）都记录在事故详情里，监护人根据事故详情得做出点反应（回调函数）。

### 历史

事件最早是在 IE3 和 Netscape Navigator2 中出现的，当时是作为分担服务器运算负载的一种手段。到 IE4 和 Navigator4 发布时，这两种浏览器都提供了相似但不相同的 API ，而且这些 API 并存且经历了好几个版本更新。再后来，DOM2 级规范开始尝试以一种符合逻辑的方式来标准化 DOM 事件。

<Hint type="tip">IE9、Firefox、Opera、Safari 和 Chrome 全都已经实现了”DOM2 级事件“模块的核心部分。IE8 是最后一个仍然使用其专有事件系统的主要浏览器。</Hint>

浏览器的事件系统相对比较复杂。尽管所有主要浏览器已经实现了”DOM2 级事件“，但这个规范本身并没有涵盖所有的事件类型。浏览器对象模型（BOM）也支持一些事件，这些事件与文档对象模型（DOM）事件之间的关系并不十分清晰，因为 BOM 事件长期没有规范可以遵循（HMTL5 后来给了详细说明）。随着 DOM3 级的出现，增强后的 DOM 事件 API 变的更加繁琐。使用事件有时相对简单，有时则非常复杂，难易程度会因为你的需求而不同。不过，有关事件的一些核心概念是一定要理解的。

## 事件传播

当浏览器发展到第四代时（IE4 及 Netscape Communicator4），浏览器开发团队遇到了一个很有意思的问题。如下图所示，当我们点击目标事件的时候，不仅点击了自身，也点击了自身的容器，甚至点击了整个页面。如果这些元素都绑定了点击事件，那事件的执行顺序应该是怎样的？（暂时可以忽略图中的文字性描述）

<Img width="500" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/8szjEn.jpg'/>

事件流描述的就是从页面中接受事件的顺序。但有意思的是，IE 和 Netscape 团队提出了几乎完全相反的事件流概念。IE 的事件流是事件冒泡流，而 Netscape Communicator 的事件流是事件捕获流。

### 事件冒泡流与事件捕获流

- 事件冒泡流：事件开始由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。（由内及外）
- 事件捕获流：由不太具体的节点更早接收到事件，而最具体的节点应该最后接收到事件。（由外及内）

<Img width="500" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/gZRPDL.png'/>

<Hint type="warn">所有现代浏览器都支持事件冒泡，但在具体实现中略有差别。IE5.5 及更早版本中事件冒泡会跳过 `html` 元素(从 body 直接跳到 document)。IE9、Firefox、Chrome、和 Safari 则将事件一直冒泡到 window 对象。</Hint>

<Hint type="warn">IE9、Firefox、Chrome、Opera、和 Safari 都支持事件捕获。尽管 DOM 标准要求事件应该从 document 对象开始传播，但这些浏览器都是从 window 对象开始捕获事件的。</Hint>

<Hint type="good">由于老版本浏览器不支持，很少有人使用事件捕获。建议使用事件冒泡。有特殊情况再使用捕获。</Hint>

### DOM2 级事件流

“DOM2 级事件”规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。如图所示：

<Img width="400" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/waZ1Aj.jpg'/>

- **捕获阶段**：实际目标(`<div>`元素)在捕获阶段不会接收事件，意思是事件从 `document->html->body` (1、2、3)
- **目标阶段**：事件在目标元素上发生。但事件处理被看作是冒泡阶段的一部分。
- **冒泡阶段**：从目标元素开始处理事件，一直传播到文档。也就是 `div->body->html->document` (4、5、6、7)

注意：

1. “DOM2 级事件”规范明确要求捕获阶段不会涉及实际目标的事件，但 IE9、Chrome、Firefox、Safari 和 Opera9.5 及更高版本都会在捕获阶段触发实际目标上的事件。结果，目标对象上的事件就会执行两次！
2. 并非所有的事件都会有冒泡阶段。但所有的事件都会经过捕获阶段和处于目标阶段。eg:跳过冒泡阶段的事件：获得输入焦点的 focus 事件和失去输入焦点的 blur 事件

### 典型例子

<Img width="160" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/image9.png'/>

```html
<div id="wrap">
  <div id="outer">
    <div id="inner"></div>
  </div>
</div>
```

```js
let wrap = document.getElementById('wrap');
let outer = document.getElementById('outer');
let inner = document.getElementById('inner');
```

**Q1**: wrap 块注册了事件，点击哪些 div 块会触发该事件？指出这些 div 块的 id。

```js
wrap.addEventListener(
  'click',
  function() {
    alert('wrap');
  },
  false
);
```

**A1**: wrap、outer、inner，因为最终都会冒泡到 wrap 块。

**Q2**: 将 addEventListener 函数的第 3 个参数设为 false，是让元素在冒泡阶段调用事件处理程序。设为 true，则让元素在捕获阶段调用事件处理程序。以下代码，当点击 inner 块时，事件的执行顺序是什么，即 alert 的顺序是什么？

```js
wrap.addEventListener(
  'click',
  function() {
    alert('wrap');
  },
  false
);
outer.addEventListener(
  'click',
  function() {
    alert('outer');
  },
  false
);
inner.addEventListener(
  'click',
  function() {
    alert('inner');
  },
  false
);
```

**A2**: inner -> outer -> wrap

**Q3**: DOM2 级事件流包括三个阶段：捕获阶段 => 目标阶段 => 冒泡阶段。以下代码，同一个元素既在冒泡阶段注册了事件，又在捕获阶段注册了同一事件。那么点击 inner 块时事件的执行顺序是什么，即 alert 的顺序是什么？

```js
wrap.addEventListener(
  'click',
  function() {
    alert('wrap bubbling');
  },
  false
);
outer.addEventListener(
  'click',
  function() {
    alert('outer bubbling');
  },
  false
);
inner.addEventListener(
  'click',
  function() {
    alert('inner bubbling');
  },
  false
);
wrap.addEventListener(
  'click',
  function() {
    alert('wrap capture');
  },
  true
);
outer.addEventListener(
  'click',
  function() {
    alert('outer capture');
  },
  true
);
inner.addEventListener(
  'click',
  function() {
    alert('inner capture');
  },
  true
);
```

**A3**: wrap capture、outer capture、**inner bubbling**、**inner capture**、outer bubbling、wrap bubbling

### event.stopPropagation()

如果希望事件到某个节点为止，不再传播，可以使用事件对象的 `stopPropagation` 方法。

```js
// 事件传播到 p 元素后，就不再向下传播了
p.addEventListener(
  'click',
  function(event) {
    event.stopPropagation();
  },
  true
);

// 事件冒泡到 p 元素后，就不再向上冒泡了
p.addEventListener(
  'click',
  function(event) {
    event.stopPropagation();
  },
  false
);
```

上面代码中，`stopPropagation` 方法分别在捕获阶段和冒泡阶段，阻止了事件的传播。

<Hint type="warn"> `stopPropagation` 方法只会阻止事件的传播，不会阻止该事件触发 `p` 节点的其他 click 事件的监听函数。也就是说，不是彻底取消 click 事件。</Hint>

```js
p.addEventListener('click', function(event) {
  event.stopPropagation();
  console.log(1);
});

p.addEventListener('click', function(event) {
  // 会触发
  console.log(2);
});
```

上面代码中，p 元素绑定了两个 click 事件的监听函数。stopPropagation 方法只能阻止这个事件向其他元素传播。因此，第二个监听函数会触发。输出结果会先是 1，然后是 2。

### event.stopImmediatePropagation()

如果想要彻底阻止这个事件的传播，不再触发后面所有 click 的监听函数，可以使用 `stopImmediatePropagation` 方法。

```js
p.addEventListener('click', function(event) {
  event.stopImmediatePropagation();
  console.log(1);
});

p.addEventListener('click', function(event) {
  // 不会被触发
  console.log(2);
});
```

上面代码中，`stopImmediatePropagation` 方法可以彻底阻止这个事件传播，使得后面绑定的所有 click 监听函数都不再触发。所以，只会输出 1，不会输出 2。

## 事件代理

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。

```js
var ul = document.querySelector('ul');

ul.addEventListener('click', function(event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    // some code
  }
});
```

上面代码中，click 事件的监听函数定义在 `<ul>` 节点，但是实际上，它处理的是子节点 `<li>` 的 click 事件。这样做的好处是，只要定义一个监听函数，就能处理多个子节点的事件，而不用在每个 `<li>` 节点上定义监听函数。而且以后再添加子节点，监听函数依然有效。在 React 事件系统中也应用事件代理这种方式。

## 事件监听函数

事件就是用户或浏览器自身执行的某种动作。如 `click`、`load` 和 mouseover、mousedown 等

响应某个事件的函数叫做事件监听函数。

有时候也把为事件指定处理程序的方式叫做事件监听函数，不过概念无所谓了，理解就行。按照这个说法，click 事件的事件监听函数是 onclick，load 事件的事件监听函数就是 onload。为事件指定处理程序的方式有有好几种。如下图所示：

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/uGyXlQ.jpg'/>

<Hint type="warn">由于 HTML 事件监听函数中 HTML 和 JavaScript 紧密耦合，所以已被大多程序员摒弃。</Hint>

所谓跨浏览器事件处理程序，就是把 HTML、DOM0、DOM2、IE 的事件处理程序进行封装。

### HTML 事件监听函数

某个元素支持每种事件，都可以使用一个与相应事件监听函数同名的 HTML 特性来指定。这个特性的值应该是可以执行的 JavaScript 代码。示例代码：

```html
<!-- 方法一 -->
<input type="button" value="Click Me" onclick="alert('clicked!')" />

<!-- 方法二 -->
<input type="button" value="Click Me" onclick="showMessage()" />
<script type="text/javascript">
  function showMessage() {
    alert('clicked!');
  }
</script>
```

其实事件每发生一次，就会创建一个封装着事件相关信息的函数，这个函数中有一个局部变量 event，也就是事件对象（稍后介绍）。通过 event 变量，我们就可以直接访问事件对象，而不用自己定义，也不用从函数的参数列表中读取。同时，我们也可以通过这个事件对象获取目标元素。

获取目标元素 3 种方式，示例代码如下：

```html
<!-- 方法一 IE9、Firefox、chrome、Opera、safari支持（IE8及其以下不支持） -->
<input type="button" value="Click Me" onclick="console.log(event.target)" />

<!-- 方法二  JavaScript中的this比较乱，如果不是很清楚，建议慎用-->
<input type="button" value="Click Me" onclick="console.log(this)" />
```

HTML 事件监听函数的缺点：

- **时差问题**：用户可能在 HTML 元素一出现在页面上就触发事件，此时事件监听函数有可能尚不具备执行条件。解决办法，try-catch 。
- **耦合度问题**：HTML 代码与 JavaScript 代码紧密耦合。如果要更换事件监听函数，就要改动两个地方：HTML 代码和 JavaScript 代码。

### DOM0 级事件监听函数

通过 JavaScript 指定事件监听函数，就是将一个函数赋值为一个事件监听函数属性（eg: 赋值给 onclick ）。

<Hint type="tip">以这种方式添加的事件，会在事件流的冒泡阶段被处理。</Hint>

```html
<input type="button" name="clicker" id="clicker" value="点击" />
<script type="text/javascript">
  var clicker = document.getElementById('clicker');
  clicker.onclick = function() {
    console.log('点击了！');
  };
</script>
```

- 优点：所有浏览器支持，简单，跨浏览器支持。
- 缺点：绑定事件不能累加，最后绑定的会覆盖之前的。（DOM2 级事件监听函数解决了这个问题，稍后详解）

```html
<input type="button" name="clicker" id="clicker" value="点击" />
<script type="text/javascript">
  var clicker = document.getElementById('clicker');
  clicker.onclick = function() {
    aler('第一次点击！');
  };
  clicker.onclick = function() {
    alert('第二次点击！');
  };
</script>
```

只会弹出第二次点击，而不会显示第一次的。

也可以删除通过 DOM0 级方法指定的事件监听函数，就是将事件监听函数设置为 null。设置之后，再点击就不会有任何动作发生。方法如下：

```js
clicker.onclick = null;
```

<Hint type="warn">使用 HTML 事件监听函数指定的程序，可以被 DOM0 级事件监听函数覆盖，也可以以同样方式删除。</Hint>

### DOM2 级事件监听函数

DOM2 级事件定义了两个方法，用于处理和删除指定的事件监听函数。

添加事件：

```js
target.addEventListener(type, listener[, useCapture]);
```

- target 目标元素
- type 表示监听事件类型的字符串。
- listener 事件的处理程序，listener 必须是一个实现了 EventListener 接口的对象或者函数.当所监听的事件类型触发时，会接收到一个事件通知对象（实现了 Event 接口的对象）
- useCapture Boolean 类型值，默认 false,实现事件冒泡。若设置为 true，实现事件捕获。

移除事件:

```js
target.removeEventListener(type, listener[, useCapture])
```

- target 目标元素
- type 一个字符串，表示需要移除的事件类型，如 "click"。
- listener 需要移除的 EventListener 函数（先前使用 addEventListener 方法定义的）
- useCapture 指定需要移除的 EventListener 函数是否为事件捕获。如果无此参数，默认值为 false。

DOM2 级事件监听函数的主要好处是可以添加多个事件监听函数。然后按顺序触发。

```html
<input type="button" name="btn" id="btn" value="button" />

<script type="text/javascript">
  var btn = document.getElementById('btn');

  btn.addEventListener('click', function() {
    console.log('第一个注册事件执行了！');
  });
  btn.addEventListener('click', function() {
    console.log('第二个注册事件执行了！');
  });
</script>
```

通过 `addEventListener()` 添加的事件监听函数只能使用 removeEventListener()来移除；移除时传入的参数和添加时使用的参数相同。这也意味着添加的匿名函数将无法移除。

```html
<input type="button" name="btn" id="btn" value="button" />

<script type="text/javascript">
  var btn = document.getElementById('btn');

  btn.addEventListener('click', first, false);
  btn.addEventListener(
    'click',
    function() {
      console.log('第二个注册事件执行了！');
    },
    false
  );

  //移除事件的参数与addEventListener时的参数相同 ，
  btn.removeEventListener('click', first, false);
  //如果是匿名函数，将无法移除
  btn.removeEventListener(
    'click',
    function() {
      console.log('第二个注册事件执行了！');
    },
    false
  );

  function first() {
    console.log('第一个注册事件执行了！');
  }
</script>
```

<Hint type="warn">如果同一个监听事件分别为“事件捕获”和“事件冒泡”注册了一次，一共两次，这两次事件需要分别移除。两者不会互相干扰。</Hint>

<Hint type="good">为最大限度的兼容各种浏览器，建议将事件监听函数添加到事件流的冒泡阶段，除非特殊需要才用捕获阶段。</Hint>

**Q**: 如果 HTML 事件监听函数、 DOM0 级事件监听函数和 DOM2 级事件监听函数同时存在？

**A**: HTML 事件监听函数与 DOM0 级事件监听函数不能同时存在，会覆盖。且 DOM0 级事件监听函数不能累积添加。只执行最后一个添加的事件监听函数.DOM2 级事件程序不受 HTML 事件监听函数和 DOM0 级事件监听函数的影响。遵从先添加先执行的原则，可以累积添加事件。

### this 指向

<Hint type="tip">监听函数 **内部** 的 this 指向触发事件的那个元素节点。</Hint>

```html
<button id="btn" onclick="console.log(this.id)">点击</button>
```

执行上面代码，点击后会输出 btn。其他两种监听函数的写法，this 的指向也是如此。

```js
// HTML 代码如下
// <button id="btn">点击</button>
var btn = document.getElementById('btn');

// DOM0 级事件监听函数
btn.onclick = function() {
  console.log(this.id);
};

// DOM2 级事件监听函数
btn.addEventListener(
  'click',
  function(e) {
    console.log(this.id);
  },
  false
);
```

上面两种写法，点击按钮以后也是输出 btn。

## 参考资料

1. [javaScript 事件系统详解，作者：wanglehui](https://www.cnblogs.com/zxjwlh/p/6357362.html)
2. [JavaScript 标准参考教程（alpha）：事件模型，作者：阮一峰](http://javascript.ruanyifeng.com/dom/event.html)
