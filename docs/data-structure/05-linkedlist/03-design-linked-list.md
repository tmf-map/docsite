---
title: 设计链表
---

- 在线：[LeetCode: 707](https://leetcode.com/problems/design-linked-list/)

## 题目

设计链表的实现。你可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：`val`  和  `next`。

`val`  是当前节点的值，`next`  是指向下一个节点的指针/引用。如果要使用**双向链表**，则还需要一个属性  `prev`  以指示链表中的上一个节点。假设链表中的所有节点都是 `0-index` 的。

在链表类中实现这些功能：

- `get(index)`：获取链表中第  index  个节点的值。如果索引无效，则返回-1。
- `addAtHead(val)`：在链表的第一个元素之前添加一个值为  val  的节点。插入后，新节点将成为链表的第一个节点。
- `addAtTail(val)`：将值为  val 的节点追加到链表的最后一个元素。
- `addAtIndex(index,val)`：在链表中的第  index  个节点之前添加值为  val  的节点。如果  index  等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果 index 小于 0，则在头部插入节点。
- `deleteAtIndex(index)`：如果索引  index 有效，则删除链表中的第  index 个节点。

示例：

```js
const linkedList = new MyLinkedList();
linkedList.addAtHead(1);
linkedList.addAtTail(3);
linkedList.addAtIndex(1, 2); //链表变为1-> 2-> 3
linkedList.get(1); //返回2
linkedList.deleteAtIndex(1); //现在链表是1-> 3
linkedList.get(1); //返回3
```

## 代码实现

<Tabs defaultValue="js" values={[ {label: 'JavaScript', value: 'js'}, {label: 'Python', value: 'py'} ]}>

<TabItem value="js">

```js
var node = function (x) {
  this.val = x;
  this.next = null;
};

/**
 * Initialize your data structure here.
 */
var MyLinkedList = function () {
  this.head = null;
  this.size = 0;
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0 || index > this.size - 1) return -1;
  let cur = this.head;
  for (let i = 0; i < index; i++) {
    cur = cur.next;
  }
  return cur.val;
};

/**
 * Add a node of value val before the first element of the linked list.
 * After the insertion, the new node will be the first node of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  const newHead = new node(val);
  newHead.next = this.head;
  this.head = newHead;
  this.size++;
};

/**
 * Append a node of value val to the last element of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  const newNode = new node(val);
  if (this.head === null) {
    this.head = newNode;
  } else {
    let cur = this.head;
    while (cur.next !== null) {
      cur = cur.next;
    }
    cur.next = newNode;
  }
  this.size++;
};

/**
 * Add a node of value val before the index-th node in the linked list.
 * If index equals to the length of linked list, the node will be appended to the end of linked list.
 * If index is greater than the length, the node will not be inserted.
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index < 0 || index > this.size) {
    return;
  }
  if (index === 0) {
    this.addAtHead(val);
    return;
  }
  if (index === this.size) {
    this.addAtTail(val);
    return;
  }

  let cur = this.head;
  for (let i = 0; i < index - 1; i++) {
    cur = cur.next;
  }
  const newNode = new node(val);
  newNode.next = cur.next;
  cur.next = newNode;
  this.size++;
};

/**
 * Delete the index-th node in the linked list, if the index is valid.
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || index >= this.size) {
    return;
  }
  if (index === 0) {
    this.head = this.head.next;
    return;
  }

  let cur = this.head;
  for (let i = 0; i < index - 1; i++) {
    cur = cur.next;
  }
  cur.next = cur.next.next;

  this.size--;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
```

</TabItem>

<TabItem value="py">

```py
class ListNode:
    def __init__(self, val):
        self.val = val
        self.prev = None
        self.next = None

class MyLinkedList:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.dummy_head = ListNode(None)
        self.dummy_tail = ListNode(None)
        self.dummy_head.next = self.dummy_tail
        self.dummy_tail.prev = self.dummy_head
        self.size = 0

    def get(self, index: int) -> int:
        """
        Get the value of the index-th node in the linked list. If the index is invalid, return -1.
        """
        if index < 0 or index > self.size - 1:
            return -1
        p = self.dummy_head
        for i in range(index + 1):
            p = p.next
        return p.val

    def addAtHead(self, val: int) -> None:
        """
        Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
        """
        new_node = ListNode(val)
        new_node.next = self.dummy_head.next
        self.dummy_head.next.prev = new_node
        self.dummy_head.next = new_node
        new_node.prev = self.dummy_head
        self.size += 1

    def addAtTail(self, val: int) -> None:
        """
        Append a node of value val to the last element of the linked list.
        """
        new_node = ListNode(val)
        new_node.next = self.dummy_tail
        new_node.prev = self.dummy_tail.prev
        self.dummy_tail.prev.next = new_node
        self.dummy_tail.prev = new_node
        self.size += 1

    def addAtIndex(self, index: int, val: int) -> None:
        """
        Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
        """
        if index < 0 or index > self.size :
            return None
        p = self.dummy_head
        for i in range(index + 1):
            p = p.next
        new_node = ListNode(val)
        new_node.next = p
        new_node.prev = p.prev
        p.prev.next = new_node
        p.prev = new_node
        self.size += 1

    def deleteAtIndex(self, index: int) -> None:
        """
        Delete the index-th node in the linked list, if the index is valid.
        """
        if index < 0 or index > self.size - 1:
            return None
        p = self.dummy_head
        for i in range(index + 1):
            p = p.next
        p.prev.next = p.next
        p.next.prev = p.prev
        p.prev = None
        p.next = None
        self.size -= 1

# Your MyLinkedList object will be instantiated and called as such:
# obj = MyLinkedList()
# param_1 = obj.get(index)
# obj.addAtHead(val)
# obj.addAtTail(val)
# obj.addAtIndex(index,val)
# obj.deleteAtIndex(index)
```

</TabItem>

</Tabs>
