---
id: selector
title: Selector
sidebar_label: Selector
---

## 什么是 selector？

mapStateToProps 中从状态树获取数据的方法也被叫做 selector，它主要用于从 redux 状态树获取数据时候的过滤和筛选，包括直接从状态树获取的数据的方法和计算推导状态的方法。

> **推荐**：在`mapStateToProps`中尽量避免使用`_.get`去拿数据，从状态树推导数据的方法尽可能地封装到 selector 里。


> **推荐**：在所有地方使用 selector，即使是在一个细小的位置。这样的好处是你很容易在多个 selector 中发现重复的逻辑，抽出共用的方法。即使是从状态树上直接获取的状态（非推导状态），如果有多个地方在使用，也应当放在 selector 中，避免重复逻辑。


## reselect 计算缓存

如果需要缓存之前 selectors 的计算结果\(某些派生数据\)，所以如果 selector 计算量非常大，每次更新都重新计算可能会带来性能问题，那么使用 reselect 能帮你省去这些没必要的重新计算。

reselect 提供 `createSelector` 函数来创建可记忆的 selector。`createSelector` 接收一个 `input-selectors 数组` 和一个 `转换函数` 作为参数。如果 state tree 的改变会引起 input-selector 值变化，那么 selector 会调用转换函数，传入 input-selectors 作为参数，并返回结果。如果 input-selectors 的值和前一次的一样，它将会直接返回前一次计算的数据，而不会再调用一次转换函数。这样就可以避免不必要的计算，为性能带来提升。

示例：

```javascript
import { createSelector } from 'reselect';
import { get } from 'lodash';

const getTaxSubtotal = proforma => get(proforma, 'ubl.TaxTotal[0].TaxSubtotal');
const getTaxAmount = proforma => get(proforma, 'ubl.TaxTotal[0].TaxAmount');

export const getTaxTotal = createSelector(
    [getTaxSubtotal, getTaxAmount],
    (taxSubtotal, taxAmount) => ({
        taxAmount,
        taxSubtotal:
            taxSubtotal &&
            taxSubtotal.map(item => ({
                taxableAmount: get(item, 'TaxableAmount.value'),
                taxScheme: get(item, 'TaxCategory.TaxScheme.Name.value'),
                taxAmount: get(item, 'TaxAmount.value')
            }))
    })
);
```

弊端：

reselect带来计算性能提升的同时，也增加了一些 input-selectors 和缓存数据，使得 selector 的逻辑变得更为琐碎，嵌套的逻辑也相应增加，可维护性在某种程度上会受到影响，在实际使用中要在衍生数据的计算性能和可维护性上做一个权衡。

