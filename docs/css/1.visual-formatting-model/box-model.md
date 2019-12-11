---
title: 盒模型
sidebar_label: 盒模型
---

import Hint from '../../../src/components/Hint'; import Img from '../../../src/components/Img';

## display

| level | box | display | formatting context |
| --- | --- | --- | --- |
| block-level | block box | block | BFC |
|  | list-item box | list-item |  |
|  | table box | table |  |
|  | flex box | flex |  |
|  | grid box | grid |  |
| inline-level | atomic inline-level box | inline-block, inline-table, inline-flex, inline-grid | BFC/IFC(透明) |
|  | inline box | inline | IFC |
| CSS 对其归属说得比较模糊，毕竟在 CSS 诞生前 table 就存在了。可以简单理解为(特殊的)block-level |  | table-row-group (tbody), table-header-group (thead), table-footer-group (tfoot), table-row (tr), table-column-group (colgroup), table-column (col), table-cell (td, th),table-caption (caption) | TFC(CSS2.2), 在 CSS2.1 中是 BFC，还没有 TFC 的概念 |
| others |  | none, initial, inherit, unset |  |

https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5/HTML5_element_list

<Img align="center" legend="图：CSS3 盒模型" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/vompaN.jpg'/>

## block-level box

<Img align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/w9XTln.jpg'/>

## inline-level box

inline-level box 包括 `inline`, `inline-table` 和 `inline-block` 。 `inline-level` 元素生成 inline-level box，inline-level box 参与 IFC。

inline box 是一种特殊的，`display` 值为 `inline` 的非替换元素会生成一个 inline box，不参与生成行内格式化上下文的行内级盒称为原子行内级盒。

## margin

margin 合并（重叠） 3 种场景：

- 相邻兄弟元素 margin 合并
- 父元素和第一个/最后一个子元素 margin 合并
- 空块级元素 margin 合并

### margin 合并与 BFC

