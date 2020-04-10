---
title: Image
---

import Img from '../../../src/components/Img';

## Img component

This component is often used for responsive, lazy-loading, and low quality placeholder and supports jpg, png, gif and etc.

### Example

```jsx
import Img from '../../../src/components/Img';

<Img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/middleware.png" />;
```

<Img w="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/kqJMh6.jpg" legend="Figure 1: Different sizes in window" origin="/docs/web/3.browser/window" />

### Properties

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| src | string | '' | The url of image, support `jpg`/`jpeg`/`png`/`svg`/`gif` only. |
| with \| w | integer \| percentage | `100%` | Specify one width you want to use to make sure the texts' fontsize in image are same to the context. |
| align | `'left'` \| `'center'` \| `'right'` | `'center'` | Specify the position of image in vertical, same to `align` property in HTML. |
| legend | string | '' | Brief description below the image. |
| origin | string | '' | The original source of the image which will be opened in new tab if clicked. |
| float<sup>_experimental_</sup> | `'left'` \| `'right'` | '' | Same to `float` in CSS. |

## Gif: LICEcap

## Upload: uPic
