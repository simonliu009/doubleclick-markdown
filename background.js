chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('收到消息:', request);
  
  if (request.action === "copyToClipboard") {
    const markdownText = `[${request.title}](${request.url})`;
    
    // 复制到剪贴板
    navigator.clipboard.writeText(markdownText)
      .then(() => {
        console.log('复制成功:', markdownText);
        
        // 执行页面变色效果
        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          function: () => {
            document.body.style.backgroundColor = '#e6ffe6';
            setTimeout(() => {
              document.body.style.backgroundColor = '';
            }, 1000);
          }
        })
        .then(() => {
          sendResponse({ success: true });
        })
        .catch((error) => {
          console.error('变色效果执行失败:', error);
          sendResponse({ success: false, error: error.message });
        });
      })
      .catch((error) => {
        console.error('复制失败:', error);
        sendResponse({ success: false, error: error.message });
      });
    
    return true; // 表示我们会异步发送响应
  }
}); 