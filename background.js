let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("=========> - message", message)
  // 2. A page requested user data, respond with a copy of `user`
  if (message === 'get-user-data') {
    sendResponse("user");
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("=========> - request", request)
});