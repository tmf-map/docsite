---
title: Promise
sidebar_label: Promise
---

## 使用 promise 的原因

解决回调函数多层嵌套，让异步方法可以像同步方法那样返回值，使代码更易读。

## promise 的三种状态

- **pending**: 初始状态，既不是成功，也不是失败状态。
- **fulfilled**: 意味着操作成功完成。
- **rejected**: 意味着操作失败。

## promise 语法：

```js
new Promise( function(resolve, reject) {...} /* executor */  );
```

promise 参数 executor

executor 执行器函数包括两个参数 resolve 和 reject，`Promise构造函数执行时会立即调用exector函数（宏任务同步操作）`，resolve 和 reject 函数会被当作参数传给 exector 函数。exector 函数一般会执行一些异步函数，异步函数调用的成功和失败分别调用 resolve 函数和 reject 函数，将 promise 状态分别转为 fulfiled 和 rejected 状态。

**eg:**

```js
function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url); // 通过url建立链接
    xhr.onload = () => resolve(xhr.responseText); //接收到完整响应数据时触发
    xhr.onerror = () => reject(xhr.statusText); //请求发生错误的时候触发。
    xhr.send();
  });
}
```

> 代码中的 onload，onerror 属于 W3C 规范中进度事件.进度事件规范定义了与客户端与服务器通信相关的一系列事件，这些事件监听了通信进程中的各个关键节点，使我们能够以更细的颗粒度掌控数据传输过程中的细节。

### promise 在事件轮循的注意事项：

```js
new Promise(function (resolve, reject) {
  console.log('hello');
  resolve(24);
  console.log('world');
}).then((value) => console.log(value));
console.log('number');
/*
hello
world
number
24
*/
```

`Promise本身是同步的立即执行函数`，在执行到 resolve()的时候属于异步操作，会把参数传给.then(),并将它放到微任务异步队列里。所以当 executor 函数中执行完同步操作后，console.log('number')被放到函数调用栈，调用栈的宏观同步任务执行完后，会去微任务队列里取微任务到调用栈。

## Promise.prototype.then(onFulfilled, onRejected)

当 new Promise((resolve,reject) => resolve())的时候对应执行 then 操作，代表 Promise 的成功状态(fulfilled)。

当 Promise 变成接受状态（fulfilled）时，onFulfilled 参数作为回调函数被调用。

当 Promise 变成拒绝状态（rejected ）时，onRejected 参数作为回调函数被调用。此时等价与.catch()功能

```js
var p = new Promise((resolve, reject) => {
  resolve('foo');
});

// 'bar' 不是函数，会在内部被替换为 (x) => x
p.then('bar').then((value) => {
  console.log(value); // 'foo'
});
```

- .then()的参数如果只有一个字符串的话，此时可以忽略这个参数。
- .then(String) <=> .then((value) => value) 其中 value 代表 Promise 的返回值。

### promise.then()的注意事项：

```js
Promise.resolve()
  .then(() => {
    // 使 .then() 返回一个 rejected promise
    throw 'Oh no!';
  })
  .catch((reason) => {
    console.error('onRejected function called: ', reason);
  })
  .then(() => {
    console.log("I am always called even if the prior then's promise rejects");
  });
```

当 promise.then()返回的状态是 rejected promise 的时候这个时候会被 catch()捕获，这时候只要 catch 中不返回 rejected。此时都会执行后面的 then 操作。

### 注意 promise 和 setTimeOut()的优先级：

```js
Promise.resolve('foo')
  // 1. 接收 "foo" 并与 "bar" 拼接，并将其结果做为下一个resolve返回。
  .then(function (string) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        string += 'bar';
        resolve(string);
      }, 1);
    });
  })
  // 2. 接收 "foobar", 放入一个异步函数中处理该字符串
  // 并将其打印到控制台中, 但是不将处理后的字符串返回到下一个。
  .then(function (string) {
    setTimeout(function () {
      string += 'baz';
      console.log(string);
    }, 1);
    return string;
  })
  // 3. 打印本节中代码将如何运行的帮助消息，
  // 字符串实际上是由上一个回调函数之前的那块异步代码处理的。
  .then(function (string) {
    console.log(
      "Last Then:  oops... didn't bother to instantiate and return " +
        'a promise in the prior then so the sequence may be a bit ' +
        'surprising'
    );

    // 注意 `string` 这时不会存在 'baz'。
    // 因为这是发生在我们通过setTimeout模拟的异步函数中。
    console.log(string);
  });
```

第一个 then()方法中返回了一个新定义的 Promise 对象，等待 1ms 后返回一个 promiseValue 为 foobar 的值和 fulfiled 状态。此时执行下一个 then(),把 foobar 传给浏览器定时器 API，然后将它放入宏任务异步队列中，return string 进入函数调用栈，将值传给下一个 then(),此时将 then()中的 onFulfilled 函数放入微任务队列中，此时调用栈为空。微任务队列中只有第三个.then()的内容，将微任务队列清空，将其中的同步代码放入调用栈，打印两个 console.log()语句到控制台。最后执行宏任务队列中的 setTimeOut()的回调函数。

### promise.then()与微任务：

```js
1 new Promise(resolve => {
2    resolve();
3 }).then(() => {
4    new Promise(resolve => {
5        resolve();
6    }).then(() => {
7          console.log(777);
8      })
9      .then(() => {
10          console.log(888);
11      })
12      .then(() => {
13          console.log(999);
14      });
15    })
16  .then(() => {
17      console.log(666);
18  })
19  .then(() => {
20      console.log(555);
21  });
```

