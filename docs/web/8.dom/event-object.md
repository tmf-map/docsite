---
title: 事件对象
sidebar_label: 事件对象
---

## Event 对象概述

事件发生以后，会产生一个事件对象，作为参数传给监听函数。浏览器原生提供一个Event对象，所有的事件都是这个对象的实例，或者说继承了Event.prototype对象。

Event对象本身就是一个构造函数，可以用来生成新的实例。

```js
event = new Event(type, options);
```

Event构造函数接受两个参数。第一个参数type是字符串，表示事件的名称；第二个参数options是一个对象，表示事件对象的配置。该对象主要有下面两个属性。

- **bubbles**：布尔值，可选，默认为false，表示事件对象是否冒泡。
- **cancelable**：布尔值，可选，默认为false，表示事件是否可以被取消，即能否用Event.preventDefault()取消这个事件。一旦事件被取消，就好像从来没有发生过，不会触发浏览器对该事件的默认行为。

```js
var ev = new Event(
  'look',
  {
    'bubbles': true,
    'cancelable': false
  }
);
document.dispatchEvent(ev);
```

上面代码新建一个look事件实例，然后使用dispatchEvent方法触发该事件。

注意，如果不是显式指定bubbles属性为true，生成的事件就只能在“捕获阶段”触发监听函数。

```js
// HTML 代码为
// <div><p>Hello</p></div>
var div = document.querySelector('div');
var p = document.querySelector('p');

function callback(event) {
  var tag = event.currentTarget.tagName;
  console.log('Tag: ' + tag); // 没有任何输出
}

div.addEventListener('click', callback, false);

var click = new Event('click');
p.dispatchEvent(click);
```

上面代码中，p元素发出一个click事件，该事件默认不会冒泡。div.addEventListener方法指定在冒泡阶段监听，因此监听函数不会触发。如果写成div.addEventListener('click', callback, true)，那么在“捕获阶段”可以监听到这个事件。

另一方面，如果这个事件在div元素上触发。

```js
div.dispatchEvent(click);
```

那么，不管div元素是在冒泡阶段监听，还是在捕获阶段监听，都会触发监听函数。因为这时div元素是事件的目标，不存在是否冒泡的问题，div元素总是会接收到事件，因此导致监听函数生效。

## Event 对象的实例属性

### Event.bubbles, Event.eventPhase

Event.bubbles属性返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性，一般用来了解 Event 实例是否可以冒泡。前面说过，除非显式声明，Event构造函数生成的事件，默认是不冒泡的。

Event.eventPhase属性返回一个整数常量，表示事件目前所处的阶段。该属性只读。

```js
var phase = event.eventPhase;
```

Event.eventPhase的返回值有四种可能：

1. 事件目前没有发生。
2. 事件目前处于捕获阶段，即处于从祖先节点向目标节点的传播过程中。
3. 事件到达目标节点，即Event.target属性指向的那个节点。
4. 事件处于冒泡阶段，即处于从目标节点向祖先节点的反向传播过程中。

### Event.cancelable, Event.cancelBubble, event.defaultPrevented

Event.cancelable属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性，一般用来了解 Event 实例的特性。

大多数浏览器的原生事件是可以取消的。比如，取消click事件，点击链接将无效。但是除非显式声明，Event构造函数生成的事件，默认是不可以取消的。

```js
var evt = new Event('foo');
evt.cancelable  // false
```

当Event.cancelable属性为true时，调用Event.preventDefault()就可以取消这个事件，阻止浏览器对该事件的默认行为。

如果事件不能取消，调用Event.preventDefault()会没有任何效果。所以使用这个方法之前，最好用Event.cancelable属性判断一下是否可以取消。

```js
function preventEvent(event) {
  if (event.cancelable) {
    event.preventDefault();
  } else {
    console.warn('This event couldn\'t be canceled.');
    console.dir(event);
  }
}
```

Event.cancelBubble属性是一个布尔值，如果设为true，相当于执行Event.stopPropagation()，可以阻止事件的传播。

