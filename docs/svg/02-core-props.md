---
title: Core Props
sidebar_label: 2. Core Props
---

The simplest form of SVG drawings use shape elements, like `<rect>` or `<ellipse>`.

```jsx live noInline
const rectangle = (
  <rect
    x={40} y={15}
    width={30} height={65}
    fill="hotpink"
  />
);
const circle = (
  <ellipse
    cx={30} cy={60}
    rx={20} ry={20}
    fill="lightsalmon"
  />
);
const triangle = (
  <polygon
    points="15,80 30,55 45,80"
    fill="turquoise"
  />
);

render(
  <svg
    style={{
      background: '#333',
      width: 240,
    }}
    viewBox="0 0 80 80"
  >
    {rectangle}
    {circle}
    {triangle}
  </svg>
);
```

:::note

All the code snippets in this page are React elements, not HTML.

:::

These shapes are straightforward and declarative, but that simplicity comes at the cost of flexibility; you can only create a handful of different shapes.

To do neat curvy things, we need to use the `<path>` element. This swiss-army-knife of an SVG primitive lets you specify a sequence of steps to execute, in a seemingly-inscrutable bundle of letters and numbers:

```jsx live noInline
const shape = (
  <svg viewBox="0 0 300 300">
    <path
      d={`
        M 100,100
        L 200,100
        L 200,200
        L 100,200
        L 100,100
      `}
    />
  </svg>
);

render(shape);
```

The interactive code snippet above uses 2 commands:

- `M`, which instructs the path to **_move_** to a specific coordinate.
- `L`, which instructs the path to create a **_line_** from the current position to the specified coordinate.

After the commands `M` and `L`, we see some numbers. These can be thought of as "arguments" for the commands. In this case, the arguments are coordinates; both commands require a single X/Y pair.

In other words, we can read the above path as: "Move to `{x: 100, y: 100}`, then draw a line to `{x: 200, y: 100}`", and so on.

The coordinate system is relative to the values specified in the viewBox. The current `viewbox` specifies that the viewable area has a top-left corner of 0/0, a width of `300`, and a height of `300`. So all of the coordinates specified in the `path` are within that `300x300` box.

The `viewBox` is what makes SVGs scalable; we can make our SVG any size we like, and everything will scale naturally, since the elements within our SVG are relative to this `300x300` box.

## References

1. [Dynamic Bézier Curves by joshwcomeau](https://www.joshwcomeau.com/animation/dynamic-bezier-curves/)
