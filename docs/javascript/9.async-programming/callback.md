---
title: 回调
---

import Img from '@site/src/components/Img';

## 简介

JS 中的许多操作是**异步**的。比如，这个 `loadScript(src)` 函数：

```js
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

这个函数的作用是加载一个新的脚本，将 `<script src="…">` 将其添加到文档中。我们可以像这样使用：

```js
// 加载并执行脚本
loadScript('/my/script.js');
```

函数是**异步**调用的，因为动作不是立马（加载脚本）就能完成的，当脚本正在被加载时，下面的代码可能已经完成了执行。

```js
loadScript('/my/script.js');
// 下面的代码在加载脚本时，不会等待脚本被加载完成
// ...
```

现在，我们想 `loadScript` 函数之后的代码在脚本加载完成后，立即使用。比如以下代码：

```js
loadScript('/my/script.js'); // 脚本含有 "function foo() {…}"

foo(); // 会发现没有 foo 函数！
```

`loadScript` 函数并没有提供追踪加载完成时方法。但我们希望了解脚本何时加载完成，以使用其中的 `foo` 函数。我们将 `callback` 函数作为第二个参数添加至 `loadScript` 中，函数在脚本加载完成后执行：

```js
function loadScript(src, *!*callback*/!*) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}
```

如果现在你想从脚本中调用 `foo` 函数，我们应该在回调函数中那么写：

```js
loadScript('/my/script.js', function() {
  // 在脚本被加载后，回调才会被运行
  foo(); // 现在起作用了
  ...
});
```

这是一个可运行的真实脚本示例：

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript(
  'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js',
  script => {
    alert(`Cool, the ${script.src} is loaded`);
    alert(_); // 在加载的脚本中声明的函数
  }
);
```

以上就是“基于回调”的异步编程风格。异步执行的函数，应该提供一个在函数完成时可以立即运行的 `callback` 参数。

## 在回调中回调

如何顺序加载两个脚本：先是第一个，然后是第二个？

最明显的方法是将第二个 `loadScript` 调用放在回调中，就像这样：

```js
loadScript('/my/script.js', function (script) {
  loadScript('/my/script2.js', function (script) {
    alert(`Cool, the second script is loaded`);
  });
});
```

在外部 `loadScript` 完成时，内部回调就会被回调。

如果我们还想要一个脚本呢？

```js
loadScript('/my/script.js', function (script) {
  loadScript('/my/script2.js', function (script) {
    loadScript('/my/script3.js', function (script) {
      // ...在所有脚本被加载后继续操作
    });
  });
});
```

这样看起来貌似问题也不是很大，再考虑更为复杂的情况之前，我们先看看回调如何处理错误。

## 处理错误

上述示例中，我们并没有考虑错误因素。假如加载失败会如何？我们的回调应该可以立即对其做出响应。

这是可以跟踪错误的 `loadScript` 改进版：

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
```

成功时，调用 `callback(null, script)`，否则调用 `callback(error)`。用法：

```js
loadScript('/my/script.js', function (error, script) {
  if (error) {
    // handle error
  } else {
    // 成功加载脚本
  }
});
```

这种风格也被称为 "error-first callback" 风格。因此单个 `callback` 函数可以同时具有报告错误以及传递返回结果的作用。

## 回调金字塔

对于一两个的简单嵌套，这样的回调看起来非常好。但对于一个接一个的多个异步动作，代码就会变成这样：

```js
loadScript('1.js', function (error, script) {
  if (error) {
    handleError(error);
  } else {
    // ... (*)
    loadScript('2.js', function (error, script) {
      if (error) {
        handleError(error);
      } else {
        // ... (**)
        loadScript('3.js', function (error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...加载所有脚本后继续 (***)
          }
        });
      }
    });
  }
});
```

上述代码中：

1. 加载 `1.js`，如果没有发生错误，执行`(*)`。
2. 加载 `2.js`，如果没有发生错误，执行`(**)`。
3. 加载 `3.js`，如果没有发生错误，执行`(***)`。

如果嵌套变多，代码层次就会变深，维护难度也随之增加，尤其是如果我们在 `(*)` 和 `(**)` 处有真实的代码，比如包含更多的循环，条件语句等。那么代码将会更加难以维护，有时称为“回调地狱”或者“回调金字塔”。

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/callback-hell.svg'/>

嵌套调用的“金字塔”在每一个异步动作中都会向右增长。很快就会失去控制。因此这种编码方式并不可取。

我们可以通过为每个动作编写一个独立函数来解决这一问题，就像这样：

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...在所有脚本被加载后继续 (*)
  }
}
```

效果一样，但是没有深层的嵌套了，因为我们使每个动作都有一个独立的顶层函数。

这很有效，但代码看起来就像是一个被分裂的表格。你可能注意到了，它的可读性非常差。在阅读时，需要在块之间切换。这非常不方便，尤其是不熟悉代码的读者，他们甚至不知道该跳转到何处。

名为 `step*` 的函数都是单一使用的，他们被创建的唯一作用就是避免“回调金字塔”。没有人会在动作链之外重复使用它们。因此这里的命名空间非常杂乱。

或许还有更好的方法可以避免回调金字塔。其中一个方法是使用 "Promise"，我们将在下一章中详细描述。

## 参考资料

1. [JavaScript 编程语言：简介：回调，作者：Ilya Kantor](https://zh.javascript.info/callbacks)
