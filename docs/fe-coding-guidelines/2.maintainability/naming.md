---
title: Naming
---

#### 对于返回 `true` or `false` 的函数/变量，最好以 `should`/`is`/`can`/`has` 开头

:::bad

applyPanButton

:::

:::good

isApplyButtonDisabled

:::

反之，对于返回值非布尔类型，也应当避免 `is`, `should`, `has`, `can` 开头

:::bad

```js
isPayeeCheckEmpty (selectedList) {
  // .....
  return  [1,2,3]
}
```

:::

#### 不要将变量名命名为数据类型或类似数据类型

:::bad

```js
const bool = _.every(filters, value => value.length === 0);
```

:::

#### CSS 样式类名推荐使用 B\_\_E--M 命名法

:::bad

premade-invoice-card\_\_left--title  
doc-currency_readonly

:::

:::good

doc-currency--readonly

:::
