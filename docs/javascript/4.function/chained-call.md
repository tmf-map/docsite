---
title: 链式调用
sidebar_label: 链式调用
---

```js
class User {
  constructor() {
    this.id = null;
    this.name = null;
  }
  setId(id) {
    this.id = id;
    return this;
  }
  setName(name) {
    this.name = name;
    return this;
  }
}

console.log(new User().setId(1234).setName('Kimi'));
// { id: 1234, name: 'Kimi' }
```

或者：

```js
const User2 = {
  id: null,
  name: null,
  setId(id) {
    this.id = id;
    return this;
  },
  setName(name) {
    this.name = name;
    return this;
  },
};

console.log(User2.setId(1234).setName('Kimi'));
// { id: 1234, name: 'Kimi', setId: f, setName: f}
```
