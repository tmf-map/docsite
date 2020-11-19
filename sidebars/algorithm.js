module.exports = {
  '1. Analysis of Algorithms': [
    'algorithm/1.analysis-of-algorithms/asymptotic-notations',
    'algorithm/1.analysis-of-algorithms/analysis-of-loops'
  ],
  '2. 数组': [
    'algorithm/2.array/array-introduce',
    'algorithm/2.array/array-skills',
    'algorithm/2.array/search-insert-position',
    'algorithm/2.array/duplicated-number-in-array',
    'algorithm/2.array/kth-largest-element-in-an-array',
    'algorithm/2.array/inverse-pairs',
    'algorithm/2.array/3sum',
    'algorithm/2.array/rotate-matrix-lcci',
    'algorithm/2.array/diagonal-traverse',
    'algorithm/2.array/minimum-size-subarray-sum'
  ],
  '3. 栈与队列': [
    {
      type: 'category',
      label: '栈',
      items: [
        'algorithm/3.stack-queue/stack',
        'algorithm/3.stack-queue/min-stack',
        'algorithm/3.stack-queue/basic-calculator',
        'algorithm/3.stack-queue/valid-parentheses',
        'algorithm/3.stack-queue/implement-queue-using-stacks'
      ]
    },
    {
      type: 'category',
      label: '队列',
      items: [
        'algorithm/3.stack-queue/queue',
        'algorithm/3.stack-queue/circular-queue',
        'algorithm/3.stack-queue/sliding-window-max',
        'algorithm/3.stack-queue/implement-stack-using-queues'
      ]
    }
  ],
  '4. 链表': [
    'algorithm/4.linkedlist/linkedlist-1',
    'algorithm/4.linkedlist/linkedlist-2',
    'algorithm/4.linkedlist/design-linked-list',
    'algorithm/4.linkedlist/merge-two-sorted-lists',
    'algorithm/4.linkedlist/reverse-linked-list',
    'algorithm/4.linkedlist/linked-list-cycle',
    'algorithm/4.linkedlist/middle-of-the-linked-list',
    'algorithm/4.linkedlist/remove-nth-node-from-end-of-list',
    'algorithm/4.linkedlist/LRU-cache'
  ],
  '5. 二叉树': [
    'algorithm/5.binary-tree/build-tree',
    'algorithm/5.binary-tree/mirror-tree',
    'algorithm/5.binary-tree/subtree',
    'algorithm/5.binary-tree/maximum-depth-of-binary-tree',
    'algorithm/5.binary-tree/balanced-binary-tree',
    'algorithm/5.binary-tree/tree-traversal'
  ],
  '6. 图': [
    'algorithm/6.graph/graph',
    'algorithm/6.graph/bfs-dfs',
    'algorithm/6.graph/number-of-islands',
    'algorithm/6.graph/is-graph-bipartite',
    'algorithm/6.graph/find-the-town-judge'
  ],
  '8. 排序': [
    'algorithm/8.sort/sort-basic',
    {
      type: 'category',
      label: 'O(n2)',
      items: [
        'algorithm/8.sort/bubble-sort',
        'algorithm/8.sort/insertion-sort',
        'algorithm/8.sort/selection-sort'
      ]
    },
    {
      type: 'category',
      label: 'O(nlogn)',
      items: [
        'algorithm/8.sort/quick-sort',
        'algorithm/8.sort/merged-sort',
        'algorithm/8.sort/heap-sort'
      ]
    },
    {
      type: 'category',
      label: 'O(n)',
      items: ['algorithm/8.sort/bucket-sort', 'algorithm/8.sort/radix-sort']
    },
    'algorithm/8.sort/sort-summary'
  ],
  '9. 查找': [
    {
      type: 'category',
      label: '二分查找',
      items: [
        'algorithm/9.search/binary-search',
        'algorithm/9.search/binary-search-plus',
        'algorithm/9.search/sqrtx',
        'algorithm/9.search/search-in-rotated-sorted-array',
        'algorithm/9.search/number-same-as-index',
        'algorithm/9.search/number-in-sorted-array',
        'algorithm/9.search/missing-number'
      ]
    },
    {
      type: 'category',
      label: 'BST',
      items: ['algorithm/9.search/k-node-in-bst']
    },
    {
      type: 'category',
      label: '哈希表',
      items: ['algorithm/9.search/first-unique-character']
    }
  ],
  '10. 回溯法': [
    'algorithm/10.back-tracking/permutation',
    'algorithm/10.back-tracking/combination',
    'algorithm/10.back-tracking/n-queens'
  ],
  '11. 位运算': ['algorithm/11.bit-operation/single-number'],
  '12. 反转和旋转': [
    'algorithm/12.reverse/reverse-linked-list',
    'algorithm/12.reverse/rotate-string',
    'algorithm/12.reverse/reverse-integer'
  ],
  '13. 数学': ['algorithm/13.math/powx-n', 'algorithm/13.math/count-and-say']
};
