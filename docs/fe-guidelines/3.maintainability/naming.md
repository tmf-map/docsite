---
title: Naming
---

### 规则 1: 对于返回 `true` or `false` 的函数/变量，最好以 `should`/`is`/`can`/`has` 开头

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

### 规则 2: 不要用数据类型或类似数据类型给变量命名

:::bad

```js
const bool = _.every(filters, value => value.length === 0);
```

:::

### 规则 3: CSS 样式类名推荐使用 B\_\_E--M 命名法

:::bad

premade-invoice-card\_\_left--title  
doc-currency_readonly

:::

:::good

doc-currency--readonly

:::

### 规则 4: BEM 名称最好采用“继承父名”的方式

:::bad

```less
.invoice-ap__panel {
  height: 100%;
  .invoice-ap__tip-info {
    // ...
  }
}
```

:::

:::good

```less
.invoice-ap__panel {
  height: 100%;
  &-tip-info {
    // ...
  }
}
```

:::

### 规则 5: 样式类名不要带入 CSS 属性

:::bad

```html
<div class="”overflow-wrapper”"></div>
```

:::

### 规则 6: 样式减少直接使用标签名

:::bad

```less
div {
}
```

:::

### 规则 7: id 和类名的名字要精确一点

:::bad

```html
<dialog id="”modal”"></dialog>
```

:::

### 规则 8: 类名包括变量命名时候，建议非特殊情形下不要加上阿拉伯数字

:::bad

```less
.dialog-sub-title1 {
}
```

:::

:::good

```less
.dialog-sub-title {
}
```

:::

### 规则 9: 对于后端返回的 key，建议用变量

防止后端的一些改动对前端产生过大的影响。

:::bad

```js
object.controlViewTimePeriod = ….
```

:::

:::good

```js
export const CONTROL_VIEW_TIME_ENABLED = 'controlViewTimeEnabled';
export const CONTROL_VIEW_TIME_INDICATOR = 'controlViewTimeIndicator';
export const CONTROL_VIEW_TIME_PERIOD = 'controlViewTimePeriod';

object[CONTROL_VIEW_TIME_PERIOD] = ...
```

:::

### 规则 10: 当函数发生本质改变后要及时修改函数名

:::bad

getRelatedCreditNoteIssueDate

:::

原先的业务代码 `getRelatedCreditNoteIssueDate` 函数仅指 `RelatedCreditNoteIssueDate` ，而该函数修改后还包括其他的 `IssueDate` 。

:::good

getIssueDate

:::

### 规则 11: 区分 delete 和 clear 的含义

`clear` 是清空， `delete` 是删除，比如清空选择的列表。

:::bad

deleteSelected

:::

:::good

clearSelected

:::

### 规则 12: 命名前后要统一

:::bad

```less
.directive('cardData', card);
```

```js
CalculationStrategySetting: {
}
```

- issuingTimePeriodAside
- issueTimePeriodMenuAside
- issuePeriodSupplierAside

:::

### 规则 13: 函数名动词开头命名

:::bad

premadeHasObsoleting

:::

:::good

checkPremadeHasObsoleting

:::

### 规则 14: 变量的命名要有一定含义，避免使用 `i`, `v`, `temp` 之类的命名

:::bad

i.isValid

:::

:::good

taxCode.isValid

:::

### 规则 15: JS 中类名大写

:::bad

```js
class issueTimePeriodMenuAsideController {}
```

:::

:::good

```js
class IssueTimePeriodMenuAsideController {}
```

:::

### 规则 16: 对象 `key` 要有一定意义且和 `value` 命名最好不要重复

:::bad

```js
const supplierConfig = {
  asideId: TIME_PERIOD.SPECIFIC_ID,
  title: t('Supplier'),
  save: t('save')
};
```

:::

:::good

```js
const supplierConfig = {
  asideId: TIME_PERIOD.SPECIFIC_ID,
  title: t('Supplier'),
  btnLabel: t('save')
};
```

:::

### 规则 17: 变量的命名有些使用小驼峰

:::bad

```js
let FilesTable = null;
```

:::

:::good

```js
let filesTable = null;
```

:::

### 规则 18: 变量名和函数参数名不要一样

:::bad

```js
const plan = arr.find(plan => console.log(plan));
```

:::

:::good

```js
const plan = arr.find(item => console.log(item));
```

:::

### 规则 19: CSS 类的名字小写

:::bad

```html
<div className="document__info-top-right--item issuedate Currency"></div>
```

:::

:::good

```html
<div className="document__info-top-right--item issuedate currency"></div>
```

:::
