---
id: route
title: Route
---

&lt;Route&gt; 组件是 react-router 中主要的结构单元。在任意位置只要匹配了 URL 的路径名 \(pathname\) 你就可以创建 &lt;Route&gt; 元素进行渲染。

## 路径\(Path\)

&lt;Route&gt; 接受一个数为 string 类型的 `path`。在当前 path 参数与当前 location 的路径相匹配时，路由就会开始渲染 React 组件。若不匹配，路由不会进行任何操作。

```jsx
// 当路径名为'/'时, path不匹配
// 当路径名为'/article'或'/article/2'时, path匹配
<Route path='/article' />

// 当你只想匹配'/article'时，你需要使用"exact"参数
// 则路由仅匹配'/article'而不会匹配'/article/2'
<Route exact path='/article' />
```

:::caution

在匹配路由时，react-router 只关注 location 的**路径名**。

:::

例如当 URL 如下时：

```text
http://www.example.com/my-projects/one?extra=false
```

react-router 去匹配的只是 '/my-projects/one' 这一部分。

## 匹配路径

`path-to-regexp`包用来决定 route 元素的 path 参数与当前 location 是否匹配。它将路径字符串编译成正则表达式，并与当前 location 的路径名进行匹配比较。除了上面的例子外，路径字符串有更多高级的选项，详见 path-to-regexp 文档。  
当路由地址匹配成功后，会创建一个含有以下属性的 `match` \_\_对象：

- url ：与当前 location 路径名所匹配部分
- path ：路由的地址
- isExact ：path 是否等于 pathname
- params ：从 path-to-regexp 获取的路径中取出的值都被包含在这个对象中

使用 [route tester](https://pshrmn.github.io/route-tester/#/) 这款工具来对路由与 URL 进行检验。

## 创建路由

可以在 &lt;Router&gt; 中的任意位置创建多个 &lt;Route&gt;，但通常我们会把它们放在同一个位置。使用 &lt;Switch&gt; 组件来包裹一组 &lt;Route&gt;。&lt;Switch&gt; 会遍历自身的子元素（即 &lt;Route&gt;）并对第一个匹配当前路径的元素进行渲染。

例如我们希望匹配以下路径：

- / ：  主页
- /article ： 文章列表
- /article/:id ：文章详情页

为了在应用中能匹配路径，在创建&lt;Route&gt;元素时必须带有需要匹配的 path 作为参数。

```jsx
<Switch>
  <Route exact path="/" component={Home} />
  {/* both /article and /article/:id begin with /user */}
  <Route path="/article" component={rticle} />
</Switch>
```

## &lt;Route&gt;是如何渲染的？

当一个路由的 path 匹配成功后，路由用来确定渲染结果的参数有三种。只需要提供其中一个即可。

- **component** ： 一个 React 组件。当带有 component 参数的 &lt;Route&gt; 匹配成功后，&lt;Route&gt; 会返回一个新的元素，其为 component 参数所对应的 React 组件。
- **render** ： 一个返回 React element 的函数。当匹配成功后调用该函数，该过程与传入 component 参数类似，并且对于**行级渲染与需要向元素传入额外参数**的操作会更有用。
- **children** ： 一个返回 React element 的函数。与上述两个参数不同，无论 route 是否匹配当前 location，其都会被渲染。

```jsx
<Route path='/page' component={Page} />
const extraProps = { color: 'red' }
<Route path='/page' render={(props) => (
  <Page {...props} data={extraProps}/>
)}/>
<Route path='/page' children={(props) => (
  props.match
    ? <Page {...props}/>
    : <EmptyPage {...props}/>
)}/>
```

常用的是`component`参数与`render`参数。`children`参数偶尔会被使用，它更常用在 path 无法匹配时呈现的 '空' 状态。在本例中并不会有额外的状态，所以我们将使用 &lt;Route&gt; 的 component 参数。

通过 &lt;Route&gt; 渲染的元素会被传入一些参数，分别是：

- match 对象
- 当前 location 对象
- history 对象（由 &lt;Router&gt; 创建）

## &lt;Main&gt;

现在我们清楚了根路由的结构，我们需要实际渲染我们的路由。对于这个应用，我们将会在 &lt;Main&gt;组件 中渲染 &lt;Switch&gt; 与 &lt;Route&gt;，这一过程会将 &lt;Route&gt; 匹配生成的 HTML 放在 &lt;main&gt; 节点中。

```jsx
import {Switch, Route} from 'react-router-dom';
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/article" component={Article} />
    </Switch>
  </main>
);
```

> **提示**：可以用 exact 参数用来保证路由能准确匹配 path。

## 嵌套路由

文章详情页路由`/article/:id`并未包含在上述 &lt;Switch&gt; 中。它由 &lt;Article&gt; 组件负责在路径包含 '/article' 的情形下进行渲染。

在&lt;Article&gt;组件中，我们将为两种路径进行渲染：

- /article ：对应路径名仅仅是/article 时，因此需要在 exact 元素上添加 exact 参数。
- /article/:id ：  该路由使用一个路由参数来获取 /article 后的路径名。

```jsx
const Article = () => (
  <Switch>
    <Route exact path="/article" component={ArticleList} />
    <Route path="/article/:id" component={ArticleDetail} />
  </Switch>
);
```

组合在相同组件中分享共同前缀的路由是一种有用的方法。这就需要简化父路由并且提供一个区域来渲染具有相同前缀的通用路由。

例如，&lt;Article&gt; 用来渲染所有以`/article`开始的全部路由。

```jsx
const Article = () => (
  <div>
    <h2>This is a article page!</h2>
    <nav>
      <span>ArticleList</span>
      <span>ArticleList</span>
    </nav>
    <Switch>
      <Route exact path="/article" component={ArticleList} />
      <Route path="/article/:id" component={ArticleDetail} />
    </Switch>
  </div>
);
```

:::caution

Switch 里面直接要嵌套 Route，否则在路由跳转的时候会出现一些意想不到的情况。

:::

## 路径参数

有时路径名中存在我们需要获取的参数。例如，我们需要获取文章的 id。我们可以向 &lt;Route&gt; 中添加 path 参数。

如 '/article/:id' 中`:id`这种写法意味着 /article/ 后的路径名将会被获取并存在`match.params.id`中。例如，路径名'/article/6'会获取到一个对象：

```jsx
{
  id: '6';
} // 获取的值是字符串类型
```

&lt;ArticleDetail&gt; 组件可以使用 props.match.params 对象来确定需要被渲染的文章的数据。

```jsx
import ArticleAPI from './ArticleAPI'
const Player = (props) => {
  const article = ArticleAPI.get(
    parseInt(props.match.params.id, 6)
  )
  if (!article) {
    return <div>Sorry, but the article was not found</div>
  }
  return (
    <div>
      <h1>{article.name} (#{article.id})</h1>
      <h2>{article.content}</h2>
    </div>
)
```

你可以通过阅读 [path-to-regexp 文档](https://github.com/pillarjs/path-to-regexp#parameters) 来了解更多。
