// 由于我们现在直接在页面中显示消息，background.js可以为空
chrome.runtime.onMessage.addListener((request, sender) => {
  // 保持文件存在但不需要任何操作
}); 