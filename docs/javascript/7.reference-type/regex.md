---
title: 正则表达式
sidebar_label: 正则表达式
---

import Hint from '../../../src/components/Hint';

## 捕获

正则表达式中用 `()` 来表示分组，例如：`/([0-9])/`，`()` 会把每个分组里匹配的值保存起来。

### 捕获型 `()`

#### 捕获与引用

被正则表达式匹配到的字符串会被暂存起来，其中分组捕获的串从 1 开始编号，`$1` 表示第一个被捕获的串， `$2` 是第二个，以此类推，我们可以通过 `$1，$2...` 引用这些串。

```js
let reg = /(\d{4})-(\d{2})-(\d{2})/;
let data = '2017-10-24';
reg.test(data);
RegExp.$1; //2017
RegExp.$2; //10
RegExp.$3; //24
```

#### 与 replace 配合

`String.prototype.replace` 方法的传参中可以直接引用被捕获的串。比如我们想将日期 `10.24/2017` 改为 `2017-10-24` ：

```js
let reg = /(\d{2})\.(\d{2})\/(\d{4})/;
let data = '10.24/2017';
data = data.replace(reg, '$3-$1-$2');
console.log(data); //2017-10-24
```

给 `replace` 传递迭代函数可以优雅地解决一些问题：

将违禁词转换为等字数的星号是一个常见的需求，比如文本是 `dot is a doubi` ，其中 `dot` 和 `doubi` 是违禁词，转换后应为 `*** is a *****` 。

```js
let reg = /(dot|doubi)/g;
let str = 'dot is a doubi';
str = str.replace(reg, function(word) {
  return word.replace(/./g, '*');
});
console.log(str); //*** is a *****
```

`replace` 与正则捕获组匹配还有一个常见用法，将浮点数左边的数从右向左每三位添加一个逗号，匹配全局中，数字后面跟随的是（以 `.` 结尾的、三个数字的分组至少有一组）的串。

```js
function commafy(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($2) {
    return $2 + ',';
  });
}
console.log(commafy(1200000000.11)); //1,200,000,000.11
console.log(commafy(123246723749.213769283)); //123,246,723,749.21378
```

### 嵌套分组的捕获

如果碰到类似 `/((dot) is (a (doubi)))/` 这种嵌套分组，规则是以左括号出现的顺序进行捕获。

```js
let reg = /((dot) is (a (doubi)))/;
let str = 'dot is a doubi';
reg.test(str); //true
console.log(RegExp.$1); //dot is a doubi
console.log(RegExp.$2); //dot
console.log(RegExp.$3); //a doubi
console.log(RegExp.$4); //doubi
```

### 反向引用

```js
let reg = /(\w{3}) is \1/;
console.log(reg.test('dot is dot')); //true
console.log(reg.test('dolby is dolby')); //false
console.log(reg.test('dot is tod')); //false
console.log(reg.test('dolby is dlboy')); //false
```

`\1` 引用了第一个被分组所捕获的串，本例中即 `(\w{3})` ，表达式是动态决定的，如果编号越界了会被当成普通的表达式。

```js
let reg = /(\w{3}) is \3/;
console.log(reg.test('dot is \3')); //true
console.log(reg.test('dolby is dolby')); //false
```

### 非捕获型 `(?: )`

有时我们只是想分个组，并没有捕获的需求，这种情况下可以使用非捕获性分组，语法为 `(?:)` 。

```js
let reg = /(?:\d{4})-(\d{2})-(\d{2})/;
let date = '2017-10-24';
console.log(reg.test(date)); //true
console.log(RegExp.$1); //10
console.log(RegExp.$2); //24
```

这个例子中，`(?:\d{4})` 分组不会捕获任何串，所以 `$1` 为 `(\d{2})` 捕获的串。

## 断言 Assertion

<Hint type="tip">断言虽然包裹在 `()` ，但并不会捕获值。</Hint>

以下所说的`前`和`后`指的要匹配的内容相对于断言的前后位置。

### 正向前瞻型 `(?= )`

Lookahead assertion `x(?=y)`: Matches "x" only if "x" is followed by "y". For example:

```js
let reg = /dot is a (?=doubi)/;
console.log(reg.test('dot is a doubi')); //true
console.log(reg.test('dot is a shadou')); //false
```

这个正则要求 `dot is a` 后面要是 `doubi` 才匹配成功。

### 反向前瞻型 `(?! )`

Negative lookahead assertion `x(?!y)`: Matches "x" only if "x" is not followed by "y". For example:

```js
let reg = /dot is a (?!doubi)/;
console.log(reg.test('dot is a doubi')); //false
console.log(reg.test('dot is a shadou')); //true
```

这个正则要求 `dot is a` 后面除了 `doubi` ，都能匹配成功。

### 正向后瞻型 `(?<= )`

Lookbehind assertion `(?<=y)x`: Matches "x" only if "x" is preceded by "y". For example:

```js
let reg = /(?<=dot) is a doubi/;
console.log(reg.test('dot is a doubi')); //true
console.log(reg.test('pot is a doubi')); //false
```

这个正则要求 `is a doubi` 前面要是 `dot` 才匹配成功。

### 反向后瞻型 `(?<! )`

Negative lookbehind assertion `(?<!y)x`: Matches "x" only if "x" is not preceded by "y". For example:

```js
let reg = /(?<!dot) is a doubi/;
console.log(reg.test('dot is a doubi')); //false
console.log(reg.test('pot is a doubi')); //true
```

这个正则要求 `is a doubi` 前面除了 `dot` ，都能匹配成功。

### Q&A

> Q：前瞻型分组与非捕获型都不会捕获值，那么它们的区别是什么？

**A:** 非捕获型分组匹配到的串仍会被外层的捕获型分组捕获到，但前瞻型却不会，当你需要参考后面的值，又不想连它一起捕获时，前瞻型分组就派上用场了：

```js
let str = 'dot is a doubi';
let reg;
```

相同点：

```js
reg = /dot is a (?:doubi)/;
console.log(reg.test(str)); //true
console.log(RegExp.$1); //无结果

reg = /dot is a (?=doubi)/;
console.log(reg.test(str)); //true
console.log(RegExp.$1); //无结果
```

不同点：

```js
reg = /(dot is a (?:doubi))/;
console.log(reg.test(str)); //true
console.log(RegExp.$1); //dot is a doubi

reg = /(dot is a (?=doubi))/;
console.log(reg.test(str)); //true
console.log(RegExp.$1); //dot is a
```

## Reference

1. [MDN web docs: JS Regular expressions Assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
