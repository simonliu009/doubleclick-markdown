document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('showDetailedMessage');
  const cleanUrlCheckbox = document.getElementById('cleanUrl');
  
  // 加载保存的设置
  chrome.storage.sync.get(['showDetailedMessage', 'cleanUrl'], (result) => {
    checkbox.checked = result.showDetailedMessage || false;
    cleanUrlCheckbox.checked = result.cleanUrl || false;
  });
  
  // 保存设置变更
  checkbox.addEventListener('change', (e) => {
    chrome.storage.sync.set({
      showDetailedMessage: e.target.checked
    });
  });
  
  cleanUrlCheckbox.addEventListener('change', (e) => {
    chrome.storage.sync.set({
      cleanUrl: e.target.checked
    });
  });
}); 