---
title: Promise
sidebar_label: Promise
---

## 使用promise的原因
解决回调函数多层嵌套，让异步方法可以像同步方法那样返回值，使代码更易读。

## promise的三种状态
pending: 初始状态，既不是成功，也不是失败状态。

fulfilled: 意味着操作成功完成。

rejected: 意味着操作失败。

## promise语法：

```js
new Promise( function(resolve, reject) {...} /* executor */  );
```
promise参数 executor

executor执行器函数包括两个参数resolve 和 reject，`Promise构造函数执行时会立即调用exector函数（宏任务同步操作）`，resolve 和 reject函数会被当作参数传给exector函数。exector函数一般会执行一些异步函数，异步函数调用的成功和失败分别调用resolve函数和reject函数，将promise状态分别转为fulfiled和rejected状态。

**eg:**
```js
function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url); // 通过url建立链接
    xhr.onload = () => resolve(xhr.responseText); //接收到完整响应数据时触发
    xhr.onerror = () => reject(xhr.statusText); //请求发生错误的时候触发。
    xhr.send();
  });
};
```

> 代码中的onload，onerror属于W3C规范中进度事件.进度事件规范定义了与客户端与服务器通信相关的一系列事件，这些事件监听了通信进程中的各个关键节点，使我们能够以更细的颗粒度掌控数据传输过程中的细节。
<!--more-->
### promise在事件轮循的注意事项：

```js
new Promise(function(resolve, reject){
    console.log('hello');
    resolve(24);
    console.log('world');
}).then(value => console.log(value));
console.log('number');
/*
hello
world
number
24
*/
```
`Promise本身是同步的立即执行函数`，在执行到resolve()的时候属于异步操作，会把参数传给.then(),并将它放到微任务异步队列里。所以当executor函数中执行完同步操作后，console.log('number')被放到函数调用栈，调用栈的宏观同步任务执行完后，会去微任务队列里取微任务到调用栈。

## Promise.prototype.then(onFulfilled, onRejected)
当new Promise((resolve,reject) => resolve())的时候对应执行then操作，代表Promise的成功状态(fulfilled)。

当Promise变成接受状态（fulfilled）时，onFulfilled参数作为回调函数被调用。

当Promise变成拒绝状态（rejected ）时，onRejected参数作为回调函数被调用。此时等价与.catch()功能


```js
var p = new Promise((resolve, reject) => {
    resolve('foo')
})

// 'bar' 不是函数，会在内部被替换为 (x) => x
p.then('bar').then((value) => {
    console.log(value) // 'foo'
})
```
.then()的参数如果只有一个字符串的话，此时可以忽略这个参数。
.then(String) <=> .then((value) => value) 其中value代表Promise的返回值。

### promise.then()的注意事项：

```js
Promise.resolve()
  .then( () => {
    // 使 .then() 返回一个 rejected promise
    throw 'Oh no!';
  })
  .catch( reason => {
    console.error( 'onRejected function called: ', reason );
  })
  .then( () => {
    console.log( "I am always called even if the prior then's promise rejects" );
  });
```
当promise.then()返回的状态是rejected promise 的时候这个时候会被catch()捕获，
这时候只要catch中不返回rejected。此时都会执行后面的then操作。

### 注意promise和setTimeOut()的优先级：
```js
Promise.resolve("foo")
  // 1. 接收 "foo" 并与 "bar" 拼接，并将其结果做为下一个resolve返回。
  .then(function(string) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        string += 'bar';
        resolve(string);
      }, 1);
    });
  })
  // 2. 接收 "foobar", 放入一个异步函数中处理该字符串
  // 并将其打印到控制台中, 但是不将处理后的字符串返回到下一个。
  .then(function(string) {
    setTimeout(function() {
      string += 'baz';
      console.log(string);
    }, 1)
    return string;
  })
  // 3. 打印本节中代码将如何运行的帮助消息，
  // 字符串实际上是由上一个回调函数之前的那块异步代码处理的。
  .then(function(string) {
    console.log("Last Then:  oops... didn't bother to instantiate and return " +
                "a promise in the prior then so the sequence may be a bit " +
                "surprising");

    // 注意 `string` 这时不会存在 'baz'。
    // 因为这是发生在我们通过setTimeout模拟的异步函数中。
    console.log(string);
});
```
第一个then()方法中返回了一个新定义的Promise对象，等待1ms后返回一个promiseValue为foobar的值和fulfiled状态。此时执行下一个then(),把foobar传给浏览器定时器API，然后将它放入宏任务异步队列中，return string进入函数调用栈，将值传给下一个then(),此时将then()中的onFulfilled函数放入微任务队列中，此时调用栈为空。微任务队列中只有第三个.then()的内容，将微任务队列清空，将其中的同步代码放入调用栈，打印两个console.log()语句到控制台。最后执行宏任务队列中的setTimeOut()的回调函数。
### promise.then()与微任务：
```js
new Promise(resolve => {
  resolve();
}).then(() => {
  new Promise(resolve => {
      resolve();
  }).then(() => {
        console.log(777);
    })
    .then(() => {
        console.log(888);
    })
    .then(() => {
        console.log(999);
    });
  }).then(() => {
      console.log(666);
  })
  .then(() => {
      console.log(555);
  });
```
执行第3行then,then里面是函数，直接调用，执行里面的 new Promise,将后面6-14行 放到微任务队列。函数执行完返回一个undefined，此时将15行以后放入微任务队列。从队头取第6行.then,执行第7行输出 777， 将9行到14行放到队尾。此时队头是第15行执行输出666，将18行以后放到队尾。此时执行队头是第9行，输出888，将12行到14放入队尾，此时18行的then是队头，输出555，最后执行12-14行输出999

