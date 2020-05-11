---
id: link
title: Link
---

在各个页面间切换时如果使用锚点元素实现，那么每次点击时页面将被重新加载。React Router 提供了 &lt;Link&gt; 组件用来避免这种状况的发生。当你点击 &lt;Link&gt; 时，URL 会更新，组件会被重新渲染，但是页面不会重新加载。

```jsx
import {Link} from 'react-router-dom';
const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/article">Article</Link>
        </li>
      </ul>
    </nav>
  </header>
);
```

&lt;Link&gt; 使用 'to' 参数来描述需要定位的页面。它的值即可是字符串也可是 location 对象（包含 pathname，search，hash 与 state 属性）。如果其值为字符串将会被转换为 location 对象：

```jsx
<Link to={{pathname: '/article/6'}}>Article #6</Link>
```
