window.addEventListener("keydown", function (e) {
    if (e.keyCode === 219 && e.ctrlKey && e.shiftKey) {
        tab(true);
    } else if (e.keyCode === 221 && e.ctrlKey && e.shiftKey) {
        tab(false);
    }
});

function tab (isForwardTab) {
    chrome.runtime.sendMessage({msg:'tabforward'});
    window.console.log("tabbing forward: " + isForwardTab);
}