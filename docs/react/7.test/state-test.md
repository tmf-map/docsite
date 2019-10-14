---
id: state-test
title: 状态测试
sidebar_label: 状态测试
---

import Hint from '../../../src/components/Hint'

在 React App 的开发过程中，我们将状态测试主要分为 Action Test、Reducer Test 和 Selector Test。

## Action Test

### 同步 action

sync action 的单元测试相对比较简单，主要测试 action creator 的返回值是否正确，示例代码：

```javascript
describe('#action# setDiscountType', () => {
    const lineId = '456adc81-7b5a-4863-95b1-b43d1539a233';
    const discountType = 0;
    it('should return setDiscountType action creator correctly', () => {
        const action = setDiscountType(lineId, discountType);
        expect(action).to.have.property('type', actionTypes.LINES_SET_REQUEST);
        expect(action).to.have.property('lineId', lineId);
        expect(action).to.have.property('discountType', discountType);
    });
}
```

### 异步 action

async action 的单元测试相对比较复杂，结合项目中的 redux-thunk 进行测试，主要测试异步 action 中的REQUEST、SUCCESS、ERROR 在不同情况下是否按照预期进行调用，示例代码：

```javascript
describe('#action# setLinesData', () => {
    const dispatch = jest.fn();
    const lineId = '456adc81-7b5a-4863-95b1-b43d1539a233';
    const lineData = {...};
    const getState = jest.fn().mockReturnValue(Immutable({...}));

    afterEach(jest.clearAllMocks);

    it('should set lines data success', done => {
        const utils = {
            ProformaService: {
                setLinesData: jest.fn().mockReturnValue(Promise.resolve())
            }
        };
        setLinesData(lineId, false, lineData)(dispatch, getState, utils)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith({
                    type: actionTypes.LINES_SET_REQUEST
                });
                expect(dispatch).toHaveBeenCalledWith({
                    type: actionTypes.LINES_SET_SUCCESS
                });
                done();
            })
            .catch(done.fail);
    });
}
```

函数中的业务逻辑，需要根据具体的情况进行测试。

<Hint type="must">异步 action 的测试一定要向其传入并执行 done 函数， Jest 会等 done 回调执行结束后，结束测试。否则 test 会显示通过，但有错误，也失去了测试的意义。</Hint>


## Reducer Test

reducer 的测试一般是期望 `reducer(state, action) === newState`，其实这种方式和 `(input) => output` 的模式是一样的。

测试 state 首先要引入 Immutable 保证状态树的不可变性，示例代码：

```javascript
import Immutable from 'seamless-immutable';

const initialState = Immutable({...});
const action = { type: ..., payload: ...};
const expectedState = {...};

expect(reducer(initialState, action)).toEqual(expectedState);
```

## Selector Test

Selector Test 其实也是 `(input) => output` 这种模式，同样测试的时候也要引入 Immutable 来保证状态树的不可变性，示例代码：

```javascript
import Immutable from 'seamless-immutable';

const state = Immutable({...});
const expectedprops = {...};

expect(selector.getLines(state)).toEqual(expectedprops);
```

