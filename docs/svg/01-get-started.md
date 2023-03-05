---
title: Get Started
sidebar_label: 1. Get Started
---

<Img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/svg-cover.png" alt="SVG Cover" />

[SVG](https://www.w3.org/Graphics/SVG/) is a markup language for describing two-dimensional graphics applications and images, and a set of related graphics script interfaces. [SVG 1.1 2nd edition](https://www.w3.org/TR/SVG11/) is a W3C Recommendation and is the most recent version of the full specification. [SVG 2 editor's draft](https://svgwg.org/svg2-draft/) is the next version and current status is draft.

## What is SVG?

- SVG stands for Scalable Vector Graphics
- SVG is used to define vector-based graphics for the Web
- SVG defines the graphics in XML format
- Every element and every attribute in SVG files can be animated
- SVG is a W3C recommendation
  - SVG 1.0 became a W3C Recommendation on 4 September 2001.
  - SVG 1.1 became a W3C Recommendation on 14 January 2003.
  - [SVG 1.1 (Second Edition)](https://www.w3.org/TR/SVG11/intro.html) became a W3C Recommendation on 16 August 2011.
- SVG integrates with other W3C standards such as the DOM and XSL

## Why use SVG?

- SVG is **scalable**
  - You can stretch it however much, you still won't lose quality because of resolution issues.
  - Responsive design is easier to be achieved!
- SVG can be coded **inline**
  - this reduces the HTTP requests required to retrieve media.
  - this also meant that the **FOUC** (Flash of Unstyled Content) problem is less likely to happen from media not being retrieved and styled before rendering in the page.
- Developers can work with the individual nodes in the SVG to:
  - animate
  - optimize for performance
  - optimize for accessibility

Now that we have a clearer picture of what's SVG and why we should use SVG, we can move on to more hands-on stuff! 🙌

## How to create SVG?

You can embed SVG elements directly into your HTML pages.

Here is an example of a simple SVG graphic:

```jsx live
function MyFirstSVG() {
  return (
    <svg width="100" height="100">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="green"
        strokeWidth="4"
        fill="yellow"
      />
    </svg>
  );
}
```

SVG Code explanation:

- An SVG image begins with an `<svg>` element.
- The width and height attributes of the `<svg>` element define the width and height of the SVG image.
- The `<circle>` element is used to draw a circle.
- The `cx` and `cy` attributes define the x and y coordinates of the center of the circle. If `cx` and `cy` are not set, the circle's center is set to `(0, 0)`.
- The `r` attribute defines the radius of the circle.
- The `stroke` and `stroke-width` attributes control how the outline of a shape appears. We set the outline of the circle to a `4px` green "border"
- The `fill` attribute refers to the color inside the circle. We set the fill color to yellow
- The closing `</svg>` tag closes the SVG image

:::tip

Since SVG is written in XML, all elements must be properly closed!

:::

## References

1. [W3 schools SVG Tutorial](https://www.w3schools.com/graphics/svg_intro.asp)
1. [Introduction to Scalable Vector Graphics (SVG) by Estee Tey](https://blog.esteetey.dev/introduction-to-svg)
