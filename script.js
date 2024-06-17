document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskTime = document.getElementById('taskTime');
    const taskText = taskInput.value.trim();
    const taskTimeValue = taskTime.value;

    if (taskText !== '') {
        const task = {
            id: Date.now(),
            text: taskText,
            time: taskTimeValue,
            completed: false
        };

        saveTask(task);
        displayTask(task);
        taskInput.value = '';
        taskTime.value = '';
    }
}

function displayTask(task) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');
    taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskItem.id = task.id;

    const taskTimeFormatted = task.time ? task.time.replace('T', ' ') : '';

    taskItem.innerHTML = `
        <div class="task-details">
            <span>${task.text}</span>
            ${task.time ? `<span class="task-time">${taskTimeFormatted}</span>` : ''}
        </div>
        <div class="icons">
            <img src="images/c.png" class="complete" onclick="toggleComplete(${task.id})" alt="Complete">
            <img src="images/p1.png" class="edit" onclick="editTask(${task.id})" alt="Edit">
            <img src="images/d.png" class="delete" onclick="deleteTask(${task.id})" alt="Delete">
        </div>
    `;

    taskList.appendChild(taskItem);
}

function toggleComplete(taskId) {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;

    saveTasks(tasks);
    document.getElementById(taskId).classList.toggle('completed');
}

function editTask(taskId) {
    const taskItem = document.getElementById(taskId);
    const newText = prompt('Edit your task:', taskItem.querySelector('.task-details span').textContent);

    if (newText !== null && newText.trim() !== '') {
        const tasks = getTasks();
        const task = tasks.find(task => task.id === taskId);
        task.text = newText.trim();

        saveTasks(tasks);
        taskItem.querySelector('.task-details span').textContent = task.text;
    }
}

function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId);

    saveTasks(tasks);
    document.getElementById(taskId).remove();
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => displayTask(task));
}
