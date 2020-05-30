---
title: Redux
---

### 规则 1: reducer 里面只写纯函数，要保持引用透明度

:::bad

```js
loadContractSuccess: (state, contract) => {
  state.merge({
    sentOutDate:
      contract.SentOutDate && moment(contract.SentOutDate).format('YYYY/MM/DD')
  });
};
```

:::

moment 会降低纯函数的引用透明度，将其放到 selector 里面。

### 规则 2: `mapStateToProps` 要保持其逻辑的简单性

:::bad

```js
const mapStateToProps = state => {
  const currentItemIndex = state.report.currentItemIndex;
  const currentItem =
    currentItemIndex !== null
      ? state.report.reportsData.items[currentItemIndex]
      : {};
  let validations = !_.isEmpty(currentItem) ? currentItem.validations : [];
  return {
    validations
  };
};
```

:::

:::good

```js
const mapStateToProps = state => ({
  validations: selector.getValidations(state)
});
```

selector:

```js
function getValidations(state) {
  const currentItemIndex = state.report.currentItemIndex;
  const currentItem =
    currentItemIndex !== null
      ? state.report.reportsData.items[currentItemIndex]
      : {};
  return !_.isEmpty(currentItem) ? currentItem.validations : [];
}
```

:::

### 规则 3: 最好在 selector 里加默认值

:::bad

在 container 里加默认值:

```js
const validationErrors = selector.getPremadeValidationErrors(state);
```

:::

:::good

直接在 selector 里加默认值:

```js
const getPremadeValidationErrors = state =>
  state.getIn(['cndocument', 'validationErrors'], []);
```

:::

### 规则 4: 组件的展示层和业务层分工明确

actions 不要放入展示层，展示组件最好只负责展示，尽量减少使用 state。
