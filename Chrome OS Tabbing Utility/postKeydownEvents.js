window.addEventListener("keydown", function (e) {
    var keydownEvent = {};

    for (var key in e) {
        ["number", "string", "boolean"].forEach(function (primitive) {
           if (typeof e[key] === primitive) {
                keydownEvent[key] = e[key];
            }
        });
    }

    chrome.runtime.sendMessage({"keydownEvent": keydownEvent})
});