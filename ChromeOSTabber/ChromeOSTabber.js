window.addEventListener("keydown", function (e) {
    var keydownEvent = {};

    for (var key in e) {
        if (e.hasOwnProperty(key) && typeof e[key] === "number" || typeof e[key] === "string" || typeof e[key] === "boolean") {
            keydownEvent[key] = e[key]
        }
    }

    chrome.runtime.sendMessage({"keydownEvent": keydownEvent})
});