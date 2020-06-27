---
id: sort-basic
title: 排序基础
---

import Img from '../../../src/components/Img';

## overview

在之前学习排序算法的过程中，我们一般会将排序算法分为不同的种类来学习，比如插入类排序、选择类排序等等。但是在实际使用算法时，我们其实并不需要对算法属于哪一个种类关注太多，而更需要关注的是排序的时间复杂度、空间复杂度和排序的稳定性，从而根据业务场景选择适当的算法。本文也将以时间复杂度为纬度，来对常用的算法进行划分，对不同种类的算法进行比较。

## 有序度和满序度

对长度为 n 的待排序列进行排序时，n 个数据会有 n!种排列方式。不同的排列方式，排序需要的时间肯定是不一样的。为了更好的计算算法的时间复杂度，我们可以结合“有序度”和“逆序度”这两个概念来进行分析。

**有序度**是数组中具有有序关系的元素对的个数，有序元素对用数学表达式表示就是这样：

> 有序元素对：a[i] <= a[j], 如果 i < j。

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200621210920.png'/>

当一个序列完全有序的时候，那么这个序列的有序度叫作**满有序度**。满有序度的数学表达式如下所示：

> 满有序度 = n \* (n-1) / 2

**逆序度** = 满有序度 - 有序度。上图中的有序度为 11，对应的逆序度为 4。

我们排序的过程就是一种增加有序度，减少逆序度的过程，最后达到满有序度，就说明排序完成了。

## O(n^2)

时间复杂度为 O(n^2)的排序算法为冒泡排序、直接插入排序和选择类排序。

### Bubble Sort

算法思想： 冒泡排序每次冒泡操作都会对相邻的两个元素进行比较，如果相邻元素左侧较大，则交换两个元素，一趟冒泡排序最大的元素会被放到最后。在这个过程中，大的元素会像石头一样沉入水底，而小的元素就像是气泡一样向上浮动，所以这个排序被形象的称为冒泡排序。

下面使用一个例子，来演示下冒泡排序的整个过程。首先设定一组待排序数据 4，5，6，3，2，1。并将其从小到大进行排序。第一次冒泡操作的详细过程如下图所示：

<Img w="500"  origin="https://time.geekbang.org/column/article/41802?utm_source=pinpaizhuanqu&utm_medium=geektime&utm_campaign=guanwang&utm_term=guanwang&utm_content=0511" legend="一趟冒泡操作" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200621170312.png'/>

通过上图可以看出，经过一趟冒泡操作，待排数据中最大的值被放到了正确的位置上。要想完成所有数据的排序，我们只要进行 6 次这样的冒泡操作就行了。

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200621171538.png'/>

#### 算法实现

冒泡排序需要内外两层循环，其中外层循环用于代表冒泡次数，内层循环用来比较相邻两个元素，当左侧元素小于右侧元素时进行交换。**当某次冒泡操作已经没有数据交换时，说明已经达到完全有序，不用再继续执行后续的冒泡操作**。

具体的实现如下所示：

```js
// 相邻两个元素交换
function swap(arr, a, b) {
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

function bubble(arr) {
  const length = arr.length;
  if (length <= 1) return arr;

  for (let i = 0; i < length; i++) {
    let flag = false; // 设置标志位，当为false表示没有交换，此时应该返回数组
    for (let j = 0; j < length - i - 1; j++) {
      // 后面是和j+1个元素比较，所以还需要再减一
      if (arr[j] > arr[j + 1]) {
        // 保证冒泡是稳定的算法
        swap(arr, j, j + 1);
        flag = true;
      }
    }
    if (!flag) return arr;
  }

  return arr;
}
```

#### 算法分析

- 空间复杂度

冒泡的过程只涉及相邻数据的交换操作，只需要常量级的辅助空间，所以它的空间复杂度为 O(1)。

- 稳定性

从算法实现中可以看出，交换只会出现在相邻两个元素中。为了保证冒泡排序算法的稳定性，当相邻的两个元素大小相等的时候，我们不做交换。那么相同大小的数据在排序前后的顺序就不会改变，所以冒泡排序是稳定的排序算法。

- 时间复杂度

冒泡排序最好的情况是在待排数据完全有序的时候，没有元素交换，此时只需要一趟冒泡就可以跳出循环，时间复杂度为 O(n)。最坏的情况为倒序，需要通过 n 次冒泡，时间复杂度为 O(n^2)。平均时间复杂度为 n(n^2)。

平均时间复杂度如果使用概率论来计算相对来说比较复杂，我们可以通过“有序度”和“逆序度”这两个概念来进行分析。

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200621220102.png'/>

