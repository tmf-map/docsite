---
title: Variable
---

### 规则 1: 使用说明性的中间变量，增加可读性

:::bad

```js
ctrl.selectedBPItemStatus =
  ctrl.BP_ITEM_STATUS_FILTERS[bpItemStatusCardDataFilter.value.toUpperCase()];
```

:::

:::good

```js
const bpItemStatusCardDataFilterId =
  bpItemStatusCardDataFilter.value.toUpperCase();
ctrl.selectedBPItemStatus =
  ctrl.BP_ITEM_STATUS_FILTERS[bpItemStatusCardDataFilterId];
```

:::

### 规则 2: 只有返回值的函数，优先使用变量来表示

即函数内部没有其他逻辑：

:::bad

```js
function getTitle() {
  return t('Tags Added to Incoming Invoice');
}
```

:::

:::good

```js
const tagTips = t(‘Tags Added to Incoming Invoice’);
```

:::

### 规则 3: 常量的使用可以增加一定的可维护性

**Case1**

:::bad

```js
if (obsoleteStatus === ‘OBSOLETING’)
```

:::

:::good

```js
if (obsoleteStatus === status.OBSOLETING)
```

:::

**Case2**

:::bad

```js
if (payee === ‘’ || payee === null || payee === undefined)
```

:::

:::good

```js
if (_.isNil(payee) || _.isEmpty(payee))
```

:::
