---
title: 正则表达式
sidebar_label: 正则表达式
---

- 在线编写和检验正则的网站：https://regex101.com 支持多语言切换
- freeCodeCamp: Introduction to the Regular Expression Challenges
  - [在线练习](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/)
  - [在线视频](https://www.youtube.com/watch?v=ZfQFUJhPqMM)

## 基础概念

### 创建方式

#### 构造函数

```js
const regex = new RegExp('abc', 'i');
```

#### 字面量

```js
const regex = /abc/i;
```

### 修饰符

- `g`：global，全文搜索，默认搜索到第一个结果停止搜索。
- `i`：ignore case，忽略大小写，默认大小写敏感。
- `m`：multiple lines，多行搜索，更改 `^` 和 `$` 的含义，使它们分别在任意一行的行首和行尾匹配，而不仅仅在整个字符串的开头和结尾匹配。

:::note

在 `m` 模式下，`$`的精确含意是：匹配 `\n` 之前的位置以及字符串结束前的位置。

:::

### 元字符

大部分字符在正则表达式中，就是字面的含义，比如`/a/`匹配 a，`/b/`匹配 b。如果在正则表达式之中，某个字符只表示它字面的含义（就像前面的 a 和 b），那么它们就叫做“字面量字符”（literal characters）。

除了字面量字符以外，还有一部分字符有特殊含义，不代表字面的意思。它们叫做“元字符”（meta characters），先介绍以下几个：

| **元字符** | **符号** | **说明** |
| :-- | :-- | :-- |
| 选择类 | \| | 或匹配，如 /x\|y/ 正则可匹配 x 或 y 两个字符 |
| 选择类 | \[] | 或匹配，如 `[abcd]` 代表一个字符，这个字符可以是 `abcd` 四个字符中的任意一个 |
| 范围类 | \[0-9] | 0-9 中的任意一个字符 |
| 范围类 | \[a-z] | a-z 中的任意一个字符 |
| 范围类 | \[a-zA-Z0-9] | 大写字母、小写字母、数字中的任意一个字符 |
| 位置类 | ^ | 匹配字符串的开始 |
| 位置类 | \$ | 匹配字符串的结束 |
| 预定义 | . | 匹配除回车（`\r`）、换行(`\n`) 、行分隔符（`\u2028`）和段分隔符（`\u2029`）以外的任意字符 |
| 预定义 | \w | 匹配字母数字下划线，等同于 `[a-zA-Z0-9_]` |
| 预定义 | \s | 匹配任意空白符，等同于 `[\r\n\t\f\v ]` |
| 预定义 | \d | 匹配数字，等同于 `[0-9]` |
| 预定义 | \b | 匹配单词（字母、数字、下划线）边界，注意：`-` 也被认为是单词边界 |

其它元字符将会在后面进行介绍。

### 转义

一种有 12 个字符需要使用 `\` 进行转义的元字符：

| **字符** | **说明**                   |
| :------- | :------------------------- |
| \\       | 因为已在转义中使用         |
| \(       | 因为已在捕获中使用         |
| \)       | 因为已在捕获中使用         |
| \[       | 因为已在范围类和反义中使用 |
| \{       | 因为已在精确匹配中使用     |
| \.       | 因为已在预定义字符中使用   |
| ^        | 因为已在位置类字符中使用   |
| \$       | 因为已在位置类字符中使用   |
| \|       | 因为已在选择类字符中使用   |
| \*       | 因为已在量词类中使用       |
| \+       | 因为已在量词类中使用       |
| ?        | 因为已在量词类中使用       |

### 反义

| **反义字符** | **说明**                                                 |
| :----------- | :------------------------------------------------------- |
| \[^x]        | 匹配除“x”之外的所有字符，其中“x”可以为任意字符           |
| \[^xyz]      | 同上，匹配除“x、y、z”之外的任意字符                      |
| \W           | 匹配除了字母、数字、下划线之外的所有字符，等同于 `[^\w]` |
| \S           | 匹配除空白符之外的任意字符，等同于 `[^\s]`               |
| \B           | 匹配不是单词边界的字符，等同于 `[^\b]`                   |
| \D           | 匹配不是数字的所有字符，等同于 `[^\d]`                   |

### 贪婪模式重复匹配

贪婪模式：即匹配直到下一个字符不满足匹配规则为止，这是一种最大可能匹配。

| **元字符** | **符号** | **重复出现次数** |
| :--------- | :------- | :--------------- |
| 量词符     | \*       | ≥ 0              |
| 量词符     | +        | ≥ 1              |
| 量词符     | ?        | 0 或 1           |
| 精确匹配   | {n}      | n                |
| 精确匹配   | {n,}     | ≥ n              |
| 精确匹配   | {m,n}    | m ≤ count ≤ n    |

### 惰性模式重复匹配

惰性模式：即一旦条件满足，就不再往下匹配，这是一种最小可能匹配。

| **元字符** | **符号** | **重复出现次数，但尽可能少的重复** |
| :--------- | :------- | :--------------------------------- |
| 量词符     | \*?      | ≥ 0                                |
| 量词符     | +?       | ≥ 1                                |
| 量词符     | ??       | 0 或 1                             |
| 精确匹配   | {n}?     | n                                  |
| 精确匹配   | {n,}?    | ≥ n                                |
| 精确匹配   | {m,n}?   | m ≤ count ≤ n                      |

## RegExp 实例

### 属性

- `.ignoreCase`：返回一个布尔值，是否大小写敏感，默认是 `false`。
- `.global`： 是否全局搜索，默认是 `false`。
- `.multiline`： 多行搜索，默认值是 `false`。
- `.lastIndex`： 下一次开始搜索的位置，每次正则表达式成功匹配时，`lastIndex` 属性值都会随之改变，可读写，只要手动设置了`lastIndex`的值，就会从指定位置开始匹配。
- `.source`： 返回正则表达式的字符串形式（不包括反斜杠），该属性只读。

### RegExp.prototype.test(str)

测试字符串参数中是否存正则表达式模式，如果存在则返回`true`，否则返回`false`。

```js
const r = /x/g;
const s = '_x_x';

r.lastIndex; // 0
r.test(s); // true
```

如果正则表达式带有`g`修饰符，则每一次`test`方法都从上一次结束的位置开始向后匹配。

```js
r.lastIndex; // 2
r.test(s); // true
```

如果正则模式是一个空字符串，则匹配所有字符串。

```js
new RegExp('').test('abc'); // true
```

### RegExp.prototype.exec(str)

该方法用来返回匹配结果。如果发现匹配，就返回一个数组，成员是匹配成功的子字符串，否则返回 `null`。

```js
const s = '_x_x';

/x/.exec(s) // ["x"]
/y/.exec(s) // null
```

如果表达式中有正则捕获，则返回的数组会包括多个成员。第一个成员是**整个匹配成功的结果**，后面的成员就是圆括号对应的匹配成功的组：

```js
/_(x)/.exec('_x_x'); // ["_x", "x"]
```

exec 方法的返回数组还包含以下两个属性：

- `input`：整个原字符串。
- `index`：整个模式匹配成功的开始位置（从`0`开始计数）。

如果正则表达式加上 g 修饰符，则可以使用多次`exec`方法，下一次搜索的位置从上一次匹配成功结束的位置开始。

:::note

利用`g`修饰符允许多次匹配的特点，可以用一个循环遍历到所有匹配的字符：

```js
const reg = /a/g;
const str = 'abc_abc_abc';

while (true) {
  const match = reg.exec(str);
  if (!match) break;
  console.log(match[0]);
}

// a
// a
// a
```

:::

:::warning bad

以上代码每轮循环也是基于不断更新 `lastIndex` 属性工作的，`lastIndex` 只对同一个正则表达式有效，所以下面这样写是错误的，会造成死循环：

```js
while (true) {
  const match = /a/.exec('abc_abc_abc');
  if (!match) break;
  console.log(match[0]); // 0 代表整个匹配的，如果有分组则从 1 开始
}
```

因为 `while` 循环的每次匹配条件都是一个新的正则表达式，导致 `lastIndex` 属性总是等于 `0`。

:::

## String 实例方法(正则相关)

### String.prototype.match(regex)

```js
'_x_x'.match(/x/); // ["x"]
'_x_x'.match(/y/); // null
```

:::note

字符串的`match`方法与正则对象的`exec`方法非常类似，但正则表达式带有`g`修饰符，则该方法与正则对象的`exec`方法返回值不同，会一次性返回所有匹配成功的结果：

```js
'_x_x'.match(/x/g); // ["x", "x"]
/x/g.exec('_x_x'); // ["x"]
```

:::

### String.prototype.search(regex)

返回**第一个**满足条件的匹配结果在整个字符串中的**位置**。如果没有任何匹配，则返回`-1`:

```js
'_x_x'.search(/x/); // 1
'_x_x'.search(/y/); // -1
```

### String.prototype.replace(regex, str | func)

正则表达式如果不加`g`修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值。

```js
'_x_x'.replace(/x/, 'y'); // _y_x
'_x_x'.replace(/x/g, 'y'); // _y_y
```

第二个参数既可以是字符串也可以是函数：

```js
'_x_x'.replace(/x/, 'y'); // _y_x
'_x_x'.replace(/x/, function(match) {
  return match.toUpperCase();
}); // _X_x
```

其中函数第二个参数是捕捉到的组匹配（有多少个组匹配，就有多少个对应的参数，通常用`$number`表示），此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置，最后一个参数是原字符串:

```js
'_x_y_z'.replace(/(x).*(y).*(z).*/g, function(match, $1, $2, $3, index, str) {
  console.log(match, $1, $2, $3); // x_y_z x y z
  console.log(index, str); // 1 _x_y_z
  return $1 + $2 + $3; // _xyz
});
```

:::note

如果要全局遍历匹配的字符串，除了用上文提到的 `while` + `exec` 方式，还可以用 `replace` 方法，不要返回任何值，虽然最后会返回`undefined`，但并不会更改原字符串：

```js
const str = 'abc_abc_abc';

str.replace(/a/g, function(match) {
  console.log(match);
});

// a
// a
// a

str; // abc_abc_abc
```

:::

### String.prototype.split(regex[, num])

这里主要介绍该方法在正则中的应用。

```js
// 非正则分隔
'a,  b,c, d'.split(','); // [ 'a', '  b', 'c', ' d' ]

// 正则分隔，去除多余的空格
'a,  b,c, d'.split(/,\s*/); // [ 'a', 'b', 'c', 'd' ]

// 指定返回数组的最大成员
'a,  b,c, d'.split(/,\s*/, 2); // [ 'a', 'b' ]
```

## 捕获

正则表达式中用 `()` 来表示分组，例如：`/([0-9])/`，`()` 会把每个分组里匹配的值保存起来。

### 捕获型 `()`

#### 捕获与引用

被正则表达式匹配到的字符串会被暂存起来。

:::note

分组捕获的串从 1 开始编号，`$1` 表示第一个被捕获的串， `$2` 是第二个，以此类推，我们可以通过 `$1，$2...` 引用这些串。

:::

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

:::note

断言虽然包裹在 `()` ，但并不会捕获值。

:::

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

:::note question

前瞻型分组与非捕获型都不会捕获值，那么它们的区别是什么？

:::

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
2. [JavaScript 标准参考教程：RegExp 对象, By 阮一峰](https://javascript.ruanyifeng.com/stdlib/regexp.html)
3. [Javascript 正则表达式, By 阿烈叔随笔](https://www.baidufe.com/item/eb10deb92f2c05ca32cf.html)
4. [RegExp 对象(正则表达式), By Amyuan 的笔记](https://blog.csdn.net/ee2222/article/details/80102079)
