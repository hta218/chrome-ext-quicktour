let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  console.log("=========> - onInstalled")
});
console.log("=========> - test")

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("=========> - request", request)
});