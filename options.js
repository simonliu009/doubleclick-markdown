document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('showDetailedMessage');
  const cleanUrlCheckbox = document.getElementById('cleanUrl');
  
  // 加载保存的设置，默认都为开启状态
  chrome.storage.sync.get(['showDetailedMessage', 'cleanUrl'], (result) => {
    // 如果是首次使用（未设置），则默认开启
    if (result.showDetailedMessage === undefined) {
      chrome.storage.sync.set({ showDetailedMessage: true });
    }
    if (result.cleanUrl === undefined) {
      chrome.storage.sync.set({ cleanUrl: true });
    }
    
    checkbox.checked = result.showDetailedMessage !== undefined ? result.showDetailedMessage : true;
    cleanUrlCheckbox.checked = result.cleanUrl !== undefined ? result.cleanUrl : true;
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