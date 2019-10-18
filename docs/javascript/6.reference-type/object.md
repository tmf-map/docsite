---
title: 对象
sidebar_label: 对象
---

import Hint from '../../../src/components/Hint'

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/TUpxA2.jpg'/>

## Object.defineProperty

`Object.defineProperty` 可以设置对象属性的数据属性和访问器属性。

### 数据属性

数据属性分为四种： `configurable` 、 `enumerable` 、 `writable` 和 `value` 。

<Hint type="warning">在不使用 `Object.defineProperty` 来定义对象时，四种的默认值都是 true ，如果使用该方法时，默认值都是 false 。</Hint>

`configurable` 字段配置对象属性是否可以删除属性：

```js
var person = {}
Object.defineProperty(person, 'name', { configurable: false, enumerable: true, writable: true, value: 'robbie'});
delete person.name
console.log(person) //{name: 'robbie'}
```

`enumerable` 配置属性是否是可枚举类型：

```js
var person = {}
Object.defineProperty(person, 'name', { enumerable: false, value: 'robbie'});
Object.keys(person) // []
```

`writable` 用来配置属性是否可修改：

```js
var person = {}
Object.defineProperty(person, 'name', {writable: false, value: 'robbie'});
person.name = 'sherry'
console.log(person) //{name: 'robbie'}
```

`value` 配置属性值：

```js
var person = {}
Object.defineProperty(person, 'name', { value: 'robbie' });
console.log(person) // {name: "robbie"}
```

### 访问器属性

在读取访问器属性的时候会访问 `getter` 属性，在写入访问器属性时会调用 `setter` ：

```js
var obj = {
  log: ['a', 'b', 'c'],
  get latest() {
    if (this.log.length == 0) {
      return undefined;
    }
    return this.log[this.log.length - 1];
  },
  set add(v) {
    this.log.push(v);
    return this.log
  }
}
console.log(obj.latest) // 'c'
obj.add = 'd'
console.log(obj.log) // ["a", "b", "c", "d"]
```

## freeze v.s seal

Object.freeze: 不能增加和删除属性，不可以修改属性值(属性值为对象的除外)

```js
var app = {
  name: 'ts',
  test: {
    name: 'kimi'
  }
}

Object.freeze(app)
app.test.name = 'robbie' 
console.log(app.test) //{name: 'robbie'}

Object.freeze(app.test)
delete app.name  //false
app // {name: "ts", test: {...}}
```

Object.seal: 不能增加和删除，但可以修改属性

```js
const App = {
  name: 'ts'
}

Object.seal(App)

App.name = 'asgh'

console.log('name', App.name) // 'asgh'
```

## rest v.s spread

