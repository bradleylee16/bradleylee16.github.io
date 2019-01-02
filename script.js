var allowedChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
                    "p","q","r","s","t","u","v","w","x","y","z","A","B","C","D",
                    "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S",
                    "T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0"];

var timeouts = [];
var visited = [false, false, false, false];
var entered;

var retype = false;



function startup() {
    if (getCookie("history") == null) {
        setCookie("history", "",365);
        setCookie("historyIndex",-1,365);
    } else {

    }
}

document.onkeydown = function (evt) {
    if ("key" in evt) {
        if (evt.key == "Backspace") {
            if (document.getElementById("field").innerHTML.substr(-1) == ";") {
                document.getElementById("field").innerHTML = document.getElementById("field").innerHTML.slice(0,-6);
            } else {
                document.getElementById("field").innerHTML = document.getElementById("field").innerHTML.slice(0,-1);
            }
        } else if (evt.key == "Enter") {
            entered = document.getElementById("field").innerHTML;
            parse(entered);
        } else if (evt.key == "ArrowUp") {
            displayUp();
        } else if (evt.key == "ArrowDown") {
            displayDown();
        } else if (evt.keyCode == 32 && document.getElementById("field").innerHTML.replace(/&nbsp;/g,"#").length <= 28) {
            document.getElementById("field").innerHTML += "&nbsp;";
        } else if (allowedChars.includes(evt.key) && document.getElementById("field").innerHTML.replace(/&nbsp;/g,"#").length <= 28) {
            document.getElementById("field").innerHTML += evt.key;
        } else if (evt.key == "`") {
            //DEBUG KEY
            listCookies();
        }
    }
}