```text
777
666
888
555
999
Promise {<resolved>: undefined}
```

执行第 3 行 `then` 里面是函数，直接调用，执行里面的 `new Promise`, 将后面 6-14 行 放到微任务队列。函数执行完返回一个 `undefined` ，此时将 15 行以后放入微任务队列。

- 从队头取第 6 行 `.then`, 执行第 7 行输出 `777`， 将 9 行到 14 行放到队尾
- 此时队头是第 15 行执行输出 `666`，将 18 行以后放到队尾
- 此时执行队头是第 9 行，输出 `888`，将 12 行到 14 放入队尾
- 此时 18 行的 then 是队头，输出 `555`
- 最后执行 12-14 行输出 `999`

## Promise.prototype.catch(onRejected)

当返回一个 rejected promise 的时候，或者 throw 出一个错，此时会被 catch()捕获

```js
var p1 = new Promise(function (resolve, reject) {
  throw 'Uh-oh!';
}).catch();
// <=>
var p1 = new Promise(function (resolve, reject) {
  return Promise.reject('Uh-oh!');
}).catch();
```

### catch()的注意事项；

```js
// 在异步函数中抛出的错误不会被catch捕获到
var p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    throw 'Uncaught Exception!';
  }, 1000);
});

p2.catch(function (e) {
  console.log(e); // 不会执行
});

// 在resolve()后面抛出的错误会被忽略
var p3 = new Promise(function (resolve, reject) {
  resolve();
  throw 'Silenced Exception!';
});

p3.catch(function (e) {
  console.log(e); // 不会执行
});
```

在异步函数中抛错之所以无法被 catch 到的原因是：new Promise 是同步的立即执行函数，执行到 setTimeout 函数，将它放到宏任务异步队列中，宏任务异步队列的执行优先级最低。只有当微任务异步队列和函数调用栈队列为空时才会调用。当 setTimeout 函数执行时，外部已经没有代码可以接到它所抛出的错误。所以异步回调函数抛出的错总是因为函数调用栈为空，没有代码可以承接错误而导致无法被捕获到。

## Promise.prototype.all(iterable)

当 promise.all()内没有参数的时候，返回一个已完成状态的 promise。

如果所有传入的 promise 都变为完成状态，或者传入的可迭代对象内没有 promise，Promise.all 返回的 promise 异步地变为完成。

在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组

如果传入的 promise 中有一个失败（rejected），promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成。

### Promise.all()的注意事项

```js
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
  .then((result) => result)
  .catch((e) => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
  .then((result) => result)
  .catch((e) => e);

Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
// ["hello", Error: 报错了]
```

当 p1 执行成功状态变为 resolved，p2 执行的时候会出错跳到 catch()，执行完状态也会变为 resolved，所以 Promise.all()可以正常执行。

如果 p2 没有 catch 的化，状态还是 rejected，此时的 Promise.all()不会执行。

### Promise.all()代码实现

```js
function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (typeof promises[Symbol.iterator] !== 'function') {
      return reject(new TypeError('arguments must be iterator'));
    }
    let promiseValue = [];
    const length = promises.length;

    for (let i = 0; i < length; i++) {
      Promise.resolve(promises[i]).then(
        function (value) {
          promiseValue[i] = value;
          if (promiseValue.length === length) {
            resolve(promiseValue);
          }
        },
        function (reason) {
          reject(reason);
        }
      );
    }
  });
}
```

## Promise.prototype.race(iterable)

Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，就会返回一个解决状态或拒绝状态的 promise。简言之，以最先返回结果的 promise 的状态为准。

```js
var p3 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'three');
});
var p4 = new Promise(function (resolve, reject) {
  setTimeout(reject, 500, 'four');
});

Promise.race([p3, p4]).then(
  function (value) {
    console.log(value); // "three"
    // p3 更快，所以它完成了
  },
  function (reason) {
    // 未被调用
  }
);
```

```js
var promise1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, 'one');
});

var promise2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then(function (value) {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"
```

### promise.race 手动实现

```js
function promiseRace(promises) {
  return new Promise(function (resolve, reject) {
    if (Arr.isArray(promise)) {
      for (let item of promises) {
        Promise.resolve(item).then(
          function (value) {
            return resolve(value);
          },
          function (reason) {
            return reject(reason);
          }
        );
      }
    }
  });
}
```

## 创建已处理的 Promise

### Promise.resolve(value)

value 的值分多种情况，当 value 的值是 Promise，此时 Promise.resolve()不起作用，返回的 promise 状态和 value 的最后状态保持一致。当 value 是 thenable（带有 then 方法），返回的 promise 会“跟随”这个 thenable 的对象，采用它的最终状态。其它情况返回成功状态的 promise。

```js
Promise.resolve(value);
Promise.resolve(promise);
Promise.resolve(thenable);
```

`thenable` 函数使用第一参数函数返回一个成功状态的 promise,使用第二个参数函数返回一个失败的 promise。

```js
var p1 = Promise.resolve({
  then: function (test, rej) {
    rej('rejected!');
  }
});
console.log(p1 instanceof Promise); // true, 这是一个Promise对象

p1.then(
  function (v) {
    console.log(v);
  },
  function (e) {
    console.log(e); //rejected
  }
);
```

### Promise.reject(reason)

Promise.reject 返回一个被拒绝的 Promise 对象，参数代表被拒绝的原因。

```js
Promise.reject(reason).catch((reason) => ...);
```
