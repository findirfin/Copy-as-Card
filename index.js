chrome.contextMenus.create({
    "id":"Copy with Citation",
    "title": "Copy with Citation",
    "contexts": ["selection"]
  });
   




  chrome.contextMenus.onClicked.addListener(function(itemData){

    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        var tab = tabs[0];
        var empty = `
        `;
        chrome.tabs.getSelected(null,function(tab) {
          var title = tab.title;
          var full = itemData.selectionText + empty + title + " - " + tab.url;
          copyToClipboard(full);
         });
    });

  });
   


  const copyToClipboard = str => {
    console.log("copyToClipboard");
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };