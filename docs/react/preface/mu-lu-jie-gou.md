# 目录结构

## 原始的 Redux 项目目录结构

```text
Project/App
├── index.js                                      # 入口文件
├── router.js                                     # App路由
├── store.js                                      # 生成Store
├── <manifest.json>                               # App的相关配置
├── components                                    # 展示型组件
│   └── Header                                    # 以<Header>组件为例
│       ├── index.js
│       ├── index.less                            # 样式文件
│       └── __tests__                             # 测试
│           ├── __snapshots__                     # 快照测试文件夹，自动生成
│           └── index.test.js                     # 展示型组件测试
├── ui                                            # 自定义的基础ui组件
│   └── Button                                    # 以<Button>组件为例
│       ├── index.js
│       ├── index.less
│       └── __tests__
│           ├── __snapshots__
│           └── index.test.js
├── states                                        # 状态管理相关，主要是Redux
│   ├── containers                                # 容器型组件
│   │   ├── Header.js
│   │   ├── index.js                              # 将所有container聚合
│   │   └── __tests__
│   │       └── Header.test.js
│   ├── middlewares                               # 中间件
│   │   ├── middlewareOne.js
│   │   ├── middlewareTwo.js
│   │   ├── index.js                              # 将所有中间件聚合
│   │   └── __tests__
│   │       ├── middlewareOne.test.js
│   │       └── middlewareTwo.test.js
│   ├── selectors
│   │   ├── selectorOne.js
│   │   ├── selectorTwo.js
│   │   ├── index.js                              # 将所有异步selector聚合
│   │   └── __tests__
│   │       ├── selectorOne.test.js
│   │       └── selectorTwo.test.js
│   ├── actions
│   │   ├── sync                                  # 同步action
│   │   │   ├── actionOne.js
│   │   │   ├── actionTwo.js
│   │   │   ├── index.js                          # 将所有同步action聚合
│   │   │   └── __tests__
│   │   │       ├── actionOne.test.js
│   │   │       └── actionTwo.test.js
│   │   └── async                                 # 异步action
│   │       ├── actionOne.js
│   │       ├── actionTwo.js
│   │       ├── index.js                          # 将所有异步action聚合
│   │       └── __tests__
│   │           ├── actionOne.test.js
│   │           └── actionTwo.test.js
│   ├── reducers
│   │   ├── reducerOne.js
│   │   ├── reducerTwo.js
│   │   ├── index.js                              # 将所有异步reducer聚合
│   │   └── __tests__
│   │       ├── reducerOne.test.js
│   │       └── reducerTwo.test.js
│   ├── types
│   │   ├── typeOne.js
│   │   ├── typeTwo.js
│   │   ├── index.js                              # 将所有异步type聚合
│   │   └── __tests__
│   │       ├── typeOne.test.js
│   │       └── typeTwo.test.js
├── apis
│   ├── apiOne.js
│   ├── apiTwo.js
│   ├── index.js                                  # 将所有api聚合
│   └── __tests__
│       ├── apiOne.test.js
│       └── apiTwo.test.js
└── utils                                         # 一些公共的工具类文件
    ├── utilOne.js
    ├── utilTwo.js
    ├── index.js                                  # 将所有util聚合
    └── __tests__
        ├── utilOne.test.js
        └── utilTwo.test.js
```

## [Rematch](https://github.com/rematch/rematch) 封装的 Redux 项目结构

在实际开发中，使用原始 Redux 开发时，会发现每加一个新功能就需要定义一堆 `action` , `type` , `reducer` , 非常繁琐，哪怕是一个非常小的功能。这时候就可以使用 Rematch 去改造 Redux 项目。由于 Redux 和 Rematch 的 model 定义可以共存，在定义项目的结构的时候可以调整为如下方式：

```text
Project/App
├── index.js                                      # 入口文件
├── router.js                                     # App路由
├── store.js                                      # 生成Store
├── <manifest.json>                               # App的相关配置
├── components                                    # 展示型组件
│   └── Header                                    # 以<Header>组件为例
│       ├── index.js
│       ├── index.less                            # 样式文件
│       └── __tests__                             # 测试
│           ├── __snapshots__                     # 快照测试文件夹，自动生成
│           └── index.test.js                     # 展示型组件测试
├── ui                                            # 自定义的基础ui组件
│   └── Button                                    # 以<Button>组件为例
│       ├── index.js
│       ├── index.less
│       └── __tests__
│           ├── __snapshots__
│           └── index.test.js
├── states                                        # 状态管理相关
│   ├── containers                                # 容器型组件
│   │   ├── Header.js
│   │   ├── index.js                              # 将所有container聚合
│   │   └── __tests__
│   │       └── Header.test.js
│   ├── middlewares                               # 中间件
│   │   ├── middlewareOne.js
│   │   ├── middlewareTwo.js
│   │   ├── index.js                              # 将所有中间件聚合
│   │   └── __tests__
│   │       ├── middlewareOne.test.js
│   │       └── middlewareTwo.test.js
│   ├── selectors
│   │   ├── selectorOne.js
│   │   ├── selectorTwo.js
│   │   ├── index.js                              # 将所有异步selector聚合
│   │   └── __tests__
│   │       ├── selectorOne.test.js
│   │       └── selectorTwo.test.js
│   ├── models                                    # model层，替代原始Redux
│   │   ├── modelOne.js
│   │   ├── modelTwo.js
│   │   ├── index.js                              # 将所有model聚合
│   │   └── __tests__
│   │       ├── modelOne.test.js
│   │       └── modelTwo.test.js
├── apis
│   ├── apiOne.js
│   ├── apiTwo.js
│   ├── index.js                                  # 将所有api聚合
│   └── __tests__
│       ├── apiOne.test.js
│       └── apiTwo.test.js
└── utils                                         # 一些公共的工具类文件
    ├── utilOne.js
    ├── utilTwo.js
    ├── index.js                                  # 将所有util聚合
    └── __tests__
        ├── utilOne.test.js
        └── utilTwo.test.js
```

Rematch 的使用方式，以及如何和 Redux 项目进行兼容，详细见其文档教程：[https://rematch.gitbook.io/handbook/](https://rematch.gitbook.io/handbook/)
