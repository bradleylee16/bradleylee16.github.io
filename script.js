var i = 0;
var speed = 50;
var timeouts = [];

function type(elem, txt, speed) {
    if (i < txt.length) {
        document.getElementById(elem).innerHTML += txt.charAt(i);
        i++;
        setTimeout(function(){type(elem, txt, speed)}, speed);
    }
}

var dict1 = {
    "1a": "> Brad is from New Jersey",
    "1b": "> He is currently studying computer science at the University of Maryland",
    "1c": "> In his spare time, he enjoys watching movies and TV"
}

var dict2 = {
    "2a": "> Text Clock",
    "2b": "> Leetcodes",
    "2c": "> Coming Soon!"
}

var dict3 = {
    "3a": "> Resume",
    "3b": "> Contact"
}

function hideOthers(id) {
    i = 0;
    if (id == "one") {
        document.getElementById("1a").innerHTML = "";
        document.getElementById("1b").innerHTML = "";
        document.getElementById("1c").innerHTML = "";
    } else if (id == "two") {
        document.getElementById("2a").innerHTML = "";
        document.getElementById("2b").innerHTML = "";
        document.getElementById("2c").innerHTML = "";
    } else if (id == "three") {
        document.getElementById("3a").innerHTML = "";
        document.getElementById("3b").innerHTML = "";
    }
}

function accordion(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        if (id == "one") {
            hideOthers("one");
            document.getElementById("two").setAttribute("class", "w3-hide");
            document.getElementById("three").setAttribute("class", "w3-hide");
            i = 0
            type("1a", dict1["1a"], speed);
            timeouts.push(setTimeout(function(){
                i = 0;
                type("1b", dict1["1b"], speed);
            }, 1500));
            setTimeout(function(){
                i = 0;
                type("1c", dict1["1c"], speed);
            }, 5600);
        }
        if (id == "two") {
            hideOthers("two");
            document.getElementById("one").setAttribute("class", "w3-hide");
            document.getElementById("three").setAttribute("class", "w3-hide");
            i = 0;
            type("2a", dict2["2a"], speed);
            setTimeout(function(){
                i = 0;
                type("2b", dict2["2b"], speed);
            }, 1200);
            setTimeout(function(){
                i = 0;
                type("2c", dict2["2c"], speed);
            }, 2200);
        }
        if (id == "three") {
            hideOthers("three");
            document.getElementById("two").setAttribute("class", "w3-hide");
            document.getElementById("one").setAttribute("class", "w3-hide");
            i = 0;
            type("3a", dict3["3a"], speed);
            setTimeout(function(){
                i = 0;
                type("3b", dict3["3b"], speed);
            }, 1000);
        }
        
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}
