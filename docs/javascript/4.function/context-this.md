---
title: 上下文与this
---

## 吃肉理论

先来一句定义：上下文是指 JS **方法**所属的**对象**（即告诉该方法 this 是谁）。

别捉急这句话究竟该怎么理解，我来想一想为什么需要 this？

JS 允许在函数体内部，引用当前作用域的其他变量，顺着作用域链去查找，以吃肉为例，我的碗里有肉的时候，就不会去锅(window)里拿肉：

```js
var bowl = function () {
  var meat = 'meat in bowl';
  console.log(meat);
};

var meat = 'meat in pot';

bowl(); // 'meat in bowl'
```

人总是吃着碗里的想着锅里的，此时我还不满足，在我的碗里(作用域/执行上下文)虽然有一块肉(meat)，但我偏偏就想吃锅的肉，那怎么办呢，this 这个中介来了说，别急我有办法：

```js
var bowl = function () {
  var meat = 'meat in bowl';
  console.log(this.meat);
};

var meat = 'meat in pot';

bowl(); // 'meat in pot'
```

这就是 this 绑定中的默认绑定，此时的 this 指向 window 对象，我们来看一下：

```js
var bowl = function () {
  var meat = 'meat in bowl';
  console.log(this === window);
};

var meat = 'meat in pot';

bowl(); // true
```

这就是优先级最低的 this 默认绑定规则。那如果我想吃别人碗里的肉怎么办？那我能不能再创造一个 bowl2 的函数？可以是可以，但上下文本质上是一个对象，函数也是一个对象，但比较特殊，处理起来比较复杂，我们换一个比较简单的，直接用对象来表示 bowl，加入了 eat 函数：

```js
var myBowl = {
  meat: 'meat in my bowl',
  eat: function () {
    console.log(this.meat);
  }
};
var othersBowl = {
  meat: 'meat in others bowl',
  eat: function () {
    console.log(this.meat);
  }
};

var meat = 'meat in pot';
```

OK，碗都准备好了，下面开始吃别人碗里的肉吧，我们通过 apply/call/bind 的方式来大摇大摆地去拿别人碗里的肉：

```js
myBowl.eat(); // 'meat in my bowl'

myBowl.eat.apply(othersBowl); // 'meat in others bowl'
myBowl.eat.apply(window); // 'meat in pot'
```

上面第一种吃肉方式叫隐式绑定，后面两种都是显式绑定。至此，我们再回顾一下开头的定义，用吃肉理论去改写一下：

- 上下文是指 JS 方法所属的对象（即告诉该方法 this 是谁）
- 上下文是指去哪个碗里拿肉吃（this 就是指哪个碗）

下面我们再对每一种方式进行详细探讨。

## this 的四种绑定

this 绑定优先级：

- **new 绑定**：var bar = new foo()
- **显示绑定**：call/apply/bind 绑定： var bar = foo.call(obj2)
- **隐式绑定**：上下文对象调用：var bar = obj1.foo()
- **默认绑定**：在严格模式下绑定到 undefined，否则绑定到全局对象

:::tip

总体原则：this 的绑定规则完全取决于调用位置，但严格模式下与调用位置无关。

:::

### 默认绑定

```js
function foo() {
  console.log(this.a); // 1
}
var a = 1;
foo();
```

本例中，函数调用时应用了 this 的默认绑定，因此 this 指向全局对象。那么我们怎么知道这里应用了默认绑定呢?可以通过分析调用位置来看看 foo() 是如何调用的。如果 foo() 是**直接使用不带任何修饰的函数引用进行调用的**，那就是默认绑定。

思考以下代码：

```js
function bar() {
  var a = 2;
  function foo() {
    console.log(this.a);
  }
  foo();
}
var a = 1;
bar();
```

其实最后输出的还是 1，foo 调用的时候作用域虽然是 bar，但是其上下文 this 绑定还用的是默认绑定规则，因为 foo() 是直接使用不带任何修饰的函数引用进行调用的。再想想这就是为什么执行上下文偏向的是作用域，而上下文则是基于对象的，告诉该函数 this 是哪个对象，请注意不管该作用域有没有该变量都不影响，主要是 this 指向的上下文得有这个变量，也千万不要误解为默认模式是前面省略了 `(window.)foo()` 。

