var i = 0;
var speed = 25;
var timeouts = [];
var allowedChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
                    "p","q","r","s","t","u","v","w","x","y","z","A","B","C","D",
                    "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S",
                    "T","U","V","W","X","Y","Z"];
var visited = [false, false, false, false];
var entered;
var noRetype = false;

var dict1 = {
    "1a": "> Brad Lee is from New Jersey. He made this website",
    "1b": "> Brad studies computer science at the University of Maryland",
    "1c": "> Click or type info to find out more about this website"
}

var dict2 = {
    "2a": "> [Text Clock]",
    "2b": "> [Leetcodes]",
    "2c": "> Coming Soon!"
}

var dict3 = {
    "3a": "> bradleylee16",
    "3b": "@gmail.com",
    "3c": "> [Linkedin]"
}

var dict4 = {
    "4a": "education",
    "4b": "experience",
    "4c": "courseload"
}

setCookie("history", "");
setCookie("historyIndex",-1);

document.onkeydown = function (evt) {
    if ("key" in evt) {
        if (evt.key == "Backspace") {
            document.getElementById("field").innerHTML = document.getElementById("field").innerHTML.slice(0,-1);
        } else if (evt.key == "Enter") {
            entered = document.getElementById("field").innerHTML;
            if (entered != "") {
                
                historyPush(entered.toString());
            }
            document.getElementById("field").innerHTML = "";
            if (entered == "about" || entered == "About") {
                accordion("one");
            } else if (entered == "projects" || entered == "Projects") {
                accordion("two");
            } else if (entered == "career" || entered == "Career") {
                accordion("three");
            } else if (entered == "resume" || entered == "Resume") {
                accordion("four");
            } else if (entered == "swap") {
                swap();
            } else if (entered == "reset") {
                reset();
            } else if (entered == "info") {
                window.location.href = "features.html";
            } else if (entered == "history") {
                console.log(history.toString());
            }
        } else if (evt.key == "ArrowUp") {
            displayUp();
        } else if (evt.key == "ArrowDown") {
            displayDown();
        } else if (evt.key == "`") {
            console.log(document.cookie); 
        } else if (allowedChars.includes(evt.key)) {
            document.getElementById("field").innerHTML += evt.key;
        }
    }
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function historyPush(str) {
    var list = getCookie("history");
    if (list == "") {
        setCookie("history",str);
    } else {
        list = list.split(',');
        if (list.length == 20) {
            list.shift()
        }
        list.push(str);
        setCookie("history",list.toString());
    }
    setCookie("historyIndex", getCookie("history").split(',').length-1);
    console.log("cookie: " + getCookie("history") + " historyIndex: " + getCookie("historyIndex"));
}

function displayUp() {
    var history = getCookie("history").split(',');
    var historyIndex = Number(getCookie("historyIndex"));
    if (historyIndex >= 0) {
        document.getElementById("field").innerHTML = history[historyIndex];
        setCookie("historyIndex", historyIndex-1);
    } else {
        document.getElementById("field").style.color="#00E600";
        timeouts.push(setTimeout(function(){
            document.getElementById("field").style.color="#00FF00";
        }, 50));
    }
    console.log("history: [" + getCookie("history") + "] " + "historyIndex: " + getCookie("historyIndex"));
}

function displayDown() {
    var history = getCookie("history").split(',');
    var historyIndex = Number(getCookie("historyIndex"));
    if (document.getElementById("field").innerHTML != "") {
        if (historyIndex == -1) {
            historyIndex += 2;
        }
        if (historyIndex >= history.length) {
            document.getElementById("field").innerHTML = "";
            setCookie("historyIndex", history.length-1);
        } else {
            document.getElementById("field").innerHTML = history[historyIndex];
            setCookie("historyIndex", historyIndex+1);
        }
        console.log("history: [" + getCookie("history") + "] " + "historyIndex: " + getCookie("historyIndex"));
    }

    /*
    if (historyIndex <= 20 || (history.length > 0 && historyIndex < history.length)) {
        document.getElementById("field").innerHTML = history[historyIndex];
        setCookie("historyIndex", historyIndex+1);
    } else {
        document.getElementById("field").innerHTML = "";
    }*/
}

function type(elem, txt, speed) {
    if (i < txt.length) {
        document.getElementById(elem).innerHTML += txt.charAt(i);
        i++;
        timeouts.push(setTimeout(function(){type(elem, txt, speed)}, speed));
    }
}

function clearTimeouts() {
    for (var i=0; i<timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
}

function hideOthers(id) {
    i = 0;
    clearTimeouts();
    if (id == "one"|| id == "all") {
        document.getElementById("1a").innerHTML = "";
        document.getElementById("1b").innerHTML = "";
        document.getElementById("1c").innerHTML = "";
    }
    if (id == "two"|| id == "all") {
        document.getElementById("2a").innerHTML = "";
        document.getElementById("2b").innerHTML = "";
        document.getElementById("2c").innerHTML = "";
    }
    if (id == "three"|| id == "all") {
        document.getElementById("3a").innerHTML = "";
        document.getElementById("3b").innerHTML = "";
        document.getElementById("3c").innerHTML = "";
    }
    if (id == "four" || id == "all") {
        document.getElementById("4a").innerHTML = "";
        document.getElementById("4b").innerHTML = "";
        document.getElementById("4c").innerHTML = "";
    }
}

function accordion(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        if (id == "one") {
            document.getElementById("two").setAttribute("class", "w3-hide");
            document.getElementById("three").setAttribute("class", "w3-hide");
            document.getElementById("four").setAttribute("class", "w3-hide");
            if (!visited[0] || !noRetype) {
                hideOthers("one");
                i = 0
                type("1a", dict1["1a"], speed);
                timeouts.push(setTimeout(function(){
                    i = 0;
                    type("1b", dict1["1b"], speed);
                }, 1400));
                timeouts.push(setTimeout(function(){
                    i = 0;
                    type("1c", dict1["1c"], speed);
                }, 3100));
            } else if (noRetype) {
                clearTimeouts();
                document.getElementById("1a").innerHTML = dict1["1a"];
                document.getElementById("1b").innerHTML = dict1["1b"];
                document.getElementById("1c").innerHTML = dict1["1c"];
            }
            if (noRetype) {
                visited[0] = true;
            }
        }
        if (id == "two") {
            document.getElementById("one").setAttribute("class", "w3-hide");
            document.getElementById("three").setAttribute("class", "w3-hide");
            document.getElementById("four").setAttribute("class", "w3-hide");
            if (!visited[1] || !noRetype) {
                hideOthers("two");
                i = 0;
                type("2a", dict2["2a"], speed);
                timeouts.push(setTimeout(function(){
                    i = 0;
                    type("2b", dict2["2b"], speed);
                }, 500));
                timeouts.push(setTimeout(function(){
                    i = 0;
                    type("2c", dict2["2c"], speed);
                }, 1000));
            } else if (noRetype) {
                clearTimeouts();
                document.getElementById("2a").innerHTML = dict2["2a"];
                document.getElementById("2b").innerHTML = dict2["2b"];
                document.getElementById("2c").innerHTML = dict2["2c"];
            }
            if (noRetype) {
                visited[1] = true;
            }
        }
        if (id == "three") {
            document.getElementById("two").setAttribute("class", "w3-hide");
            document.getElementById("one").setAttribute("class", "w3-hide");
            document.getElementById("four").setAttribute("class", "w3-hide");
            if (!visited[2] || !noRetype) {
                hideOthers("three");
                i = 0;
                type("3a", dict3["3a"], speed);
                timeouts.push(setTimeout(function(){
                    i = 0;
                    type("3b", dict3["3b"], speed);
                }, 400));
                timeouts.push(setTimeout(function(){
                    i = 0;
                    type("3c", dict3["3c"], speed);
                }, 800));
            } else if (noRetype) {
                clearTimeouts();
                document.getElementById("3a").innerHTML = dict3["3a"];
                document.getElementById("3b").innerHTML = dict3["3b"];
                document.getElementById("3c").innerHTML = dict3["3c"];
            }
            if (noRetype) {
                visited[2] = true;
            }
        }
        if (id == "four") {
            document.getElementById("two").setAttribute("class", "w3-hide");
            document.getElementById("one").setAttribute("class", "w3-hide");
            document.getElementById("three").setAttribute("class", "w3-hide");
            if (!visited[3] || !noRetype) {
                hideOthers("four");
                i = 0;
                type("4a", dict4["4a"], speed);
                timeouts.push(setTimeout(function(){
                    i = 0;
                    type("4b", dict4["4b"], speed);
                }, 400));
                timeouts.push(setTimeout(function(){
                    i = 0;
                    type("4c", dict4["4c"], speed);
                }, 800));
            } else if (noRetype) {
                clearTimeouts();
                document.getElementById("4a").innerHTML = dict4["4a"];
                document.getElementById("4b").innerHTML = dict4["4b"];
                document.getElementById("4c").innerHTML = dict4["4c"];
            }
            if (noRetype) {
                visited[3] = true;
            }
        }
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}

function swap(){
    noRetype = !noRetype;
}

function reset(){
    document.location.reload();
}
