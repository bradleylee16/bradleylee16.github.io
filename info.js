//INFO TEXT
//
//
//  2023: forgive my old spaghetti code. I rewrote clock.js if you want to check out some more recent code. This I would probably rewrite in a modern framework some time
//
//
var infoText = {
    "i1a":"Click on buttons and tabs to navigate",
    "i1b":"Commands can also be typed in the terminal to navigate",
    "i1c":"Any text surrounded by [brackets] can be typed as a command",
    "i2a":"Press Enter to skip a typing animation",
    "i2b":"Press the arrow up and down keys to cycle through recent commands",
    "i2c":"Settings and history will save between visits",
    "i3a":"[border 1] [border 0]",
    "i3b":"Turns on/off element div borders",
    "i3c":"[retype 1] [retype 0]",
    "i3d":"Turns on/off repeating of the typing effect",
    "i3e":"[history]",
    "i3f":"Prints in-site terminal history to JS terminal",
}
var list1 = {
    "i1a":"> Click on buttons and tabs to navigate",
    "i1b":"> Commands can also be typed in the terminal to navigate",
    "i1c":"> Any text surrounded by [brackets] can be typed as a command",
}
var list2 = {
     "i2a":"> Press Enter to skip a typing animation",
    "i2b":"> Press the arrow up and down keys to cycle through recent commands",
    "i2c":"> Settings and history will save between visits",
    "i2d":"> Colors and animations customizable through commands",
    "i2e": "> Commands are non case sensitive"
}
var list3 = {
     "i3a":"> [animation 1] [animation 0]: Changes the animation style for that page",
    "i3b":"> [border 1] [border 0]: Turns on/off element div borders",
    "i3c":"> [theme #000000] Set theme to green,blue,red,purple,classic, or hex value",
    "i3d":"> [retype 1] [retype 0]: Turns on/off repeating of the typing effect",
    "i3e":"> [printArgs 1] [printArgs 0] toggles printing cmd args to JS terminal",
    "i3f":"> [history]: Prints in-site terminal history to JS terminal",
    "i3g":"> [cookies]: Prints all cookies saved on the site",
    "i3h":"> [reset]: Resets all settings to default",
}
var listIDs = {"list1":list1,"list2":list2,"list3":list3};
var idClicked = {"list1":false,"list2":false,"list3":false};
//RESUME TEXT
var resumeText = {
    "r1a":"[Education]"
    ,"r1b":"University of Maryland: College Park"
    ,"r1c":"B.S. Computer Science - 2016-2020"
    ,"r2a":"[Skills]"
    ,"r2b":"Java"
    ,"r2c":"Python"
    ,"r2d":"C"
    ,"r2e":"Javascript"
    ,"r2f":"HTML/CSS"
    ,"r2g":"Angular"
    ,"r3a":"[Projects]"
    ,"r3b":"Personal Website"
    ,"r3c":"Learned basics of HTML/CSS, and javascript"
    ,"r3d":"Terminal design with functioning commands"
    ,"r3f":"Text Clock"
    ,"r3g":"Clock comprised of text that lights up to show the current time"
    ,"r3h":"Additional tools and commands implemented"
    ,"r3i":"Fun javascript introductory project"
    ,"r4a":"[Experience]"
    ,"r4b":"Software Engineer: 2020-Present"
    /*,"r4c":"Sept 2017 - Ongoing"*/
    ,"r4d":"Was an integral part of developing healthcare software used in hospitals and insurance"
    ,"r4e":"Developed webapp to view, modify, import, and export data using Angular, Spring Boot REST API, and Oracle SQL"
    ,"r4f":"Created and modified existing CI/CD Pipelines using Jenkins"
    ,"r4g":"Wrote SQL generated reports requested by team members, as well as database integrity heuristics"
    ,"r4h":"Deployed and administered internally used web server hosted on AWS EC2 Linux"
    /*,"r4i":"Aug 2014 - 2015"*/
    ,"r4j":"Freelance Web Scraper: 2020, 2022, 2023"
    ,"r4k":"Wrote web scrapers targeted at county websites on election nights for general and midterm elections"
    ,"r4l":"Contributed to rapid nationwide counting of votes"
};
var rList1 = {
    "r1b":"University of Maryland: College Park"
    ,"r1c":"B.S. Computer Science - Aug 2016- May 2020"
}
var rList2 = {
    "r2b":"Java"
    ,"r2c":"Python"
    ,"r2d":"SQL"
    ,"r2e":"Javascript"
    ,"r2f":"HTML/CSS"
    ,"r2g":"Angular"
}
var rList3 = {
    "r3b":"Personal Website"
    ,"r3c":"Hub for personal projects and code"
    ,"r3d":"Terminal design with functioning commands"
    ,"r3e":"Extensive use of Javascript"
    ,"r3f":"Text Clock"
    ,"r3g":"Clock comprised of text that lights up to show the current time"
    ,"r3h":"Additional tools and commands implemented"
    ,"r3i":"Personal javascript introductory project"
}
var rList4 = {
    "r4b":"Software Engineer at 3M Health Information Systems 2020-Present"
    /*,"r4c":"Sept 2017 - Ongoing"*/
    ,"r4d":"Was an integral part of developing healthcare software used in hospitals and insurance"
    ,"r4e":"Developed webapp to view, modify, import, and export data using Angular, Java and SQL"
    ,"r4f":"Created and modified existing CI/CD Pipelines using Jenkins"
    ,"r4g":"Wrote SQL generated reports requested by team members, and database integrity heuristics"
    ,"r4h":"Deployed and administered internally used web server hosted on AWS EC2 Linux"
    ,"r4i":"Freelance Web Scraper: 2020, 2022, 2023"
    ,"r4j":"Wrote web scrapers targeted at county sites for for general and midterm election nights"
    ,"r4k":"Contributed to rapid nationwide counting of votes"
}
var rListIDs = {"rList1":rList1,"rList2":rList2,"rList3":rList3,"rList4":rList4};
var rIdClicked = {"rList1":false,"rList2":false,"rList3":false,"rList4":false};
//MAIN TEXT
var mList1 = {
    "m1a": "> Brooklyn based Software Engineer",
    "m1b": "> Studied computer science at the University of Maryland",
    "m1c": "> Enjoys tennis, coding, movies, and more!"
}
var mList2 = {
    "m2a": "> [Text Clock]",
    "m2c": "> Coming Soon(ish)!"
}
var mList3 = {
    "m3b": "> [Linkedin]"
}
var mList4 = {
    "m4a": "> [Online] Version",
    "m4b": "> [PDF] Version: If you're reading this, you probably already have it ",
}
var mListIDs = {"mList1":mList1,"mList2":mList2,"mList3":mList3,"mList4":mList4};
var mIdClicked = {"mList1":false,"mList2":false,"mList3":false,"mList4":false};

