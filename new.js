
const inputbox = document.getElementById("input-box");
const taskList = document.getElementById("taskList");
const remainingTaskCount = document.getElementById("remaining-task-count");
const completedTaskCount = document.getElementById("completed-task-count");

function updateTaskCounts() {
    const totalTasks = taskList.querySelectorAll("li").length;
    const completedTasks = taskList.querySelectorAll("li.checked").length;
    const remainingTasks = totalTasks - completedTasks;

    remainingTaskCount.textContent = remainingTasks;
    completedTaskCount.textContent = completedTasks;
}

function addTask() {
    if (inputbox.value === '') {
        alert("You haven't added any task.");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `
            <label>
                <input type="checkbox" class="task-checkbox">
                ${inputbox.value}
            </label>
        `;
        taskList.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        inputbox.value = "";

        updateTaskCounts();
        saveData();
    }
}

taskList.addEventListener("click", function (e) {
    if (e.target.tagName === "INPUT" && e.target.classList.contains("task-checkbox")) {
        const li = e.target.closest("li");
        li.classList.toggle("checked");
        updateTaskCounts();
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        updateTaskCounts();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

function showTask() {
    taskList.innerHTML = localStorage.getItem("data");
    updateTaskCounts(); // Update counts when loading tasks from local storage
}

showTask();
