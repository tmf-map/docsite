---
title: Code Blocks
---

Code blocks within documentation are super-powered 💪.

### Code title

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

### Line highlighting

You can bring emphasis to certain lines of code by specifying line ranges after the language meta string (leave a space after the language).

    ```jsx {3}
    function HighlightSomeText(highlight) {
      if (highlight) {
        return 'This text is highlighted!';
      }

      return 'Nothing highlighted';
    }
    ```

```jsx {3}
function HighlightSomeText(highlight) {
  if (highlight) {
    return 'This text is highlighted!';
  }

  return 'Nothing highlighted';
}
```

### Interactive code editor

(Powered by [React Live](https://github.com/FormidableLabs/react-live))

You can create an interactive coding editor with with `live` attached to the language meta string.

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