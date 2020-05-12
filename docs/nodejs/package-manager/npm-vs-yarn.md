---
title: npm vs. yarn
---

## npm 与 yarn 常用命令对比

### 同操作同名的命令

| npm | yarn | 功能描述 |
| --- | --- | --- |
| npm run | yarn run | 运行 `package.json` 中预定义的脚本 |
| npm config list | yarn config list | 查看配置信息 |
| npm config set registry 仓库地址 | yarn config set registry 仓库地址 | 更换仓库地址 |
| npm init | yarn init | 互动式创建/更新 package.json 文件 |
| npm list | yarn list | 查看当前目录下已安装的所有依赖 |
| npm login | yarn login | 登录你的用户名、邮箱 |
| npm logout | yarn logout | 退出你的用户名、邮箱 |
| npm publish | yarn publish | 将包发布到 npm |
| npm test | yarn test(yarn run test) | 测试 |
| npm bin | yarn bin | 显示 bin 文件所在的安装目录 |
| yarn info | yarn info | 显示一个包的信息 |

### 同操作不同名的命令

| npm | yarn | 功能描述 |
| --- | --- | --- |
| npm install(npm i) | yarn install(yarn) | 根据 `package.json` 安装所有依赖 |
| npm i [package] | yarn add [package] | 添加依赖包 |
| npm i -dev [package] | yarn add [package] –dev | 添加依赖包至 `devDependencies` |
| npm i -g [package] | yarn global add [package] | 全局安装依赖包 |
| npm update –save | yarn upgrade [package] | 升级依赖包 |
| npm uninstall [package] | yarn remove [package] | 移除依赖包 |
