const THEME_CHECK_API = "https://foxkit.app/api/public/extension/theme"
const EXT_KEY = 'FOX_X'

console.log('Run popup.js')

// 1. Detect Shopify site


// 2. Detect Theme


// 2.1 Is Minimog => Fetch theme version

// 2.2 Not Minimog ? Fetch theme list (Check Shop + get Theme list)

// 3. Add event to fetch all themes

// Initialize button with user's preferred color
const getPageTitleButton = document.getElementById("getTitle");
const titleNode = document.getElementById("title");
const resNode = document.getElementById("res");

getPageTitleButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getPageTitle
  });
})


async function getPageTitle() {
  const res = await (await fetch(`${THEME_CHECK_API}?shop=hta218.myshopify.com&themeId=125944889514`)).json()
  chrome.runtime.sendMessage({
    type: EXT_KEY,
    theme: res.payload
  });
}