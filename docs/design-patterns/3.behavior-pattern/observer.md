---
title: Observer
---

import Img from '../../../src/components/Img';

## 定义

观察者模式就是，一个对象（被观察者）的状态发生改变时，会通知所有依赖它的对象（观察者），这两者是直接关联的。

<Img width="550" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/E1B8592B.png'/>

如图所示，当 Subject(被观察对象)状态发生变化时，会给所有的 Observers(观察者们)发送一个通知函数，观察者们接收到通知后通常会调用各自的更新函数。

## 场景

我们去餐厅吃饭的时候，经常会遇到需要排队叫号的时候。我们可以把餐厅看作 Subject(被观察者)，把拿号排队的客人看作是 Observer。当餐厅有位置的时候，餐厅会出来通知所有客人，到 100 号桌吃饭啦。这时排队的客人们都会看看自己手上的号，确定是否到自己吃饭了。

:::tip

可以把餐厅看作 Subject ，拿号排队的客人看作是 Observer 。

:::

另外，我们在使用 GitHub 的时候对某一个仓库比较感兴趣的时候可以去 watching 这个仓库，这在本质上也算是 Observer 模式的一种应用：

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/QVp3B5.png'/>

当这个仓库 PR, issue, release 有任何更新的时候都会通知你：

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/SThNzL.png'/>

## 实现

```js
function createSubject() {
  const observers = [];
  return {
    addObserver: function (ob) {
      observers.push(ob);
    },
    notify: function () {
      for (let ob of observers) {
        if (typeof ob.update === 'function') {
          ob.update(); // 所有的观察者必须要有这个函数
        }
      }
    }
  };
}
```

```js
const Subject = createSubject();

let subA = {
  update: () => {
    console.log('updateSubA');
  }
};
let subB = {
  update: () => {
    console.log('updateSubB');
  }
};

Subject.addObserver(subA); //添加观察者subA
Subject.addObserver(subB); //添加观察者subB
Subject.notify(); //通知所有观察者
```

```text
updateSubA
updateSubB
```

## 参考资料

1. [观察者模式与发布订阅模式真的不同，作者：vianem](https://juejin.im/post/5cd81a20e51d453b4558d858)
