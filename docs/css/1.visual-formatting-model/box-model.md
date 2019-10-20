---
title: 盒模型
sidebar_label: 盒模型
---

import Img from '../../../src/components/Img'

## display

| level                                                                                    | box                     | display                                                                                                                                                                                         | formatting context                            |
| ---------------------------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| block-level                                                                              | block box               | block                                                                                                                                                                                           | BFC                                           |
|                                                                                          | list-item box           | list-item                                                                                                                                                                                       |                                               |
|                                                                                          | table box               | table                                                                                                                                                                                           |                                               |
|                                                                                          | flex box                | flex                                                                                                                                                                                            |                                               |
|                                                                                          | grid box                | grid                                                                                                                                                                                            |                                               |
| inline-level                                                                             | atomic inline-level box | inline-block, inline-table, inline-flex, inline-grid                                                                                                                                            | BFC/IFC(透明)                                 |
|                                                                                          | inline box              | inline                                                                                                                                                                                          | IFC                                           |
| CSS对其归属说得比较模糊，毕竟在CSS诞生前table就存在了。可以简单理解为(特殊的)block-level |                         | table-row-group (tbody), table-header-group (thead), table-footer-group (tfoot), table-row (tr), table-column-group (colgroup), table-column (col), table-cell (td, th),table-caption (caption) | TFC(CSS2.2), 在CSS2.1中是BFC，还没有TFC的概念 |
| others                                                                                   |                         | none, initial, inherit, unset                                                                                                                                                                   |                                               |

https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5/HTML5_element_list

<Img align="center" legend="图：CSS3 盒模型" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/vompaN.jpg'/>

## block-level box

<Img align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/w9XTln.jpg'/>

## inline-level box

inline-level box 包括 `inline`, `inline-table` 和 `inline-block` 。 `inline-level` 元素生成 inline-level box，inline-level box 参与 IFC。

inline box 是一种特殊的，`display` 值为 `inline` 的非替换元素会生成一个inline box，不参与生成行内格式化上下文的行内级盒称为原子行内级盒。

## margin

margin 重叠 3 种场景

- 相邻兄弟元素margin合并
- 父元素和第一个/最后一个子元素
- 空块级元素margin合并

## width

width: auto


