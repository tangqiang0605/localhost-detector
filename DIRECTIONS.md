---
prompt:
  - 请先确认以下内容再开始修改
  - 根据 DOING 部分修改项目
  - 修改前请和我确定方案，认可后才修改代码
  - 完成修改后，先add修改的文件，然后再执行commit脚本提交修改。commit脚本位于 /Users/qihangtang/Desktop/remote_debug/url-decocder/directions-learn/scripts/commit.cjs，请添加到package.json文件中。
  - 注意维护.gitignore等文件
  - 需要将项目开发调试运行发布的方法记录在贡献文件中
  - 提交后结束任务等待下次对话
  - 使用包管理工具npm、node使用20版本（使用nvm）
context: "该项目是适用vite+react开发的检测和快速打开页面的chrome插件"
---

## 【DOING】v0.0.3 检测端口
1. 检测的端口太少了，可以在插件支持自定义输入端口，有两种格式，一种是写范围，一种是写具体。
2. 右上角检测到的服务角标，应该是绿底白色好看。

## 【DONE】v0.0.2 优化用户体验
1. 绘制一个svg图标，用在固定栏、插件icon上。
2. 去掉面板留白部分root的padding。
3. 整体不要使用暗色。
4. 面板上应该有提示说明插件的作用、如何安装启动lcd

## 【DONE】v0.0.1 初始化项目
1. vite-react初始化项目，这是一个chrome插件。
2. 检测系统哪些port有页面访问服务，比如发现5173打开着，插件就显示蓝色连接“http://localhost:5173”点击可以跳转。
3. 先跟我诉说方案。