Event.defaultPrevented属性返回一个布尔值，表示该事件是否调用过Event.preventDefault方法。该属性只读。

```js
if (event.defaultPrevented) {
  console.log('该事件已经取消了');
}
```

### Event.currentTarget, Event.target

Event.currentTarget属性返回事件当前所在的节点，即正在执行的监听函数所绑定的那个节点。

Event.target属性返回原始触发事件的那个节点，即事件最初发生的节点。事件传播过程中，不同节点的监听函数内部的Event.target与Event.currentTarget属性的值是不一样的，前者总是不变的，后者则是指向监听函数所在的那个节点对象。

Event.currentTarget属性返回事件当前所在的节点，即正在执行的监听函数所绑定的那个节点。

Event.target属性返回原始触发事件的那个节点，即事件最初发生的节点。事件传播过程中，不同节点的监听函数内部的Event.target与Event.currentTarget属性的值是不一样的，前者总是不变的，后者则是指向监听函数所在的那个节点对象。

```js
// HTML代码为
// <p id="para">Hello <em>World</em></p>
function hide(e) {
  console.log(this === e.currentTarget);  // 总是 true
  console.log(this === e.target);  // 有可能不是 true
  e.target.style.visibility = 'hidden';
}

para.addEventListener('click', hide, false);
```

上面代码中，如果在para节点的 `<em>` 子节点上面点击，则e.target指向 `<em>` 子节点，导致 `<em>` 子节点（即 World 部分）会不可见。如果点击 Hello 部分，则整个para都将不可见。

### Event.type

Event.type属性返回一个字符串，表示事件类型。事件的类型是在生成事件的时候。该属性只读。

```js
var evt = new Event('foo');
evt.type // "foo"
```

### Event.timeStamp

Event.timeStamp属性返回一个毫秒时间戳，表示事件发生的时间。它是相对于网页加载成功开始计算的。

```js
var evt = new Event('foo');
evt.timeStamp // 3683.6999999995896
```

它的返回值有可能是整数，也有可能是小数（高精度时间戳），取决于浏览器的设置。

### Event.isTrusted

Event.isTrusted属性返回一个布尔值，表示该事件是否由真实的用户行为产生。比如，用户点击链接会产生一个click事件，该事件是用户产生的；Event构造函数生成的事件，则是脚本产生的。

```js
var evt = new Event('foo');
evt.isTrusted // false
```

上面代码中，evt对象是脚本产生的，所以isTrusted属性返回false。

### Event.detail

Event.detail属性只有浏览器的 UI （用户界面）事件才具有。该属性返回一个数值，表示事件的某种信息。具体含义与事件类型相关。比如，对于click和dbclick事件，Event.detail是鼠标按下的次数（1表示单击，2表示双击，3表示三击）；对于鼠标滚轮事件，Event.detail是滚轮正向滚动的距离，负值就是负向滚动的距离，返回值总是3的倍数。

```js
// HTML 代码如下
// <p>Hello</p>
function giveDetails(e) {
  console.log(e.detail);
}

document.querySelector('p').onclick = giveDetails;
```

## Event 对象的实例方法

### Event.preventDefault()

Event.preventDefault方法取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法以后，就不会跳转了；再比如，按一下空格键，页面向下滚动一段距离，使用这个方法以后也不会滚动了。该方法生效的前提是，事件对象的cancelable属性为true，如果为false，调用该方法没有任何效果。

注意，该方法只是取消事件对当前元素的默认影响，不会阻止事件的传播。如果要阻止传播，可以使用stopPropagation()或stopImmediatePropagation()方法。

```js
// HTML 代码为
// <input type="checkbox" id="my-checkbox" />
var cb = document.getElementById('my-checkbox');

cb.addEventListener(
  'click',
  function (e){ e.preventDefault(); },
  false
);
```

上面代码中，浏览器的默认行为是单击会选中单选框，取消这个行为，就导致无法选中单选框。