[BFC](/docs/css/1.visual-formatting-model/normal-flow#bfc-%E7%89%B9%E7%82%B9) 中有两条规则和 margin 合并相关：

- **产生兄弟合并**：垂直方向属于同一个 BFC 里的元素 **垂直方向** margin 合并。
- **解决父子合并**：BFC 就是页面上的一个隔离的独立容器，里外互相不影响，产生了一种“结界”效果。

### margin 合并的计算规则

- 正正取大值
- 正负值相加
- 负负最负值

### 父子合并

#### 意义

在页面中任何地方嵌套或直接放入任何空白 `<div>` ，都不会影响原来的块状布局。 `<div>` 是网页布局中非常常用的一个元素，其语义是没有语义，也就是不代表任何特定类型的内容，是一个通用型的具有流体特性的容器，可以用来分组或分隔。由于其作用就是分组的，因此，从行为表现上来看，一个纯粹的 `<div>` 元素是不能够也不可以影响原先的布局的。现在有如下一段 HTML:

```html
<div style="margin-top:20px;"></div>
```

请问: 现在要在上面这段 HTML 的外面再嵌套一层 `<div>` 元素，假如说现在没有父子 margin 合并，那这层新嵌套的 `<div>` 岂不阻断了原本的兄弟 margin 合并?很有可能间距就会变大， 妥妥地影响了原来的布局，这显然就违背了 `<div>` 的设计作用了。所以才有了父子 margin 合 并，外面再嵌套一层 `<div>` 元素就跟没嵌套一样，表现为 `margin-top:20px` 就好像是设置在 最外面的 `<div>` 元素上一样。

<Img align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/svhvwA.jpg'/>

请看以下三种写法：

```jsx live
<div style={{marginTop: '20px', backgroundColor: 'ffa39e'}}>
  <div style={{backgroundColor: '#91d5ff'}}>子元素</div>
</div>
```

```jsx live
<div style={{backgroundColor: 'ffa39e'}}>
  <div style={{marginTop: '20px', backgroundColor: '#91d5ff'}}>子元素</div>
</div>
```

```jsx live
<div style={{marginTop: '20px', backgroundColor: 'ffa39e'}}>
  <div style={{marginTop: '20px', backgroundColor: '#91d5ff'}}>子元素</div>
</div>
```

我们会发现，这三种写法，竟然最终的渲染效果是一样的：margin-top 最终都作用在了父元素上。

#### 如何避免

对于 margin-top 合并，可以进行如下操作(满足一个条件即可):

- 父元素设置为 BFC 元素;
- 父元素设置 border-top 值;
- 父元素设置 padding-top 值;
- 父元素和第一个子元素之间添加内联元素进行分隔。比如：

```jsx live
<div style={{backgroundColor: '#ffa39e'}}>
  父元素
  <div style={{marginTop: '20px', backgroundColor: '#91d5ff'}}>子元素</div>
</div>
```

<Hint type="tip">阻止父子 margin 合并都是针对父元素进行操作。</Hint>

在实际开发的时候，给我们带来麻烦的多半就是这里的父子 margin 合并。 比方说，现在流行官网使用一张大的背景图，然后配上大大的网站标题。由于这个标题一般离头图的顶部有一定距离，因此，我们很自然会想到使用 margin-top 定位，然后问题就来了。因为发生了“奇怪”的事情，头图居然也跟着掉下来了!

```jsx live
<div style={{backgroundColor: '#ffa39e', height: '50px', textAlign: 'center'}}>
  <div style={{marginTop: '20px'}}>网站标题</div>
</div>
```

如何解决呢，请读者在 LIVE EDITOR 中调试一下，参考以上方案和代码即可。

### 兄弟合并

<Img align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/hAZ0jg.jpg'/>

#### 意义

是为了让图文信息的排版更加舒服自然。设想，当我们上下排列一系列规则的块级元素（如段落 P）时，那么块元素之间因为外边距重叠的存在，段落之间就不会产生双倍的距离。

<Img align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/oNyETU.jpg'/>

```jsx live
<>
  <div style={{marginBottom: '20px', backgroundColor: '#ffa39e'}}>第一行</div>
  <div style={{marginTop: '20px', backgroundColor: '#91d5ff'}}>第二行</div>
</>
```

打开控制台，我们会发现上下元素发生了 margin 合并。

#### 如何避免

如果不希望兄弟元素有 margin 合并，可以进行如下操作(满足一个条件即可):

- 其中一个兄弟外面包裹一层 BFC “结界”

```jsx live
<>
  <div style={{overflow: 'hidden'}}>
    <div style={{marginBottom: '20px', backgroundColor: '#ffa39e'}}>第一行</div>
  </div>
  <div style={{marginTop: '20px', backgroundColor: '#91d5ff'}}>第二行</div>
</>
```

- 设置 inline-block

```jsx live
<>
  <div
    style={{
      marginBottom: '20px',
      backgroundColor: '#ffa39e',
      display: 'inline-block'
    }}>
    第一行
  </div>
  <div style={{marginTop: '20px', backgroundColor: '#91d5ff'}}>第二行</div>
</>
```

### 空块级合并

#### 意义

可以避免不小心遗落或者生成的空标签影响排版和布局。 例如:

```html
<p>第一行</p>
<p></p>
<p></p>
<p></p>
<p></p>
<p>第二行</p>
```

其和下面这段 HTML 最终视觉效果是一模一样的:

```html
<p>第一行</p>
<p>第二行</p>
```

若是没有自身 margin 合并特性的话，怕是上面的 HTML 第一行和第二行之间要隔了很多行吧。

再看以下代码：

```jsx live
<div style={{overflow: 'hidden', backgroundColor: '#ffa39e'}}>
  <div style={{margin: '20px 0', backgroundColor: '#91d5ff'}}></div>
</div>
```

此时父级 `<div>` 元素高度仅仅是 `20px`，因为子元素是个空 `<div>` ，它的 margin-top 和 margin-bottom 发生了合并。

<Hint type="tip">这种空块级元素的 margin 合并特性即使自身没有设置 margin 也是会发生的。</Hint>

所谓“合” 并不一定要自己出力，只要出人就可以。比方说，我们一开始的“相邻兄弟元素 margin 合并”， 其实，就算兄弟不相邻，也是可以发生合并的，前提是中间插手的也是个会合并的家伙。比方说:

```jsx live
<>
  <div style={{marginBottom: '20px', backgroundColor: '#ffa39e'}}>第一行</div>
  <div></div>
  <div style={{marginTop: '20px', backgroundColor: '#91d5ff'}}>第二行</div>
</>
```

此时第一行和第二行之间的距离还是 20px，中间看上去隔了一个 `<div>` 元素，但对最终效果却没有任何影响。如果非要细究，则实际上这里发生了 3 次 margin 合并，空 `<div>` 和第一行 `<div>` 的 margin-bottom 合并，然后和第二行 `<div>` 的 margin-top 合并，这两次合并是相邻兄弟合并。由于自身是空 `<div>`，于是前两次合并的 margin-bottom 和 margin-top 再次合并， 这次合并是空块级元素合并，于是最终间距还是 20px。

这种情况在平时开发中还是比较少见的，因为：

1. 我们很少会在页面上放置没什么用的空 `<div>`;
2. 即使使用空 `<div>` 也是画画分隔 线之类的，一般都是使用 border 属性，正好可以阻断 margin 合并;
3. CSS 开发人员普遍没有 margin 上下同时开工的习惯，比方说一个列表，间距都是一样的，开发人员一般都是单独设定 margin-top 或 margin-bottom 值，因为这会让他们内心觉得更安全。

于是，最终空块级元素的 margin 合并就变成了一个对 CSS 世界有着具有巨大意义但大多数人都不知道的特性。

#### 如何避免

如果不希望空 `<div>` 元素有 margin 合并，可以进行如下操作:

- 设置垂直方向的 border;
- 设置垂直方向的 padding;
- 里面添加内联元素(直接 Space 键空格是没用的);
- 设置 height 或者 min-height。

### 小结

- 父子元素合并需要**保证父子没有被非空内容、padding、border 或 clear 分隔开**。
- 兄弟元素合并不受 `padding`、`border`等的限制，即使含有也会产生合并。
- 兄弟元素触发 BFC 并不一定保证解决兄弟合并，例如：为兄弟元素设置了 `overflow:hidden`，虽然触发了 BFC，但是 `margin`还是会发生合并。

## width

width: auto

## 参考资料

1. [《CSS 世界》作者：张鑫旭](https://book.douban.com/subject/27615777/)
2. [CSS 外边距(margin)重叠及防止方法，作者：胡俊涛](http://www.hujuntao.com/web/css/css-margin-overlap.html)
