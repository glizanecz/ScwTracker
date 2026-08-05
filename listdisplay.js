function sortAutomatically(projects) {
    let lastItemUrgency = 0;
    for (let i = 0; i < projects.length; i++) {
        
    }
}

function findDateDistance(dueTime, dueDate) {
    let hour = 0;
    let minute = 0;
    let second = 0;
    let date = Date.parse(dueDate);
    let millisecondTotal = 0;

    if (dueDate.includes("AM")) {
        hour = Number(dueTime.substring(0,2));
        minute = Number(dueTime.substring(3,6));
        dueTime.length > 5 ? second = substring(7, 10) : second = 0;
    } else if (dueDate.includes("PM")){
        hour = Number(dueTime.substring(0,2)) + 12;
        minute = Number(dueTime.substring(3,6));
        dueTime.length > 5 ? second = substring(7, 10) : second = 0;
    }

    millisecondTotal += hour * (1000 * 60 * 60);
    millisecondTotal += minute * 60_000;
    millisecondTotal += second * 1000;
    millisecondTotal += date;

    return millisecondTotal - new Date.now();
}