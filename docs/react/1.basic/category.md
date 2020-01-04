---
id: category
title: 种类
sidebar_label: 种类
---

import Hint from '../../../src/components/Hint';

## 类与函数式组件

| **对比点** | **class** | **function（函数式）** |
| :-- | :-- | :-- |
| state | 可选 | 无状态 |
| props | 有 | 有 |
| 生命周期 | 有 | 无 |
| 使用场景 | 需要用到生命周期，需要维护自身的状态，比如处理用户的输入 | 不需要生命周期，不需要维护自身的状态，所有的状态都通过 props 传入 |

<Hint type="good">函数式组件必须使用箭头函数的形式定义。</Hint>

<Hint type="good">如果有多个函数式组件嵌套，里面的函数式组件 `props` 参数推荐使用 `_props` 替代。</Hint>

<Hint type="good">组件不需要生命周期且不需要维护自身状态的时候，优先使用函数式组件。</Hint>

<Hint type="good">presentational 组件优先使用函数式组件。</Hint>

## 受控组件与非受控组件

受控组件与非受控组件是 React 处理表单的入口。从 React 的思路来讲，作者肯定让状态控制一切，或者简单的理解为，页面的生成与更新得忠实地执行 JSX 的指令。但是表单元素有其特殊之处，用户可以通过键盘输入与鼠标选择，改变界面的显示。界面的改变也意味着有一些状态 **被** 改动。

<Hint type="tip">React 的本质是 **状态**，而受控和非受控也是因 **状态的控制维护** 而产生的概念。</Hint>

受控组件和非受控组件主要用在表单的处理当中。controll 指的是对 **value/checked**\(单选框和复选框\) 属性的控制。以 input 为例，如果绑定了 value 属性则为受控组件，[demo](https://jsbin.com/wehazujeli/edit?js,console,output)：

```jsx
<input type="text" value={this.state.value} /> // 受控组件
<input type="text" value={this.state.value} onChange={::this.handleChange} /> // 受控组件
<input type="text" ref={n => this.myInput = n} defaultValue={this.state.value} /> // 非受控组件
<input type="text" ref={n => this.myInput = n} defaultValue={this.state.value} onChange={::this.handleChange} /> // 非受控组件
```

受控组件将 value 和 state 进行了绑定，可以通过 react 的生命周期很方便地达到对 value 的控制，state 相应值的变化也会影响到 value 的变化，使得应用整体的状态更加可控，所以说它是受控的。由于非受控组件没有 value 属性，所以要想控制输入框的内容不是那么方便和“原生自然“，当然通过 ref 反模式也可以达到相同的效果。

<Hint type="tip">受控和非受控并不是说，受控做的事情非受控不能做，非受控同样可以通过 ref 这种反模式达到受控组件同样的效果，当然这样会带来一些副作用。大部分情况下受控组件足够我们使用，在一些特殊的情况下则用非受控组件来更快速便捷地达到我们想要的效果。</Hint>

| **对比点** | **controlled** | **uncontrolled（反模式）** |
| :-- | :-- | :-- |
| 特征 | 有 value/checked 属性 | 无 value/checked 属性 |
| 优点 | 便于对输入的 value 作处理 | 可以不用绑定 change 事件 |
| 缺点 | 最好绑定 change 事件，有性能损耗 | 不受 props/state 控制 |
| 实时获取输入的 value | e.target.value | e.target.value/this.refs.refName.value |
| 获取组件的 value | this.state.value | this.refs.refName.value |
| set value | this.setState\(\) | 不需要手动 set，ref 自动同步 |

<Hint type="warn">react 判断一个组件是否是受控组件不是单纯地看是否有 value 属性，而是要进一步判断 value 属性的值 value != null，尤其要注意是 **!=** 。</Hint>

由于 `undefined == null` 是 true，如果 value 绑定的值初始状态是 null 或 undefined 的时候 react 会认为该组件是非受控组件，控制台会出现：

```text
Warning: MyForm is changing an uncontrolled input of type text to be controlled. Input elements should not switch from uncontrolled to controlled \(or vice versa\). Decide between using a controlled or uncontrolled input element for the lifetime of the component.
```

<Hint type="bad">受控组件的 value/checked 属性的初始值必须是空字符串（''）。</Hint>

示例：

```jsx
<input
  type="text"
  value={this.state.name || ''}
  onChange={this.handleChange.bind(this)}
/>
```

## Ref
