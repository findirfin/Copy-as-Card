chrome.contextMenus.create({
  id: "Copy as Card",
  title: "Copy as Card",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(function (itemData) {
    // Code for copying as card
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true,
      },
      function (tabs) {
        var tab = tabs[0];
        var empty = `
          `;
        chrome.tabs.getSelected(null, function (tab) {
          var title = tab.title;
          if (title.length > 60) {
            var title = title.slice(0, 60);
            var full =
              itemData.selectionText + empty + title + "..." + " - " + tab.url;
            copyAsCard(full);
          } else {
            var full = itemData.selectionText + empty + title + " - " + tab.url;
            copyAsCard(full);
          }
        });
      }
    );
});

const copyAsCard = (str) => {
  console.log("copyAsCard");
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
