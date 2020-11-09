---
id: tree-traversal
title: 树的遍历
keywords:
  - tree
  - tree traversal
  - 树的遍历
---

在计算机科学里，`树的遍历`（也称为`树的搜索`）是图的遍历的一种，指的是按照某种规则、不重复地访问某种树的所有节点的过程。具体的访问操作可能是检查节点的值、更新节点的值等。不同的遍历方式，其访问节点的顺序是不一样的。以下虽然描述的是二叉树的遍历算法，但它们也适用于其他树形结构。

## 深度优先遍历（Depth-first traversal）

先访问根节点，后选择一子节点访问并访问该节点的子节点，持续深入后直到找到叶子节点为止，然后回溯到前一个节点，访问该节点的其他子节点，直到遍历完所有可达节点为止。可以用递归或栈的方式实现深度优先遍历。

二叉树的遍历有三种，前序遍历、中序遍历和后序遍历。其中，前、中、后序，表示的是节点与它的左右子树节点遍历打印的先后顺序。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/tree-traversal.jpg' alt='tree-traversal' width="650"/>

### 前序遍历(preorder traversal)

前序遍历是指，对于树中的任意节点来说，先打印这个节点，然后再打印它的左子树，最后打印它的右子树。

1. 递归

```js
let preorderTraversal = function (root) {
  return root
    ? [
        root.val,
        ...preorderTraversal(root.left),
        ...preorderTraversal(root.right)
      ]
    : [];
};
```

- 时间复杂度：O(n)。递归函数 T(n) = 2 \* T(n/2) + 1
- 空间复杂度：最坏情况下需要空间 O(n)，平均情况为 O(logn)

2. 迭代

```js
let preorderTraversal = function (root) {
  if (!root) return [];

  let arr = [root]; // 使用数组模拟栈，存储待处理的节点，先放右节点，后放左节点
  let result = [];
  let temp;

  while (arr.length > 0) {
    temp = arr.pop();
    result.push(temp.val);
    temp.right && arr.push(temp.right);
    temp.left && arr.push(temp.left);
  }

  return result;
};
```

- 时间复杂度：访问每个节点恰好一次，时间复杂度为 O(n)
- 空间复杂度：取决于树的结构，最坏情况存储整棵树，因此空间复杂度是 O(n)

### 中序遍历(inorder traversal)

中序遍历是指，对于树中的任意节点来说，先打印它的左子树，然后再打印它本身，最后打印它的右子树。

1. 递归

```js
let inorderTraversal = function (root) {
  return root
    ? [
        ...inorderTraversal(root.left),
        root.val,
        ...inorderTraversal(root.right)
      ]
    : [];
};
```

数据规模不大的时候更建议使用递归法

- 时间复杂度：O(n)。递归函数 T(n) = 2 \* T(n/2) + 1
- 空间复杂度：最坏情况下需要空间 O(n)，平均情况为 O(logn)

2. 迭代

```js
let inorderTraversal = function (root) {
  if (!root) {
    return [];
  }

  let result = [];
  let stack = []; // 存储待处理的节点
  let current = root;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
      //    不断把左子树push进栈中，直到叶子节点
    }
    current = stack.pop(); // 从栈的末尾取一个元素

    // 经过前面的while循环，此时栈中保存的就是所有的左节点和根节点。栈中所有的元素的左子树已经经过了处理（push进了栈中），取当前元素的val  push到结果中
    result.push(current.val);

    current = current.right; // 对当前元素的右子树重复上述过程
  }

  return result;
};
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)

### 后序遍历(postorder traversal)

后序遍历是指，对于树中的任意节点来说，先打印它的左子树，然后再打印它的右子树，最后打印这个节点本身。

1. 递归

```js
let postorderTraversal = function (root) {
  return root
    ? postorderTraversal(root.left)
        .concat(postorderTraversal(root.right))
        .concat(root.val)
    : [];
};
```

- 时间复杂度：O(n)。递归函数 T(n) = 2 \* T(n/2) + 1
- 空间复杂度：最坏情况下需要空间 O(n)，平均情况为 O(logn)

2. 迭代

```js
let postorderTraversal = function (root) {
  let result = [];
  let current;
  let stack = [root]; // 栈中存储待处理的节点
  while (stack.length) {
    current = stack.pop();
    result.unshift(current.val); // 注意此处使用unshift方法，每次都从头部插入，则插入顺序为中-右-左
    current.left && stack.push(current.left);
    current.right && stack.push(current.right);
  }
  return result;
};
```

二叉树的前序遍历是：中-左-右，而二叉树的后序遍历顺序是：左-右-中，因此可以参考前序遍历，先处理中间节点，再分别处理右、左结点。

## 广度优先遍历（Breadth-first traversal）

### 二叉树的层次遍历

```js
let levelOrder = function (root) {
  let queue = [root]; // 使用队列，先进先出
  let p = root;
  let ans = [];
  while (queue.length) {
    p = queue.shift();
    ans.push(p.val);
    p.left && queue.push(p.left);
    p.right && queue.push(p.right);
  }
  return ans;
};
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)

