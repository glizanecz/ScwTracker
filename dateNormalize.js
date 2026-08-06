function normalizeDate(stringDate, project) {
    let year;
    let month = "";
    let monthString = stringDate.substring(5,7)
    let day = Number(stringDate.substring(8,10));
    let dayEnd = "";
    if (new Date().getFullYear() === Number(stringDate.substring(0,4))) {
        year = ""
    } else {
        year = stringDate.substring(0,4)
    }
    if (monthString === "01") month = "January";
    if (monthString === "02") month = "February";
    if (monthString === "03") month = "March";
    if (monthString === "04") month = "April";
    if (monthString === "05") month = "May";
    if (monthString === "06") month = "June";
    if (monthString === "07") month = "July";
    if (monthString === "08") month = "August";
    if (monthString === "09") month = "September";
    if (monthString === "10") month = "October";
    if (monthString === "11") month = "November";
    if (monthString === "12") month = "December";

    if (day === "1" || day === "21" || day === "31") {
        dayEnd = "st";
    } else if (day === "3" || day === "23") {
        dayEnd = "rd";
    } else if (day === "2" || day === "22") {
        dayEnd = "nd";
    } else {
        dayEnd = "th";
    }
    let commaAdd = year === "" ? "" : ", "
    return month + " " + day + dayEnd + commaAdd + year
}

function timeNormalizer(timeString, project) {
    let hourString = timeString.substring(0,2);
    let hour = Number(hourString)
    let minuteString = timeString.substring(3,5);
    let minute;
    let secondString = timeString.substring(6,8);
    let second;
    let hourEnd = "";
    let displayHour = hour % 12;
    if (displayHour === 0) displayHour = 12;
    Number(secondString) === 0 ? second = "" : second = secondString;
    if (Number(hourString) >= 12 && Number(hourString) < 24) {
        hourEnd = "PM";
    } else {
        hourEnd = "AM";
    }
    let ending = second === "" ? hourEnd : ":" + second + " " + hourEnd;
    return displayHour + ":" + minuteString + ending;
}