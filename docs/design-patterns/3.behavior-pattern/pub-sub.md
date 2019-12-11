---
title: Publish–Subscribe
sidebar_label: Publish–Subscribe
---

import Hint from '../../../src/components/Hint'; import Img from '../../../src/components/Img';

## 定义

发布-订阅模式是一种消息范式，消息的发送者（发布者）不会将消息直接发送给特定的接收者（订阅者）。而是将发布的消息分为不同的类别，无需了解哪些订阅者可能存在。同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者存在。

<Hint type="tip">发布者状态更新时，发布某些类型的通知，只通知订阅了相关类型的订阅者。发布者和订阅者之间是没有直接关联的。</Hint>

<Img width="430" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/1E02E35C.jpg'/>

如上图所示，发布者与订阅者不是直接互相依赖和关联的，两者之间有一个 `Communication Infrastructure`（事件通道）。这个事件通道会处理发布者发布的不同类型的通知，并且将这些通知发送给相应的订阅者。

## 场景

以餐厅排队吃饭为例。我们去拿号时候，会分为大桌和小桌，当有空闲的小桌的时候，订阅（比如通过微信扫码订阅）小桌的人，就会收到相关的提醒，而订阅大桌的人则不会收到提醒。

另外，在 GitHub 中也可以不 watching 这个仓库，在某个感兴趣的 issue 下面进行 subscribe:

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/XXaxLS.png'/>

这样你只会收到该 issue 更新的通知，而不会收到该仓库其他 issue, PR, release 更新的通知。

## 实现

```js
function createPubSub () {
  const topics = {};  //保存订阅主题，即事件通道
  return {
    subscribe: function (type, fn) {   //订阅某类型主题
      if (!topics[type]) {
        topics[type] = [];
      }
      topics[type].push(fn); // 回调函数存储在对应的 topic 中
    },
    publish: function (type, ...args) {   //发布某类型主题
      if (!topics[type]) {
        return;
      }
      for (let fn of topics[type]) {   //通知相关主题订阅者
        fn(args);
      }
    };
  };
};
```

`topics: {'event1': [fn1, fn2, ...]}` ，订阅的时候是将回调函数存储在对应的事件通道(topic)中。

```js
const PubSub = createPubSub();

let subA = {type: 'event1'};
let subB = {type: 'event2'};
let subC = {type: 'event1'};

// 订阅者 A 订阅 topic1
PubSub.subscribe(subA.type, () =>
  console.log(`update eventType: ${subA.type} subA`),
);

// 订阅者 B 订阅 topic2
PubSub.subscribe(subB.type, () =>
  console.log(`update eventType: ${subB.type} subB`),
);

// 订阅者 C 订阅 topic1
PubSub.subscribe(subC.type, () =>
  console.log(`update eventType: ${subC.type} subC`),
);

// 发布 topic 通知，通知订阅者 A、C
PubSub.publish(subA.type);
```

```text
update eventType: topic1 subA
update eventType: topic1 subC

```

## 与观察者模式联系与区别

### 联系

- 二者都是一种消息范式
- 发布订阅模式，`publish` 函数和观察者中的 `notify` 函数是比较像的，只是前者更加注重“精准通知”。

### 区别

发布-订阅模式是借助第三方来实现调度的，发布者和订阅者之间互不感知，有中间商赚差价。

<Img width="380" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/1A8C6D00.png'/>

左边是观察者模型，右边是发布-订阅者模型。结合这个图和上文的分析，我们可以总结下这两者的区别。

- 观察者模式中，被观察者发布通知，所有观察者都会收到通知。发布-订阅模式中，发布者发布通知，只有特定类型的订阅者会收到通知。
- 观察者模式中，被观察者发出状态更新通知后，观察者调用自身内部的更新方法。发布-订阅模式中，订阅者的更新是通过事件通道进行细节处理和响应更新的（先把自己的方法放到事件通道中）。

## 参考资料

1. [观察者模式与发布订阅模式真的不同，作者：vianem](https://juejin.im/post/5cd81a20e51d453b4558d858)
2. [Microsoft: Publish/Subscribe](<https://docs.microsoft.com/en-us/previous-versions/msp-n-p/ff649664(v=pandp.10)>)
