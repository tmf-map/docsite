---
id: action
title: Action
sidebar_label: Action
---

import Hint from '../../../src/components/Hint'

## 思想精华二：将所有事件抽象为 action

采用**化整为零**的思想，将事件流抽象成一个个小 action，再将 `dispatch` 暴露出来，这样便可以将 `eventStream` 参数从 `createStore` 去掉，让用户灵活地从外部随时通过调用 `dispatch` 从而控制状态的“累加”。

```diff
- // createStore :: (a -> b -> a) -> a -> [b] -> c
+ // createStore :: (a -> b -> a) -> a -> c
- function createStore(reducer, initialState, eventStream) {
+ function createStore(reducer, initialState) {
    let state = initialState;
-   let action;
-   for (let i = 0; i < eventStream.length; i++) {
-     let action = eventStream[i];
-     state = reducer(state, action);
-     dispatch(action);
-   }
    return {
      getState: function () {
        return state;
      },
+     dispatch: function(action) {
+       state = reducer(state, action)
+     }
    }
  }
```

```diff
- const eventStream = [
-   {type: 'SET_NAME', payload: {name: 'Robbie'}},
-   {type: 'SET_AGE', payload: {age: 16}}
- ];
- const store = createStore(reducer, initialState, eventStream);
+ const store = createStore(reducer, initialState);
+ window.setName = function () {
+   const action = {type: 'SET_NAME', payload: {name: 'Robbie'}};
+   store.dispatch(action);
+ };
+ window.setAge = function () {
+   const action = {type: 'SET_AGE', payload: {age: 16}}
+   store.dispatch(action)
+ };
```

每经过一个 action，state 就进行相应地更新，这样也就形成流 state 关于 action 的线性函数： _`state = f(action)`_ ，这也是 Redux DevTools 可以通过 timeline 控制界面现实的原因。

## Action Type

action type 是对每一个 action 的一个标识，主要用来 reducer 中根据不同的 action type 来更新状态树。


<Hint type="best">action type 命名规范：状态树一级属性名称\_动词\_操作对象，且都为大写字母。</Hint>

示例：

```javascript
export default {
    PROFORMA_SET_ISSUEDATE: 'PROFORMA_SET_ISSUEDATE',
    PROFORMA_SET_PAYEE: 'PROFORMA_SET_PAYEE',
    PROFORMA_SET_CHECKER: 'PROFORMA_SET_CHECKER'
}
```

<Hint type="best">对于异步 action，分别再最后面加上 REQUEST, SUCCESS, ERROR。</Hint>

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


