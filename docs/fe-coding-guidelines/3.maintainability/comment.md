---
title: Comment
---

### 规则 1: 好的注释应该是解释 why，而不是 what

对于一些特殊的操作，复杂的逻辑或其他容易让别人感到困惑的地方，请加上注释加以解释 why，而不是描述过程。如果需要再描述过程，可能是代码写得不够优雅，易懂，再检查一下自己代码是否还有改进的空间。

**Case1**

:::bad

```js
props.line.collaborationLogs.length
  ? props.line.collaborationLogs.length + 1
  : 1;
```

:::

:::good

```js
props.line.collaborationLogs.length
  ? props.line.collaborationLogs.length + 1 // explain why need plus 1
  : 1;
```

:::

**Case2**

:::bad

```js
if (attr.isAutoFocus) {
  $timeout(() => {
    element[0].focus();
  }, 500);
}
```

:::

:::good

```js
if (attr.isAutoFocus) {
  $timeout(() => {
    element[0].focus();
  }, 500); // 500 means ...
}
```

:::

### 规则 2: 删除不必要的注释

:::bad

```js
const startDate = moment(startDate).format('YYYY-MM-DD'); // YYYY-MM-DD
```

:::

:::good

```js
const startDate = moment(startDate).format('YYYY-MM-DD');
```

:::

另外注释掉的不用的代码片段也应该及时删除，以免留在项目里面成为烂代码。
