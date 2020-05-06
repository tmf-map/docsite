---
id: component-test
title: 组件测试
sidebar_label: 组件测试
---

组件测试本身就是单元测试，但是其又包括快照测试（Snapshot Test）这种特有的测试。

## 组件测试基础概念

### 快照测试

一般的快照测试是测试你的渲染组件的图片，并将其与组件的以前的图片进行比较。Jest 的快照测试也是其特有的功能，它不是拍摄渲染组件的图片，而是渲染组件 **标记** 的快照。 这使得 Jest 快照测试比传统快照测试快得多。

> 如何生成快照？

Jest 首次运行快照测试，会让 UI 框架生产一个可读的快照，再次测试时便会通过比对快照文件和新 UI 框架产生的快照判断测试是否通过。对于 React ，我们可以通过下面的方法生产一个快照：

```jsx
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

it('should renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

> 快照长什么样？

运行快照测试的时候将会自动生成一份以 `.snap` 结尾的文件，一般在该组件所在文件夹下的 `snapshots` 文件夹。

```javascript
exports[`should renders correctly 1`] = `
<a
    className="normal"
    href="http://www.facebook.com"
    onMouseEnter={[Function]}
    onMouseLeave={[Function]}
>
    Facebook
</a>
`;
```

如果测试用例中调用两次快照方法 `.toMatchSnapshot()` 那么会生成两个快照：

```javascript
exports[`should renders correctly 1`] = `
<a
    className="normal"
    href="http://www.facebook.com"
    onMouseEnter={[Function]}
    onMouseLeave={[Function]}
>
    Facebook
</a>
`;

exports[`should renders correctly 2`] = `
<a
    className="normal"
    href="http://www.facebook.com"
    onMouseEnter={[Function]}
    onMouseLeave={[Function]}
>
    Facebook
</a>
`;
```

这个可读的快照文件以可读的形式展示了 React 渲染出的 DOM 结构。相比于肉眼观察效果的 UI 测试，快照测试直接由 Jest 进行比对、速度更快；而且由于直接展示了 DOM 结构，也能让我们在检查快照的时候，快速、准确地发现问题。

> 如何更新快照？

![how to update snapshot test](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/WqhdAS.jpg)

详细参考：[https://jestjs.io/docs/zh-Hans/snapshot-testing](https://jestjs.io/docs/zh-Hans/snapshot-testing)

### 浅渲染

浅渲染（shallow rendering）意思就是只渲染组件中的第一层，这样测试执行器就不需要关心 DOM 和执行环境了。

在实际开发中，组件的层级非常深，所以测试顶层组件时，如果需要把所有子组件全部渲染出来，成本变得非常高。因为 React 组件良好的封装性，测试组件时，大部分测试只需要关注组件本身，它的子组件测试应该在子组件的测试代码里做。这样测试执行得更快。

但浅渲染的优点也对于着其缺点：只能测试一级节点，如果需要测试子组件，那就只能做全渲染。

例如有如下组件：

```jsx
const ButtonWithIcon = ({icon, children}) => (
  <button>
    <Icon icon={icon} />
    {children}
  </button>
);
```

React 渲染后：

```html
<button>
  <i class="icon icon_coffee"></i>
  Hello Jest!
</button>
```

但是如果经过 shallow rendering 将会是这样:

```html
<button>
  <Icon icon="coffee" />
  Hello Jest!
</button>
```

注意 Icon 组件并没有被渲染。

### 全渲染

全渲染（full rendering）就是完整渲染出当前组件及其所有子组件，就像在真实浏览器渲染那样，当组件内部直接改变了 DOM 时，就需要使用全渲染来测试。全渲染需要真实地模拟 DOM 环境，流行的做法有以下几种：

- **使用 JSDOM**：使用 JS 模拟 DOM 环境，能满足 90%的使用场景。这是 Jest 内部所使用的全渲染框架。
- **使用 Cheerio**：类似 JSDOM，更轻的实现，类似 jQuery 的语法。这是 Enzyme 内部使用的全渲染框架。
- **使用 Karma**：在真实的浏览器中执行测试，也支持在多个浏览器中依次执行测试，使用的是真实 DOM 环境，但速度稍慢。

## 组件测试框架

### Jest 组件测试

Jest 在组件测试方面特点有：

- **特有的快照测试功能：**通过比对 UI 代码生成的快照文件，确保组件呈现正确的样式。
- **JSDOM**：不需要真实 DOM 环境执行，而是 JSDOM 模拟的 DOM。

以上的例子如果用 Jest 来写，如下：

```jsx
import React from 'react';
import renderer from 'react-test-renderer';
import ButtonWithIcon from './ButtonWithIcon';

