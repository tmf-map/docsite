---
title: 找到小镇的法官
---

- 在线：[LeetCode: 997](https://leetcode.com/problems/find-the-town-judge/)

## 题目

In a town, there are N people labelled from 1 to N. There is a rumor that one of these people is secretly the town judge.

If the town judge exists, then:

1. The town judge trusts nobody.
2. Everybody (except for the town judge) trusts the town judge.
3. There is exactly one person that satisfies properties 1 and 2.

You are given `trust`, an array of pairs `trust[i] = [a, b]` representing that the person labelled a trusts the person labelled b.

If the town judge exists and can be identified, return the label of the town judge. Otherwise, return `-1`.

Example 1:

```text
Input: N = 2, trust = [[1,2]]
Output: 2
```

Example 2:

```text
Input: N = 3, trust = [[1,3],[2,3]]
Output: 3
```

Example 3:

```text
Input: N = 3, trust = [[1,3],[2,3],[3,1]]
Output: -1
```

Example 4:

```text
Input: N = 3, trust = [[1,2],[2,3]]
Output: -1
```

Example 5:

```text
Input: N = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]
Output: 3
```

Constraints:

- `1 <= N <= 1000`
- `0 <= trust.length <= 10^4`
- `trust[i].length == 2`
- `trust[i]` are all different
- `trust[i][0] != trust[i][1]`
- `1 <= trust[i][0]`, `trust[i][1] <= N`

## 思路

法官即为唯一一个出度为零，入度为 N-1 的顶点。所以计算每个点的度，判断是否存在度为 N-1 的顶点，再判断这样的顶点是否只有一个。

## 代码实现

```js
/**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (N, trust) {
  let trustCount = [];
  for (let i = 1; i <= N; i++) {
    trustCount[i] = 0;
  }

  for (let i = 0; i < trust.length; i++) {
    trustCount[trust[i][0]]--;
    trustCount[trust[i][1]]++;
  }

  let judgeCount = 0;
  let judge = null;
  for (let j = 1; j < trustCount.length; j++) {
    if (trustCount[j] === N - 1) {
      judge = j;
      judgeCount++;
    }
  }
  return judgeCount === 1 ? judge : -1;
};
```

## 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(n)
