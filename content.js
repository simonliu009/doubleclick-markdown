// 在文件开头添加默认设置
let userSettings = {
  showDetailedMessage: true,  // 默认显示详细信息
  cleanUrl: true             // 默认清理URL
};

// 在文件开头添加初始化函数
function initializeSettings() {
  chrome.storage.sync.get(['showDetailedMessage', 'cleanUrl'], (result) => {
    userSettings.showDetailedMessage = result.showDetailedMessage !== undefined ? result.showDetailedMessage : true;
    userSettings.cleanUrl = result.cleanUrl !== undefined ? result.cleanUrl : true;
  });
}

// 初始化设置
initializeSettings();

// 监听设置变化
chrome.storage.onChanged.addListener((changes) => {
  if (changes.showDetailedMessage) {
    userSettings.showDetailedMessage = changes.showDetailedMessage.newValue;
  }
  if (changes.cleanUrl) {
    userSettings.cleanUrl = changes.cleanUrl.newValue;
  }
});

// URL清洗函数
function cleanUrl(url) {
  try {
    const urlObj = new URL(url);
    
    // 如果没有查询参数，直接返回原始URL
    if (!urlObj.search) {
      return url;
    }

    // 需要移除的参数列表
    const paramsToRemove = [
      'spm',
      'spmid',        // B站特有
      'spm_id_from',  // B站特有
      'vd_source',    // B站特有
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'ops_request_misc',  // CSDN特有
      'request_id',        // CSDN特有
      'biz_id',           // CSDN特有
      'buvid',            // B站特有
      'from_spmid',       // B站特有
      'is_story_h5',      // B站特有
      'mid',              // B站特有
      'plat_id',          // B站特有
      'share_from',       // B站特有
      'share_medium',     // B站特有
      'share_plat',       // B站特有
      'share_session_id', // B站特有
      'share_source',     // B站特有
      'share_tag',        // B站特有
      'timestamp',        // B站特有
      'unique_k',         // B站特有
      'up_id'            // B站特有
    ];
    
    // 获取所有查询参数
    const searchParams = new URLSearchParams(urlObj.search);
    let hasChanged = false;
    
    // 遍历并删除推广参数
    for (const param of paramsToRemove) {
      if (searchParams.has(param)) {
        searchParams.delete(param);
        hasChanged = true;
      }
    }
    
    // 如果没有改变，返回原始URL
    if (!hasChanged) {
      return url;
    }
    
    // 重建URL
    const remainingParams = searchParams.toString();
    const baseUrl = url.split('?')[0];
    return remainingParams ? `${baseUrl}?${remainingParams}` : baseUrl;
    
  } catch (e) {
    console.error('URL清洗失败:', e);
    return url;
  }
}

// 在文件开头的变量声明部分
let lastMiddleClickTime = 0;
let middleClickCount = 0;
const CLICK_THRESHOLD = 300; // 点击时间阈值（毫秒）
let clickTimer = null;  // 添加定时器变量

document.addEventListener('mouseup', (event) => {
  // 只监听中键点击
  if (event.button !== 1) return;
  
  // 防止默认的中键滚动行为
  event.preventDefault();
  
  try {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastMiddleClickTime;
    
    if (timeDiff < CLICK_THRESHOLD) {
      // 增加点击计数
      middleClickCount++;
      
      // 清除之前的定时器
      if (clickTimer) {
        clearTimeout(clickTimer);
      }
      
      // 设置新的定时器
      clickTimer = setTimeout(() => {
        if (middleClickCount === 2) {
          // 双击中键，复制带标题的链接
          const title = document.title;
          let url = window.location.href;
          
          if (userSettings.cleanUrl) {
            url = cleanUrl(url);
          }
          
          const markdownText = `[${title}](${url})`;
          copyToClipboard(markdownText, '复制成功！');
        } else if (middleClickCount === 3) {
          // 三击中键，仅复制URL
          let url = window.location.href;
          
          if (userSettings.cleanUrl) {
            url = cleanUrl(url);
          }
          
          copyToClipboard(url, 'URL复制成功！');
        }
        
        // 重置点击计数和定时器
        middleClickCount = 0;
        clickTimer = null;
      }, CLICK_THRESHOLD);
    } else {
      // 超时，重置计数
      middleClickCount = 1;
    }
    
    // 更新最后点击时间
    lastMiddleClickTime = currentTime;
  } catch (error) {
    console.error('点击检测失败:', error);
    // 发生错误时重置状态
    middleClickCount = 0;
    if (clickTimer) {
      clearTimeout(clickTimer);
      clickTimer = null;
    }
  }
});

// 添加一个通用的复制函数
function copyToClipboard(text, successMessage) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    console.log('复制成功:', text);
    
    const message = userSettings.showDetailedMessage 
      ? `${successMessage}\n${text}`
      : successMessage;
    showMessage(message);
  } catch (err) {
    console.error('复制失败:', err);
    showMessage('复制失败！', true);
  } finally {
    document.body.removeChild(textarea);
  }
}

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