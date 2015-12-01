(function (window, document) {

    // key trigger functions; ctrl is "control" on mac
    window.addEventListener("keydown", function (e) {

        // chrome os shift tab focus with square brackets
        if (e.ctrlKey && e.shiftKey && !e.altKey) {
            if (e.keyCode === 219) { // square bracket left '['
                sendRuntimeMessage("tabFocusPrevious");
            } else if (e.keyCode === 221) { // square bracket right ']'
                sendRuntimeMessage("tabFocusNext");
            }
        } function sendRuntimeMessage (message) {
            chrome.runtime.sendMessage(message); // see background.js
        }

        // windows os tab history back / forward with control and square brackets
        if (e.ctrlKey && !e.shiftKey && !e.altKey) {
            if (e.keyCode === 219) { // square bracket left '['
                window.history.back();
            } else if (e.keyCode === 221) { // square bracket right ']'
                window.history.forward();
            }
        }

        // prompt sanitized copyable filename; tailored to looperman
        if (e.ctrlKey && !e.altKey) {
            if (e.keyCode === 67) { // lowercase 'c'
                copySanitized();
            }
        } function copySanitized () {
            var sel = window.getSelection().toString().replace(/\s\|\s|\s\:\s|\s/g, "-").toLowerCase();
            if (sel) window.prompt("", sel);
        }

        // screen dimmer; append div with semi transparent background
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
                shade.style.pointerEvents = "none";
                document.body.appendChild(shade);
            }
        }
    });

    // click hypem fav count will console.log precedented users (they fav'd the same songs)
    if (window.location.hostname === "hypem.com") {
        if (window.document.readyState === "complete") {
            attachHypemFavoritersLogger();
        } else {
            window.document.addEventListener("readystatechange", function () {
                if (window.document.readyState === "complete") {
                    attachHypemFavoritersLogger();
                }
            });
        }
    } function attachHypemFavoritersLogger () {
        // var jq = document.createElement("script");
        // jq.onload = function () {
            var numMapSharedSongs = numMapSharedSongs || {}; // at username: num of songs in common
            var shareCounts = shareCounts || {}; // at index N: users who share N songs in common

            $(".toggle-favorites").click(handleToggleFavClick);

            function handleCollectionComplete (arrNames) {
                for (var i = 0; i < arrNames.length; i++) {
                    var name = arrNames[i];
                    numMapSharedSongs[name] = numMapSharedSongs[name] + 1 || 1; // sets {name:1} or more
                }
                for (var name in numMapSharedSongs) {
                    var shareCount = numMapSharedSongs[name];
                    if (shareCounts[shareCount]) {
                        shareCounts[shareCount].push(name);
                    } else {
                        shareCounts[shareCount] = [name];
                    }
                }
                console.log("shareCounts: ", shareCounts);
            }

            function handleToggleFavClick (e) {
                e.preventDefault();
                e.stopPropagation();

                var url = "http://hypem.com/inc/serve_activity_info.php?type=favorites&id=_ID_&skip=_SKIP_",
                    ID = $(this)[0].id.match(/favcount_(\w+)/)[1],
                    numFavoriters = parseInt($(this)[0].title.match(/\d+/)[0]),
                    regex = /href=\"\/([^\"]+)\"/g;

                // console.log("url", url, "ID", ID, "numFavoriters", numFavoriters, "regex", regex);

                var favoriters = [];

                for (var currentPage = 0; currentPage * 20 < numFavoriters; currentPage++) {
                    $.get((url.replace("_ID_", ID)).replace("_SKIP_", currentPage * 20), function (html) {
                        while (match = regex.exec(html)) {
                            favoriters.push(match[1]);
                        }
                    });
                }
                var cycleCount = 0;
                var cycle = setInterval(function () {
                    cycleCount += 1;
                    if (favoriters.length === numFavoriters || cycleCount >= 100) {
                        handleCollectionComplete(favoriters);
                        // console.log(favoriters);
                        favoriters = null;
                        clearInterval(cycle);
                    }
                }, 100);
            }
        // };
        // document.querySelector("head").appendChild(jq); jq.src = "https://code.jquery.com/jquery-2.1.1.min.js";
    }
})(window, document);