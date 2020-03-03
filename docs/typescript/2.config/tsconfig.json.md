---
title: tsconfig.json 配置
sidebar_label: tsconfig.json 配置
---

## 概述

在`TypeScript`项目中，`tsconfig.json`文件指定了用来编译这个项目的根文件和编译选项，通过自定义`tsconfig.json`文件中的配置项，可以达到我们想要的编译结果。

```
tsc
```

当我们使用`tsc`命令对项目进行编译时，编译器会从当前目录开始去查找`tsconfig.json`文件，逐级向上搜索父目录。

下面我们将通过以下三个方面来讲述`tsconfig.json`配置：

- [**文件选项**](/docs/typescript/2.config/file-options)：`files`、`include`、`exclude`
- [**编译选项**](/docs/typescript/2.config/compiler-options)：`compilerOptions`
- [**项目引用**](/docs/typescript/2.config/project-references)：`extends`、`references`
