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

    if (dueTime.includes("AM")) {
        hour = Number(dueTime.substring(0,2));
        if (hour === 12) hour = 0;
        minute = Number(dueTime.substring(3,5));
        dueTime.length > 5 ? second = Number(dueTime.substring(7, 9)) : second = 0;
    } else if (dueTime.includes("PM")){
        hour = Number(dueTime.substring(0,2));
        if (hour !== 12) hour += 12;
        minute = Number(dueTime.substring(3,5));
        dueTime.length > 5 ? second = Number(dueTime.substring(7, 9)) : second = 0;
    }

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
    console.log("milliseconds recieved: " + milli);
    daysLeft = milli / (1000 * 60 * 60 * 24);
    console.log("days left: " + daysLeft);
    console.log("days left rounded: " + Math.round(daysLeft));
    hoursLeft = milli / (1000 * 60 * 60);
    console.log("hours left: " + hoursLeft);
    console.log("hours left rounded: " + Math.round(hoursLeft));
    if (daysLeft >= 1) {
        return "(Due in " + Math.round(daysLeft) + " days...)";
    } else if (daysLeft < 1 && daysLeft > 0) {
        return "(Due in " + Math.round(hoursLeft) + " hours...)";
    } else if (daysLeft <= 0) {
        return ("Task Overdue!")
    }
}
