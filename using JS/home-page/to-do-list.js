let taskList = document.getElementById("task-list")

let tasks = []
const tasksFromLocalStore = JSON.parse(localStorage.getItem("tasks"))

if (tasksFromLocalStore) {
    tasks = tasksFromLocalStore
    renderTasks()
}

function renderTasks() {
    let listItems = ""

    for (let index = 0; index < tasks.length; index++) {
        listItems += `<li data-index="${index}">
                        <div class="task">
                            <span class="task-text">${tasks[index].text}</span>
                            <div class="task-buttons"> 
                                <button id="update-task-btn" onclick="updateTask(this)"><img id="edit-img" src="icons/edit.png"></button>
                                <button id="delete-task-btn" onclick="deleteTask(this)"><img id="delete-img" src="icons/trash.png"></button>
                            </div>
                        </div>
                      </li>`
    }

    taskList.innerHTML = listItems
}

function addTask() {
    let inputEl = document.getElementById("task-input")
    let taskText = inputEl.value.trim()

    if (taskText === "") return

    let task = { text: taskText }
    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))

    renderTasks();
    inputEl.value = ""
}

function deleteAll() {
    tasks = [];
    localStorage.removeItem("tasks")
    renderTasks()
}

function updateTask(editButton) {
    let liEl = editButton.closest("li")
    let index = liEl.dataset.index

    let currentText = tasks[index].text

    liEl.innerHTML = `<div class="task">
                        <input value="${currentText}" id="update-task" style="font-family: 'Montserrat'">
                        <button id="submit-task-btn" onclick="submitUpdatedTask(this, ${index})">Submit</button>
                      </div>`
}

function submitUpdatedTask(submitBtn, index) {
    let updatedText = document.getElementById("update-task").value.trim()

    if (updatedText === "") return

    tasks[index].text = updatedText
    localStorage.setItem("tasks", JSON.stringify(tasks))

    renderTasks()
}

function deleteTask(deleteButton) {
    let liEl = deleteButton.closest("li")
    let index = liEl.dataset.index

    tasks.splice(index, 1)
    localStorage.setItem("tasks", JSON.stringify(tasks))

    renderTasks()
}


function Logout() {
    window.location.href = "../login-page/login-page.html"
}