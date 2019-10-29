---
title: 发布-订阅模式
sidebar_label: 发布-订阅模式
---

import Hint from '../../../src/components/Hint'
import Img from '../../../src/components/Img'

## 定义

发布-订阅模是一种消息范式，消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。而是将发布的消息分为不同的类别，无需了解哪些订阅者（如果有的话）可能存在。同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者（如果有的话）存在。

<Hint type="tip">发布者状态更新时，发布某些类型的通知，只通知订阅了相关类型的订阅者。发布者和订阅者之间是没有直接关联的。</Hint>

<Img width="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/1E02E35C.jpg'/>

如上图所示，发布者与订阅者直接不是互相依赖和关联的，两者之间有一个通信设施（事件通道）。这个事件通道会处理发布者发布的不同类型的通知，并且将这些通知发送给相应的订阅者。

## 举一个栗子

以餐厅排队吃饭为例。我们拿了号后，不再傻傻地在餐厅门口等待。我们微信扫了一下排队二维码，我们在排队的过程中就可以去干其他事情了，因为到我们的号时，微信（中间代理人，事件通道，通信设施）会发送一个通知给我们。

```js
const PubSub = (() => {
    const topics = {};  //保存订阅主题
    const subscribe = (type, fn) => {   //订阅某类型主题
        if (!topics[type]) {
            topics[type] = [];
        }
        topics[type].push(fn);
    };
    const publish = (type, ...args) => {    //发布某类型主题
        if (!topics[type]) {
            return;
        }
        for (let fn of topics[type]) {      //通知相关主题订阅者
            fn(args);
        }
    };
    return {subscribe, publish};
})();
let subA = {type: 'event1'};
let subB = {type: 'event2'};
let subC = {type: 'event1'};
PubSub.subscribe(subA.type, () => console.log(`update eventType: ${subA.type} subA`));   //订阅者A订阅topic1
PubSub.subscribe(subB.type, () => console.log(`update eventType: ${subB.type} subB`));   //订阅者B订阅topic2
PubSub.subscribe(subC.type, () => console.log(`update eventType: ${subC.type} subC`));   //订阅者C订阅topic1
PubSub.publish(subA.type);  //发布topic通知，通知订阅者A、C
```

## 与观察者模式联系与区别

### 联系

广义上来说，观察者模式和发布-订阅模式，都是一个对象的状态发生变化，通知相关联的对象。所以广义上来说，这两种模式是相似的，正如《Head First设计模式》所说:

> 发布 + 订阅 = 观察者模式

### 区别

发布-订阅模式是借助第三方来实现调度的，发布者和订阅者之间互不感知，有中间商赚差价。

<Img width="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/1A8C6D00.png'/>

左边是观察者模型，右边是发布-订阅者模型。结合这个图和上文的分析，我们可以总结下这两者的区别。

- 观察者模式中，被观察者（可理解为发布者）与观察者（可理解为订阅者），这两者之间是直接关联、互相依赖的。而发布-订阅模式中，发布者与订阅者是不直接关联的，它们之间多了一个事件通道（微信通知），通过这个事件通道把发布者和订阅者关联起来。
- 观察者模式中，被观察者发布通知，所有观察者都会收到通知。发布-订阅模式中，发布者发布通知，只有特定类型的订阅者会收到通知。
- 观察者模式中，被观察者发出状态更新通知后，观察者调用自身内部的更新方法。发布-订阅模式中，订阅者的更新是通过事件通道进行细节处理和响应更新的（先把自己的方法放到事件通道中）。

## 参考资料

1. [观察者模式与发布订阅模式真的不同，作者：vianem](https://juejin.im/post/5cd81a20e51d453b4558d858)
2. [Microsoft: Publish/Subscribe](https://docs.microsoft.com/en-us/previous-versions/msp-n-p/ff649664(v=pandp.10))