通过上图我们可看出待排序列 4，5，6，3，2，1 的有序元素对有 (4，5)(4，6)(5，6)，所以有序度是 3。我么可以看到通过 5 次冒泡，可以把有序度调整为 15，即为序列的满序度`n*(n-1)/2=15`。也就是排序的过程其实就是把逆序度转换为有序度的过程。所以无论我们如何该算法，交换次数总是确定的，即为逆序度 12。

有序序列的逆序度为 0，不需要交换。而序列逆序时，需要进行`n*(n-1)/2` 次交换。我们可以取个中间值`n*(n-1)/4`，来表示初始有序度既不是很高也不是很低的平均情况。也就是平均情况下，需要 `n*(n-1)/4` 次交换操作，而比较操作肯定要比交换操作多，所以平均时间复杂度也是 O(n)。

### Insertion Sort

算法思想：插入排序会把待排序列划分为两个区间，已排序区间和未排序区间。初始已排序区间只有第一个元素。插入算法的核心思想是**取未排序区间中的元素，在已排序区间中找到合适的位置将其插入，并保证已排序区间数据一直有序**。重复这个过程，直到未排序区间中元素为空，算法结束。

如下图所示，待排序列是 4，5，6，1，3，2，其中左侧为已排序区间，右侧是未排序区间。

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200622002437.png'/>

排序的过程中设计到两种操作，一种是和已排序区间的元素比较，找插入位置，另一种是当找到插入位置后，插入位置之后的元素移动。

需要注意的是元素的移动次数次数是与逆序度相同的，如下图所示：

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200622002815.png'/>

我们可以计算出初始序列的逆序度是和移动元素个数总和是完全相等的。

#### 算法实现

```js
/* 插入排序思想：第一个元素有序，从第二个元素开始，在前面有序的元素中一次比较找到合适的插入位置*/
/*空间复杂度O(1),时间复杂度在完全有序时为O(n)，倒序时为最坏情况，时间复杂度O(n^2) */

function inserttionSort(arr) {
  const length = arr.length;
  if (length <= 1) return arr;

  for (let i = 1; i < length; i++) {
    let value = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > value) {
      // 对已有序的元素遍历，如果值大于value就继续向前找，不大于的话就插入，插入排序是稳定排序
      arr[j + 1] = arr[j];
      j--;
    }

    if (j + 1 !== i) {
      // 如过arr[i]不用移动，那么就不需要插入操作
      arr[j + 1] = value;
    }
  }

  return arr;
}
```

#### 算法分析

- 空间复杂度

通过上面的算法实现可以看出，该算法不需要额外的辅助空间，即空间复杂度为 n(1)。

- 稳定性

在插入排序中，对于值相同的元素，我们可以选择将后面出现的元素，插入到前面出现元素的后面，这样就可以保持原有的前后顺序不变，所以插入排序是稳定的排序算法。

- 时间复杂度

在完全有序时，不需要移动元素，只比较一次就可以找到插入位置，这也是最好的情况，时间复杂度为 O(n)。如果是倒序，每次插入都相当于在数组的第一个位置插入新的数据，需要移动所有的已排序数据，也是最坏的情况，时间复杂度为 O(n^2)。每次在已排序区间寻找插入位置的平均时间复杂度为 O(n)，所以循环 n 次插入的算法平均时间复杂度为 O(n^2)。

### Selection Sort

算法思想：选择排序会将待排序列划分为已排序区间和未排序区间，**每次会从未排序区间中找到最小的元素，将其放到已排序区间的末尾**。选择排序的过程如下图所示：

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200621225611.png'/>

#### 算法实现：

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

#### 算法分析

- 空间复杂度

通过上面的算法实现可以看出，该算法自己需要一个辅助空间存放 minValue，即空间复杂度为 n(1)。

- 稳定性

选择排序是不稳定的排序算法，比如 5，8，5，2，9 这样一组数据，使用选择排序算法来排序的话，第一次找到最小元素 2，与第一个 5 交换位置，那第一个 5 和中间的 5 顺序就变了，所以就不稳定了。

- 时间复杂度

选择排序无论序列中的顺序如何，都会对未排序区域元素依次遍历，因此时间复杂度那种情况下都是 O(n^2)。

### O(n^2) 小结

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200622001045.png'/>

通过对三种时间复杂度为 O(n^2)排序算法进行分析，我们不难看出，选择排序是这三种排序算法中最差的，排序即不稳定，而且时间复杂度始终为 O(n^2)。而冒泡排序和插入排序在空间复杂度、稳定性、时间复杂度上的数据是完全相同的，两种算法无论怎么优化，元素交换的次数也是一个固定值（逆序度）。但是我们我们可以通过两者的算法实现可以看出，在元素交换时，冒泡排序的数据交换要比插入排序的数据移动要复杂，冒泡排序需要 3 个赋值操作，而插入排序只需要 1 个。在数量级较大的情况下，插入排序的性能可能表现的更优。

