# 双击复制标签信息 Chrome 插件

一个简单实用的 Chrome 插件，可以通过双击页面快速将当前标签页的标题和 URL 以 Markdown 格式复制到剪贴板。

## 功能特点

- 双击页面任意位置即可触发复制
- 自动将标题和 URL 格式化为 Markdown 链接格式
- 复制成功时在页面中央显示优雅的提示信息
- 轻量级设计，不影响页面性能

## 安装方法

1. 下载本项目所有文件到本地文件夹
2. 打开 Chrome 浏览器，进入扩展程序页面：
   - 在地址栏输入 `chrome://extensions/`
   - 或者通过菜单 "更多工具" -> "扩展程序" 进入
3. 在扩展程序页面右上角启用 "开发者模式"
4. 点击 "加载已解压的扩展程序"
5. 选择包含插件文件的文件夹

## 使用方法

1. 安装插件后，打开任意网页
2. 双击页面任意位置
3. 页面中央会显示 "复制成功！" 的提示
4. 此时剪贴板中已包含格式化后的 Markdown 链接

例如，如果你在 Google 主页双击，可能会得到如下格式的文本： 
```markdownText
[Google](https://www.google.com/)
```

## 文件结构

- `manifest.json`: 插件配置文件
- `content.js`: 处理页面交互和复制功能
- `background.js`: 后台服务
- `README.md`: 说明文档

## 权限说明

插件需要以下权限：
- `activeTab`: 访问当前标签页
- `tabs`: 获取标签页信息
- `scripting`: 执行页面脚本
- `clipboardWrite`: 写入剪贴板

## 开发说明

如果你想修改或改进这个插件：

1. 修改提示样式：在 `content.js` 中的 `showMessage` 函数中调整 CSS 样式
2. 修改复制格式：在 `content.js` 中修改 `markdownText` 的格式化方式
3. 调整提示时间：修改 `setTimeout` 的时间参数（当前为 2000ms）

## 贡献

欢迎提交 Issue 或 Pull Request 来改进这个插件。

## 许可证

MIT License