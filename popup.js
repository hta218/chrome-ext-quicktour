// Initialize button with user's preferred color
// let changeColor = document.getElementById("changeColor");
const getPageTitleButton = document.getElementById("getTitle");
const titleNode = document.getElementById("title");
console.log("=========> - titleNode", titleNode)

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   console.log("=========> - changeColor click")
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   console.log("=========> - tab", tab)

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   });
// });

getPageTitleButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getPageTitle
  }, () => {
    console.log('Done')
    chrome.storage.sync.get("title", ({ title }) => {
      console.log("=========> - title", title)
      titleNode.textContent = `The document title is: ${title}`
    });
  });
})


function getPageTitle() {
  console.log("=========> - document.title", document.title)
  chrome.storage.sync.set({ title: document.title });
  chrome.storage.sync.set({ foo: { bar: 1, baz: [2, 3, 4] } });
}

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  console.log("=========> - setPageBackgroundColor")
  chrome.storage.sync.get("color", ({ color }) => {
    console.log("=========> - color", color)
    document.body.style.backgroundColor = color;
  });
}