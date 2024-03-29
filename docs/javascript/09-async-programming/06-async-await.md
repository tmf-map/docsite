---
title: async/await
---

## Introduction

async/await 建立在 Promise 上，并且与所有现有的基于 Promise 的 API 兼容。

### async 声明一个异步函数

- 自动将常规函数转换成 Promise，返回值也是一个 Promise 对象
- 只有 async 函数内部的异步操作执行完，才会执行 then 方法指定的回调函数

### await 暂停函数的执行

- await 强制其它代码等待，直到 Promise 完成并返回结果
- 只能与 Promise 一起使用，放置在 Promise 调用之前，如果不是则会被转成 Promise 对象

## 语法

1. async 函数的几种使用形式

```js
// 函数表达式
let foo = async function () {}

// 对象方法
let obj = { async foo () {} }
obj.foo().then(() => {console.log('balabala')})

// 箭头函数
let foo = async () => {}

// class 方法
class Storage {
 constructor () {
   this.cachePromise = caches.open('avatars')
 }
 async getAvatar (name) {
   let cache = await this.cachePromise
   return cache.match(`/avatars/${name}.jpg/`)
 }
}

let storage = new Storage()
storage.getAvatar('jack').then(...)
```

2. await 的使用规则：

- await 后需要的是一个 Promise 对象，如果不是则会被转成 Promise 对象。
- 如果存在一个 await 后的 Promise 转为 rejected 状态，那么整个 async 函数都会中断操作。
- 如果状态是 fulfilled，那么他的返回值则会变成 then 里面的参数，如下：

```js
async function f() {
  return await 123;
}

f().then(v => console.log(v)); // 123
```

:::tip

- 容错：由于 await 后面的 promise 运行结果可能是 rejected，最好把 await 放入 try/catch 中。
- 性能：await 后的异步操作，如果彼此没有依赖关系最好同时触发，在下面会有介绍。

:::

:::caution

await 只能在 async 函数内部使用，如果在普通函数中，会报错。

:::

async 函数可以看作多个异步操作包装成的一个 Promise 对象，而 await 命令就是内部 then 命令的语法糖。

## 异常处理

之前也谈到了 Promise 对异常处理的一些局限性，这里主要看看 await/async 对异常处理要注意的一些问题。

### 方法一：try/catch

最标准的方法是使用 try/catch 语句。在调用 await 函数时，如果出现非正常状况就会抛出异常。

```js
let result = async function () {
  try {
    let content = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('error'));
      }, 200);
    });
  } catch (exception) {
    // some codes
  }
};

result();
```

在捕捉到异常之后，在 catch 根据需要有几种方法来处理它：

#### 1. 直接处理异常

这是最常见的异常处理方式，比如当调用异步 API 返回错误的时候，将错误信息以弹框的形式显示给用户。

```js
catch (e) {
  notification.error(e.message);
}
```

#### 2. 加工一下再抛给外层函数去处理异常

如果你想让调用者（即 `result` ）来处理它，就将它抛出，这样`result()`的返回值就是一个 rejected 的 Promise，我们可以像这样：`result().then().catch()` 在外层函数的 catch 去处理异常。

我们可以先加工一下，比如包装成 Error 对象：`throw new Error(e)`，那么在控制台中显示这个错误时它将给出完整的堆栈跟踪信息。

:::tip

如果只是在 catch 中直接抛出异常：比如 `throw e`，那么就没必要去写 try/catch，因为不用 try/catch，外层函数也可以捕获异常：

```js
let result = async function () {
  let content = await new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('error'));
    }, 200);
  });
  console.log('A', content);
};

result()
  .then(res => console.log(res))
  .catch(e => console.error(e));
```

<Img w="450" align="left" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/nHwgFI.png' alt='nHwgFI'/>

:::

:::caution

如果 catch 中没有使用 return 或 throw， 那么 try/catch 之后的代码也会继续执行：

```js
let result = async function () {
  try {
    let content = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('error'));
      }, 200);
    });
  } catch (e) {
    console.log('A', e);
  }
  console.log('B');
};

result();
// A Error: error
//     at <anonymous>:5:16
// B
```

:::

但使用 try/catch 也有一些缺陷：

1. 由于 try/catch 会捕获代码块中的每个异常，所以通常不会被 promise 捕获的异常也会被捕获到。比如：

```js
class BookModel {
  fetchAll() {
    cb(); // note that `cb` is `undefined` and will result an exception
    return fetch('/books');
  }
}
try {
  bookModel.fetchAll();
} catch (e) {
  console.log(e); // This will print "cb is not defined"
}
```

运行此代码，你将会在控制台看到：

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/tuFCIH.png' alt='tuFCIH'/>

错误消息的颜色是黑色的，因为是通过 `console.log()` 输出的，而不是 JavaScript 本身。有时候这可能是致命的：如果 `BookModel` 被包含在一系列函数调用中，并且其中一个调用把错误“吞噬”掉了，那么找到这样的 `undefined` 错误将非常困难。

2. 如果是多个异步请求且每个请求的错误处理逻辑是不一样的，将他们都包裹成一个 try/catch 显然是不行的，如果为它们写多个不同的 try-catch，代码会显得很冗余。可以试试下面介绍的两种方法。

### 方法二：使用 `.catch`

```js
let result = async function () {
  let content = await new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('error'));
    }, 200);
  }).catch(e => {
    console.log(e);
  });
};

result();
```

注意：在 catch 里面不要直接将 error 返回，如果异步函数返回 resolve 正确结果时，data 是我们要的结果，如果是 reject 了，发生错误了，那么 data 是 error，这不是我们想要的，可以返回 `undefined`。

这种方法有两个小问题：

- 它是和 promise 的混合体。你仍然需要了解 promise 的工作原理才能看懂这段代码。
- 错误处理出现在普通代码逻辑之中，这样不直观。

