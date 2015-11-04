(function () {
    var _this = this;

    chrome.runtime.onMessage.addListener(function (message, sender, response) {
        message.keydownEvent && handleKeydownEvent(message.keydownEvent);
    }); //--------- attach listener; similar to chrome.runtime.addEventListener("message", function handleMessage (message) { ... });

    function handleKeydownEvent (e) {
        if (e.keyCode === 221 && e.ctrlKey === true && e.shiftKey === true) {
           tab(true);
        }
        if (e.keyCode === 219 && e.ctrlKey && e.shiftKey) {
            tab(false);
        }
    } //--------- handle keypress; dispatch commands


    // for tabbing on ChromeOS
    function tab (forward) {
        onNextTabDetermined(function (nextTab) {
            chrome.tabs.update(nextTab && nextTab.id, {
                "active": true,
                "selected": true
            });
        });

        function onNextTabDetermined (callback) {
            chrome.tabs.query({
                currentWindow: true,
                active: true
            }, function (currentTabs) {
                var nextTabIndex = (currentTabs[0].index + (forward ? 1 : -1));
                if (nextTabIndex === -1) {
                    chrome.tabs.query({
                        "currentWindow": true
                    }, function (allTabs) {
                        callback(allTabs[allTabs.length - 1]);
                    }); 
                } else {
                    chrome.tabs.query({
                        "index": nextTabIndex,
                        "currentWindow": true
                    }, function (nextTabs) {
                        if (nextTabs[0]) {
                            callback(nextTabs[0]);
                        } else {
                            chrome.tabs.query({"index": 0}, function (nextTabs) {
                                callback(nextTabs[0]);
                            });
                        }
                    });
                }
            });
        };
    }
})();