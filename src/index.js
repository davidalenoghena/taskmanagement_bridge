let tasks = [];

document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task');
    addTaskButton.addEventListener('click', addTask);
    renderTasks();
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('tasks-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span onclick="toggleComplete(${task.id})">${task.text}</span>
            <div>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="toggleComplete(${task.id})">Complete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    renderTasks();
}

function editTask(taskId) {
    const newTaskText = prompt('Edit your task:');
    if (newTaskText === null) return;
    const task = tasks.find(t => t.id === taskId);
    task.text = newTaskText;
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
}

// Make functions accessible globally
window.toggleComplete = toggleComplete;
window.editTask = editTask;
window.deleteTask = deleteTask;
