import mysql from 'mysql2'

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "to_do_list"
}).promise()



function getTasks() {
    const [rows] = pool.query("SELECT * FROM Tasks;")
    
    let tasksID = []
    let tasks = []

    for (let index = 0; index < rows.length; index++) {
        tasksID.push(row[index]['ID'])
        tasks.push(rows[index]['Task'])
    }

    return tasksID, tasks
}

function renderTasks() {

    
    let tasksID, tasks =  getTasks()

    for (let index = 0; index < tasks.length; index++) {
        listItems += `<li data-index="${tasksID[index]}">
                        <div class="task">
                            <span class="task-text">${tasks[index]}</span>
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
    let taskList = document.getElementById("task-list")
  
    let task = `<li>
                 <div class="task">
                        <span class="task-text">${inputEl.value}</span>

                        <div class="task-buttons"> 
                            <button id="update-task-btn" onclick="updateTask(this)"><img id="edit-img" src="edit.png"></button>
                            <button id="delete-task-btn" onclick="deleteTask(this)"><img id="delete-img" src="trash.png"></button>
                        </div>
                    </div>
                </li>`

    taskList.insertAdjacentHTML("beforeend", task)
    
    inputEl.value = ""

    renderTasks()
}


deleteAll = () => {
    document.getElementById("task-list").innerHTML = ''
}
 

function updateTask(editButton) {
    let currentTaskEl = editButton.closest("li")

    currentTaskEl.innerHTML = `<div class="task">
                                <input value=${currentTaskEl.textContent} id="update-task" style="font-family: 'Montserrat'">
                                <button id="submit-task-btn" onclick="submitUpdatedTask(this)">Submit</button>
                               </div>`     
}


function submitUpdatedTask(editBtn) {

    let newTaskEl = editBtn.closest("li")

    let update = document.getElementById("update-task")
    newTaskEl.innerHTML = `<div class="task">
                            <span class="task-text">${update.value}</span>

                            <div class="task-buttons"> 
                                <button id="update-task-btn" onclick="updateTask(this)"><img id="edit-img" src="edit.png"></button>
                                <button id="delete-task-btn" onclick="deleteTask(this)"><img id="delete-img" src="trash.png"></button>
                            </div>
                           </div>`
}


deleteTask = (deleteButton) => {
    deleteButton.closest("li").remove()
}