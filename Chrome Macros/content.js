(function (window, document) {

    var _this = {};

    window.addEventListener("keydown", function (e) {

        if (e.ctrlKey && e.shiftKey) {
            switch (e.keyCode) {

                // ----------------------------

                case 221:
                    sendRuntimeMessage("tab");
                    break;
                case 219:
                    sendRuntimeMessage("tab-reverse");
                    break;

                // ----------------------------

                case 67:
                    copySanitized();
                    break;

                // ----------------------------

                case 48:
                    setShadeLevel(0);
                    break;
                case 49:
                    setShadeLevel(0.05);
                    break;
                case 50:
                    setShadeLevel(0.1);
                    break;
                case 51:
                    setShadeLevel(0.15);
                    break;
                case 52:
                    setShadeLevel(0.20);
                    break;
                case 53:
                    setShadeLevel(0.25);
                    break;
                case 54:
                    setShadeLevel(0.30);
                    break;
                case 55:
                    setShadeLevel(0.35);
                    break;
                case 56:
                    setShadeLevel(0.40);
                    break;
                case 57:
                    setShadeLevel(0.45);
                    break;
                case 58:
                    setShadeLevel(0.50);
                    break;
            }
        }
    });

    function sendRuntimeMessage (message) {
        chrome.runtime.sendMessage(message);
    }

    function copySanitized () {
        var sel = window.getSelection().toString().replace(/\s\|\s|\s\:\s|\s/g, "-").toLowerCase();
        if (sel) { window.prompt("", sel); }
    }

    function setShadeLevel (shadeLevel) {
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

    

})(window, document);