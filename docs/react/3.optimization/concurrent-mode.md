---
title: Concurrent mode
---

import Img from '../../../src/components/Img';

## 什么是 Concurrent 模式

Concurrent 模式是一组 React 的新功能，可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整，使 React 应用具有更高的响应速度。

来看 Dan 在 JSConf Iceland 上演示的 [Demo](https://codesandbox.io/s/koyz664q35)。我们可以明显感受到三种模式带来的体验差异，Sync 模式下页面是完全卡顿的，input 连续输入得不到响应，Debounced 模式下尽管连续输入流畅，但由于变更被统一延迟，下方图表没有随输入改变而重渲染，只有 Concurrent 模式下是正常的体验，输入流畅，图表也随之而变更。

这就是 Concurrent 模式，它能使 React 在长时间渲染的场景下依旧保持良好的交互性，能优先执行高优先级变更，不会使页面处于卡顿或无响应状态，从而提升用户体验。

:::caution

这些功能尚处于试验阶段，可能会发生改变。它们还不是稳定的 React 版本中的一部分，但是你可以在实验版本中尝试它们。

:::

## 并发 concurrent

在介绍 Concurrent 模式之前，有必要了解一下什么是 concurrent（并发）。Javascript 是一种单线程语言。每当主线程执行一个任务时，都会阻塞，其它任务只能等待。然而，这并不意味着同时只能存在一个任务。这很令人困惑对吗？让我们来看一个实际生活的例子：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/concurrent-and-parallel.jpg' alt='concurrent-and-parallel' width='600'/>

如上图，如果有两个咖啡机（线程），那么刚好两队人（任务）可以分别使用；而只有一个咖啡机时，两队人可以轮流使用。这种一个线程可以支持两个任务**同时存在**的情况，就是并发。而有两台咖啡机的那种情况叫做并行，顾名思义它强调"行"，执行，即两个任务可以**同时执行**。注意并发并没有改变只有一个线程的限制，在同一时间点上只会有一个任务在执行，但并发关键在于**有处理多个任务的能力**。

所以什么是并发? 并发是将任务分割成可以独立执行的片段，让这些任务片段轮流执行，打破单线程限制，使其能处理多个任务，从而使我们的程序更加高效。

## 阻塞渲染与可中断渲染

渲染是用户体验中极为重要的因素，渲染速度越快，用户体验将越好。但是，当 React 渲染更新时，该过程是同步的。这期间有许多事情需要处理，比如调用组件各个生命周期函数、计算和对比虚拟 DOM、更新 DOM 树等。不能中断这个过程，必须等待更新完成，这种方式称为“阻塞渲染”。当组件树比较庞大的时候，问题就来了。浏览器主线程专心进行 React 渲染更新操作，用户在 input 中输入不会有反应。当 React 更新完成，刚刚输入的的东西一下子出现在了 input 中。这就是所谓的界面卡顿，用户体验非常不友好。

Concurrent 模式通过使渲染可中断来修复此限制。这意味着当用户在 input 中输入时，React 不需要阻塞浏览器更新文本输入，相反，它可以让浏览器绘制 input 输入，然后在内存中渲染更新。当渲染完成后，React 更新 DOM，变化会反映在屏幕上。类比 Git 版本控制，React 在分支上准备每一次更新。可以中断一项正在执行的更新，切换到另一条分支上去做更重要的事情，然后再回到之前的分支上继续工作。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/react-concurrent-mode.png' alt='react-concurrent-mode' width='600'/>

对比上一节 Concurrent 的概念，Concurrent 模式将 React 渲染更新过程分解成较小的任务。每执行完一段更新过程就把控制权交还给 React 负责任务协调的模块，看看有没有其它更紧急的任务需要做。如果有就会中断更新，转而执行更重要的任务，比如绘制用户 input 输入，完毕后再回到之前正在做的任务。

## Suspense 用于数据获取

当可以渲染的 UI 还没准备好时，Suspense 可以使其显示为 Loading 状态。React 之前只支持[React.lazy 的 Suspense](/docs/react/3.optimization/suspense)。在 Concurrent 模式中，支持 Suspense 用于数据获取。

### Render-as-You-Fetch

`Suspense` 是一种数据获取和 React 进行通信的机制。`Suspense` 告知组件正在读取的数据尚未准备好，React 可以等待它准备好并更新页面。React 会在渲染之前尽早拉取数据，并立刻开始渲染下一个页面，如果这时数据未准备好，就会抛出一个 promise，然后进入 `Suspense fallback`，等到 promise resolve 后，表示数据已经准备好，React 会重试渲染。

```js
const resource = fetchProfileData();

function ProfilePage() {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
  // Try to read posts, although they might not have loaded yet
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

未来`resource` 很可能会被修改，先不需要深入了解，目前只需知道它这样 read，可能会抛出一个 promise 给 react 就够了。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/suspense.gif' alt='suspense' width='600'/>

### SuspenseList

有时，会有一个以上的`Suspense`在页面上，可以使用`SuspenseList`将它们包裹起来，并设置属性`tail`为`collapsed`，这样页面上的`fallback`就会只出现一个：

```js
<SuspenseList tail="collapsed">
  <Suspense fallback={<h1>Loading...</h1>}></Suspense>
  <Suspense fallback={<h1>Loading...</h1>}></Suspense>
</SuspenseList>
```

`SuspenseList`另一个有趣的属性是`revealOrder`，来看一下几张对比图。一般情况下，所有图片出现参差不齐。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/without-suspense.gif' alt='without-suspense' width='600'/>

设置`revealOrder`为`forwards`的效果如下图，从左往右，从上往下依次出现。还可以设置为`backwards`，将会倒序依次出现。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/inorder-suspense.gif' alt='inorder-suspense' width='600'/>

设置`revealOrder`为`together`的效果如下图：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/suspense-together.gif' alt='suspense-together' width='600'/>

## Concurrent UI 模式

通常，当我们更新 state 的时候，我们会期望这些变化立刻反映到屏幕上，比如应用能够持续响应用户的输入，这是符合常理的。但是，有时我们会期望更新延迟响应在屏幕上。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/concurrent-loading.gif' alt='concurrent-loading' width='600'/>

如上图，当用户从 Home 页面切换到 Profile 页面时，可能没有准备好新页面所需的数据或代码。这样过渡到一个空白屏或者大型的轮播图会是一个不愉快的体验。然而，通常获取所需的代码和数据不会花费太长时间。如果 React 可以在旧页面上多停留一段时间，并在展示新页面之前“跳过”“不够好的加载状态”，不是更好吗？

之前类比过 Concurrent 模式就像 React 工作"在分支上"。React 首先在内存中准备新页面 — 或者用类比的说法，"在不同的分支上"准备新页面。所以 React 可以在更新 DOM 之前进行等待，以便加载到更多资源。在 Concurrent 模式中，我们可以让 React 继续显示旧页面，且用户可以继续与其交互。当新页面准备就绪之后，React 可以带我们跳转到新页面。

React 提供了一个新的 `useTransition()` Hook 可以实现这个设计。

### useTransition

```js
const SUSPENSE_CONFIG = {timeoutMs: 2000};
const [startTransition, isPending] = useTransition(SUSPENSE_CONFIG);
```

`useTransition`可以传入一个配置对象：

- `timeoutMs` number 类型，表示希望这个转换在多少毫秒之内完成。`{timeoutMs: 2000}`表示如果下一个页面需要 2 秒以上才能加载好，那么先展示当前页面，到 2 秒后再展示 Loading 页面。

`useTransition`包含两个返回值：

- `startTransition` 类型为函数，用来告诉 React 我们需要延迟哪个 state 的更新
- `isPending` 类型为 boolean，此变量在 React 中告知我们该转换是否正在进行

```js
function App() {
  const [resource, setResource] = useState(initialResource);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000
  });

