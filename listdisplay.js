function sortAutomatically(projects) {
    let tempArray = [...projects];
    tempArray.sort((a,b) => {
        return findDateDistance(a.projDueTime, a.projDueDate) -
        findDateDistance(b.projDueTime, b.projDueDate)
    })
    return tempArray //WORK PLEASE BRO
}

function sortByPriority(projects) {
    let tempArray = [...projects];
    tempArray.sort((a,b) => {
        return a.priority - b.priority
    })
    return tempArray
}

function findDateDistance(dueTime, dueDate) {
    let hour = 0;
    let minute = 0;
    let second = 0;
    let [year, month, day] = dueDate.split("-").map(Number);
    let date = new Date(year, month - 1, day).getTime();
    let millisecondTotal = 0;

    /*if (dueTime.includes("AM")) {
        hour = Number(dueTime.substring(0,2));
        if (hour === 12) hour = 0;
        minute = Number(dueTime.substring(3,5));
        dueTime.length > 5 ? second = Number(dueTime.substring(7, 9)) : second = 0;
    } else if (dueTime.includes("PM")){
        hour = Number(dueTime.substring(0,2));
        if (hour !== 12) hour += 12;
        minute = Number(dueTime.substring(3,5));
        dueTime.length > 5 ? second = Number(dueTime.substring(7, 9)) : second = 0;
    }*/

    hour = Number(dueTime.substring(0,2))
    minute = Number(dueTime.substring(3,5));
    dueTime.length > 5 ? second = Number(dueTime.substring(6, 8)) : second = 0;

    millisecondTotal += hour * (1000 * 60 * 60);
    millisecondTotal += minute * 60_000;
    millisecondTotal += second * 1000;
    millisecondTotal += date;
    return millisecondTotal - Date.now();
}

function displayList(taskCol, sortMethod) {
    let allTasks;
    taskList.innerHTML = "";
    sortMethod === "Automatically (By Due Date)" ? allTasks = sortAutomatically(taskCol) : allTasks = sortByPriority(taskCol);
    window.currentTasks = allTasks;
    console.log("sorted tasks: ", allTasks);
    for (let i = 0; i < allTasks.length; i++) {
        taskList.innerHTML += "<div class='taskListItem'> <h4>• " + allTasks[i].projName + " " + normalizeDate(allTasks[i].projDueDate) + " => " + timeNormalizer(allTasks[i].projDueTime) + "</h4>" + normalizeMilliseconds(findDateDistance(allTasks[i].projDueTime, allTasks[i].projDueDate)) + `<button class='loggedButtons' onclick='viewProject(${i})'> View </button> <button class='loggedButtons' onclick='editIndividual(${i})'> Edit </button> <button class='loggedButtons' onclick='deleteProject(${i})'> ❎ </button> <button class='loggedButtons' onclick='completeProject(${i})'> ✅ </button> </div>`;
    }
}

function normalizeMilliseconds(milli) {
    const daysInCurrentYear = new Date(new Date().getFullYear(), 1, 29).getDate() === 29 ? 366 : 365;
    millenniumLeft = milli / (1000 * 60 * 60 * 24 * daysInCurrentYear * 1000);
    centuriesLeft = milli / (1000 * 60 * 60 * 24 * daysInCurrentYear * 100);
    decadesLeft = milli / (1000 * 60 * 60 * 24 * daysInCurrentYear * 10);
    yearsLeft = milli / (1000 * 60 * 60 * 24 * daysInCurrentYear);
    monthsLeft = milli / (1000 * 60 * 60 * 24 * 30.436875);
    weeksLeft = milli / (1000 * 60 * 60 * 24 * 7);
    daysLeft = milli / (1000 * 60 * 60 * 24);
    hoursLeft = milli / (1000 * 60 * 60);
    minutesLeft = milli / (1000 * 60);
    secondsLeft = milli / 1000;
    if (millenniumLeft >= 1) {
        return "(Due in " + Math.round(millenniumLeft) + " millennium...)";
    } else if (millenniumLeft < 1 && centuriesLeft >= 1) {
        return "(Due in " + Math.round(centuriesLeft) + " centuries...)";
    } else if (centuriesLeft < 1 && decadesLeft >= 1) {
        return "(Due in " + Math.round(decadesLeft) + " decades...)";
    } else if (decadesLeft < 1 && yearsLeft >= 1) {
        return "(Due in " + Math.round(yearsLeft) + " years...)";
    } else if (yearsLeft < 1 && monthsLeft >= 1) {
        return "(Due in " + Math.round(monthsLeft) + " months...)";
    } else if (monthsLeft < 1 && weeksLeft >= 1) {
        return "(Due in " + Math.round(weeksLeft) + " weeks...)";
    } else if (weeksLeft < 1 && daysLeft >= 1) {
        return "(Due in " + Math.round(daysLeft) + " days...)";
    } else if (daysLeft < 1 && hoursLeft >= 1) {
        return "(Due in " + Math.round(hoursLeft) + " hours...)";
    } else if (hoursLeft < 1 && minutesLeft > 1) {
        return "(Due in " + Math.round(minutesLeft) + " minutes...)";
    } else if (minutesLeft < 1 && secondsLeft > 0) {
        return "(Due in " + Math.round(secondsLeft) + " seconds!!!)";
    } else if (secondsLeft <= 0) {
        return ("Task Overdue!")
    }
}
