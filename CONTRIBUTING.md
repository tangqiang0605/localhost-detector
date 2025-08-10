# 贡献指南

欢迎您为本项目做出贡献！为了让协作更顺畅，请在开始前仔细阅读本指南。

## TODO

1. 插件应该将结果缓存？
2. npmjs上显示github仓库

## 项目结构

本项目包含两个主要部分：

1.  **`lcd` 命令行工具**：位于项目根目录。这是一个 Node.js 工具，负责扫描本地端口并通过 API 将结果提供给 Chrome 插件。
2.  **Chrome 插件**：位于 `extension` 子目录。这是一个使用 Vite 和 React 构建的插件，用于展示 `lcd` 工具的扫描结果。

## 环境准备

在开始之前，请确保您的电脑上已安装以下软件：

*   [Node.js](https://nodejs.org/) (建议使用 LTS 版本)
*   [npm](https://www.npmjs.com/) (通常随 Node.js 一起安装)
*   [Git](https://git-scm.com/)

## 开发流程

### 1. 初始化项目

首先，克隆本项目到本地，并分别安装根目录和 `extension` 目录下的依赖。

```bash
# 克隆项目
git clone git@github.com:tangqiang0605/localhost-detector.git
cd localhost-detector

# 安装 lcd 工具的依赖
npm install

# 安装 Chrome 插件的依赖
cd extension
npm install
```

### 2. 启动开发服务

开发时，您需要同时运行 `lcd` 服务和插件的开发服务器。

**启动 `lcd` 服务：**

打开一个新的终端，在项目根目录运行：

```bash
# 这会启动一个 API 服务器，默认监听在 http://localhost:9999
npm start

# 您也可以使用 -p 参数指定不同端口
npm start -- -p 8888
```

**启动插件开发服务器：**

打开另一个终端，进入 `extension` 目录，然后运行：

```bash
# 这会启动 Vite 的热更新开发服务器
cd extension
npm run dev
```

### 3. 在 Chrome 中加载插件

1.  打开 Chrome 浏览器，访问 `chrome://extensions/`。
2.  开启右上角的 “开发者模式”。
3.  点击 “加载已解压的扩展程序”。
4.  选择本项目中的 `extension` 目录（注意：不是 `extension/dist`）。

现在，当您修改 `extension` 目录下的代码时，插件会自动刷新，方便您进行调试。

## 仿真调试

模仿用户的使用路径来测试代码。

```bash
npm link
npm link localhost-detector

lcd start
lcd export
```

export 命令会将插件导出到指定目录，默认为当前目录。

也可以自行构建插件：

```bash
cd extension
npm run build
```


## 构建与发布

### 构建 Chrome 插件

要构建用于生产环境的插件，请在 `extension` 目录下运行：

```bash
cd extension
npm run build
```

构建产物会生成在 `extension/dist` 目录中。您可以将此目录打包为 `.zip` 文件，用于发布到 Chrome 网上应用店。

### 发布 `lcd` 工具到 npm

`lcd` 工具已经配置为可以通过 npm 发布。请确保您已经修改了 `package.json` 中的版本号。

```bash
# 登录 npm (首次发布需要)
npm login

# 发布到 npm
npm publish --registry https://registry.npmjs.org/
npm unpublish localhost-detector@0.0.5 --registry https://registry.npmjs.org/
```

## 提交代码

本项目使用一个定制的 `commit` 脚本来规范提交信息和自动化流程。

在您修改完代码后，请使用以下命令提交：

```bash
# 将您的修改添加到暂存区
git add .

# 运行提交脚本
npm run commit
```

脚本会自动处理版本更新、生成 `CHANGELOG.md` 等事宜。
