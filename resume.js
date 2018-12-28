var i = 0;

var texts = {
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
var categories = {
    "r1a":"[Education]"
    ,"r2a":"[Skills]"
    ,"r3a":"[Projects]"
    ,"r4a":"[Experience]"
};
var mainBullets = {
    "r1b":"University of Maryland: College Park"
    ,"r1c":"B.S. Computer Science - Expected 2020"
    ,"r1d":"GPA: 3.25"
    ,"r2b":"Java"
    ,"r2c":"Python"
    ,"r2d":"C"
    ,"r2e":"Javascript"
    ,"r2f":"HTML/CSS"
    ,"r2g":"Ruby"
    ,"r3b":"Personal Website"
    ,"r3f":"Text Clock"
    ,"r4b":"IT Technician at University of Maryland"
    ,"r4h":"Volunteer at Liberty Science Center, Jersey City, NJ"
};
var subBullets = {
    "r3c":"Hub for personal projects and code"
    ,"r3d":"Terminal design with functioning commands"
    ,"r3e":"Extensive use of Javascript"
    ,"r3g":"Clock comprised of text that lights up to show the current time"
    ,"r3h":"Additional tools and commands implemented"
    ,"r3i":"Personal javascript introductory project"
    ,"r4d":"Provided University professors and staff with direct software and network support"
    ,"r4e":"Worked independently and collaboratively with coworkers, under loose supervision"
    ,"r4f":"Learned new IT skills on the job from coworkers and supervisors"
    ,"r4g":"Trained newly hired technicians"
    ,"r4j":"Led educational activities"
    ,"r4k":"Teaching assistant at summer camp"
    ,"r4l":"Volunteered 260 hours of service"
};
var dictList = [categories, mainBullets, subBullets];

function longestString(map) {
    longest = 0;
    for (var elem in map) {
        if (map[elem].length > longest)
            longest = map[elem].length;
    }
    return longest;
}

function resumeType(map, speed) {
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