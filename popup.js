// Initialize button with user's preferred color
const getPageTitleButton = document.getElementById("getTitle");
const titleNode = document.getElementById("title");
const resNode = document.getElementById("res");
console.log("=========> - titleNode", titleNode)

var port = chrome.runtime.connect();

getPageTitleButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.storage.sync.clear()
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getPageTitle
  }, async () => {
    chrome.storage.sync.get("theme", ({ theme }) => {
      console.log("=========> - theme", theme)
    });
  });
})


async function getPageTitle() {
  console.log("=========> - document.title", document.title)
  // chrome.storage.sync.set({ title: document.title });
  // chrome.storage.sync.set({ foo: { bar: 1, baz: [2, 3, 4] } });
  const res = await (await fetch('https://foxkit.app/api/public/extension/theme?shop=hta218.myshopify.com&themeId=125944889514')).json()
  console.log("=========> - res", res)
  await chrome.storage.sync.set({ theme: res.payload });

  chrome.runtime.sendMessage('get-user-data', (response) => {
    // 3. Got an asynchronous response with the data from the background
    console.log('received user data', response);
  });

  chrome.runtime.sendMessage({
    type: 'FOX_X',
    theme: res.payload
  });

  return res
}