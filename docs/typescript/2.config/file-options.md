---
title: 文件配置
sidebar_label: 文件配置
---

## 文件选项

### files

`files`指定**一个**包含相对或绝对**文件**路径的列表，列举在`files`中的所有文件，编译器在编译时都会将它们包含在内。

```js
// tsconfig.json
"files": [
    "src/core.ts",
    "src/index.ts",
]
```

当配置文件中的`files`字段值如上所示时，使用`tsc`命令编译时，`src`目录下的`core.ts`和`index.ts`文件会被编译为`core.js`和`index.js`文件。

### include

`include`指定编译的文件或目录，`include`是支持使用通配符来匹配路径名，支持的通配符及其功能如下表所示：

| 通配符 | 功能                                                              |
| ------ | ----------------------------------------------------------------- |
| \*     | 匹配`0`或多个字符，但是不匹配"."开头的隐藏文件和目录分隔符(/or\ ) |
| ?      | 匹配一个任意字符，但是不匹配目录分隔符                            |
| \*\*   | 匹配`0`或多个字符，包括斜杠(这意味着可以匹配多个目录)             |

例如，编译`src`下所有文件：

```js
"include": [
    "src",
]
```

只编译`src`二级目录下的文件：

```js
"include": [
    "src/*/*",
]
```

当`tsconfig.json`文件同时配置了`files`和 `include` 字段时，**编译器会将它们进行合并**。当`files`和 `include`中配置的的文件所引用的文件不在其中时，被引用的文件也会被包含进来。

### exclude

`exclude`指定编译时**排除**的文件或目录，`exclude`的用法与`include`相同。

当没有配置`files`和 `include` 字段时，编译器会默认编译当前目录和子目录下所有的`ts`文件（`.ts`, `.d.ts` 和 `.tsx`），排除在`exclude`里配置的文件。而当设置了`files`和 `include` 字段时，可以通过`exclude`字段过滤`include`的文件。

:::caution

需要注意的是：**通过 `files`属性明确指定的文件却总是会被编译，不管`exclude`如何配置**。

:::

此外，`exclude`默认情况下会排除`node_modules`，`bower_components`，`jspm_packages`和输出目录。

## 参考目录

1. [配置 tsconfig.json：文件选项，by 梁宵](https://time.geekbang.org/course/detail/211-116217)
2. [TypeScript official docs: tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