这里主要关注一下：严格模式下与调用位置无关这句话。看的是 this 的位置。严格模式全局对象将无法使用默认绑定，指向 undefined，不是 window，因为严格模式不会自动用 apply 去绑定 this 的指向。

两个例子对比看一下：

```js
// Example #1
function foo() {
  'use strict';
  console.log(this.a);
}

var a = 2;

foo(); // TypeError: this is undefined
```

```js
// Example #2
function foo() {
  console.log(this.a);
}

var a = 2;
(function () {
  'use strict';
  foo(); // 2
})();
```

### 隐式绑定

我们已经看过吃肉理论中的隐式绑定最简单的例子，下面看个稍微复杂的：

```js
function foo() {
  console.log(this.a);
}

var obj2 = {
  a: 42,
  foo: foo
};

var obj1 = {
  a: 2,
  obj2: obj2
};

obj1.obj2.foo(); // 42
```

:::caution

对象属性引用链中只有**最顶层**或者说**最后一层**会影响调用位置。

:::

#### 隐式丢失

思考下面的代码:

```js
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo
};
var a = 1;
var bar = obj.foo; // 函数别名，请注意这可不是调用时候的隐式绑定！
bar(); // 1
```

虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的 bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

记住这条十分重要的规则：不带任何修饰的函数调用，会进行默认绑定。

```js
var bar = obj.foo; // 这个不是调用
bar(); // 1, 这个调用时候进行默认绑定
obj.foo(); // 2, 显示绑定
(bar.foo = obj.foo)(); // 1, 赋值表达式 p.foo = o.f
```

这种隐式丢失的情况非常令人讨厌，我们常常会写出类似以下的代码：

```js
function foo() {
  console.log(this.a);
}
function doFoo(cb) {
  // fn 其实引用的是上面的foo函数
  cb(); // <-- 调用位置!
}
var obj = {
  a: 2,
  foo: foo
};
var a = 1;
doFoo(obj.foo); // 1
```

我们平时写代码，常常会写出 doFoo 这样的函数，参数传的是引用类型的函数，比如我调用一个可以接受回调函数的函数，内置的 setTimeout 其实就是这样碗的，直接进行默认绑定：

```js
function setTimeout(cb, delay) {
  // 等待 delay 毫秒
  cb(); // <-- 调用位置!
}
```

如果在函数内部直接调用 cb()，那么内部的 this 其实是默认绑定。给我们造成了一种“this 丢失”的情况，foo 内部的 this 就指向的是锅里而不是我自己的碗里，那如何让它指向我自己碗呢？对，就是很矫情，现在我不想吃锅里或者其他人碗里的肉了，就想老老实实先吃自己的碗里的，但还得给我用 this，那怎么做？

cb 写成箭头函数是一个办法。

### 显式绑定: call/apply/bind

都是用来改变 this 的指向，call/apply 可以改变函数的 this 指向。 除了传递参数时有所差别，**call 和 apply 作用完全一样**。

```js
var tim = {
  name: 'tim',
  age: 20,
  getName: function () {
    console.log(this.name);
    return this.name;
  }
};

var jake = {name: 'jake', age: 20};

tim.getName(); // tim

// jake对象没有getName方法，但是可以通过call/apply去使用tim对象的getName方法
tim.getName.call(jake); // jake
tim.getName.apply(jake); // jake
```

tim.getName.call(jake)的意思是执行 getName 方法，但是通过 call/apply 将 getName 方法中的 this 指向强行设置为 jake 对象。因此最终的返回结果会是 jake。

call apply 的不同之处在于传递参数的形式。其中**apply 传递的参数为数组形式, call 传递的参数为按顺序依次排列**。一个简单的实例说明。