### N 叉树的层次遍历

```js
let levelOrder = function (root) {
  if (!root) return [];
  let ans = [];
  let queue = [root];
  let level = 0;
  while (queue.length) {
    ans[level] = [];
    let queueLen = queue.length; // 存储当前待处理队列的长度，也即当前层次待处理的结点数目
    while (queueLen) {
      let node = queue.shift();
      ans[level].push(node.val);
      node.children && queue.push(...node.children);
      queueLen--;
    }
    level++;
  }
  return ans;
};
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)

### 二叉树的垂直遍历

对位于  (X, Y)  的每个结点而言，其左右子结点分别位于  (X-1, Y-1)  和  (X+1, Y-1)。把一条垂线从  X = -infinity  移动到  X = +infinity ，每当该垂线与结点接触时，按从上到下的顺序报告结点的值（ Y  坐标递减）。如果两个结点位置相同，则首先报告的结点值较小。按  X  坐标顺序返回非空报告的列表。每个报告都有一个结点值列表。

**思路：**

- 以 X 坐标为 key，以相同 X 坐标的结点及其 Y 坐标集合而成的数组为 value，生成对象 object
- 取所有的 X 坐标并排序，对 X 坐标相同的结点，按照 Y 坐标排序，若 X 与 Y 都相同时 按 val 排序

```js
let verticalTraversal = function (root) {
  let obj = {};

  // 存储待处理的结点
  let arr = [{node: root, x: 0, y: 0}];
  while (arr.length > 0) {
    let mynode = arr.shift();
    let node = mynode.node;
    let x = mynode.x;
    let y = mynode.y;

    // 以X轴坐标为 key，对结点分组
    if (obj[x] === undefined) {
      obj[x] = [{val: node.val, y: y}];
    } else {
      obj[x].push({val: node.val, y: y});
    }

    node.left !== null && arr.push({node: node.left, x: x - 1, y: y - 1});
    node.right !== null && arr.push({node: node.right, x: x + 1, y: y - 1});
  }

  let res = [];
  // 存储 升序的 x 坐标值
  let sortedXArr = Object.keys(obj).sort((a, b) => a - b);
  for (let i = 0; i < sortedXArr.length; i++) {
    // 针对X坐标相同的结点，再根据 Y 坐标从大到小排列
    let temp = [];
    obj[sortedXArr[i]].sort(function (a, b) {
      if (b.y === a.y) return a.val - b.val;
      return b.y - a.y;
    });
    obj[sortedXArr[i]].forEach(function (x) {
      temp.push(x.val);
    });
    res.push(temp);
  }
  return res;
};
```

- 时间复杂度：O(nlogn)
- 空间复杂度：O(n)

## 参考资料

1. [数据结构与算法之美, by 王争](https://time.geekbang.org/column/intro/126)
2. [Leetcode, 144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)
3. [Leetcode, 94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)
4. [Leetcode, 145. 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)
5. [Leetcode, 102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversa/)
6. [Leetcode, 429. N 叉树的层序遍历](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/)
7. [Leetcode, 987. 二叉树的垂序遍历](https://leetcode-cn.com/problems/vertical-order-traversal-of-a-binary-tree/)
