let color = '#3aa757';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });
console.log("=========> - test")

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("=========> - request", request)
});