```js
// 当参数个数不确定或者你觉得用apply比较爽时, 就直接使用apply
// 字面解释就是obj夺舍fn，obj拥有了执行fn函数的能力，并且this指向obj.
var arguments = {0: 'name', 1: 'age', 2: 'gender'};

fn.apply(obj, arguments);
fn.call(obj, name, age, gender);
```

#### apply、call、bind 比较

那么 apply、call、bind 三者相比较，之间又有什么异同呢？何时使用 apply、call，何时使用 bind 呢。简单的一个栗子：

```js
var obj = {
  x: 81
};

var foo = {
  x: 99,
  getX: function () {
    return this.x;
  }
};

foo.getX.bind(obj)(); //81
foo.getX.call(obj); //81
foo.getX.apply(obj); //81

foo.getX.bind(obj).call(foo); //81
```

三个输出的都是 81，但是注意看使用 bind() 方法的，他后面多了对括号。

也就是说，区别是，当你希望改变上下文环境之后并非立即执行，而是**回调执行**的时候，使用 bind() 方法。而 apply/call 则会立即执行函数。

再总结一下：

- apply 、 call 、bind 三者都是用来改变函数上下文(this 对象的指向)的；
- apply 、 call 、bind 三者第一个参数都是 this 要指向的对象，也就是想指定的上下文；
- apply 、 call 、bind 三者都可以利用后续参数传参，apply 是传数组，call 是挨个传；
- bind 是返回对应函数，便于稍后调用；apply、call 则是立即调用 。

call 和 apply 都是改变上下文中的 this 并立即执行这个函数，bind 方法可以让对应的函数想什么时候调就什么时候调用，并且可以将参数在执行的时候添加。为什么？请看 bind 内部实现原理：

```js
function bind(fn, context) {
  return function () {
    return fn.apply(context, arguments);
  };
}
```

在 Javascript 中，多次 bind() 是无效的。更深层次的原因， bind() 的实现，相当于使用函数在内部包了一个 call / apply ，第二次 bind() 相当于再包住第一次 bind() ,故第二次以后的 bind 是无法生效的。

### new 绑定

```js
function foo(a) {
  this.a = a;
}

var bar = new foo(2);
console.log(bar.a); // 2
```

使用 new 来调用 foo(...)时，我们会构造一个新对象并把它绑定到 foo(...)调用中的 this 上。

## 忽略 this 绑定

两个思路：

- 将 this 绑定转成默认绑定，看上去也就不生效了。
- 将 this 限制在空对象当中，看上去也就不生效了。

看了刚才的理论部分，以为都清楚了 this 的绑定来吗？我们来看一个 babel 转义后的代码：

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ZQpnBe.jpg'/>

### 转成默认绑定

如果你把 null/undefined/void 0 作为 this 的绑定对象传入 call、apply 或者 bind，这些值

在调用时会被忽略，实际应用的是默认绑定规则:

```js
function foo() {
  console.log(this.a);
}
var a = 2;
foo.call(null); // 2
```

那么什么情况下你会传入 null 呢?

一种非常常见的做法是使用 apply(..) 来“展开”一个数组，并当作参数传入一个函数。

类似地，bind(..) 可以对参数进行柯里化(预先设置一些参数)，这种方法有时非常有用:

```js
function foo(a, b) {
  console.log('a:' + a + ', b:' + b);
}

// 把数组"展开"成参数
foo.apply(null, [2, 3]); // a:2, b:3

// 使用 bind(..) 进行柯里化
var bar = foo.bind(null, 2);
bar(3); // a:2, b:3
```

这两种方法都需要传入一个参数当作 this 的绑定对象。如果函数并不关心 this 的话，你仍然需要传入一个占位值，这时 null 可能是一个不错的选择。

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/HWCCeR.jpg'/>

在 ES6 中，可以用 ... 操作符代替 apply(..) 来“展开”数组，foo(...[1,2]) 和 foo(1,2) 是一样的，这样可以避免不必要的 this 绑定。可惜，在 ES6 中没有柯里化的相关语法，因此还是需要使用 bind(..)

```js
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);
```