return (
  <>
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          const nextUserId = getNextId(resource.userId);
          setResource(fetchProfileData(nextUserId));
        });
      }}
    >
      Next
    </button>
    {isPending ? " Loading..." : null}
    <ProfilePage resource={resource} />
  </>
);
```

引入`useTransition` Hook，传入`{timeoutMs: 3000}`使得前一个页面最多保持 3 秒。把 state 包裹在`startTransition`中，以通知 react 可以延迟更新。使用`isPending`来告诉用户页面切换的进展。

[在 CodeSandbox 中尝试](https://codesandbox.io/s/jovial-lalande-26yep)

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/use-transition-demo.gif' alt='use-transition-demo' width='600'/>

### useDeferredValue

```js
const deferredValue = useDeferredValue(value, {timeoutMs: 2000});
```

该 Hook 会返回一个延迟响应的值，且该值可能“延后”的最长时间为 `timeoutMs`。其作用是，告诉 React 可以延迟一段时间后再渲染此值。它一般的使用场景是：当界面上有需要立即渲染的 input，或者需要等待数据获取的内容时，保持界面可响应。

```js
function App() {
  const [value, setValue] = useState('');
  const deferredValue = useDeferredValue(value, {timeoutMs: 5000});

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <div className="App">
      {/* 保持将当前文本传递给 input */}
      <input value={value} onChange={handleChange} />
      ...
      {/* 在必要时，可以将Grid“延后”渲染 */}
      <Grid value={deferredValue} />
    </div>
  );
}
```

上述代码可以立即显示 input 的新文本，从而使用户感觉到网页在响应。同时，根据 `timeoutMs`，`Grid` 在更新前“延后” 5 秒，允许它在后台渲染当前文本。

[在 CodeSandbox 中尝试](https://codesandbox.io/s/blocking-vs-interruptible-8l52r?from-embed=&file=/src/App.js)

:::caution

useDeferredValue Hook 可能会导致视图不一致，因为我们优先显示一个 UI，而将另一个延后

:::

## 开启 concurrent 模式

concurrent 模式目前只在 React 实验版本中，首先安装实验版：

```js
npm install react@experimental react-dom@experimental
```

然后修改代码：

```js
import ReactDOM from 'react-dom';

// 如果你之前的代码是：
//
// ReactDOM.render(<App />, document.getElementById('root'));
//
// 你可以用下面的代码引入 concurrent 模式：

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

## 参考链接

1. [Concurrent 模式介绍 (实验性), react 官方文档](https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html)
1. [理解 React 的下一步：Concurrent Mode 與 Suspense，by C.T.Lin](https://medium.com/@chentsulin/%E7%90%86%E8%A7%A3-react-%E7%9A%84%E4%B8%8B%E4%B8%80%E6%AD%A5-concurrent-mode-%E8%88%87-suspense-327b8a3df0fe)
1. [深入剖析 React Concurrent, by 淡苍](https://zhuanlan.zhihu.com/p/60307571)
1. [What Is React Concurrent Mode And Why You Will Love It? by Mariusz](https://dev.to/pagepro_agency/what-is-react-concurrent-mode-and-why-you-will-love-it-1j23)
1. [What is React Concurrent Mode? by Sveta Slepner](https://medium.com/swlh/what-is-react-concurrent-mode-46989b5f15da)