利用这个方法，可以为文本输入框设置校验条件。如果用户的输入不符合条件，就无法将字符输入文本框。

```js
// HTML 代码为
// <input type="text" id="my-input" />
var input = document.getElementById('my-input');
input.addEventListener('keypress', checkName, false);

function checkName(e) {
  if (e.charCode < 97 || e.charCode > 122) {
    e.preventDefault();
  }
}
```

上面代码为文本框的keypress事件设定监听函数后，将只能输入小写字母，否则输入事件的默认行为（写入文本框）将被取消，导致不能向文本框输入内容。

### Event.stopPropagation()

`stopPropagation` 方法阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。

```js
function stopEvent(e) {
  e.stopPropagation();
}

el.addEventListener('click', stopEvent, false);
```

上面代码中，`click` 事件将不会进一步冒泡到 el 节点的父节点。

### Event.stopImmediatePropagation()

`Event.stopImmediatePropagation` 方法阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点。也就是说，该方法阻止事件的传播，比 `Event.stopPropagation()` 更彻底。

如果同一个节点对于同一个事件指定了多个监听函数，这些函数会根据添加的顺序依次调用。只要其中有一个监听函数调用了 `Event.stopImmediatePropagation` 方法，其他的监听函数就不会再执行了。

```js
function l1(e){
  e.stopImmediatePropagation();
}

function l2(e){
  console.log('hello world');
}

el.addEventListener('click', l1, false);
el.addEventListener('click', l2, false);
```

上面代码在 el 节点上，为 click 事件添加了两个监听函数 l1 和 l2 。由于 l1 调用了 `event.stopImmediatePropagation` 方法，所以 l2 不会被调用。

### Event.composedPath()

Event.composedPath()返回一个数组，成员是事件的最底层节点和依次冒泡经过的所有上层节点。

```js
// HTML 代码如下
// <div>
//   <p>Hello</p>
// </div>
var div = document.querySelector('div');
var p = document.querySelector('p');

div.addEventListener('click', function (e) {
  console.log(e.composedPath());
}, false);
// [p, div, body, html, document, Window]
```

上面代码中，click事件的最底层节点是p，向上依次是div、body、html、document、Window。

## CustomEvent

CustomEvent 接口用于生成自定义的事件实例。那些浏览器预定义的事件，虽然可以手动生成，但是往往不能在事件上绑定数据。如果需要在触发事件的同时，传入指定的数据，就可以使用 CustomEvent 接口生成的自定义事件对象。

浏览器原生提供CustomEvent()构造函数，用来生成 CustomEvent 事件实例。

```js
new CustomEvent(type, options)
```

CustomEvent()构造函数接受两个参数。第一个参数是字符串，表示事件的名字，这是必须的。第二个参数是事件的配置对象，这个参数是可选的。CustomEvent的配置对象除了接受 Event 事件的配置属性，只有一个自己的属性。

> detail：表示事件的附带数据，默认为null。

下面是一个例子。

```js
var event = new CustomEvent('build', { 'detail': 'hello' });

function eventHandler(e) {
  console.log(e.detail);
}

document.body.addEventListener('build', function (e) {
  console.log(e.detail);
});

document.body.dispatchEvent(event);
```

上面代码中，我们手动定义了build事件。该事件触发后，会被监听到，从而输出该事件实例的detail属性（即字符串hello）。

下面是另一个例子。

```js
var myEvent = new CustomEvent('myevent', {
  detail: {
    foo: 'bar'
  },
  bubbles: true,
  cancelable: false
});

el.addEventListener('myevent', function (event) {
  console.log('Hello ' + event.detail.foo);
});

el.dispatchEvent(myEvent);
```

上面代码也说明，CustomEvent 的事件实例，除了具有 Event 接口的实例属性，还具有detail属性。

## 参考资料

1. [事件模型，作者：阮一峰](http://javascript.ruanyifeng.com/dom/event.htm)
