---
title: 三数之和
sidebar_label: 三数之和
---

- 题源：暂无
- 在线：[LeetCode: 15](https://leetcode-cn.com/problems/3sum/)

## 题目

给定一个包含 n 个整数的数组  arr，判断  arr  中是否存在三个元素 a，b，c ，使得  a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

示例 1:

```text
输入: [-1, 0, 1, 2, -1, -4]
输出: [
      [-1, 0, 1],
      [-1, -1, 2]
    ]
```

示例  2:

```text
输入: [-1,0,1,0,-1,1]
输出: [[-1,0,1]]
```

示例  3:

```text
输入: [1, 2, 3]
输出: []
```

## 思路

- 首先对数组进行排序，这样便于排除重复的数字
- 排序后固定一个数 arr[i]，再使用左右指针指向 arr[i]后面的两端，数字分别为 arr[left] 和 arr[right]，计算三个数的和 sum 判断是否满足为 0，满足则添加进结果集
- 如果 arr[i]大于 0，则三数之和必然无法等于 0，结束循环
- 如果 arr[i] == arr[i-1]，则说明该数字重复，会导致结果重复，所以应该跳过
- 当 sum == 0 时，arr[left] == arr[left+1] 则会导致结果重复，应该跳过，left++
- 当 sum == 0 时，arr[right] == arr[right-1] 则会导致结果重复，应该跳过，right−−

## 代码实现

```js
/**
 * @param {array} arr
 * @return {array}
 */
let threeSum = function (arr) {
  let res = [];
  if (arr.length < 3) {
    return [];
  }
  arr.sort((a, b) => a - b); // 数组升序排列

  let len = arr.length;

  if (arr[0] > 0 || arr[len - 1] < 0) {
    // 如果数组全部小于0或者全部大于0，则不可能存在三个数的和为0
    return [];
  }
  for (let i = 0; i < len; i++) {
    // 按顺序取arr中的元素，作为第一个加数
    if (arr[i] > 0) {
      // 如果第一个加数大于0，则总和必然大于0，所以结束循环
      break;
    }
    if (i > 0 && arr[i] === arr[i - 1]) {
      // 如果当前数值与前一个数值相同，为了避免产生重复的结果，跳过本轮循环
      continue;
    }
    // 取剩余数字两端的值，作为另外两个加数
    let left = i + 1;
    let right = len - 1;
    while (left < right) {
      // 避免重复取值
      let sum = arr[i] + arr[left] + arr[right];
      if (sum === 0) {
        res.push([arr[i], arr[left], arr[right]]);
        while (left < right && arr[left] === arr[left + 1]) {
          left++;
        }
        while (left < right && arr[right] === arr[right + 1]) {
          right--;
        }
        left++;
        right--;
      } else if (sum > 0) {
        right--;
      } else if (sum < 0) {
        left++;
      }
    }
  }

  return res;
};
```

## 复杂度

- 时间复杂度：O(n<sup>2</sup>)
- 空间复杂度：O(n)
