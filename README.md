# 双击复制标签信息

一个简单实用的 Chrome 扩展，通过双击鼠标中键即可将当前页面的标题和 URL 以 Markdown 格式复制到剪贴板。

## 功能特点

- 双击鼠标中键即可复制当前页面信息
- 自动生成 Markdown 格式的链接
- 复制成功时显示优雅的提示信息
- 可配置是否显示详细的复制内容
- 可选择性移除URL中的推广参数
- 支持所有网页

## 使用方法

1. 在任意网页上双击鼠标中键，即可复制该页面的标题和链接
2. 复制的格式为：`[页面标题](页面URL)`
3. 在扩展选项中可以设置是否显示详细的复制内容：
   - 开启后：提示框会显示具体复制的 Markdown 文本
   - 关闭后：仅显示"复制成功！"提示
4. 可以选择是否移除URL中的推广参数：
   - 开启后：当URL中包含推广参数（如 spm、utm）时，将移除问号后的所有内容
   - 关闭后：保持原始URL不变

## 设置选项

1. 在 Chrome 浏览器中访问扩展管理页面
2. 找到"双击复制标签信息"扩展
3. 点击"扩展选项"
4. 使用开关控制是否显示详细复制内容

## 安装方法

1. 下载本扩展的源代码
2. 打开 Chrome 浏览器，访问 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择源代码所在的文件夹

## 权限说明

本扩展需要以下权限：
- `activeTab`: 访问当前标签页
- `tabs`: 读取标签页信息
- `storage`: 保存用户设置
- `scripting`: 执行内容脚本

## 隐私说明

- 本扩展仅在用户双击时获取当前页面的标题和 URL
- 不会收集或上传任何用户数据
- 所有设置都保存在本地

## 反馈与建议

如果您有任何问题或建议，欢迎提交 Issue 或 Pull Request。