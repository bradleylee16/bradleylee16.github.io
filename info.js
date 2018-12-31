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
//ID of the list being hidden
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
var i = 0;

//map -> list elem id to text map
//speed -> speed of typing
function contentType(map, speed) {
    len = longestString(map);
    if (i < len) {
        for (var key in map) {
            if (map[key][i] != null) {
                document.getElementById(key).innerHTML += map[key].charAt(i);
            }
        }
        i++;
        timeouts.push(setTimeout(function(){resumeType(map, speed)}, speed));
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
        contentType(idList[id], 25);
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