## O(nlogn)

冒泡、插入和选择排序这三种算法的时间复杂度都是 O(n^2)，适合小规模数据的排序，当数据量较大时便不太实用。本节将介绍两种时间复杂度为 O(nlongn)的三种算法：快速排序、归并排序和堆排序。

### Quick Sort

算法思想：快速排序利用的是分治思想，在代排序列中挑选任意一个数据作为 pivot（分区点），将小于 pivot 的数据放到它的左边，将大于 pivot 的数据放到它的右边。然后再利用同样的方法分别对左边和右边的数据进行递归操作，直到区间缩小为 1，就说明所有的数据都有序了。

#### 快排分区

快速排序算法实现的关键是分区，关于分区我们一般会使用以下两种方案：

**方法一**： 申请两个临时的空数组 X、Y，每次取代排数组中间值为 pivot，小于 pivot 的放到 X 数组，大于中 pivot 的放 Y 数组。

为了更好的理解，我们可以假设代排序列为 8、10、2、5、6、1、3，分区操作如下图所示：

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200626223158.jpg'/>

这种分区方式在实现起来也很方便，但是分区需要很多额外的内存空间，所以**分区操作**的空间复杂度就不是为 O(1)的原地排序算法了。

**方法二**： 使用双指针法，左右各一个指针，取第一个值 pivot，先移动右指针，大于等于 pivot 的时候像左移动，小于的时候停止。然后再移动左指针，在遇到不小于 pivot 的时候停止，交换两个指针所指向的元素，直到两指针指向同一个元素或左指针大于右指针为止。

使用双指针法进行分区，虽然操作起来更加的复杂，但是可以保证**分区操作**的空间复杂度为 O(1)。

#### 算法实现

采用方法一进行分区的算法如下所示：

```js
function quickSort(arr) {
  if (arr.length <= 1) {
    // 当分区只有一个元素的时候直接返回/终止递归
    return arr;
  }

  let left = [],
    right = []; // 设置两个临时数组
  const middleIndex = (arr.length / 2) >> 1; // 设置中间的元素为pivot
  const middle = arr[middleIndex];

  // 对元素分区
  for (let i = 0; i < arr.length; i++) {
    if (i !== middleIndex) {
      // 当元素不是pivot的时候才为其分区
      if (arr[i] >= middle) {
        right.push(arr[i]);
      } else {
        left.push(arr[i]);
      }
    }
  }
  // 递归左右分区，并将三个部分拼接在一起
  return quickSort(left).concat(middle, quickSort(right));
}
```

:::bad

从上面可以看出，算法的实现相当的简单，但是当递归没有回溯前，创建的数组也没有被释放，当数据量较大时，这是一个非常占用内存的写法，所以我们并不推荐这么写，包括面试的时候如果快排这么写的话，肯定是要减分的。

:::

采用双指针法进行分区的算法如下所示：

