---
title: Image
---

import Img from '@site/src/components/Img';

import GifPlayer from '@site/src/components/GifPlayer';

## Img

This component is often used for align, lazy-loading, and adding legend and supports jpg, png, gif, etc.

### Example

```jsx
import Img from '@site/src/components/Img';

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

## Gif Player

Similar to Facebook's GIF toggle UI, this React component displays a still image preview by default, and swaps in an animated GIF when clicked. The images are preloaded as soon as the component mounts, or whenever a new source is passed.

### Example

```jsx
import GifPlayer from '@site/src/components/GifPlayer';

<GifPlayer
  gif="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/quick-sort-two-pointer.2020-07-26%2013_04_24.gif"
  still="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/quick-sort-two-pointer.jpg"
/>;
```

<GifPlayer
    gif="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/quick-sort-two-pointer.2020-07-26%2013_04_24.gif"
    still="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/quick-sort-two-pointer.jpg"
/>

### Properties

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| gif | string | '' | Address to an animated GIF image. |
| still | string | '' | Address to a still preview of the GIF (e.g. JPG, PNG, etc.) |
| autoplay | boolean | `false` | It can be set true if you want to immediately bombard your user with a moving GIF as soon as it's available |
| onTogglePlay | func | - | A function which is called whenever the GIF toggles between playing and paused. Receives one argument, playing, which is a boolean. |
| pauseRef | func | - | A function callback is called with another function, pause - this can be saved and called later to remotely pause the playing of the GIF, in such cases where that might be desired. For example, you might want to stop the GIF when it scrolls offscreen. Here's a [jsfiddle](http://jsfiddle.net/1snhzgo8/7/) which shows how to use `pauseRef`. |

## Upload: uPic
