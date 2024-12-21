document.addEventListener('dblclick', () => {
  const title = document.title;
  const url = window.location.href;
  const markdownText = `[${title}](${url})`;

  // 创建一个临时的textarea元素
  const textarea = document.createElement('textarea');
  textarea.value = markdownText;
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    // 执行复制
    document.execCommand('copy');
    console.log('复制成功:', markdownText);
    
    // 显示提示消息
    showMessage('复制成功！');
  } catch (err) {
    console.error('复制失败:', err);
    showMessage('复制失败！', true);
  } finally {
    // 清理临时元素
    document.body.removeChild(textarea);
  }
});

// 显示消息的函数
function showMessage(text, isError = false) {
  // 创建消息元素
  const message = document.createElement('div');
  message.textContent = text;
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${isError ? '#ffebee' : '#e8f5e9'};
    color: ${isError ? '#c62828' : '#2e7d32'};
    padding: 16px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 999999;
    transition: opacity 0.3s ease-in-out;
  `;
  
  // 添加到页面
  document.body.appendChild(message);
  
  // 2秒后淡出并移除
  setTimeout(() => {
    message.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(message);
    }, 300);
  }, 2000);
} 