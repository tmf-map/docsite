---
title: Tabs
---

To show tabbed content within Markdown files, you can fall back on MDX. Docusaurus provides `<Tabs>` components out-of-the-box.

```text
<Tabs
  defaultValue="apple"
  values={[
    {label: 'Apple', value: 'apple'},
    {label: 'Orange', value: 'orange'},
    {label: 'Banana', value: 'banana'}
  ]}>

<TabItem value="apple">This is an apple 🍎</TabItem>

<TabItem value="orange">This is an orange 🍊</TabItem>

<TabItem value="banana">This is a banana 🍌</TabItem>

</Tabs>
```

will result in

<Tabs defaultValue="apple" values={[ {label: 'Apple', value: 'apple'}, {label: 'Orange', value: 'orange'}, {label: 'Banana', value: 'banana'} ]}>

<TabItem value="apple">This is an apple 🍎</TabItem>

<TabItem value="orange">This is an orange 🍊</TabItem>

<TabItem value="banana">This is a banana 🍌</TabItem>

</Tabs>

:::caution

- There must be blank lines between `Tabs` and `TabItem`.
- If you want to switch languages by tabs, there must be blank lines before and after the code block in `TabItem`.

:::

When you want to write `npm i packageName`, you can use:

    ```bash npm2yarn
    npm install remark-images
    ```

will result in

```bash npm2yarn
npm install remark-images
```