## Promise.prototype.catch(onRejected)

当返回一个rejected promise的时候，或者throw出一个错，此时会被catch()捕获
```js
var p1 = new Promise(function(resolve, reject) {
  throw 'Uh-oh!';
}).catch();
<=>
var p1 = new Promise(function(resolve, reject) {
 return Promise.reject('Uh-oh!');
}).catch();
```
### catch()的注意事项；
```js
// 在异步函数中抛出的错误不会被catch捕获到
var p2 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    throw 'Uncaught Exception!';
  }, 1000);
});

p2.catch(function(e) {
  console.log(e); // 不会执行
});

// 在resolve()后面抛出的错误会被忽略
var p3 = new Promise(function(resolve, reject) {
  resolve();
  throw 'Silenced Exception!';
});

p3.catch(function(e) {
   console.log(e); // 不会执行
});


```
在异步函数中抛错之所以无法被catch到的原因是：new Promise是同步的立即执行函数，执行到setTimeout函数，将它放到宏任务异步队列中，宏任务异步队列的执行优先级最低。只有当微任务异步队列和函数调用栈队列为空时才会调用。当setTimeout函数执行时，外部已经没有代码可以接到它所抛出的错误。所以异步回调函数抛出的错总是因为函数调用栈为空，没有代码可以承接错误而导致无法被捕获到。

## Promise.prototype.all(iterable)

当promise.all()内没有参数的时候，返回一个已完成状态的promise。

如果所有传入的 promise 都变为完成状态，或者传入的可迭代对象内没有 promise，Promise.all 返回的 promise 异步地变为完成。

在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组


如果传入的 promise 中有一个失败（rejected），promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成。
### Promise.all()的注意事项
```js
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]

```
当p1执行成功状态变为resolved，p2执行的时候会出错跳到catch()，执行完状态也会变为resolved，所以Promise.all()可以正常执行。

如果p2没有catch的化，状态还是rejected，此时的Promise.all()不会执行。

Promise.all()代码实现: https://ustc-han.github.io/2019/04/22/promise.all()%E4%BB%A3%E7%A0%81%E5%AE%9E%E7%8E%B0/

## Promise.prototype.race(iterable)

Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，就会返回一个解决状态或拒绝状态的promise。简言之，以最先返回结果的promise的状态为准。

```js
var p3 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 100, "three");
});
var p4 = new Promise(function(resolve, reject) { 
    setTimeout(reject, 500, "four"); 
});

Promise.race([p3, p4]).then(function(value) {
  console.log(value); // "three"
  // p3 更快，所以它完成了
}, function(reason) {
  // 未被调用
});
```


```js
var promise1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 500, 'one');
});

var promise2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then(function(value) {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"

```
### promise.race 手动实现

```js
function promiseRace(promises) {
 return new Promise(function(resolve, reject) {
   if (Arr.isArray(promise)) {
       for (let item of promises) {
       Promise.resolve(item).then(function(value) {
          return resolve(value)
       }, function(reason) {return reject(reason)});
   }
   }
 })
}
```
## 创建已处理的Promise

### Promise.resolve(value)

value的值分多种情况，当value的值是Promise，此时Promise.resolve()不起作用，返回的promise状态和value的最后状态保持一致。当value是thenable（带有then方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态。其它情况返回成功状态的promise。

```js
Promise.resolve(value);
Promise.resolve(promise);
Promise.resolve(thenable);
```
thenable函数使用第一参数函数返回一个成功状态的promise,使用第二个参数函数返回一个失败的promise。

```js
var p1 = Promise.resolve({ 
  then: function(test, rej) { rej("rejected!"); }
});
console.log(p1 instanceof Promise) // true, 这是一个Promise对象

p1.then(function(v) {
    console.log(v); 
  }, function(e) {
    console.log(e) //rejected
})
```

### Promise.reject(reason)
Promise.reject返回一个被拒绝的Promise对象，
参数代表被拒绝的原因。

Promise.reject(reason).catch((reason) => ...);





