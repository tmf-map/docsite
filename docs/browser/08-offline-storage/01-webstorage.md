---
title: Web Storage
---

## Web Storage

Web Storage 有两种机制，分别为 sessionStorage 和 localStorage。

这两个对象，对外的方法主要有: setItem，getItem，以键值对的形式存储和读取，key 按照索引获取当前存储的 key 值，找不到时返回 null，length 属性代表当前存储的 key，value 对数

## localStorage

而 localStorage 用于**持久化的本地存储**，除非主动删除数据，否则数据是永远不会过期的。

注意 get 时候问题

## sessionStorage

sessionStorage 用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此 sessionStorage 是一种**半持久化的本地存储**（会话级别的存储);

## API

```js
// localStorgae/sessionStorage
setItem('key', value);
getItem('key');
key(i); // 获取第i对的名字
removeItem('key'); // 移除该对
clear(); // 全部删除
```
