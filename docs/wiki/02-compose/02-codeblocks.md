---
title: Code Blocks
---

Code blocks within documentation are super-powered 💪.

## Code title

You can add a title to the code block by adding `title` key after the language (leave a space between them).

    ```jsx title="src/components/HelloCodeTitle.js"
    function HelloCodeTitle(props) {
      return <h1>Hello, {props.name}</h1>;
    }
    ```

```jsx title="src/components/HelloCodeTitle.js"
function HelloCodeTitle(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

## Line highlighting

### Highlighting with comments

You can use comments with `highlight-next-line`, `highlight-start`, and `highlight-end` to select which lines are highlighted.

    ```js
    function HighlightSomeText(highlight) {
      if (highlight) {
        // highlight-next-line
        return 'This text is highlighted!';
      }

      return 'Nothing highlighted';
    }

    function HighlightMoreText(highlight) {
      // highlight-start
      if (highlight) {
        return 'This range is highlighted!';
      }
      // highlight-end

      return 'Nothing highlighted';
    }
    ```

```js
function HighlightSomeText(highlight) {
  if (highlight) {
    // highlight-next-line
    return 'This text is highlighted!';
  }

  return 'Nothing highlighted';
}

function HighlightMoreText(highlight) {
  // highlight-start
  if (highlight) {
    return 'This range is highlighted!';
  }
  // highlight-end

  return 'Nothing highlighted';
}
```

Supported commenting syntax:

| Style      | Syntax                   |
| ---------- | ------------------------ |
| C-style    | `/* ... */` and `// ...` |
| JSX-style  | `{/* ... */}`            |
| Bash-style | `# ...`                  |
| HTML-style | `<!-- ... -->`           |

### Highlighting with metadata string

You can also specify highlighted line ranges within the language meta string (leave a space after the language). To highlight multiple lines, separate the line numbers by commas or use the range syntax to select a chunk of lines. This feature uses the `parse-number-range` library and you can find [more syntax](https://www.npmjs.com/package/parse-numeric-range) on their project details.

````md
```jsx {1,4-6,11}
import React from 'react';

function MyComponent(props) {
  if (props.isBar) {
    return <div>Bar</div>;
  }

  return <div>Foo</div>;
}

export default MyComponent;
```
````

```jsx {1,4-6,11}
import React from 'react';

function MyComponent(props) {
  if (props.isBar) {
    return <div>Bar</div>;
  }

  return <div>Foo</div>;
}

export default MyComponent;
```

## Code diff

This will help you to find out which line is added or deleted, using likes following:

    ```diff
    module.exports = {
      entry: {
        index: './src/index'
      },
      output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_bundle.js'
      },
    + mode: 'production'
    - mode: 'development'
    - optimization: {
    -    usedExports: true
    - }
    };
    ```

```diff
module.exports = {
  entry: {
    index: './src/index'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_bundle.js'
  },
+ mode: 'production'
- mode: 'development'
- optimization: {
-    usedExports: true
- }
};
```

## Interactive code editor

This is powered by [React Live](https://github.com/FormidableLabs/react-live). You can create an interactive coding editor with with `live` attached to the language meta string.

    ```jsx live
    function Clock(props) {
      const [date, setDate] = useState(new Date());
      useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
          clearInterval(timerID);
        };
      });

      function tick() {
        setDate(new Date());
      }

      return (
        <div>
          <h2>It is {date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
    ```

The code block will be rendered as an interactive editor. Changes to the code will reflect on the result panel live.

```jsx live
function Clock(props) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  return (
    <div>
      <h2>It is {date.toLocaleTimeString()}.</h2>
    </div>
  );
}
```

If you want to demo a couple of components, you can use the `noInline` like this:

    ```jsx live noInline
    const Wrapper = ({ children }) => (
      <div style={{
        background: 'papayawhip',
        width: '100%',
        padding: '2rem'
      }}>
        {children}
      </div>
    )

    const Title = () => (
      <h3 style={{ color: 'palevioletred' }}>
        Hello World!
      </h3>
    )

    render(
      <Wrapper>
        <Title />
      </Wrapper>
    )
    ```

Then `noInline` will pass to [LiveProvider](https://github.com/FormidableLabs/react-live#liveprovider-)

```jsx live noInline
const Wrapper = ({children}) => (
  <div
    style={{
      background: 'papayawhip',
      width: '100%',
      padding: '2rem'
    }}>
    {children}
  </div>
);

const Title = () => <h3 style={{color: 'palevioletred'}}>Hello World!</h3>;

render(
  <Wrapper>
    <Title />
  </Wrapper>
);
```
