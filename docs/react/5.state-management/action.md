---
id: action
title: Action
sidebar_label: Action
---

import Hint from '../../../src/components/Hint'

## Action Type

action type 是对每一个 action 的一个标识，主要用来 reducer 中根据不同的 action type 来更新状态树。

<Hint type="must">action type 统一放在 actionTypes 文件夹下，每个文件以 `.type.js` 结尾。</Hint>


<Hint type="must">action type 命名规范：状态树一级属性名称\_动词\_操作对象，且都为大写字母。</Hint>


示例：

```javascript
export default {
    PROFORMA_SET_ISSUEDATE: 'PROFORMA_SET_ISSUEDATE',
    PROFORMA_SET_PAYEE: 'PROFORMA_SET_PAYEE',
    PROFORMA_SET_CHECKER: 'PROFORMA_SET_CHECKER'
}
```

<Hint type="must">对于异步 action，分别再最后面加上 REQUEST, SUCCESS, ERROR，三个缺一不可。</Hint>


示例：

```javascript
export default {
    PROFORMA_LOAD_METADATA_REQUEST: 'PROFORMA_LOAD_METADATA_REQUEST',
    PROFORMA_LOAD_METADATA_SUCCESS: 'PROFORMA_LOAD_METADATA_SUCCESS',
    PROFORMA_LOAD_METADATA_ERROR: 'PROFORMA_LOAD_METADATA_ERROR'
}
```

## Action Creator

用来产生一个修改 redux 状态树所需要的 action 对象，action 只是一个 type 和 payload 的集合。

<Hint type="must">以 `.action.js` 结尾的文件表示 action creator。</Hint>


action 分为 syncAction 和 asyncAction 。

## Sync Action

<Hint type="must">syncAction 只单纯地返回一个 action 对象，是一个无副作用的纯函数。</Hint>


<Hint type="best">syncAction 建议 export 出来。</Hint>


## Async Action

asyncAction 相对会稍稍复杂一点，使用 redux-thunk 会带有一点副作用，基本格式如下：

```javascript
import actionTypes from '../../actionTypes';
import { setTotalAmount } from '../proformaSync/setProforma.action';

const getTotalAmountRequest = () => ({
    type: actionTypes.PROFORMA_GET_TOTAL_AMOUNT_REQUEST
});

const getTotalAmountSuccess = () => ({
    type: actionTypes.PROFORMA_GET_TOTAL_AMOUNT_SUCCESS
});

const getTotalAmountError = e => ({
    type: actionTypes.PROFORMA_GET_TOTAL_AMOUNT_ERROR,
    error: e
});

export const getTotalAmount = () => (dispatch, getState, utils) => {
    const ubl = getState().proforma.ubl;
    dispatch(getTotalAmountRequest());
    utils.DocumentService
        .calculateTotals(ubl)
        .then(newUbl => {
            dispatch(getTotalAmountSuccess());
            dispatch(setTotalAmount(newUbl));
        })
        .catch(e => {
            dispatch(getTotalAmountError(e));
        });
};
```

<Hint type="best">asyncAction 中 request, success, error 建议不要 export 出来。</Hint>


