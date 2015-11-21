(function (window, document) {

    window.addEventListener("keydown", function (e) {

        // tab focus -- previous or next for ChromeOS
        if (e.ctrlKey && e.shiftKey && !e.altKey) {
            if (e.keyCode === 219) { // square bracket left '['
                sendRuntimeMessage("tabFocusPrevious");
            } else if (e.keyCode === 221) { // square bracket right ']'
                sendRuntimeMessage("tabFocusNext");
            }
        } function sendRuntimeMessage (message) {
            chrome.runtime.sendMessage(message); // see background.js
        }

        // looperman copy -- prompt sanitized sample details
        if (e.ctrlKey && !e.altKey) {
            if (e.keyCode === 67) { // lowercase 'c'
                copySanitized();
            }
        } function copySanitized () {
            var sel = window.getSelection().toString().replace(/\s\|\s|\s\:\s|\s/g, "-").toLowerCase();
            if (sel) window.prompt("", sel);
        }

        // basic night shade -- append div with semi transparent background
        if (e.ctrlKey && e.shiftKey && !e.altKey) {
            if (e.keyCode === 48) {
                setShadeLevel(0);
            } else if (e.keyCode === 49) {
                setShadeLevel(0.05);
            } else if (e.keyCode === 50) {
                setShadeLevel(0.1);
            } else if (e.keyCode === 51) {
                setShadeLevel(0.15);
            } else if (e.keyCode === 52) {
                setShadeLevel(0.2);
            } else if (e.keyCode === 53) {
                setShadeLevel(0.25);
            } else if (e.keyCode === 54) {
                setShadeLevel(0.3);
            } else if (e.keyCode === 55) {
                setShadeLevel(0.35);
            } else if (e.keyCode === 56) {
                setShadeLevel(0.4);
            } else if (e.keyCode === 57) {
                setShadeLevel(0.45);
            } else if (e.keyCode === 58) {
                setShadeLevel(0.5);
            }
        } function setShadeLevel (shadeLevel) {
            var shade = document.querySelector("#shade");
            if (shade) {
                shade.style.backgroundColor = "rgba(0,0,0," + shadeLevel + ")";
            } else {
                shade = document.createElement("div");
                shade.id = "shade";
                shade.style.position = "fixed";
                shade.style.left = "0px";
                shade.style.top = "0px";
                shade.style.width = "100%";
                shade.style.height = "100%";
                shade.style.backgroundColor = "rgba(0,0,0," + shadeLevel + ")";
                shade.style.zIndex = "2147483647";
                document.body.appendChild(shade);
            }
        }

        // windows os tabs back and forward with control and square brackets
        if (e.ctrlKey && !e.shiftKey && !e.altKey) {
            if (e.keyCode === 219) {
                window["history"]["back"]();
            } else if (e.keyCode === 221) {
                window["history"]["forward"]();
            }
        }
    });

})(window, document);