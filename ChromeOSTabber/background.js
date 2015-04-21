this.switchTab = function (isTabForward) {
    onCurrentTabQueried(function (currentTab) {
        onNextTabDetermined(function (nextTab) {
            chrome.tabs.update(nextTab && nextTab.id, {
                "active": true,
                "selected": true
            });
        });
    });
};

chrome.runtime.onMessage.addListener(function (message, sender, response) {
   if (message.keydownEvent) {
       var e = message.keydownEvent;
       if (e.keyCode === 221 && e.ctrlKey && e.shiftKey) {
           this.isTabForward = true;
           this.switchTab(true);
       } else if (e.keyCode === 219 && e.ctrlKey && e.shiftKey) {
           this.isTabForward = false;
           this.switchTab(false);
       }
   }
}.bind(this));

function onCurrentTabQueried (callback) {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function (tabArray) {
        this.currentTab = tabArray[0];
        callback(tabArray[0]);
    }.bind(this));
}

function onNextTabDetermined (callback) {
    chrome.tabs.query({
        "index": this.currentTab.index + (!!this.isTabForward ? 1 : -1)
    }, function (tabArray) {
        if (tabArray[0]) {
            this.nextTab = tabArray[0];
            callback(tabArray[0]);
        } else {
            chrome.tabs.query({
                "index": 0
            }, function (tabArray) {
                if (tabArray[0]) {
                    this.nextTab = tabArray[0];
                    callback(tabArray[0]);
                } else {
                    this.nextTab = null;
                    callback(null);
                }
            });
        }
    }.bind(this));
}
