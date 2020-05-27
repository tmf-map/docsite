---
title: Function
---

### 规则 1: 代码块重复较多时可以抽象成函数

:::bad

```js
.then(() => {
  spinner
    .withCoverSpinner(store.dispatch(TABLE_ACTIONS.getList()))
    .finally(() => this.scope.$apply());
});
....
spinner
  .withSpinner(store.dispatch(TABLE_ACTIONS.getList()))
  .finally(() => this.scope.$apply());
```

:::

:::good

```js
.then(() => {
  this.loadLine();
});
....
loadLine() {
  spinner
    withSpinner(store.dispatch(TABLE_ACTIONS.getList()))
    .finally(() => this.scope.$apply());
}
```

:::

### 规则 2: 写 `else` 的时候要注意是否有写的必要，以免降低可维护性

:::bad

```js
isSettingValueNull(param) {
  if (param.hasOwnProperty('strContent')) {
    return !param.strContent;
  } else if (param.hasOwnProperty('listContent')) {
    return !param.listContent || !param.listContent.length;
  } else if (param.hasOwnProperty('boolContent')) {
    return param.boolContent === null;
  } else {
    return false
  }
}
```

:::

:::good

```js
isSettingValueNull(param) {
  if (param.hasOwnProperty('strContent')) {
    return !param.strContent;
  }
  if (param.hasOwnProperty('listContent')) {
    return !param.listContent || !param.listContent.length;
  }
  if (param.hasOwnProperty('boolContent')) {
     return param.boolContent === null;
  }
  return false
}
```

:::

### 规则 3: 函数参数的默认值建议直接写在后面

:::bad

```js
const updateCardFilters = timePeriodFilterId => {
  timePeriodFilterId = timePeriodFilterId || 'DAY_TIME_PERIOD';
  // ...
};
```

:::

:::good

```js
const updateCardFilters = (timePeriodFilterId = 'DAY_TIME_PERIOD') => {
  // ...
};
```

:::

对象属性默认值

### 规则 4: 匿名函数优先使用箭头函数

:::bad

```js
_.forEach(me._formData, function (formFieldArguments) {
  form.append.apply(form, formFieldArguments);
});
```

:::

:::good

```js
_.forEach(me._formData, formFieldArguments => {
  form.append(...formFieldArguments);
});
```

:::

### 规则 5: 多个相同的判断条件可以用 `switch` 语句，具有更好的可读性

:::bad

```ts
public static getDocumentClass(invoice) {
  if (this.getInvoiceStatus(invoice) === INVOICE_SUCCESS) {
    return 'document-success';
  }
  if (this.getInvoiceStatus(invoice) === INVOICE_REJECTED) {
    return 'document-reject';
  }
  if (this.getInvoiceStatus(invoice) === INVOICE_FINISHED) {
    return 'document-finish';
  }
}
```

:::

:::good

```js
function getDocumentClass(invoice) {
  switch (getInvoiceStatus(invoice)) {
    case INVOICE_SUCCESS:
      return 'document-success';
    case INVOICE_REJECTED:
      return 'document-reject';
    case INVOICE_FINISHED:
      return 'document-finish';
}
```

:::

或者写成对象形式：

:::good

```js
const invoiceMap = {
  INVOICE_SUCCESS: 'document-success',
  INVOICE_REJECTED: 'document-reject',
  INVOICE_FINISHED: 'document-finish'
};

invoiceMap[getInvoiceStatus(invoice)];
```

:::
