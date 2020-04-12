---
title: Image
---

import Img from '../../../src/components/Img';

## Img component

This component is often used for align, lazy-loading, and adding legend and supports jpg, png, gif, etc.

### Example

```jsx
import Img from '../../../src/components/Img';

<Img
  w="450"
  src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/tree-shaking.jpg"
  legend="Figure: Tree shaking - green and yellow leaves"
  origin="https://m.redocn.com/ziranfengjing_6554002.html"
  alt="tree-shaking"
/>;
```

<Img
    w="450"
    src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/tree-shaking.jpg'
    legend="Figure: Tree shaking - green and yellow leaves"
    origin="https://m.redocn.com/ziranfengjing_6554002.html"
    alt='tree-shaking'
/>

### Properties

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| src | string | '' | The url of image, supports `jpg`/`jpeg`/`png`/`svg`/`gif` only. |
| with \| w | integer \| percentage | `100%` | Specify one width you want to use to make sure the texts' fontsize in image are same to the context. |
| align | `'left'` \| `'center'` \| `'right'` | `'center'` | Specify the position of image in vertical, same to `align` property in HTML. |
| legend | string | '' | Brief description below the image. |
| origin | string | '' | The original source of the image which will be opened in new tab if clicked. |
| alt | string | '' | Same to `alt` in native `<img>`. |
| float<sup>_experimental_</sup> | `'left'` \| `'right'` | '' | Same to `float` in CSS. |

## Gif: LICEcap

## Upload: uPic
