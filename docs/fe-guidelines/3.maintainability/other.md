---
title: Other
---

### 规则 1: 修改代码时候，要删除已经冗余的代码

当修改代码时候，如果发现已经有些代码逻辑在当下场景已经不需要了，要及时删除。

### 规则 2: 不要自己实现解析 url 参数的代码

Use this lib: query-string to parse the parameters from url.

:::bad

```js
let mailArray = {};
const mailField = parameter.split('&');

mailField.forEach(value => {
  const array = value.split('=');
  mailArray[array[0]] = array[1];
});
```

:::

:::good

```js
const mailArray = queryString.parse(parameter);
```

:::

### 规则 3: 对于一些容易被忽视的字符，可以显示表示

显式表示 `&nbsp;`, `'('`

:::bad

```js
` ${creationDate}`;
```

:::

:::good

```js
' ' + creationDate;
```

:::

### 规则 4: html 标签或者其属性过多，使用换行

**Example1**

:::bad

```html
<input
  type="text"
  ng-model="fieldValue.value"
  ng-required="fieldValue.required"
  ng-readonly="!vm.editable"
  profile-validator=""
  reg-exp="fieldValue.regExp"
  validator-key="fieldValue.key"
  name="{{fieldValue.key}}"
/>
```

:::

:::good

```html
<input
  type="text"
  ng-model="fieldValue.value"
  ng-required="fieldValue.required"
  ng-readonly="!vm.editable"
  profile-validator=""
  reg-exp="fieldValue.regExp"
  validator-key="fieldValue.key"
  name="{{fieldValue.key}}"
/>
```

:::

**Example2**

:::bad

```html
<div class="overflow-wrapper">
  <span class="type-icon"><p>{{vm.getInvoiceTypeForIcon()}}</p></span>
</div>
```

:::

:::good

```html
<div class="overflow-wrapper">
  <span class="type-icon">
    <p>{{vm.getInvoiceTypeForIcon()}}</p>
  </span>
</div>
```

:::
