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
    let date = Date.parse(dueDate);
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
    sortMethod === "Automatically (By Due Date)" ? allTasks = sortAutomatically(taskCol) : allTasks = sortByPriority(taskCol);
    window.currentTasks = allTasks;
    console.log("sorted tasks: ", allTasks);
    for (let i = 0; i < allTasks.length; i++) {
        taskList.innerHTML += "<div class='taskListItem'> <h4>• " + allTasks[i].projName + " " + normalizeDate(allTasks[i].projDueDate) + " => " + timeNormalizer(allTasks[i].projDueTime) + "</h4>" + `<button class='loggedButtons' onclick='viewProject(${i})'> View </button> <button class='loggedButtons' onclick='editIndividual(${i})'> Edit </button> <button class='loggedButtons' onclick='viewProject(${i})'> ❎ </button> <button class='loggedButtons' onclick='viewProject(${i})'> ✅ </button> </div>`;
    }
}

function normalizeMilliseconds(milli) {
    daysLeft = milli / (1000 * 60 * 60 * 24)
    if (daysLeft >= 1) {

    }
}
