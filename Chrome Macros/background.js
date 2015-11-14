(function () {
    var _this = this;

    chrome.runtime.onMessage.addListener(function (msg, sender, response) {

        if (msg === "tab") {
            tab(true);
        } else if (msg = "tab-reverse") {
            tab(false);
        }

    });


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