var page = "m";
var timeouts = [];
var i = 0;
//types every line in the map at once
//map -> list elem id to text map
function contentType2(map, speed) {
    len = longestString(map);
    if (i < len) {
        for (var key in map) {
            if (map[key][i] != null) {
                document.getElementById(key).innerHTML += map[key].charAt(i);
            }
        }
        i++;
        timeouts.push(setTimeout(function(){contentType2(map, speed)}, speed));
    }
}
function longestString(map) {
    longest = 0;
    for (var elem in map) {
        if (map[elem].length > longest)
            longest = map[elem].length;
    }
    return longest;
}
//typing animation for a single line
//elem -> .html file id of element being typed in
//txt -> string to be typed
function type(elem, txt, speed) {
    if (i < txt.length) {
        document.getElementById(elem).innerHTML += txt.charAt(i);
        i++;
        timeouts.push(setTimeout(function(){type(elem, txt, speed)}, speed));
    }
}
//types each line in the map in sequence
//map -> list elem id to text map
function contentType(map, speed) {
    totalTime = 0;
    lst = [];
    for (id in map)
        lst.push(id);
    contentTypeAux(map, lst, speed);
}

function contentTypeAux(map, lst, speed) {
    if (lst.length > 1) {
        var text = map[lst[0]]
        type(lst[0],text,speed)
        lst.shift();
        timeouts.push(setTimeout(function(){
            i = 0;
            contentTypeAux(map, lst, speed);
        }, text.length * speed + speed * 7));
    } else {
        type(lst[0], map[lst[0]], speed);
    }
}
//id -> div you want to expand
//idList -> list of other ids mapped to their text maps
//map -> elem id to text map
function expandTab(id, idList) {
    clearTimeouts();
    if (document.getElementById(id).getAttribute("class") == "w3-show") {
        document.getElementById(id).setAttribute("class","w3-hide");
        for (var key in idList[id])
            document.getElementById(key).innerHTML = "";
    } else {
        hideOthers(id, idList);
        i = 0;
        document.getElementById(id).setAttribute("class","w3-show");
        if (!retype && idClicked[id]) {
            instaComplete(idList);
        } else {
            idClicked[id] = true;
            if (page == "m") {
                if (getSetting("mType") == "0")
                    contentType(idList[id], 25);
                if (getSetting("mType") == "1")
                    contentType2(idList[id], 25);
            } else if (page == "r") {
                if (getSetting("rType") == "0")
                    contentType(idList[id], 25);
                if (getSetting("rType") == "1")
                    contentType2(idList[id], 25);
            } else if (page == "i") {
                if (getSetting("iType") == "0")
                    contentType(idList[id], 25);
                if (getSetting("iType") == "1")
                    contentType2(idList[id], 25);
            }
        }
    }
}
//id -> div id you want to exempt from expansion
//idList -> list of other expandible ids
//map -> elem id to text map
function hideOthers(id, idList) {
    for (var elem in idList) {
        if (elem != id) {
            document.getElementById(elem.toString()).setAttribute("class","w3-hide");
            for (var elem in idList[id]) {
                document.getElementById(elem).innerHTML = "";
            }
        }
    }
}
//Skips typing animation for any element that has w3-show class
//listIDs -> map of tab ids to bullet text maps
function instaComplete(idList) {
    clearTimeouts();
    for (var id in idList) {
        if (document.getElementById(id).getAttribute("class") == "w3-show"){
            for (var text in idList[id])
                document.getElementById(text).innerHTML = idList[id][text];
            return;
        }
    }
}
//Stops all timeouts
function clearTimeouts() {
    for (var i=0; i<timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
}
