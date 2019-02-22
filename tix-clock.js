// The total amount of LEDs in each digit, stored in an array
let total = [2,8,5,8];

// Random number generator within a range, includes max and min.
let randomGen = (min, max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Checks if string exists in array, returns true if it does.
let inArray = (string, array) => {
    let output = false;
    for (i = 0; i < array.length; i++) {
        if (array[i] == string) {
            output = true;
        }
    }
    return output;
}

// Adds leading zeros to 1 digit numbers
let lead = (number, amount) => {
    let str = "" + number;
    if (number.length < amount) {
        str = "0" + number;
    }
    return str;
}

// Takes amount parameter as number of LEDs to light up and group parameter as which digit it is in
let litUp = (amount, group) => {
    let litArr = [];
    while (litArr.length != amount) {
        var num = randomGen(0,total[group]);
        if (!inArray(num, litArr)) {
            document.getElementById(group + "_" + num).className = "active";
            litArr.push(num);
        }
    }
}

// Clears off all lighted LEDs
let shutOff = () => {
    var element = document.getElementsByTagName("div");
    for (let i = 0; i < element.length; i++) {
        if (element[i].className == "active") {
            element[i].className = "";
        }
    }
}

// Takes the current time from the device and input into 4 variables for each digit (2 hours, 2 minutes)
let updateTime = () => {
    let currentTime = new Date();
    let hour = lead(currentTime.getHours(), 2);
    let minute = lead(currentTime.getMinutes(), 2);

    let hour_0 = hour.substr(0,1);
    let hour_1 = hour.substr(1,2);
    let minute_0 = minute.substr(0,1);
    let minute_1 = minute.substr(1,2);

    litUp(hour_0, 0);
    litUp(hour_1, 1);
    litUp(minute_0, 2);
    litUp(minute_1, 3);
}

// Refreshes the clock every 4 seconds
    setInterval( () => {
        shutOff();
        updateTime();
    }, 4000);