function parse(input) {
    //console.log("entered: " + input);
    document.getElementById("field").innerHTML = "";
    if (input == "") {
        if (window.location.pathname.search("resume.html") != -1) {
            instaComplete(rListIDs);
        } else if (window.location.pathname.search("info.html") != -1){
            instaComplete(listIDs);
        } else {
            instaComplete(mListIDs);
        }
    } else if (input.match(/^(&nbsp;)*[A-Za-z0-9]+(&nbsp;)*[A-Za-z0-9]*(&nbsp;)*$/)) {
        historyPush(input.toString());
        input = input.replace(/(&nbsp;)+/g," ");
        var args = input.trim().split(/\s+/g);
        for (var x = 0; x < args.length; x++){args[x] = args[x].toUpperCase();}
        console.log("args: [" + args.toString() + "]");
        if (window.location.pathname.search("resume.html") != -1) {
            //COMMANDS EXCLUSIVE TO RESUME.HTML
            if ((args[0] == "PDF" && args[1] == "VERSION") || args[0] == "PDF") {
                document.getElementById("pdf").click();
            } else if (args[0] == "BACK") {
                document.getElementById("resumeBack").click();
            } else if (args[0] == "EDUCATION") {
                document.getElementById("education").click();
            } else if (args[0] == "SKILLS") {
                document.getElementById("skills").click();
            } else if (args[0] == "PROJECTS") {
                document.getElementById("projects").click();
            } else if (args[0] == "EXPERIENCE") {
                document.getElementById("experience").click();
            }
        } else if (window.location.pathname.search("info.html") != -1) {
            //COMMANDS SPECIFIC TO INFO.HTML
            if (args[0] == "SITE" && args[1] == "NAVIGATION") {
                document.getElementById("siteNav").click();
            } else if (args[0] == "OTHER" && args[1] == "FEATURES") {
                document.getElementById("otherFeat").click();
            } else if (args[0] == "COMMANDS") {
                document.getElementById("commands").click();
            } else if (args[0] == "BACK") {
                document.getElementById("infoBack").click();
            }
        } else {
            //COMMANDS SPECIFIC TO INDEX.HTML
            if (args[0] == "ABOUT") {
                document.getElementById("about").click();
            } else if (args[0] == "PROJECTS") {
                document.getElementById("projects").click();
            } else if (args[0] == "CONTACT") {
                document.getElementById("contact").click();
            } else if (args[0] == "RESUME") {
                document.getElementById("resume").click();
            } else if (args[0] == "INFO") {
                if (document.getElementById("mList1").getAttribute("class") != "w3-hide")
                    document.getElementById("m1c").click();
            } else if (args[0]+args[1] == "TEXTCLOCK") {
                if (document.getElementById("mList2").getAttribute("class") != "w3-hide")
                    document.getElementById("m2a").click();
            } else if (args[0] == "LEETCODES") {
                if (document.getElementById("mList2").getAttribute("class") != "w3-hide")
                    document.getElementById("m2b").click();
            } else if (args[0] == "LINKEDIN") {
                if (document.getElementById("mList3").getAttribute("class") != "w3-hide")
                    document.getElementById("m3b").click();
            } else if (args[0] == "ONLINE") {
                if (document.getElementById("mList4").getAttribute("class") != "w3-hide")
                    document.getElementById("m4a").click();
            } else if (args[0] == "PDF") {
                if (document.getElementById("mList4").getAttribute("class") != "w3-hide")
                    document.getElementById("m4b").click();
            }
        }//COMMANDS THAT APPLY TO ALL PAGES
        if (args[0] == "RETYPE") {
            retyp(args[1]);
        } else if (args[0] == "RESET") {
            reset();
        } else if (args[0] == "BORDER") {
            if (args[1] == "0" || args[1] == "1")
                border(args[1]);
        } else if (args[0] == "HISTORY") {
            history();
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
    return null;
}

function historyPush(str) {
    var list = getCookie("history");
    var input = str.replace(/&nbsp;/g, "#");
    if (list == "") {
        setCookie("history",input);
    } else {
        list = list.split(',');
        if (list.length == 20) {
            list.shift()
        }
        list.push(input);
        setCookie("history",list.toString());
    }
    setCookie("historyIndex", getCookie("history").split(',').length-1);
    //console.log("cookie: [" + getCookie("history") + "] historyIndex: " + getCookie("historyIndex"));
}

function displayUp() {
    var history = getCookie("history").split(',');
    var historyIndex = Number(getCookie("historyIndex"));
    if (historyIndex >= 0) {
        var output = history[historyIndex].replace(/#/g,"&nbsp;");
        document.getElementById("field").innerHTML = output;
        setCookie("historyIndex", historyIndex-1);
    } else {
        document.getElementById("field").style.color="#00E600";
        timeouts.push(setTimeout(function(){
            document.getElementById("field").style.color="#00FF00";
        }, 50));
    }
    //console.log("history: [" + getCookie("history") + "] " + "historyIndex: " + getCookie("historyIndex"));
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
            var output = history[historyIndex].replace(/#/g,"&nbsp;");
            document.getElementById("field").innerHTML = output;
            setCookie("historyIndex", historyIndex+1);
        }
        //console.log("history: [" + getCookie("history") + "] " + "historyIndex: " + getCookie("historyIndex"));
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
        //document.getElementById("4c").innerHTML = "";
    }
}

function instaComplete() {
    clearTimeouts();
    for (var i = 0; i < bulletList.length; i++) {
        for (var key in bulletList[i]) {
            if (document.getElementById(key).innerHTML != "") {
                for (var id in bulletList[i]) {
                    document.getElementById(id).innerHTML = bulletList[i][id];
                }
                return;
            }
        }
    }
}

function accordion(id) {
    hideOthers("all");
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        if (id == "one") {
            document.getElementById("two").setAttribute("class", "w3-hide");
            document.getElementById("three").setAttribute("class", "w3-hide");
            document.getElementById("four").setAttribute("class", "w3-hide");
            if (!visited[0] || retype) {
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
            } else if (!retype) {
                clearTimeouts();
                document.getElementById("1a").innerHTML = dict1["1a"];
                document.getElementById("1b").innerHTML = dict1["1b"];
                document.getElementById("1c").innerHTML = dict1["1c"];
            }
            if (!retype) {
                visited[0] = true;
            }
        }
        if (id == "two") {
            document.getElementById("one").setAttribute("class", "w3-hide");
            document.getElementById("three").setAttribute("class", "w3-hide");
            document.getElementById("four").setAttribute("class", "w3-hide");
            if (!visited[1] || retype) {
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
            } else if (!retype) {
                clearTimeouts();
                document.getElementById("2a").innerHTML = dict2["2a"];
                document.getElementById("2b").innerHTML = dict2["2b"];
                document.getElementById("2c").innerHTML = dict2["2c"];
            }
            if (!retype) {
                visited[1] = true;
            }
        }
        if (id == "three") {
            document.getElementById("two").setAttribute("class", "w3-hide");
            document.getElementById("one").setAttribute("class", "w3-hide");
            document.getElementById("four").setAttribute("class", "w3-hide");
            if (!visited[2] || retype) {
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
            } else if (!retype) {
                clearTimeouts();
                document.getElementById("3a").innerHTML = dict3["3a"];
                document.getElementById("3b").innerHTML = dict3["3b"];
                document.getElementById("3c").innerHTML = dict3["3c"];
            }
            if (!retype) {
                visited[2] = true;
            }
        }
        if (id == "four") {
            document.getElementById("two").setAttribute("class", "w3-hide");
            document.getElementById("one").setAttribute("class", "w3-hide");
            document.getElementById("three").setAttribute("class", "w3-hide");
            if (!visited[3] || retype) {
                hideOthers("four");
                i = 0;
                type("4a", dict4["4a"], speed);
                timeouts.push(setTimeout(function(){
                    i = 0;
                    type("4b", dict4["4b"], speed);
                }, 510));
                /*timeouts.push(setTimeout(function(){
                    i = 0;
                    type("4c", dict4["4c"], speed);
                }, 800));*/
            } else if (!retype) {
                clearTimeouts();
                document.getElementById("4a").innerHTML = dict4["4a"];
                document.getElementById("4b").innerHTML = dict4["4b"];
                //document.getElementById("4c").innerHTML = dict4["4c"];
            }
            if (!retype) {
                visited[3] = true;
            }
        }
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}

function retyp(setting){
    if (setting == "1")
        retype = true;
    if (setting == "0")
        retype = false;
}

function reset(){
    document.location.reload();
}

function selectBox(){
    document.getElementById("dummy").select();
}

function print(arg) {

}

function history() {
    str = getCookie("history");
    str = str.split(",");
    console.log(str);
    display = "";
    var num = 1;
    for (var c = str.length-1; c >= 0; c--) {
        display += (num + ": " + str[c] + "\n");
        num++;
    }
    console.log(display);
}

function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1].trim() + "\n";
    }
    console.log(aString);
}