```js
function quickSort(arr, left, right) {
  if (i >= j) return; // 递归终止条件
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

#### 算法分析（双指针法）

- 空间复杂度

通过上面的算法实现可以看出，双指针法分区操作的空间复杂度为 O(1)，因为快排是使用递归操作的，递归深度为 O(logn)，所以该算法空间复杂度为 O(logn)。

- 稳定性

快排不是一个稳定的算法，例如这组数据 4，8，7，2，3，5，9，2，在经过第一次分区操作之后，两个 2 的相对先后顺序就会改变。

- 时间复杂度

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

当 n/2^k 的值为 1 的时候，k=log2n，此时时间复杂度为 O(nlog(n))。

使用快排最坏的情况为当每次分区被划分为 n-1 和 0 个元素时，此时时间复杂度的算法为 `T(n) = T(n-1) + T(0) + O(n)`，此时时间复杂度退化为 O(n^2)。

#### 快排优化

快速排序为了让分区变得更加的均匀，常见的优化方案有**三数取中法**和**随机法**。

1. 三数取中法：我们从区间的首、尾、中间，分别取出一个数，然后对比大小，取这 3 个数的中间值作为分区点。这样每间隔某个固定的长度，取数据出来比较，将中间值作为分区点的分区算法，肯定要比单纯取某一个数据更好。但是，如果要排序的数组比较大，那“三数取中”可能就不够了，可能要“五数取中”或者“十数取中”。

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

2. 随机法：随机法就是每次从要排序的区间中，随机选择一个元素作为分区点。这种方法并不能保证每次分区点都选的比较好，但是从概率的角度来看，也不大可能会出现每次分区点都选的很差的情况，所以平均情况下，这样选的分区点是比较好的。时间复杂度退化为最糟糕的 O(n^2) 的情况，出现的可能性不大。

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

### Merge Sort

算法思想：将待排数组逐步二分，当二分长度为 1 的时候停止。然后再将分好的数组排序，并逐步合并为一个有序的数组。

归并排序分为两个阶段：分解和合并，在分解中利用分治思想，将数据递归拆分，然后在通过合并函数分解后的数据有序的整合在一起。

归并过程如下图所示：

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200627125544.png'/>

#### 算法实现：

```js
function mergeSort(arr) {
  const length = arr.length;
  if (length <= 1) {
    // 当数组为一个元素时停止
    return arr;
  }
  const mid = length >> 1;
  const left = arr.slice(0, mid);
  const right = arr.slice(mid, length);

  return merge(mergeSort(left), mergeSort(right)); //对原始数组递归二分
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    //对二分好的数据排序整合在一起
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  // 处理剩余元素
  while (i < left.right) {
    result.push(left[j]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }
  return result;
}
```

#### 性能分析

- 空间复杂度

由上面的算法可以看出，merge 函数中使用了一个临时数组 result，空间复杂度为 O(n)，但是 result 数组在每次合并后都会被释放，在任意时刻，CPU 只会有一个函数在执行，也就只会有一个临时的内存空间在使用。临时内存空间最大也不会超过 n 个数据的大小，所以空间复杂度是 O(n)。

- 稳定性

归并排序的稳定性取决于 merge 函数，当我们在比较`left[i] <= right[j]`的时候，如果遇到相同的元素，让左边区间的元素先进 result，这样可以保证归并排序是个稳定的排序算法。

- 时间复杂度

归并排序 merge 操作的时间复杂度为 O(n)，在快排我们也讲过递归操作的递归深度为 logn，因此归并排序的时间复杂度为 O(nlogn)。归并排序的执行效率与要排序的原始数组的有序程度无关，所以其时间复杂度是非常稳定的，不管是最好情况、最坏情况，还是平均情况，时间复杂度都是 O(nlogn)。

虽然归并排序可以做到无论是什么情况时间复杂度都是 O(nlogn)，但是由于它的空间复杂度较高，当数据量较大的时候，内存占用量过大，因此归并排序只有在数据量较小，比如说 1k，2k 的时候可能会使用到，当数据量较大时还是会使用快速排序。

### Heap Sort

堆是一个完全二叉树，堆中每一个节点的值都必须大于等于（或小于等于）其子树中每个节点的值。对于每个节点的值都大于等于子树中每个节点值的堆，我们叫作“大顶堆”。对于每个节点的值都小于等于子树中每个节点值的堆，我们叫作“小顶堆”。

堆排序的关键就是将代排序列调整为堆。堆排序的过程可以分为建堆和排序两个步骤。

:::tip

在本节中为了更好的计算，让数据在数组中的存储的下标从 1 开始，这样可以保证数组中下标为 i 的节点的左子节点，就是下标为 `i*2` 的节点，右子节点就是下标为 `i*2+1` 的节点，父节点就是下标为 ​ `i/2` 的节点。

:::

#### 建堆

建堆思路：将序列调整为一个大顶堆，首先从后往前处理数组，找到第一个非叶子节点，然后比较其子节点，如果子节点的值大于当前节点，就将当前节点和最大的子节点交换。然后重复此过程，直到根节点调整完毕后结束。

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200627213004.png'/>

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200627213016.png'/>

由完全二叉树的特点不难得出，从 1 到 n/2 的元素都是非叶子节点，n/2+1 到 n 都是叶子节点。（其中 n/2 向下取整）

通过上面的描述，建堆的算法实现如下所示：

```js
// 元素交换
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
// 遍历非叶子节点
function buildHeap(a, n) {
  for (let i = n >> 1; i >= 1; --i) {
    heapify(a, n, i); // a为数组 n 为数组的长度 i为非叶子节点下标
  }
}

function heapify(a, n, i) {
  while (true) {
    let maxPos = i;
    if (i * 2 <= n && a[i] < a[i * 2]) {
      // 与其做节点比较
      maxPos = i * 2;
    }
    if (i * 2 + 1 <= n && a[maxPos] < a[i * 2 + 1]) {
      // 用当前节点或左节点和右节点比较
      maxPos = i * 2 + 1;
    }
    if (maxPos === i) break;
    swap(a, i, maxPos);
    i = maxPos;
  }
}
```
