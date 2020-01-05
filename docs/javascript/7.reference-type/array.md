---
title: 数组
sidebar_label: 数组
---

import Img from '../../../src/components/Img'; import Hint from '../../../src/components/Hint';

<Img width="300" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/AD9JzZ.jpg'/>

shift, 转移，移动，去除 https://github.com/muwenzi/Program-Blog/issues/23

数组去重

[也谈面试必备问题之 JavaScript 数组去重](https://www.google.com/url?q=https://mp.weixin.qq.com/s/bUphOsQnB9_-2MwbGXTxtQ&sa=D&ust=1570449321579000)

[也谈 JavaScript 数组去重](https://www.google.com/url?q=https://zhuanlan.zhihu.com/p/24753549?utm_medium%3Dsocial%26utm_source%3Dwechat_session&sa=D&ust=1570449321580000)

快慢指针

[js 数组去重](https://www.google.com/url?q=https://github.com/mqyqingfeng/Blog/issues/27&sa=D&ust=1570449321581000)

数组、对象、字符串之间的转换关系

```js
'123'.split(''); //["1", "2", "3"]
Array.from('123'); // ["1", "2", "3"]
[(1, 2, 3)].toString(); // "1,2,3"
[(1, 2, 3)].join(); // "1,2,3"
[(1, 2, 3)].join(''); //"123"
JSON.stringify(obj);
```

## Array.from(array-like)

将类数组(包括可遍历，如 Set/Map/string)转化为真正的数组。

```js
const isArrayLike = obj =>
  obj != null && typeof obj[Symbol.iterator] === 'function';
```

```js
isArrayLike(document.querySelectorAll('.className')); // true
isArrayLike('abc'); // true
isArrayLike(null); // false
```

## Array.of()

Array.of 方法用于将一组值，转换为数组。有点类似函数式编程里面 of 方法的含义。

```js
Array.of(3, 11, 8); // [3,11,8]
Array.of(3); // [3]
Array.of(3).length; // 1
```

这个方法的主要目的，是弥补数组构造函数 Array()的不足。因为参数个数的不同，会导致 Array()的行为有差异。

```js
Array(); // []
Array(3); // [, , ,]
Array(3, 11, 8); // [3, 11, 8]
```

上面代码中，Array 方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。

<Hint type="warn">Array.of 基本上可以用来替代 Array()或 new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。</Hint>

```js
Array.of(); // []
Array.of(undefined); // [undefined]
Array.of(1); // [1]
Array.of(1, 2); // [1, 2]
```

Array.of 总是返回参数值组成的数组。如果没有参数，就返回一个空数组。Array.of 方法可以用下面的代码模拟实现。

```js
function ArrayOf() {
  return [].slice.call(arguments);
}
```

slice 没有参数，实际上等于返回一个原数组的(浅)拷贝。和 splice 相比这是一个纯函数，更推荐使用，详细用法http://javascript.ruanyifeng.com/stdlib/array.html#toc10

<Hint type="warn">标准中 `for (let elem of [‘a’, ‘b’].values())` 在 node8 某些版本中由于兼容性问题被关闭</Hint>

<Img width="550" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/JgDuiW.jpg'/>

https://kangax.github.io/compat-table/es6/#cr-array-prototype-values-note https://bugs.chromium.org/p/chromium/issues/detail?id=615873

## includes() v.s indexOf()

indexOf 方法有两个缺点：

- 不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。
- 它内部使用严格相等运算符（===）进行判断，这会导致对 NaN 的误判。

```js
[NaN].indexOf(NaN); // -1
[NaN].includes(NaN); // true
```

includes 使用的是不一样的判断算法，就没有这个问题。

## flat()/flatMap()

数组 falt 这个函数的方法很少的使用，它的意思就是将数组的元素‘打平’。说的感觉挺悬乎的，其实这是一个很简单的函数。

flat 的语法：`var newArray = arr.flat(depth)`，其中的 depth 的值是个 number 类型。deepth 指的提取嵌套数组的结构深度，默认值为 1。

```js
var arr1 = [1, 2, [3, 4]];
arr1.flat(); // [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat(); // [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2); // [1, 2, 3, 4, 5, 6]

//使用 Infinity 作为深度，展开任意深度的嵌套数组
arr3.flat(Infinity); // [1, 2, 3, 4, 5, 6]
```

flat 函数实现：

```js
Array.prototype._flat = function(depth = 1) {
  if (depth === 0) return this;
  return this.reduce(
    (acc, item) =>
      item instanceof Array
        ? [...acc, ...item._flat(depth - 1)]
        : acc.concat(item),
    []
  );
};
```

## 空位

数组的 splice 方法是用来删除数组元素常用的方法。先说下 splice 的语法：

```js
arr.splice(index,deleteCount,item,...,item)
```

splice 的返回值是是一个数组，数组中是被被删除的原数组的元素，如果没有数组删除返回[];如下图所示：

<img width="350" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/FqTxj6.jpg'/>

<Hint type="tip">splice 的特点是会删除原数组。</Hint>

当存在的参数是多于 2 个的时候，即从 index 处删除一个元素，然后将多的参数插入到数组。

<img width="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/70sszK.jpg'/>

当第二个参数为 0 的时候，此时不删除元素，从 index 位置开始插入第三第四个参数。

<img width="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/19Npij.jpg'/>

当 index 大于数组长度时，在最后插入：

<img width="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/yMqp8Q.jpg'/>

<Hint type="warn">在 for 循环使用 splice 删除函数时。length 会改变。后面的元素因为前移被跳过。如下例最好使用 i--，将数组的 index 向前再推一个。</Hint>

```js
for (let i = 0; i < nums.length; i++) {
  if (nums[i] === val) {
    nums.splice(i, 1);
    i--;
  }
}
```

或者可以从后向前遍历，这样删除数组元素，后面元素的前移不会影响 index 的值。如下例：

```js
var nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
var removeDuplicates = function(nums) {
  for (var i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === nums[i - 1]) {
      nums.splice(i, 1);
    }
  }
  return nums.length;
};
```

## fill()

fill()方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。这个方法会改变源数组，使用的时候需要考虑到它的副作用。

```js
var array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

console.log(array1);

// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]
```

fill(value)中 value 的值最好不要是**引用类型**，如果是引用类型，所有的 value 都是保存着对同一个地址的引用。

```js
// Objects by reference.
var arr = Array(3).fill({});
// [{}, {}, {}];

arr[0].hi = 'hi';
// [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
```

生成 n\*n 二维数组：

```js
new Array(3).fill().map(item => new Array(3).fill(0));
```

<img width="450" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Quvv2f.jpg'/>

构建二维数组的时候，如果通过下面的语句，会出现图片中的错误，在构建二维数组的时候，推荐上面 map 的写法。

```js
new Array(3).fill(new Array(3).fill(0));
```

<img width="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Bey6F5.jpg'/>
