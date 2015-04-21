window.addEventListener("keydown", function (e) {
    if (e.keyCode === 221 && e.ctrlKey && e.shiftKey) {
        tab(true);
    } else if (e.keyCode === 219 && e.ctrlKey && e.shiftKey) {
        tab(false);
    }
});

function tab (isForwardTab) {
    window.console.log("tabbing forward: " + isForwardTab);

    callWithTabID(function (tabID) {
        console.log("active tab ID: ", tabID);
    });

    function callWithTabID (callback) {
        chrome.tabs.query({
            currentWindow: true,
            active : true
        }, function (tabArray) {
            callback(tabArray[0]);
        });
    }
}

window.addEventListener("tabForward", function () {
    console.log("TAB FORWARD RECEIVED MFCKER");
});