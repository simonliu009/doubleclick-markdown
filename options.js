document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('showDetailedMessage');
  
  // 加载保存的设置
  chrome.storage.sync.get(['showDetailedMessage'], (result) => {
    checkbox.checked = result.showDetailedMessage || false;
  });
  
  // 保存设置变更
  checkbox.addEventListener('change', (e) => {
    chrome.storage.sync.set({
      showDetailedMessage: e.target.checked
    });
  });
}); 