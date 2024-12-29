// URL清洗函数
function cleanUrl(url) {
  try {
    const urlObj = new URL(url);
    // 需要移除的参数列表
    const paramsToRemove = [
      'spm',
      'spm_id_from',  // B站特有
      'vd_source',    // B站特有
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content'
    ];
    
    // 获取所有查询参数
    const searchParams = new URLSearchParams(urlObj.search);
    let hasPromoParam = false;
    
    // 找到推广参数在查询字符串中的位置
    let promoParamIndex = -1;
    for (const param of paramsToRemove) {
      const fullParam = `${param}=`;
      const index = url.indexOf(fullParam);
      if (index !== -1 && (url[index - 1] === '?' || url[index - 1] === '&')) {
        promoParamIndex = index;
        hasPromoParam = true;
        break;
      }
    }
    
    // 如果找到推广参数，截取到该参数之前的部分
    if (hasPromoParam) {
      const paramStart = url.lastIndexOf('?', promoParamIndex);
      if (paramStart === promoParamIndex - 1) {
        // 如果推广参数是第一个参数，直接返回不带参数的URL
        return url.substring(0, paramStart);
      } else {
        // 如果推广参数不是第一个参数，保留之前的参数
        return url.substring(0, url.lastIndexOf('&', promoParamIndex));
      }
    }
    
    // 如果不存在需要移除的参数，保持原URL不变
    return url;
  } catch (e) {
    console.error('URL清洗失败:', e);
    return url;
  }
}

// 添加双击检测变量
let lastMiddleClickTime = 0;
const DOUBLE_CLICK_THRESHOLD = 300; // 双击时间阈值（毫秒）

document.addEventListener('mouseup', (event) => {
  // 检查是否是鼠标中键（button值为1表示中键）
  if (event.button !== 1) return;
  
  // 防止默认的中键滚动行为
  event.preventDefault();
  
  try {
    const currentTime = Date.now(); // 使用 Date.now() 替代 new Date().getTime()
    const timeDiff = currentTime - lastMiddleClickTime;
    
    if (timeDiff < DOUBLE_CLICK_THRESHOLD) {
      // 双击中键，执行复制操作
      const title = document.title;
      let url = window.location.href;
      
      // 获取设置并处理URL
      chrome.storage.sync.get(['showDetailedMessage', 'cleanUrl'], (result) => {
        if (result.cleanUrl) {
          url = cleanUrl(url);
        }
        
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
          
          const message = result.showDetailedMessage 
            ? `复制成功！\n${markdownText}`
            : '复制成功！';
          showMessage(message);
        } catch (err) {
          console.error('复制失败:', err);
          showMessage('复制失败！', true);
        } finally {
          // 清理临时元素
          document.body.removeChild(textarea);
        }
      });
      
      // 重置点击时间
      lastMiddleClickTime = 0;
    } else {
      // 记录第一次点击时间
      lastMiddleClickTime = currentTime;
    }
  } catch (error) {
    console.error('双击检测失败:', error);
  }
});

// 显示消息的函数
function showMessage(text, isError = false) {
  // 创建消息元素
  const message = document.createElement('div');
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
    white-space: pre-line;
  `;
  
  message.textContent = text;
  
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