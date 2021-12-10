// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  console.log("=========> - changeColor click")
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log("=========> - tab", tab)

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});
  

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  console.log("=========> - setPageBackgroundColor")
  chrome.storage.sync.get("color", ({ color }) => {
    console.log("=========> - color", color)
    document.body.style.backgroundColor = color;
  });
}