### 方法三：让函数返回两个值

错误处理的另一种方式是受到了 Go 语言启发，它允许异步函数返回错误和结果，这样即可使 error 和 data 分为两个变量，更加明确：

```js
// 抽离成公共方法
let awaitWrap = promise => {
  return promise.then(data => [null, data]).catch(err => [err, null]);
};

let result = async function () {
  let content = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('error'));
    }, 200);
  });

  let [err, data] = await awaitWrap(content);

  console.log(err);
  console.log(data);
};

result();
```

:::tip

await 关键字可以保证异步错误被调用栈外层捕获到而不是被抛到全局。

:::

## 性能

await 语法糖明显的缺点，就是多个异步代码不经过特别优化会很容易“串行化”，想要避免这样低效的代码，又要写一些“恶心”的不太容易阅读的代码去优化它。

```js
a(() => {
  a1();
});

b(() => {
  b1();
});
```

如果写成下面的方式，虽然一定能保证功能一致，但变成了最低效的执行方式：

```js
await a();
await a1();
await b();
await b1();
```

因为翻译成回调，就变成了：

```js
a(() => {
  a1(() => {
    b(() => {
      b1();
    });
  });
});
```

然而我们发现，原始代码中，函数 b 可以与 a 同时执行，但 async/await 语法会让我们倾向于在 a1 执行完后，再执行 b。所以当我们意识到这一点，可以优化一下性能：

```js
let resA = a();
let resB = b(); // 先让a和b两个异步请求同时发送出去
await resA;
a1();
await resB;
b1(); // b1的执行依赖了a要先完成，这是不好的
```

但其实这个逻辑也无法达到回调的效果，虽然 a 与 b 同时执行了，但 b1 原本只要等待 b 执行完，现在如果 a 执行时间比 b 长，就变成了:

```js
a(() => {
  b1();
});
```

**看来只有完全隔离成两个函数：**

```js
(async () => {
  await a();
  a1();
})();

(async () => {
  await b();
  b1();
})();
```

或者利用 Promise.all:

```js
async function A() {
  await a();
  a1();
}

async function B() {
  await B();
  b1();
}

Promise.all([A(), B()]);
```

**比较常用的一个场景：同时发送多个请求都结束后才执行某个操作，且多个请求之间没有依赖关系。那就干脆就别用** async/await:

```js
Promise.all([a(), b()]).then(() => {
  a1();
  a2();
});
```

对比 async/await 版:

```js
let resA = a();
let resB = b();
await resA;
await resB;
a1();
a2();
```

回调方式这么简单的代码，换成 async/await 居然写完还要反思一下，再反推着去优化性能，这付出的代价恐怕比回调地狱还要更多。

而且大部分场景代码是非常复杂的，同步与 await 混杂在一起，想捋清楚其中的脉络，并正确优化性能往往是很困难的。但是我们为什么要自己挖坑再填坑呢？很多时候还会导致忘了填。

决定代码质量的是思维，而非框架或语法，async/await 虽好，但也要适度。

## 优点

### 优点一：更可读的串行代码

```js
fetchA()
 .then(resA => fetchB(resA))
 .then(resB => fetchC(resB))
 .then(resC => fetchD(resC))
 .then(resD => ...)
 .catch(exception => ...)
```

我们将逻辑分装在一个 async 函数里。这样我们就可以直接对 promise 使用 await 了，也就规避了写 then 回调。

```js
try {
 let resA = await fetchA();
 let resB = await fetchB(resA);
 let resC = await fetchC(resB);
 let resD = await fetchD(resC);
 ...
} catch(exception) {
 ...
}
```

这样比较看上去代码差不多，但是要注意，`.then(resA => fetchB(resA))`，then 里面的回调函数的处理逻辑可能更为复杂，**而这些代码在 await/async 代码中将会显得很“同步”**，没有那么多回调函数，也没有一层层的 then，代码顺序执行即可。

:::caution

如果将 then 的回调函数写成 async/await, 并不会单纯地按照 async/await 顺序执行，比如：

```js
fetchA()
  .then(async resA => {
    console.log('A1');
    await fetchB(resA);
    console.log('A2');
    return res;
  })
  .then(resB => {
    console.log('B');
    fetchC(resB);
  });
```

其执行顺序为 `A1 -> B -> A2`，具体原因参见 [宏任务和微任务：await 做了什么](/docs/javascript/09-async-programming/01-macro-micro-task#await-做了什么)

:::

### 优点二：调试方便

在函数入口设置断点并执行跳过 await 行之后，调试器会在 `bookModel.fetchAll()` 执行时暂停一会儿，然后移动到下一行（也就是.filter）！这比使用 promise 要容易调试得多，因为你必须在.filter 这一行设置另一个断点。

<Img width="650" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/01SLkN.png" />

### 优点三：返回值统一

以 `getBooksByAuthor` 为例：该函数通过传入 `authorId` 返回该作者写的所有书。如果用 promise 的写法可能返回一个 promise（正常情况）或 null（异常情况）。因此，调用者无法安全地调用 `.then()`。

```js
function getBooksByAuthor(authorId) {
  if (!authorId) {
    return null;
  }
  return bookModel
    .fetchAll()
    .then(books => books.filter(b => b.authorId === authorId));
}
```

而如果使用 async/await 声明，则不会出现这种情况。

```js
async function getBooksByAuthor(authorId) {
  if (!authorId) {
    return null;
  }
  const books = await bookModel.fetchAll();
  return books.filter(b => b.authorId === authorId);
}
```

使用 async/await 函数的返回值始终是一个 promise，因此调用者可以安全地调用 `getBooksByAuthor().then(…)` 或 `await getBooksByAuthor()`。