区别 以及对应es5的代码  
= 左边是，右边是  
function (..arg)  
[【译】JS解构的五种有趣用法](https://juejin.im/post/5d673044f265da03d60f12f7)  
可迭代 iterable

## 变量作为对象的 key


## 对象中的 this


## 属性的可枚举性

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。`Object.getOwnPropertyDescriptor` 方法可以获取该属性的描述对象。

```js
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```

描述对象的 `enumerable` 属性，称为“可枚举性”，如果该属性为 false ，就表示某些操作会忽略当前属性。

目前，有四个操作会忽略 `enumerable` 为 false 的属性。

- `for...in` 循环：只遍历对象自身的和继承的可枚举的属性。
- `Object.keys()`：返回对象自身的所有可枚举的属性的键名。
- `JSON.stringify()`：只串行化对象自身的可枚举的属性。
- `Object.assign()`： 忽略 `enumerable` 为 false 的属性，只拷贝对象自身的可枚举的属性。

这四个操作之中，前三个是 ES5 就有的，最后一个 `Object.assign()` 是 ES6 新增的。

<Hint type="warning">只有 `for...in` 会遍历继承的属性，其他三个都会忽略继承的属性，只处理对象自身的属性。</Hint>

实际上，引入“可枚举”（enumerable）这个概念的最初目的，就是让某些属性可以规避掉 `for...in` 操作，不然所有内部属性和方法都会被遍历到。比如，对象原型的 `toString` 方法，以及数组的 `length` 属性，就通过“可枚举性”，从而避免被 `for...in` 遍历到。

```js
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false

Object.getOwnPropertyDescriptor([], 'length').enumerable
// false
```

上面代码中， `toString` 和 `length` 属性的 `enumerable` 都是false，因此 `for...in` 不会遍历到这两个继承自原型的属性。

另外，ES6 规定，所有 Class 的原型的方法都是不可枚举的。

```js
Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
// false
```

总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。

<Hint type="best">尽量不要用 `for...in` 循环，而用 `Object.keys()`代替。</Hint>

## 属性的遍历

### 五大方法

ES6 一共有 5 种方法可以遍历对象的属性。

#### (1) for...in

`for...in` 循环遍历对象自身的和**继承**的可枚举属性（不含 Symbol 属性）。

#### (2) Object.keys(obj)

`Object.keys` 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

#### (3) Object.getOwnPropertyNames(obj)

`Object.getOwnPropertyNames` 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

#### (4) Object.getOwnPropertySymbols(obj)

`Object.getOwnPropertySymbols` 返回一个数组，包含对象自身的所有 Symbol 属性的键名。

#### (5) Reflect.ownKeys(obj)

`Reflect.ownKeys` 返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。基本就是 `getOwnPropertyNames` 和 `Object.getOwnPropertySymbols` 的合体。

<Hint type="warning">不管是否可枚举，不管是不是Symbol，只要是对象自身的，`Reflect.ownKeys()` 都会遍历。</Hint>

<Hint type="must">`Reflect.ownKeys()` 方法的第一个参数必须是对象，否则会报错。</Hint>

### key 的顺序

对象 key 的顺序问题，你首先需要知道三点：

- ES6 之前是浏览器自己定义，从 [ES6 开始在规范中做了明确的规定](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ordinaryownpropertykeys)
- 顺序并不一定就是定义的顺序
- 顺序也不是无序随机的，而是遵循一定的规则

```js
var obj = {
  m: function() {},
  "b": '',
  2: '',
  '1': '',
  [Symbol('b')]: '',
  [Symbol('a')]: '',
  "3": '',
  "a": '',
}

Object.keys(obj) //  ["1", "2", "3", "m", "b", "a"]
Reflect.ownKeys(obj) // ["1", "2", "3", "m", "b", "a", Symbol(b), Symbol(a)]
```

前面说的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则：

- 首先遍历所有 integer-like keys (包括 `1`, 和 `'1'`) 按照升序排列，按照升序排列。
- 其次遍历所有 normal keys (包括加 `''` 和不加 `''`)，按照定义的顺序排列。
- 最后遍历所有 symbol keys，按照定义的顺序排列。

<Hint type="must">如果对象的 key 为 integer-like ，千万不要依赖其定义的顺序。</Hint>

<Hint type="warning">如果在 Chrome 控制台上直接输入 `obj` 然后回车，打印出来的顺序还和 m 值的类型有关。这个顺序并不完全符合以上规则，但这只是控制台的表现，对实际的代码并无影响。</Hint>

比如 m 为 函数的时候，打印出 `{1: "", 2: "", 3: "", b: "", a: "", Symbol(b): "", Symbol(a): "", m: ƒ}` ， 而 m 为字符串或数组的时候顺序却又在 3 和 b 之间。


## 参考资料

1. [属性的可枚举性和遍历，作者：阮一峰](http://es6.ruanyifeng.com/#docs/object#%E5%B1%9E%E6%80%A7%E7%9A%84%E5%8F%AF%E6%9E%9A%E4%B8%BE%E6%80%A7%E5%92%8C%E9%81%8D%E5%8E%86)
2. [stackoverflow: Does JavaScript Guarantee Object Property Order? ](https://stackoverflow.com/a/38218582)
