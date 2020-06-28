---
id: LRU-cache
title: LRU缓存
---

import Img from '../../../src/components/Img';

- 在线：[LeetCode: 146](https://leetcode.com/problems/lru-cache/)

## 题目

运用你所掌握的数据结构，设计和实现一个 LRU(最近最少使用)缓存机制。它应该支持以下操作：获取数据 get 和写入数据 put。

获取数据 get(key)-如果关键字(key)存在于缓存中，则获取关键字的值（总是正数），否则返回-1。写入数据 put(key, value)-如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字/值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

进阶: 你是否可以在 O(1)时间复杂度内完成这两种操作？

```js
const cache = new LRUCache(2 /* 缓存容量 */);

cache.put(1, 1);
cache.put(2, 2);
cache.get(1); // 返回  1
cache.put(3, 3); // 该操作会使得关键字 2 作废
cache.get(2); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使得关键字 1 作废
cache.get(1); // 返回 -1 (未找到)
cache.get(3); // 返回  3
cache.get(4); // 返回  4
```

## 思路

分析上面的操作过程，要让 put 和 get 方法的时间复杂度为 O(1)，我们可以总结出 cache 这个数据结构必要的条件：查找快，插入快，删除快，有顺序之分。因为显然 cache 必须有顺序之分，以区分最近使用的和久未使用的数据；而且我们要在 cache 中查找键是否已存在；如果容量满了要删除最后一个数据；每次访问还要把数据插入到队头。

那么，什么数据结构同时符合上述条件呢？哈希表查找快，但是数据无固定顺序；链表有顺序之分，插入删除快，但是查找慢。所以结合一下，形成一种新的数据结构：哈希链表。

LRU 缓存算法的核心数据结构就是哈希链表，双向链表和哈希表的结合体。这个数据结构长这样：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/lru.png' alt='lru' width='600'/>

为什么需要双向链表而不是单链表？因为需要进行删除结点操作，单链表无法获取前驱结点。

基本思路：

```js
// key 映射到 Node(key, val)
HashMap<Integer, Node> map;
// Node(k1, v1) <-> Node(k2, v2)...
DoubleList cache;

int get(int key) {
    if (key 不存在) {
        return -1;
    } else {
        将数据 (key, val) 提到开头；
        return val;
    }
}

void put(int key, int val) {
    Node x = new Node(key, val);
    if (key 已存在) {
        把旧的数据删除；
        将新节点 x 插入到开头；
    } else {
        if (cache 已满) {
            删除链表的最后一个数据腾位置；
            删除 map 中映射到该数据的键；
        }
        将新节点 x 插入到开头；
        map 中新建 key 对新节点 x 的映射；
    }
}
```

## 代码实现

```js
function ListNode(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
  this.prev = null;
}

function DoubleList() {
  this.head = new ListNode('head', 'head');
  this.tail = new ListNode('tail', 'tail');
  this.head.next = this.tail;
  this.tail.prev = this.head;
  this.size = 0;
}

/**
 * 双向链表头部添加一个新结点
 * @param {ListNode} node
 *
 */
DoubleList.prototype.addFirst = function (node) {
  node.next = this.head.next;
  node.prev = this.head;
  this.head.next = node;
  node.next.prev = node;
  this.size++;
};
/**
 * 删除双向链表中的某个结点。结点一定存在
 * @param {ListNode} node
 *
 */
DoubleList.prototype.remove = function (node) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
  node.next = null;
  node.prev = null;
  this.size--;
};
/**
 * 删除双向链表最后一个结点，并返回该结点
 * @return {ListNode}
 *
 */
DoubleList.prototype.removeLast = function () {
  const last = this.tail.prev;
  this.tail.prev = last.prev;
  last.prev.next = last.next;
  last.prev = null;
  last.next = null;
  this.size--;
  return last;
};

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = {};
  this.cache = new DoubleList();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.map[key] === undefined) {
    return -1;
  }
  const val = this.map[key].value;
  // 利用put方法把该数据提前
  this.put(key, val);
  return val;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const x = new ListNode(key, value);

  if (this.map[key] !== undefined) {
    this.cache.remove(this.map[key]);
    this.cache.addFirst(x);
    this.map[key] = x;
  } else {
    if (this.cache.size === this.capacity) {
      const last = this.cache.removeLast();
      this.map[last.key] = undefined;
    }
    this.cache.addFirst(x);
    this.map[key] = x;
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```

## 复杂度

- 时间复杂度：O(1)
- 空间复杂度：O(n)

## 参考链接

1. [labuladong 的算法小抄 之 如何实现 LRU 算法，by labuladong](https://labuladong.gitbook.io/algo/gao-pin-mian-shi-xi-lie/lru-suan-fa)
