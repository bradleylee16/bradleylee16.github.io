var allowedChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
                    "p","q","r","s","t","u","v","w","x","y","z","A","B","C","D",
                    "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S",
                    "T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0"];
var entered;
var retype = false;
var borders = {
    ".page":"3px solid green"
    ,".header":"2px solid maroon"
    ,".smallText":"1px solid greenyellow"
    ,".smallerText":"1px solid greenyellow"
    ,".tab":"1px solid pink"
    ,"#footer":"1px solid red"
    //RESUME SPECIFIC BORDERS
    ,"#resumeLeft":"2px solid purple"
    ,"#resumeRight":"2px solid blue"};
var colors = {
    "GREEN":["#00ff00","#051e08","#001500"]
    ,"RED": ["#ff0000","#1d0404","#150000"]
    ,"CLASSIC":["#ffffff","#282828","#0f0f0f"]}

var default_settings = "borders 0,retype 1,printArgs 0,rType 1,iType 0,mType 0,theme green";



function startup() {
    var input = document.getElementById("dummy");
    document.getElementById("dummy").select();

    if (getCookie("history") == null) {
        setCookie("history", "",365);
        setCookie("historyIndex",-1,365);
    }
    if (getCookie("settings") == null){
        setCookie("settings",default_settings,365);
    } else {
        setup();
    }
}

function setup() {
    border(getSetting("borders"));
    retyp(getSetting("retype"));
    if (window.location.pathname.search("resume.html") != -1) {
        page = "r";
    } else if (window.location.pathname.search("index.html") != -1) {
        page = "m";
    } else if (window.location.pathname.search("info.html") != -1) {
        page = "i";
    }
    setColor(getSetting("theme"));
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
            setColor("red");
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
        if (getSetting("printArgs") == "1")
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
            } else if (args[0] == "ANIMATION") {
                if (args[1] == "0") {
                    hideOthers("x",rListIDs);
                    clearTimeouts();
                    setSetting("rType","0");
                } else if (args[1] == "1") {
                    hideOthers("x",rListIDs);
                    clearTimeouts();
                    setSetting("rType","1");
                }
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
            } else if (args[0] == "ANIMATION") {
                if (args[1] == "0") {
                    hideOthers("x",listIDs);
                    clearTimeouts();
                    setSetting("iType","0");
                } else if (args[1] == "1") {
                    hideOthers("x",listIDs);
                    clearTimeouts();
                    setSetting("iType","1");
                }
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
            } else if (args[0] == "ANIMATION") {
                if (args[1] == "0") {
                    hideOthers("x",mListIDs);
                    clearTimeouts();
                    setSetting("mType","0");
                } else if (args[1] == "1") {
                    hideOthers("x",mListIDs);
                    clearTimeouts();
                    setSetting("mType","1");
                }
            } else if (args[0] == "THEME") {
                if (colors[args[1]] != null) {
                    setSetting("theme",args[1]);
                    setColor(args[1]);
                }
            }
        }//COMMANDS THAT APPLY TO ALL PAGES
        if (args[0] == "RETYPE") {
            if (args[1] == "0" || args[1] == "1") {
                retyp(args[1]);
                setSetting("retype",args[1]);
            }
        } else if (args[0] == "RESET") {
            reset();
        } else if (args[0] == "BORDER") {
            if (args[1] == "0" || args[1] == "1") {
                border(args[1]);
                setSetting("borders",args[1]);
            }
        } else if (args[0] == "HISTORY") {
            history();
        } else if (args[0] == "COOKIES") {
            listCookies();
        } else if (args[0] == "PRINTARGS") {
            if (args[1] == "0" || args[1] == "1")
                setSetting("printArgs",args[1]);
        }
    }
}

function getSetting(name) {
    var settings = getCookie("settings").split(',');
    for (var c = 0; c < settings.length; c++) {
        var setting = settings[c].split(' ');
        if (setting[0] == name) {
            return setting[1];
        }
    }
    return null;
}

function setSetting(name, newVal) {
    var settings = getCookie("settings").split(',');
    var newSetting = name + " " + newVal;
    for (var c = 0; c < settings.length; c++) {
        if (settings[c].split(" ")[0] == name) {
            settings[c] = newSetting;
            setCookie("settings",settings.toString(), 365);
            return;
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
//[text, background, terminal]
function setColor(color) {
    document.body.style.background = colors[color][1];
    var x = document.getElementsByClassName("text");
    for (var c = 0; c < x.length; c++)
        x[c].style.color = colors[color][0];
    x = document.getElementsByClassName("active:hover");
    for (var c = 0; c < x.length; c++) {
        x[c].style.color = colors[color][1];
        x[c].style.backgroundColor = colors[color][0];
    }
    document.getElementsByClassName("terminal")[0].style.color = colors[color][0];
    document.getElementsByClassName("terminal")[0].style.backgroundColor = colors[color][2];
    document.getElementById("dummy").style.color = colors[color][1];
    document.getElementById("dummy").style.backgroundColor = colors[color][1];
    document.getElementById("cursor").style.backgroundColor = colors[color][0];
    injectStyles(".active:hover{color:" + colors[color][1] + "; background-color: " + colors[color][0] + ";}");
    injectStyles(".tab:hover{color:" + colors[color][1] + "; background-color: " + colors[color][0] + ";}");
}

function injectStyles(rule) {
    var div = $("<div />", {
        html: '&shy;<style>' + rule + '</style>'
    }).appendTo("body");    
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

function retyp(setting){
    if (setting == "1")
        retype = true;
    if (setting == "0")
        retype = false;
}

function reset(){
    setCookie("settings",default_settings,365);
    setCookie("history", "",365);
    setCookie("historyIndex",-1,365);
    location.reload();
}

function selectBox(){
    document.getElementById("dummy").select();
}

function print(arg) {

}

function history() {
    str = getCookie("history");
    str = str.split(",");
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
    var x;
    for (var elem in borders) {
        if (elem[0] == "#") {
            x = document.getElementById(elem.substr(1));
            if (x != null && on == "1")
                x.style.border = borders[elem];
            else if (x != null && on == "0")
                x.style.border = "none";
        } else if (elem[0] == ".") {
            x = document.getElementsByClassName(elem.substr(1));
            for (var c = 0; c < x.length; c++) {
                if (on == "1")
                    x[c].style.border = borders[elem];
                else if (on == "0")
                    x[c].style.border = "none";
            }
        }
    }
}