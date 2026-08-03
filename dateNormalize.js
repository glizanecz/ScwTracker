function normalizeDate(stringDate, project) {
    let year;
    let month = "";
    let monthString = stringDate.substring(5,7)
    let day = stringDate.substring(8,10)
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

    if (day === "01" || day === "21" || day === "31") {
        dayEnd = "st";
    } else if (day === "03" || day === "23") {
        dayEnd = "rd";
    } else if (day === "02" || day === "22") {
        dayEnd = "nd";
    } else {
        dayEnd = "th";
    }

    return month + " " + day + dayEnd + ", " + year
}