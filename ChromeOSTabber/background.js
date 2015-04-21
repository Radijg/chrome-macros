chrome.runtime.onMessage.addListener(function (message, sender, response) {
   if (message.msg === "tabforward" || message.msg === "tabbackward") {
       chrome.tabs.query({
            currentWindow: true,
            active : true
        }, function (tabArray) {
            console.log("tab id: ", tabArray[0]);
        });
   } 
});