这种方法的副作用：虽然是表面上忽略 this 绑定，但其实是转嫁了默认绑定，如果某个函数确实使用了 this(比如第三方库中的一个函数)，那默认绑定规则会把 this 绑定到全局对象(在浏览 器中这个对象是 window)，这将导致不可预计的后果(比如修改全局对象)。这种方式可能会导致许多难以分析和追踪的 bug。

### 更安全的 this：限制在空对象中

如果我们在忽略 this 绑定时总是传入一个空对象，那就什么都不用担心了，因为任何对于 this 的使用都会被限制在这个空对象中，不会对全局对象产生任何影响。

由于这个对象完全是一个空对象，我自己喜欢用变量名 ø(这是数学中表示空集合符号的小写形式)来表示它。在大多数键盘(比如说 Mac 的 US 布局键盘)上都可以使用 ⌥ +o (Option-o)来打出这个符号。有些系统允许你为特殊符号设定快捷键。如果你不喜欢 ø 符号或者你的键盘不太容易打出这个符号，那你可以换一个喜欢的名字来称呼它。

无论你叫它什么，在 JavaScript 中创建一个空对象最简单的方法都是 Object.create(null) 。Object.create(null) 和 {} 很像，**但是并不会创建 Object.prototype 这个委托，所以它比 {}“更空”**:

```js
function foo(a, b) {
  console.log('a:' + a + ', b:' + b);
}

// 我们的空对象
var ø = Object.create(null);

// 把数组展开成参数
foo.apply(ø, [2, 3]); // a:2, b:3

// 使用 bind(..) 进行柯里化
var bar = foo.bind(ø, 2);
bar(3); // a:2, b:3
```

使用变量名 ø 不仅让函数变得更加“安全”，而且可以提高代码的可读性，因为 ø 表示 “我希望 this 是空”，这比 null 的含义更清楚。

## 箭头函数的 this

箭头函数并不是使用 function 关键字定义的，而是使用被称为“胖箭头”的操作符 => 定 义的。箭头函数不使用 this 的四种标准规则，而是根据外层(函数或者全局)作用域来决 定 this。

我们来看看箭头函数的词法作用域:

```js
function foo() {
  // 返回一个箭头函数
  return a => {
    //this 继承自 foo()
    console.log(this.a);
  };
}
var obj1 = {a: 2};
var obj2 = {a: 3};
var bar = foo.call(obj1);
bar.call(obj2); // 2, 不是 3 !
```

foo() 内部创建的箭头函数会捕获调用时 foo() 的 this。由于 foo() 的 this 绑定到 obj1， bar(引用箭头函数)的 this 也会绑定到 obj1，箭头函数的绑定无法被修改。(new 也不 行!)

箭头函数最常用于回调函数中，例如事件处理器或者定时器:

```js
function foo() {
  setTimeout(() => {
    // 这里的 this 在此法上继承自 foo()
    console.log(this.a);
  }, 100);
}
var obj = {a: 2};
foo.call(obj); // 2
```

箭头函数可以像 bind(..) 一样确保函数的 this 被绑定到指定对象，此外，其重要性还体 现在它用更常见的词法作用域取代了传统的 this 机制。实际上，在 ES6 之前我们就已经 在使用一种几乎和箭头函数完全一样的模式。

```js
function foo() {
  var self = this; // lexical capture of this
  setTimeout(function () {
    console.log(self.a);
  }, 100);
}
var obj = {a: 2};
foo.call(obj); // 2
```

虽然 self = this 和箭头函数看起来都可以取代 bind(..)，但是从本质上来说，它们想替代的是 this 机制。如果你经常编写 this 风格的代码，但是绝大部分时候都会使用 self = this 或者箭头函数来否定 this 机制，那你或许应当:

- 只使用词法作用域并完全抛弃错误 this 风格的代码;
- 完全采用 this 风格，在必要时使用 bind(..)，尽量避免使用 self = this 和箭头函数。

当然，包含这两种代码风格的程序可以正常运行，但是在同一个函数或者同一个程序中混合使用这两种风格通常会使代码更难维护，并且可能也会更难编写。
