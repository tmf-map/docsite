---
title: Logic Operation
---

import Img from '@site/src/components/Img';

### 规则 1: 摩根律

对于 `!(!a...)` 的场景，可读性十分差，可以用[摩根律](https://en.wikipedia.org/wiki/De_Morgan%27s_laws)减少一层取反。

<Img w="180" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/RmQ1Dq.png' alt='RmQ1Dq'/>

**Example1**

:::bad

```js
const shouldShowBtn = !(
  !(props.viewOnly && !props.partialEdit) &&
  props.line.isTaxClassificationCodeValid &&
  props.line.isTaxClassificationLengthValid
);
```

:::

:::good

```js
const shouldShowBtn =
  (props.viewOnly && !props.partialEdit) ||
  !props.line.isTaxClassificationCodeValid ||
  !props.line.isTaxClassificationLengthValid;
```

:::

**Example2**

:::bad

```js
const shouldShowBtn = !(
  !_.isEmpty(selectedConnections) &&
  !_.isNull(selectedPlanIndex) &&
  !_.isNull(form.startDate) &&
  !_.isNull(form.expireDate)
);
```

:::

:::good

```js
const shouldShowBtn =
  _.isEmpty(selectedConnections) ||
  _.isNull(selectedPlanIndex) ||
  _.isNull(form.startDate) ||
  _.isNull(form.expireDate);
```

:::

**Example3**

:::bad

```js
if (!(childItem.payee && childItem.checker))
```

:::

:::good

```js
if (!childItem.payee || !childItem.checker)
```

:::

### 规则 2: 如果三目运算或判断条件中出现 true/false 应考虑是否可以进行简写

**Example1**

:::bad

```js
$index === 0 ? true : undefined;
```

:::

:::good

```js
$index === 0 || undefined;
```

:::

**Example2**

:::bad

```js
if (selectedConnections.length > 0) {
  shouldShowBtn = false;
} else {
  shouldShowBtn = true;
}
```

:::

:::good

```js
shouldShowBtn = selectedConnections.length > 0;
```

:::

**Example3**

:::bad

```js
const untrackable = _.isEmpty(currentItem.fundingRequestList)
  ? false
  : currentItem.fundingRequestList[0].untrackable;
```

:::

:::good

```js
const untrackable = _.get(
  currentItem,
  'fundingRequestList[0].untrackable',
  false
);
```

:::

### 规则 3: 如果逻辑运算过多，可以尝试用其他方法替代，增加可读性

**Example1**

:::bad

```js
const editableItem = this.item.pdfInvoiceView.lineItems
  ? this.item.pdfInvoiceView.lineItems.filter(item => item._editable)
  : [];
```

:::

:::good

```js
const editableItem = _.get(this, 'item.pdfInvoiceView.lineItems', []).filter(
  item => item._editable
);
```

:::

**Example2**

:::bad

```js
this.transferReason =
  this.invoice &&
  this.invoice.itemRemarkList &&
  this.invoice.itemRemarkList[0].transferReason;
```

:::

:::good

```js
this.transferReason = _.get(
  this,
  'invoice.itemRemarkList.itemRemarkList[0].transferReason'
);
```

:::

### 规则 4: `A ? A : B` 可替换成 `A || B`

:::bad

```js
this.name = countryName ? countryName : defaultName;
```

::::

:::good

```js
this.name = countryName || defaultName;
```

:::

### 规则 5: 多条相同变量的条件匹配可以用 `[].inclues` 方法

:::bad

```ts
public isDocumentSent(): boolean {
  return (
    this.documentStatus === DOCUMENT_STATUS.SENT ||
    this.documentStatus === DOCUMENT_STATUS.PAID ||
    this.documentStatus === DOCUMENT_STATUS.REJECTED ||
    this.documentStatus === DOCUMENT_STATUS.COLLECTED ||
    this.documentStatus === DOCUMENT_STATUS.ACCEPTED
  );
};
```

:::

:::good

```ts
public isDocumentSent(): boolean {
  return  [
     DOCUMENT_STATUS.SENT,
     DOCUMENT_STATUS.PAID,
     DOCUMENT_STATUS.REJECTED,
     DOCUMENT_STATUS.COLLECTED,
     DOCUMENT_STATUS.ACCEPTED
   ].includes(this.documentStatus)
};
```

:::
