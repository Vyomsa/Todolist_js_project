 // Get references to HTML elements on our task management page
const inputbox = document.getElementById("input-box");
const taskList = document.getElementById("taskList");
const remainingTaskCount = document.getElementById("remaining-task-count");
const completedTaskCount = document.getElementById("completed-task-count");

// Function to update task counts (remaining and completed)
function updateTaskCounts() {
    // Count the total tasks in the list
    const totalTasks = taskList.querySelectorAll("li").length;
    
    // Count the completed tasks (those with the 'checked' class)
    const completedTasks = taskList.querySelectorAll("li.checked").length;
    
    // Calculate remaining tasks
    const remainingTasks = totalTasks - completedTasks;

    // Update the displayed counts
    remainingTaskCount.textContent = remainingTasks;
    completedTaskCount.textContent = completedTasks;
}

// Function to add a new task
function addTask() {
    if (inputbox.value === '') {
        alert("First write your task. ");
    } else {
        // Create a new list item (task)
        let li = document.createElement("li");
        li.innerHTML = `
            <label>
                <input type="checkbox" class="task-checkbox">
                ${inputbox.value}
            </label>
        `;

        // Append the new task to the task list
        taskList.appendChild(li);

        // Create a 'delete' button for the task
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // Clear the input box
        inputbox.value = "";

        // Update task counts, and save the task list to local storage
        updateTaskCounts();
        saveData();
    }
}

// Event listener for the task list (handles checkbox clicks and task deletions)
taskList.addEventListener("click", function (e) {
    if (e.target.tagName === "INPUT" && e.target.classList.contains("task-checkbox")) {
        // Toggle the 'checked' class for the clicked task
        const li = e.target.closest("li");
        li.classList.toggle("checked");

        // Update task counts and save the task list to local storage
        updateTaskCounts();
        saveData();
    } else if (e.target.tagName === "SPAN") {
        // Remove the parent task when the 'delete' button is clicked
        e.target.parentElement.remove();

        // Update task counts and save the task list to local storage
        updateTaskCounts();
        saveData();
    }
}, false);

// Function to save the task list to local storage
function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

// Function to load and display tasks from local storage
function showTask() {
    const savedData = localStorage.getItem("data");

    if (savedData) {
        // Set the task list content from local storage
        taskList.innerHTML = savedData;

        // Loop through the tasks and update the checked state based on their class
        const tasks = taskList.querySelectorAll("li");
        tasks.forEach((task) => {
            const checkbox = task.querySelector(".task-checkbox");
            if (task.classList.contains("checked")) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });

        // Update task counts when loading tasks from local storage
        updateTaskCounts();
    }
}

// Load and display tasks when the page is initially loaded
showTask();

// const inputbox = document.getElementById("input-box");
// const taskList = document.getElementById("taskList");
// const remainingTaskCount = document.getElementById("remaining-task-count");
// const completedTaskCount = document.getElementById("completed-task-count");

// function updateTaskCounts() {
//     const totalTasks = taskList.querySelectorAll("li").length;
//     const completedTasks = taskList.querySelectorAll("li.checked").length;
//     const remainingTasks = totalTasks - completedTasks;

//     remainingTaskCount.textContent = remainingTasks;
//     completedTaskCount.textContent = completedTasks;
// }

// function addTask() {
//     if (inputbox.value === '') {
//         alert("You haven't added any task.");
//     } else {
//         let li = document.createElement("li");
//         li.innerHTML = `
//             <label>
//                 <input type="checkbox" class="task-checkbox">
//                 ${inputbox.value}
//             </label>
//         `;
//         taskList.appendChild(li);
//         let span = document.createElement("span");
//         span.innerHTML = "\u00d7";
//         li.appendChild(span);
//         inputbox.value = "";

//         updateTaskCounts();
//         saveData();
//     }
// }

// taskList.addEventListener("click", function (e) {
//     if (e.target.tagName === "INPUT" && e.target.classList.contains("task-checkbox")) {
//         const li = e.target.closest("li");
//         li.classList.toggle("checked");
//         updateTaskCounts();
//         saveData();
//     } else if (e.target.tagName === "SPAN") {
//         e.target.parentElement.remove();
//         updateTaskCounts();
//         saveData();
//     }
// }, false);

// function saveData() {
//     localStorage.setItem("data", taskList.innerHTML);
// }

// function showTask() {
//     taskList.innerHTML = localStorage.getItem("data");
//     updateTaskCounts(); // Update counts when loading tasks from local storage
// }

// showTask();