it('should render ButtonWithIcon correctly', () => {
  const component = renderer.create(ButtonWithIcon({'coffee', 'Hello Jest!'}));
  expect(result.type).toBe('button');
  expect(result.props.children).toEqual([
    <Icon icon="coffee" />,
    'Hello Jest!'
  ])
})
```

### Enzyme 组件测试

[Enzyme](http://airbnb.io/enzyme/) 是由 Airbnb 开源的 React 组件测试框架，与 Jest 的组件测试相比，Enzyme 提供类似 jQuery 操作 DOM 的语法，在做测试断言时更灵活、易用。

Enzyme 提供 3 种不同的方式来测试组件：

- [**shallow**](http://airbnb.io/enzyme/docs/api/shallow.html)：推荐的方式，浅渲染，只会渲染本地组件内容（只渲染不包含 children 的组件），引用的外部组件不会渲染，提供更好的隔离性。
- [**render**](http://airbnb.io/enzyme/docs/api/render.html)：如果 shallow 不能满足，才会使用它，能够渲染所有的子组件。基于 Cheerio 来模拟 DOM 环境（Cheerio 是类似 JSDOM 的另一框架）。
- [**mount**](http://airbnb.io/enzyme/docs/api/mount.html)：类似 render，会做全渲染，对测试生命周期非常有用，能够访问到组件的生命周期方法，比如 `componentDidUpdate` 等。一般用于集成测试。

[Enzyme Selector](http://airbnb.io/enzyme/docs/api/selector.html)

:::good

一般组件的快照测试使用 shallow 方法即可。

:::

:::good

如果要测试子组件，并且对组件的生命周期等方法不怎么关注，使用 render 方法。

:::

:::good

如果要测试组件生命周期方法、子组件，使用 mount 方法。

:::

## 编写组件测试

### 测试 rendering

对于大部分非交互组件使用 `toMatchSnapshot()` 即可：

```javascript
import {shallow} from 'enzyme';

it('should render a label', () => {
  const wrapper = shallow(<Label>Hello Jest!</Label>);
  expect(wrapper).toMatchSnapshot();
});

it('should render a small label', () => {
  const wrapper = shallow(<Label small>Hello Jest!</Label>);
  expect(wrapper).toMatchSnapshot();
});

it('should render a grayish label', () => {
  const wrapper = shallow(<Label light>Hello Jest!</Label>);
  expect(wrapper).toMatchSnapshot();
});
```

写组件测试的时候需要将 Enzyme 和 Jest 结合起来使用，两者是互补的，它们已经是 React 应用测试中大家公认的标准库。

:::caution

这种直接使用 `toMatchSnapshot()` 方法的测试比较笼统、简单粗暴，且没有针对性，只是比较方便，权衡使用。

:::

:::caution

每调一次 `toMatchSnapshot()` 方法就会生成一份快照，虽然还是一个快照文件，但里面可能会有不同状态的快照。

:::

:::caution

快照测试抛错不过，不一定是写代码有问题，有可能组件加入了新属性等原因导致的，属于正常的，手动更新一下快照即可。

:::

:::caution

使用 snapshot test 后组件的测试覆盖率将会大幅提高，部分会达到 100%。

:::

### 测试 **props**

有时候你想更有针对性地测试，比如组件的某个属性是否渲染正确，你可以使用 Enzyme API + Jest 断言的组合方式：

```javascript
it('should render a document title', () => {
  const props = {title: 'Events'};
  const wrapper = shallow(<DocumentTitle {...props} />);
  expect(wrapper.prop('title')).toEqual('Events');
});

it('should render a document title and a parent title', () => {
  const props = {title: 'Events', parent: 'Event Radar'};
  const wrapper = shallow(<DocumentTitle {...props} />);
  expect(wrapper.prop('title')).toEqual('Events — Event Radar');
});
```

在某些情况下是不太适合使用 `toMatchSnapshot()` 的，例如组件中 id 属性是随机产生的：

```javascript
it('should render a popover with a random ID', () => {
  const wrapper = shallow(<Popover>Hello Jest!</Popover>);
  expect(wrapper.prop('id')).toMatch(/Popover\d+/);
});
```

如果用 `toMatchSnapshot()` 的话每次测试都会不过，需要不断更新快照。

### 测试 **events**

Enzyme 可以模拟事件操作后（例如 click 或 change 等）再和测试快照进行对比：

```javascript
it('should render Markdown in preview mode when click toggle-preview', () => {
  const wrapper = shallow(<MarkdownEditor value="**Hello** Jest!" />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('[name="toggle-preview"]').simulate('click');
  expect(wrapper).toMatchSnapshot();
});
```

如果你需要测试与组件中某一个元素或子组件的交互，此时需要调用 Enzyme 中的 `render/mount` 方法而不是 `shallow` 方法：

```javascript
it('should open a code editor after clicked the button', () => {
  const wrapper = render(<Playground code={code} />);
  expect(wrapper.find('.ReactCodeMirror')).toHaveLength(0);
  wrapper.find('button').simulate('click');
  expect(wrapper.find('.ReactCodeMirror')).toHaveLength(1);
});
```

### 测试 **event handlers**

和 Testing events 差不多，主要区别是 Testing events 关注的是事件后对组件渲染产生的影响，而 Testing event handlers 关注的是事件处理函数：

```javascript
it('should pass a selected value to the onChange handler', () => {
  const value = '2';
  const onChange = jest.fn();
  const wrapper = shallow(<Select items={ITEMS} onChange={onChange} />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('select').simulate('change', {
    target: {value}
  });
  expect(onChange).toBeCalledWith(value);
});
```
