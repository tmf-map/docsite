---
id: selection-sort
title: 选择排序
---

import Img from '../../../src/components/Img';

## 思想

选择排序会将待排序列划分为已排序区间和未排序区间，**每次会从未排序区间中找到最小的元素，将其放到已排序区间的末尾**。选择排序的过程如下图所示：

<Img w="300" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200730151711.png'/>

## 实现

```js
function selectionSort(arr) {
  const length = arr.length;
  if (length <= 1) return arr;

  for (let i = 0; i < length; i++) {
    let minValue = arr[i];
    let index = i;
    for (let j = i + 1; j < length; j++) {
      if (arr[j] <= minValue) {
        // 遍历后面的元素，找出最小的元素
        minValue = arr[j];
        index = j;
      }
    }
    arr[index] = arr[i]; // 交换元素
    arr[i] = minValue;
  }

  return arr;
}
```

## 分析

### 空间复杂度

通过上面的算法实现可以看出，该算法自己需要一个辅助空间存放 minValue，即空间复杂度为 n(1)。

### 时间复杂度

选择排序无论序列中的顺序如何，都会对未排序区域元素依次遍历，因此时间复杂度那种情况下都是 O(n^2)。

### 稳定性

选择排序是不稳定的排序算法，比如 5，8，5，2，9 这样一组数据，使用选择排序算法来排序的话，第一次找到最小元素 2，与第一个 5 交换位置，那第一个 5 和中间的 5 顺序就变了，所以就不稳定了。
