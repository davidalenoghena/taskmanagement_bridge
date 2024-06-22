import React, { useState } from 'react';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        const task = {
            id: Date.now(),
            text: newTask.trim(),
            completed: false
        };

        setTasks([...tasks, task]);
        setNewTask('');
    };

    const toggleComplete = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const editTask = (taskId) => {
        const newTaskText = prompt('Edit your task:');
        if (newTaskText === null) return;
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, text: newTaskText } : task
        ));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Task Manager</h1>
                <div id="task-form">
                    <input
                        type="text"
                        id="new-task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Enter your task"
                    />
                    <button id="add-task" onClick={addTask}>Add Task</button>
                </div>
                <ul id="tasks-list">
                    {tasks.map(task => (
                        <li key={task.id} className={task.completed ? 'completed' : ''}>
                            <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
                            <div>
                                <button onClick={() => editTask(task.id)}>Edit</button>
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </header>
        </div>
    );
}

export default App;
