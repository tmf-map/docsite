---
title: 立即执行函数IIFE
---

立即执行函数表达式(Immediately-Invoked Function Expression)

```js
!(function () {
  /* code */
})();
~(function () {
  /* code */
})();
-(function () {
  /* code */
})();
+(function () {
  /* code */
})();

void (function () {
  /* code */
})();

// new关键字也能达到这个效果
new (function () {
  /* code */
})();
new (function () {
  /* code */
})();
// 只有传递参数时，才需要最后那个圆括号
```

有人做过测试，使用()和 void 时，效率是最高的，所以推荐大家尽量使用这两种方式。

除了惰性和局部作用域避免污染，广告，第三方统计需求这种，也是需要自执行的。

FE 常用的功能

## 隔离作用域

防止作用域污染。ES6 之前 JS 原生又不提供块级作用域，所以只能用**函数作用域**模拟了。

```js
// IIFEs（立即执行函数） can also be used to create variables that are inaccessible from the global
// scope
const counter = (function () {
  var count = 0; // count对象只能通过counter对象里面的方法去调用，与外界隔离

  return {
    inc: function () {
      count = count + 1;
    },
    get: function () {
      console.log(count);
    }
  };
})();

counter.get();
counter.inc();
counter.get();
```

## 防止包冲突

如果我们在页面中同时引用了多个 js 文件，如果这两个文件中有相同的变量定义，那么就会被覆盖掉。试想下面的例子：

lib_a.js

```js
var num = 1;
// code....
```

lib_b.js

```js
var num = 2;
// code....
```

如果在页面中同时引用 lib_a.js 和 lib_a.js 两个库，必然导致 num 变量被覆盖，为了解决这个问题，可以通过 IIFE 来解决：

lib_a.js

```js
(function () {
  var num = 1;
  // code....
})();
```

lib_b.js

```js
(function () {
  var num = 2;
  // code....
})();
```

## 用 IIFE 写惰性载入

因为函数被执行引擎以同步的方式立即执行了，所以当你在之后的代码访问这个变量的时候可以直接返回给你计算后的筛选结果了。

我们平时写的判断因为判断条件可能会被改变，所以需要每次都进行判断；但是当我们判断的对象是一个在当前页面不会再次被改变的对象时，惰性载入的作用就显示出来了

举个栗子，一个视频播放的方法需要对不同的浏览器采取不同的对策，在 IE 中采用 flash ，而其他浏览器中不使用。由于除非换浏览器，否则是否是 IE 这个条件的值不会被改变，这样采用惰性载入，就可以在多次调用时有明显的优势。

```js
var showVideo = (function () {
  console.log('第一次调用 showVideo');

  if (isIE) {
    return function () {
      console.log('在 IE 中调用 showVideo');
    };
  } else {
    return function () {
      console.log('在 非IE 中国调用 showVideo');
    };
  }
})();
// 第一次调用 showVideo

showVideo();
// 在 非IE 中国调用 showVideo

showVideo();
// 在 非IE 中国调用 showVideo

showVideo();
// 在 非IE 中国调用 showVideo
```
