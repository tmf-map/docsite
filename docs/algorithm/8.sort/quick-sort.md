---
id: quick-sort
title: 快速排序
---

import Img from '../../../src/components/Img';

import Math from '../../../src/components/Math';

import GifPlayer from '../../../src/components/GifPlayer';

## 思想

快速排序利用的是分治思想，在代排序列中挑选任意一个数据作为 pivot（分区点），将小于 pivot 的数据放到它的左边，将大于 pivot 的数据放到它的右边。然后再利用同样的方法分别对左边和右边的数据进行递归操作，直到区间缩小为 1，就说明所有的数据都有序了。

### 分区

快速排序算法实现的关键是分区函数（partition）的实现，可以使用双指针:

1. 双指针：left，right，取中间元素的**值**为 pivot
2. 移动 right 指针，`> pivot` 的时候向左移动，否则停止并标记当前元素
3. 移动 left 指针，`< pivot` 的时候向左移动，否则停止并标记当前元素
4. 当左右指针不指向同一个元素时:
   - 交换两个指针所指向的元素
   - 记录交换后的 pivot 的位置
   - if left < right: 重复步骤 2
5. return pivot 的位置

:::tip

使用双指针法进行分区，虽然操作起来更加的复杂，但是可以保证**分区操作**的**空间**复杂度为 O(1)。

:::

### 递归

有了 partition 函数后，我们就可以对左右两部分再次利用递归，但我们如何确定左右两部分的边界范围呢？

现在看看为什么 partition 函数需要返回 pivot 所在的位置了，这个位置 - 1 就是左部分的右边界，+ 1 就是右部分的左边界。而左部分的左边界，在函数中即 left 也一直保存在外层的函数栈中，右部分的右边界同理：

```js
function recursive(arr, left, right) {
  if (left >= right) return;
  let index = partition(arr, left, right);
  recursive(arr, left, index - 1);
  recursive(arr, index + 1, right);
  return arr;
}
```

## 演示

假设待排序列为 `7, 3, 5, 4, 6, 1, 2`，详细过程如下图所示：

<GifPlayer gif="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/quick-sort-two-pointer.2020-07-26%2013_04_24.gif" still="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/quick-sort-two-pointer.jpg" />

## 实现

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  if (nums.length <= 1) {
    return nums;
  }
  // 递归排序基数左右两边的序列
  function recursive(arr, left, right) {
    if (left >= right) return;
    let index = partition(arr, left, right);
    recursive(arr, left, index - 1);
    recursive(arr, index + 1, right);
    return arr;
  }
  // 将小于基数的数放到基数左边，大于基数的数放到基数右边，并返回基数的位置
  function partition(arr, left, right) {
    // 取第一个数为基数
    let temp = arr[left];
    while (left < right) {
      while (left < right && arr[right] >= temp) right--;
      arr[left] = arr[right];
      while (left < right && arr[left] < temp) left++;
      arr[right] = arr[left];
    }
    // 修改基数的位置
    arr[left] = temp;
    return left;
  }
  return recursive(nums, 0, nums.length - 1);
};
```

## 分析

### 空间复杂度

通过上面的算法实现可以看出，双指针法分区操作的空间复杂度为 O(1)，因为快排是使用递归操作的，递归深度为 O(logn)，所以该算法空间复杂度为 **O(logn)**。

### 时间复杂度

使用双指针法进行一次分区操作的时间复杂度为 O(n)，使用快排最好情况为当每次分区都可以均等划分时，算法运行时间递归式为 `T(n) = 2T(n/2) + O(n)`。

```
T(n) = 2*T(n/2) + n
     = 2*(2*T(n/4) + n/2) + n = 4*T(n/4) + 2*n
     = 4*(2*T(n/8) + n/4) + 2*n = 8*T(n/8) + 3*n
     = 8*(2*T(n/16) + n/8) + 3*n = 16*T(n/16) + 4*n
     ......
     = 2^k * T(n/2^k) + k * n
     ......
```

当 n/2^k 的值为 1 的时候，<Math code="k = log_{2}n" />，此时时间复杂度为 **O(nlogn)**。

使用快排最坏的情况为当每次分区被划分为 n-1 和 0 个元素时，此时时间复杂度的算法为 `T(n) = T(n-1) + T(0) + O(n)`，此时时间复杂度退化为 O(n^2)。

### 稳定性

快排是一个**不稳定**的算法，例如这组数据 4，8，7，2，3，5，9，2，在经过第一次分区操作之后，两个 2 的相对先后顺序就会改变。

## 优化

快速排序为了让分区变得更加的均匀，常见的优化方案有**三数取中法**和**随机法**。

### 三数取中法

我们从区间的首、尾、中间，分别取出一个数，然后对比大小，取这 3 个数的中间值作为分区点。这样每间隔某个固定的长度，取数据出来比较，将中间值作为分区点的分区算法，肯定要比单纯取某一个数据更好。但是，如果要排序的数组比较大，那“三数取中”可能就不够了，可能要“五数取中”或者“十数取中”。

**算法实现:**

```js
function getMid(arr, left, mid, right) {
  if (arr[left] >= arr[mid]) {
    if (arr[mid] >= arr[right]) {
      return mid;
    } else if (arr[left] >= arr[right]) {
      return right;
    }
    return left;
  }
  // arr[left] < arr[mid]
  if (arr[right] >= arr[mid]) {
    return mid;
  } else if (arr[left] >= arr[right]) {
    return left;
  }
  return right;
}

function quickSort(arr, left, right) {
  if (i >= j) return; // 递归终止条件
  let mid = left + ((right - left) >> 1);
  mid = getMid(arr, left, mid, right); // 获取中间数
  if (mid != left) {
    // 中间大小的数如果不是最左边的元素时，交换
    [arr[mid], arr[left]] = [arr[left], arr[mid]];
  }
  const pivot = arr[left]; // 设置第一个元素为pivot
  let i = left,
    j = right; // 设置左右指针

  while (i < j) {
    while (arr[j] >= pivot && i < j) {
      // 遇到小于pivot的时候停止
      j--;
    }
    while (arr[i] <= pivot && i < j) {
      // 遇到大于pivot的时候停止
      i++;
    }
    [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换两个元素
  }
  [arr[i], arr[left]] = [arr[left], arr[i]]; // 交换pivot和i指针所指向的元素

  // 递归分区
  quickSort(arr, left, i - 1);
  quickSort(arr, i + 1, right);
}

quickSort(arr, 0, arr.length - 1);
```

### 随机法

随机法就是每次从要排序的区间中，随机选择一个元素作为分区点。这种方法并不能保证每次分区点都选的比较好，但是从概率的角度来看，也不大可能会出现每次分区点都选的很差的情况，所以平均情况下，这样选的分区点是比较好的。时间复杂度退化为最糟糕的 O(n^2) 的情况，出现的可能性不大。

**算法实现:**

```js
function randQuickSort(arr, left, right) {
  if (i >= j) return; // 递归终止条件
  const pindex = ~~(Math.random() * (right - left)) + left;
  if (pindex != left) {
    // 随机取到的数如果不是最左边的元素时，交换
    [arr[pindex], arr[left]] = [arr[left], arr[pindex]];
  }
  const pivot = arr[left]; // 设置第一个元素为pivot
  //...
}
```
