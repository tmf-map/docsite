---
title: ts-loader to babel-loader
---

We can use command: `tsc` to complie TypeScript to JavaScript, but can use `ts-loader`, `babel-loader` as well. As usual, we use `ts-loader` or `babel-loader` in the project using webpack. In this chapter, we will be focusing on the usage of these two loaders.

## ts-loader

Let's look at the webpack configuration first:

```js
{
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      }
    ];
  }
}
```

Actually, ts-loader calls the `tsc` internally, so they share the same `tsconfig.json`. In addition, ts-loader has some own configuration via `options`:

```js {7-9} title="webpack.config.js"
{
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false // default value
            }
          }
        ],
        exclude: /node_modules/
      }
    ];
  }
}
```

For the more options, you can refere to the [ts-loader official docs](https://github.com/TypeStrong/ts-loader#options). We mention one specific option: `transpileOnly` here. It will only transpile to JS rather than check typings when set to `true`. As time goes by, the project will become more complicated and make the build time longer. It will save more than 50% build time if set to `true` but the disadvantage is that type checking cannot work.

**How to speed up ts-loader and check typings as well?**

We can use another plugin called [fork-ts-checker-webpack-plugin](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin)

```bash npm2yarn
npm install fork-ts-checker-webpack-plugin -D
```

Then config as following:

```js title="webpack.config.js"
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

{
  plugins: [new ForkTsCheckerWebpackPlugin()];
}
```

## babel-loader

## Loader comparsion

| Loader       | Compiler ability            | Type checking | Plugins  |
| ------------ | --------------------------- | ------------- | -------- |
| ts-loader    | ts/tsx/js/jsx → es3/5/6/... | Yes           | No       |
| babel-loader | ts/tsx/js/jsx → es3/5/6/... | No            | Too Many |

Before babel@7:

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/RZaB05.png' alt='RZaB05'/>

After babel@7:

<Img w="280" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/vqqMmM.png' alt='vqqMmM'/>
