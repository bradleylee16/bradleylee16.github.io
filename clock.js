var day = new Date();
var hour = day.getHours();
var minute = day.getMinutes();
var seconds = day.getSeconds();
var hourDisp = hour;

speeds = [1, 2, 4, 16, 32, 64, 128, 256, 512, 1000];
speedIndex = 0;
refresh_rate = 1000/speeds[speedIndex];

document.onkeydown = function (evt) {
    if ("key" in evt) {
        if (evt.key == "ArrowRight" && !document.getElementById("menu").classList.contains("w3-hide")) {
            if (speedIndex < speeds.length-1) {
                speedIndex += 1;
                refresh_rate = 1000/speeds[speedIndex];
                document.getElementById("speed").innerHTML = speeds[speedIndex];
            }
        } else if (evt.key == "ArrowLeft" && !document.getElementById("menu").classList.contains("w3-hide")) {
            if (speedIndex > 0) {
                speedIndex -= 1;
                refresh_rate = 1000/speeds[speedIndex];
                document.getElementById("speed").innerHTML = speeds[speedIndex];
            }
        } else if (evt.key == "m") {
            if (document.getElementById("menu").classList.contains("w3-hide")) {
                document.getElementById("menu").classList.remove("w3-hide");
            } else {
                document.getElementById("menu").classList.add("w3-hide");
            }
        } else if (evt.key == "r") {
            speedIndex = 0;
            refresh_rate = 1000/speeds[speedIndex];
            day = new Date();
            hour = day.getHours();
            minute = day.getMinutes();
            seconds = day.getSeconds();
        }
    }
}

function setTime() {
    seconds += 1;
    if (seconds >= 60) {
        minute += 1;
        seconds -= 60;
    }
    if (minute >= 60) {
        hourDisp += 1;
        minute -= 60;
    }
    if (hourDisp >= 12) {
        hourDisp = 1;
    }
    document.getElementById("speed").innerHTML = speeds[speedIndex];
    document.getElementById("h").innerHTML = hourDisp;
    if (minute < 10) {
        document.getElementById("m").innerHTML = "0" + minute;
    } else {
        document.getElementById("m").innerHTML = minute;
    }
    if (seconds < 10) {
        document.getElementById("s").innerHTML = "0" + seconds;
    } else {
        document.getElementById("s").innerHTML = seconds;
    }
    
}

function displayTime() {
    clearAll()
    if (hour > 12) { //convert the 24 hour time representation into 12 hour time representation
        hourDisp = hour-12;
    } else if (hour == 0) {
        hourDisp = 12
    }
    let boost = minute >= 40 ? 1 : 0
    hourElementId = hourDisp + boost
    if (hourElementId > 12) { //convert the 24 hour time representation into 12 hour time representation
        hourElementId = hour-12;
    }
    document.getElementById(hourElementId.toString()).setAttribute("class", "text lit");

    // minute changes at 5, 10, 15, 20, 30, 40, 45, 50, 55, 60
    if (minute >= 5 && minute < 10) {
        document.getElementById("5m").setAttribute("class", "text lit")
    } else if (minute >= 10 && minute < 15) {
        document.getElementById("10m").setAttribute("class", "text lit")
    } else if (minute >= 15 && minute < 20) {
        document.getElementById("15").setAttribute("class", "text lit")
    } else if (minute >= 20 && minute < 30) {
        document.getElementById("20").setAttribute("class", "text lit")
    } else if (minute >= 30 && minute < 40) {
        document.getElementById("30").setAttribute("class", "text lit")
    } else if (minute >= 40 && minute < 45) {
        document.getElementById("20").setAttribute("class", "text lit")
    } else if (minute >= 45 && minute < 50) {
        document.getElementById("15").setAttribute("class", "text lit")
    } else if (minute >= 50 && minute < 55) {
        document.getElementById("10m").setAttribute("class", "text lit")
    } else if (minute >= 55 && minute < 60) {
        document.getElementById("5m").setAttribute("class", "text lit")
    }

    if (minute >= 0 && minute < 5) {
        document.getElementById("oclock").setAttribute("class", "text lit");
    } else if (minute >= 5 && minute < 40) {
        document.getElementById("past").setAttribute("class", "text lit");
    } else if (minute >= 40){
        document.getElementById("to").setAttribute("class", "text lit");
    }

    setTime();
    setTimeout(displayTime, refresh_rate);
}

function clearAll() {
    document.getElementById("1").setAttribute("class", "text");
    document.getElementById("2").setAttribute("class", "text");
    document.getElementById("3").setAttribute("class", "text");
    document.getElementById("4").setAttribute("class", "text");
    document.getElementById("5").setAttribute("class", "text");
    document.getElementById("6").setAttribute("class", "text");
    document.getElementById("7").setAttribute("class", "text");
    document.getElementById("8").setAttribute("class", "text");
    document.getElementById("9").setAttribute("class", "text");
    document.getElementById("10").setAttribute("class", "text");
    document.getElementById("11").setAttribute("class", "text");
    document.getElementById("12").setAttribute("class", "text");
    document.getElementById("to").setAttribute("class", "text");
    document.getElementById("30").setAttribute("class", "text");
    document.getElementById("15").setAttribute("class", "text");
    document.getElementById("10m").setAttribute("class", "text");
    document.getElementById("20").setAttribute("class", "text");
    document.getElementById("5m").setAttribute("class", "text");
    document.getElementById("oclock").setAttribute("class", "text");
    document.getElementById("to").setAttribute("class", "text");
    document.getElementById("past").setAttribute("class", "text");
}
