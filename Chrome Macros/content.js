(function () {
    window.addEventListener("keydown", function (e) {
        postKeydownEvent(e);

        if (e.keyCode === 67 && e.altKey && e.shiftKey) {
            var sel = window.getSelection().toString().replace(/\s\|\s|\s\:\s|\s/g, "-").toLowerCase();
            sel && window.prompt("", sel);
        }
    });

    function postKeydownEvent (e) {
        var keydownEvent = {};
        for (var key in e) {
            ["number", "string", "boolean"].forEach(function (primitive) {
               if (typeof e[key] === primitive) {
                    keydownEvent[key] = e[key];
                }
            });
        }

        chrome.runtime.sendMessage({"keydownEvent": keydownEvent});
    }
})();