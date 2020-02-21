---
title: 表单
sidebar_label: 表单
---

## `<form>...</form>`

### `action="url"`

### `method=""`

### `enctype=""`

### `autocomplete`

### `novalidate`

### `accept-charsets`

### `target`

## `<fieldset>...</fieldset>`

## `<label>...</label>`

## `<legend>...</legend>`

## `<input />`

### `type=""`

### `name=""`

### `value=""`

### `size=""`

### `maxlength=""`

### `step=""`

### `width=""`

### `height=""`

### `placeholder=""`

### `pattern=""`

### `min=""`

### `max=""`

### `required`

### `autofocus`

### `disabled`

## `<textarea>...</textarea>`

## `<select>...</select>`

### `name=""`

### `size=""`

### `mutiple`

### `required`

### `autofoucs`

## `<optgroup>...</optgroup>`

## `<option>...</option>`

### `value=""`

### `selected`

### `<button>...</button>`

## 示例

```jsx live
<form action="action page.php" method="post">
  <fieldset>
    <legend>Personal information: </legend>
    First name : <input
      type=" text"
      name=" first name"
      value="Mickey"
      placeholder="First Name"
    />
    <br />
    Last name: <input
      type="text"
      name=" lastname"
      value="Mouse"
      placeholder="Last Name "
    />
    <br />
    Favorite car brand:
    <select>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
    <br />
    <textarea name="description"></textarea>
    <br />
    <input type="submit" value="Submit" />
  </fieldset>
</form>
```
