---
title: React
---

### 规则 1: React v-dom 中插入 js 代码做逻辑判断的时候要进行显示的类型转换

:::bad

```js
{
  props.issueDate && <p>...</p>;
}
```

:::

:::good

```js
{
  !!props.issueDate && <p>...</p>;
}
```

:::

### 规则 2: List 组件渲染的 Key 不要用 index

key 用 index 只是消除了警告，并没有启到实际效果。

:::bad

```js
{
  this.props.list.map((item, index) => <div key={index}>...</div>);
}
```

:::

:::good

```js
{
  this.props.list.map(item => <div key={item.id}>...</div>);
}
```

:::
