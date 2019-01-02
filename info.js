//INFO TEXT
var infoText = {
    "i1a":"Click on buttons and tabs to navigate"
    ,"i1b":"Commands can also be typed in the terminal to navigate"
    ,"i1c":"Any text surrounded by [brackets] can be typed as a command"
    ,"i2a":"Press Enter to skip a typing animation"
    ,"i2b":"Press the arrow up and down keys to cycle through recent commands"
    ,"i2c":"Settings and history will save between visits"
    ,"i3a":"[border 1] [border 0]"
    ,"i3b":"Turns on/off element div borders"
    ,"i3c":"[retype 1] [retype 0]"
    ,"i3d":"Turns on/off repeating of the typing effect"
    ,"i3e":"[history]"
    ,"i3f":"Prints in-site terminal history to JS terminal"
}
var list1 = {
    "i1a":"> Click on buttons and tabs to navigate"
    ,"i1b":"> Commands can also be typed in the terminal to navigate"
    ,"i1c":"> Any text surrounded by [brackets] can be typed as a command"
}
var list2 = {
    "i2a":"> Press Enter to skip a typing animation"
    ,"i2b":"> Press the arrow up and down keys to cycle through recent commands"
    ,"i2c":"> Settings and history will save between visits"
}
var list3 = {
    "i3a":"> [border 1] [border 0]"
    ,"i3b":"Turns on/off element div borders"
    ,"i3c":"> [retype 1] [retype 0]"
    ,"i3d":"Turns on/off repeating of the typing effect"
    ,"i3e":"> [history]"
    ,"i3f":"Prints in-site terminal history to JS terminal"
}
var listIDs = {"list1":list1,"list2":list2,"list3":list3};
var idClicked = {"list1":false,"list2":false,"list3":false};
//RESUME TEXT
var resumeText = {
    "r1a":"[Education]"
    ,"r1b":"University of Maryland: College Park"
    ,"r1c":"B.S. Computer Science - Expected 2020"
    ,"r1d":"GPA: 3.25"
    ,"r2a":"[Skills]"
    ,"r2b":"Java"
    ,"r2c":"Python"
    ,"r2d":"C"
    ,"r2e":"Javascript"
    ,"r2f":"HTML/CSS"
    ,"r2g":"Ruby"
    ,"r3a":"[Projects]"
    ,"r3b":"Personal Website"
    ,"r3c":"Hub for personal projects and code"
    ,"r3d":"Terminal design with functioning commands"
    ,"r3e":"Extensive use of Javascript"
    ,"r3f":"Text Clock"
    ,"r3g":"Clock comprised of text that lights up to show the current time"
    ,"r3h":"Additional tools and commands implemented"
    ,"r3i":"Personal javascript introductory project"
    ,"r4a":"[Experience]"
    ,"r4b":"IT Technician at University of Maryland"
    /*,"r4c":"Sept 2017 - Ongoing"*/
    ,"r4d":"Provided University professors and staff with direct software and network support"
    ,"r4e":"Worked independently and collaboratively with coworkers, under loose supervision"
    ,"r4f":"Learned new IT skills on the job from coworkers and supervisors"
    ,"r4g":"Trained newly hired technicians"
    ,"r4h":"Volunteer at Liberty Science Center, Jersey City, NJ"
    /*,"r4i":"Aug 2014 - 2015"*/
    ,"r4j":"Led educational activities"
    ,"r4k":"Teaching assistant at summer camp"
    ,"r4l":"Volunteered 260 hours of service"
};
var rList1 = {
    "r1b":"University of Maryland: College Park"
    ,"r1c":"B.S. Computer Science - Expected 2020"
    ,"r1d":"GPA: 3.25"
}
var rList2 = {
    "r2b":"Java"
    ,"r2c":"Python"
    ,"r2d":"C"
    ,"r2e":"Javascript"
    ,"r2f":"HTML/CSS"
    ,"r2g":"Ruby"
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
    "r4b":"IT Technician at University of Maryland"
    /*,"r4c":"Sept 2017 - Ongoing"*/
    ,"r4d":"Provided University professors and staff with direct software and network support"
    ,"r4e":"Worked independently and collaboratively with coworkers, under loose supervision"
    ,"r4f":"Learned new IT skills on the job from coworkers and supervisors"
    ,"r4g":"Trained newly hired technicians"
    ,"r4h":"Volunteer at Liberty Science Center, Jersey City, NJ"
    /*,"r4i":"Aug 2014 - 2015"*/
    ,"r4j":"Led educational activities"
    ,"r4k":"Teaching assistant at summer camp"
    ,"r4l":"Volunteered 260 hours of service"
}
var rListIDs = {"rList1":rList1,"rList2":rList2,"rList3":rList3,"rList4":rList4};
var rIdClicked = {"rList1":false,"rList2":false,"rList3":false,"rList4":false};
//MAIN TEXT
var mList1 = {
    "m1a": "> Brad Lee is from New Jersey. He made this website",
    "m1b": "> Brad studies computer science at the University of Maryland",
    "m1c": "> Click or type [Info] to find out more about this website"
}
var mList2 = {
    "m2a": "> [Text Clock]",
    "m2b": "> [Leetcodes]",
    "m2c": "> Coming Soon!"
}
var mList3 = {
    "m3a": "> bradleylee16@gmail.com",
    "m3b": "> [Linkedin]"
}
var mList4 = {
    "m4a": "> [Online] Version",
    "m4b": "> [PDF] Version",
}
var mListIDs = {"mList1":mList1,"mList2":mList2,"mList3":mList3,"mList4":mList4};
var mIdClicked = {"mList1":false,"mList2":false,"mList3":false,"mList4":false};

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
        timeouts.push(setTimeout(function(){contentType(map, speed)}, speed));
    }
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
        }, text.length * speed + speed * 6));
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
            console.log(idList[id]);
            contentType(idList[id], 25);
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
                console.log(elem);
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
