document.addEventListener('dblclick', () => {
  // 直接在content script中处理复制和变色
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
    
    // 变色效果
    document.body.style.backgroundColor = '#e6ffe6';
    setTimeout(() => {
      document.body.style.backgroundColor = '';
    }, 1000);
  } catch (err) {
    console.error('复制失败:', err);
  } finally {
    // 清理临时元素
    document.body.removeChild(textarea);
  }
}); 