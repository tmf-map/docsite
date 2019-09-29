---
id: container-component
title: 容器型组件
sidebar_label: 容器型组件
---

Redux 的一个重要思想是将组件主要分为 **container（容器型） 组件**和 **presentational（展示型） 组件**。

* container 主要是为 presentational 组件提供一个 **数据容器**，这里的数据包括属性和方法（需要 dispatch 的方法，和不需要 dispatch 的方法）。
* presentational 组件仅仅作为拿到数据（血液）后的展示作用，上承接 contianer 传过来的数据，下接ui 组件。

![Redux 组件与 Store 的关系](https://raw.githubusercontent.com/ThinkBucket/oss/master/qqPz4e.jpg)

一个完整 React App 的组件树，根节点即 mountNode，叶子节点应该是 presentational 组件或 ui 组件，中间的节点是 container 组件，主要用与传递和监听数据，作为一个数据的中间容器。

![Redux 组件树](https://raw.githubusercontent.com/ThinkBucket/oss/master/pasted-image-0.png)

## contianer 组件

```javascript
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])(Component)
```

connect: 一个柯里化函数，函数将被调用两次。

1. 第一次是设置参数，第一次调用的时候4个参数都是可选。
2. 第二次是组件与 Redux store 连接。

connect 函数不会修改传入的 React 组件，返回的是一个新的已与 Redux store 连接的组件。

> **推荐**：mapStateToProps 和 mapDispatchToProps 里面的对象保持扁平化，不要发生嵌套。


> **推荐**：connect 的参数名字可以自定义，但推荐使用默认的参数名字。


* **mapStateToProps\(state, ownProps?\): stateProps** 在 store 发生改变的时候才会调用，然后把返回的结果作为组件的 props。

> **Tips：**该函数 return 的对象里面的值有变化才会引起其所对应的 Component 的更新。


> **Tips**：mapStateToProps 可以不传，如果不传，组件不会监听 store 的变化，也就是说 store 的更新不会引起 Component 的更新。


* **mapDispatchToProps\(dispatch, ownProps?\): dispatchProps** 里面主要是事件绑定的方法，方法里面可以通过 `dispatch` 调用 `action` 。
* **mergeProps\(stateProps, dispatchProps, ownProps\): props** 用来指定这三个 props 的合并规则，合并的结果作为组件的 props。如果要指定这个函数，建议不要太复杂。

```jsx
const mapStateToProps = state => ({
  page: selector.getPage(state)
});
const mapDispatchToProps = dispatch => ({
  deleteDiscount(page, lineId) {
    dispatch(asyncAction.deleteDiscount(page, lineId));
  }
});
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    deleteDiscount: dispatchProps.deleteDiscount.bind(null, stateProps.page)
  });
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Table);
```

> **强制**：使用 ES2015 的 **Object.assign** 方法来做 props 的合并，第一个参数传空对象。


* **options: object** 里面主要关注 pure。
* _\[pure = true\] \(Boolean\)_: 如果为 true，connector 将执行 shouldComponentUpdate 并且浅对比 mergeProps 的结果，避免不必要的更新，前提是当前组件是一个“**纯**”组件，它不依赖于任何的输入或 state 而只依赖于 props 和 Redux store 的 state。**默认值为 true**。
* _\[withRef = false\] \(Boolean\)_: 如果为 true，connector 会保存一个对被被包含的组件实例的引用，该引用通过 `getWrappedInstance()` 方法获得。**默认值为 false**。
* **Component** 就是要被连接的 React 组件。
