---
id: duplicated-number-in-array
title: 数组中重复的数字
---

- 题源：《剑指 Offer: 面试题 3》P39
- 在线：[牛客网](https://www.nowcoder.com/practice/623a5ac0ea5b4e5f95552655361ae0a8)

## 题目

在一个长度为 n 的数组里的所有数字都在 0 ～ n-1 的范围内。 数组中某些数字是重复的，但不知道有几个数字是重复的。也不知道每个数字重复几次。请找出数组中任意一个重复的数字。

示例：

```text
输入：[2,3,1,0,2,5,3]
输出: 2 或者 3
```

## 思路

1. 法一：先排序再用快慢指针找重复，但时间复杂度为 O(nlogn)
2. 法二：HashTable 统计次数，但需要 O(n) 的辅助空间
3. 法三：将元素下标和元素值交换直至相等，当 `nums[nums[i]] === nums[i]` 时返回该值即可

## 代码实现

```js
function duplicate(nums) {
  if (nums.length < 1) return;
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i) {
      if (nums[nums[i]] === nums[i]) {
        return nums[i];
      }
      let temp = nums[i];
      nums[i] = nums[temp];
      nums[temp] = temp;
    }
  }
}
```

思考能否将交换数组元素的部分写成如下几种形式：

```js
let temp = nums[i];
nums[i] = nums[nums[i]];
nums[nums[i]] = nums[i];
```

```js
nums[i] = nums[i] ^ nums[nums[i]];
nums[nums[i]] = nums[i] ^ nums[nums[i]];
nums[i] = nums[i] ^ nums[nums[i]];
```

```js
[nums[nums[i]], nums[i]] = [nums[i], nums[nums[i]]];
```

## 复杂度

- 时间复杂度：O(n)，虽然有两重循环，但每个数字最多只要交换两次就能找到属于它的位置。
- 空间复杂度：O(1)

## 拓展

在一个长度为 n+1 的数组里的所有数字都在 1 ～ n 的范围内。 所以数组中至少有一个数字是重复的。请找出数组中任意一个重复的数字。但不能修改输入的数组。

示例：

```text
输入：[2,3,5,4,3,2,6,7]
输出: 2 或者 3
```
