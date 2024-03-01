document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'task';
            listItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                <span>${task.text}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(listItem);
        });

        // Add event listeners for checkboxes and delete buttons
        document.querySelectorAll('.task input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', toggleTask);
        });

        document.querySelectorAll('.delete-btn').forEach(deleteBtn => {
            deleteBtn.addEventListener('click', deleteTask);
        });
    }

    // Function to add a new task
    function addTask(event) {
        event.preventDefault();
        const text = newTaskInput.value.trim();
        if (text !== '') {
            tasks.push({ text, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            newTaskInput.value = '';
            renderTasks();
        }
    }

    // Function to toggle task completion status
    function toggleTask(event) {
        const index = event.target.dataset.index;
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Function to delete a task
    function deleteTask(event) {
        const index = event.target.dataset.index;
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Event listener for form submission
    todoForm.addEventListener('submit', addTask);

    // Initial rendering of tasks
    renderTasks();
});
