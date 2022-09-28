const menu = chrome.contextMenus.create({
    'id': 'PocketDictionary',
    'title': 'PocketDictionary "%s"',
    'contexts': ['selection']
})

function PopupWindowCenter(url, title, w, h) {
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
  } 

chrome.contextMenus.onClicked.addListener((clickData) => {
    const inputString = clickData.selectionText
    PopupWindowCenter("https://rattledoge.github.io/PocketDictionary/?word="+inputString, "PocketDict", 480, 700);
});