function border(on) {
    if (on == "1") {
        $('#page').css("border", "3px solid green");
        $('#divider1').css("border", "1px solid yellow");
        $('#divider2').css("border", "1px solid yellow");
        $('#dummmy').css("border", "1px solid purple");
        $('#textart').css("border", "1px solid blue");
        $('#footer').css("border", "1px solid red");
        $('#interface').css("border", "1px solid white");
        $('#one').css("border", "1px solid blue");
        $('#two').css("border", "1px solid blue");
        $('#three').css("border", "1px solid blue");
        $('#four').css("border", "1px solid blue");
        //resume page
        $('.resume-text-area').css("border", "1px solid red");
        $('#main').css("border", "2px solid green");
        $('#header').css("border", "1px solid coral");
        $('#categories').css("border", "1px solid blue");
        $('.category').css("border", "1px solid skyblue");
    } else if (on == "0") {
        $('#page').css("border", "none");
        $('#divider1').css("border", "none");
        $('#divider2').css("border", "none");
        $('#dummy').css("background-color", "#051e08");
        $('#textart').css("border", "none");
        $('#footer').css("border", "none");
        $('#interface').css("border", "none");
        $('#one').css("border", "none");
        $('#two').css("border", "none");
        $('#three').css("border", "none");
        $('#four').css("border", "none");
        //resume page
        $('.resume-text-area').css("border", "none");
        $('#main').css("border","none");
        $('#header').css("border","none");
        $('#categories').css("border","none");
        $('.category').css("border","none");
    }
}