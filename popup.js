const THEME_CHECK_API = "https://foxkit.app/api/public/extension/theme"
const EXT_KEY = 'FOX_X'

// Initialize button with user's preferred color
const getPageTitleButton = document.getElementById("getTitle");
const titleNode = document.getElementById("title");
const resNode = document.getElementById("res");

getPageTitleButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.storage.sync.clear()
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getPageTitle
  });
})


async function getPageTitle() {
  const res = await (await fetch('${THEME_CHECK_API}?shop=hta218.myshopify.com&themeId=125944889514')).json()
  chrome.runtime.sendMessage({
    type: EXT_KEY,
    theme: res.payload
  });

  return res
}