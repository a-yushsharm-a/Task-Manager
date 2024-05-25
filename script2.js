

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('task-form').addEventListener('submit', addTask);
    document.getElementById('edit-task-form').addEventListener('submit', saveTaskChanges);
    loadTasks();
});

function addTask(event) {
    event.preventDefault();
    
    const taskName = document.getElementById('task-name').value;
    const taskDesc = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('due-date').value;
    const dueTime = document.getElementById('due-time').value;
    const taskCategory = document.getElementById('task-category').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskStatus = document.getElementById('task-status').value;
    
    const currentDate = new Date().toISOString().split('T')[0]; // Define currentDate here

    const task = {
        id: new Date().getTime(),
        name: taskName,
        description: taskDesc,
        dateAdded: currentDate,
        dueDate: dueDate,
        dueTime: dueTime,
        category: taskCategory,
        priority: taskPriority,
        status: taskStatus
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.getElementById('success-message').style.display = 'block';
    setTimeout(() => {
        document.getElementById('success-message').style.display = 'none';
    }, 3000);
    document.getElementById('task-form').reset();
    loadTasks();
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksBody = document.getElementById('tasks-body');
    tasksBody.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.dateAdded}</td>
            <td>${task.dueDate}</td>
            <td>${task.dueTime}</td>
            <td>${task.priority}</td>
            <td>
                <button class="status-btn" onclick="toggleStatus(${task.id})">${task.status}</button>
            </td>
            <td>${task.category}</td>
            <td>
                <button onclick="editTask(${task.id})">&#9998;</button>
                <button onclick="deleteTask(${task.id})">&#128465;</button>
            </td>
        `;

        switch (task.status.toLowerCase()) {
            case 'to start':
                row.classList.add('status-to-start');
                break;
            case 'in progress':
                row.classList.add('status-in-progress');
                break;
            case 'completed':
                row.classList.add('status-completed');
                break;
            default:
                break;
        }

        tasksBody.appendChild(row);
    });

    // Update task counts
    updateTaskCounts();
}

function toggleStatus(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex > -1) {
        const currentStatus = tasks[taskIndex].status.toLowerCase();
        switch (currentStatus) {
            case 'to start':
                tasks[taskIndex].status = 'In Progress';
                break;
            case 'in progress':
                tasks[taskIndex].status = 'Completed';
                break;
            case 'completed':
                tasks[taskIndex].status = 'To Start';
                break;
            default:
                break;
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

function deleteTask(taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

function editTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        document.getElementById('edit-task-id').value = task.id;
        document.getElementById('edit-task-name').value = task.name;
        document.getElementById('edit-task-desc').value = task.description;
        document.getElementById('edit-task-date').value = task.dueDate;
        document.getElementById('edit-task-time').value = task.dueTime;
        document.getElementById('edit-task-category').value = task.category;
        document.getElementById('edit-task-priority').value = task.priority;
        document.getElementById('edit-task-status').value = task.status;

        // Hide the view tasks section
        document.getElementById('item3').style.display = 'none';

        // Show the edit task section
        document.getElementById('item4').style.display = 'block';
    }
}

function closeEditModal() {
    document.getElementById('item4').style.display = 'none';
}

function saveTaskChanges(event) {
    event.preventDefault();
    
    const taskId = parseInt(document.getElementById('edit-task-id').value);
    const taskName = document.getElementById('edit-task-name').value;
    const taskDesc = document.getElementById('edit-task-desc').value;
    const dueDate = document.getElementById('edit-task-date').value;
    const dueTime = document.getElementById('edit-task-time').value;
    const taskCategory = document.getElementById('edit-task-category').value;
    const taskPriority = document.getElementById('edit-task-priority').value;
    const taskStatus = document.getElementById('edit-task-status').value;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex > -1) {
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            name: taskName,
            description: taskDesc,
            dueDate: dueDate,
            dueTime: dueTime,
            category: taskCategory,
            priority: taskPriority,
            status: taskStatus
        };

        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
        closeEditModal();

        // Show the view tasks section
        document.getElementById('item3').style.display = 'block';
    }
}

function searchTasks() {
    const searchTerm = document.getElementById('task-search').value.toLowerCase();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksBody = document.getElementById('tasks-body');
    tasksBody.innerHTML = '';

    tasks
        .filter(task => 
            task.name.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm) ||
            task.category.toLowerCase().includes(searchTerm) ||
            task.status.toLowerCase().includes(searchTerm)
        )
        .forEach(task => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${task.name}</td>
                <td>${task.description}</td>
                <td>${task.dateAdded}</td>
                <td>${task.dueDate}</td>
                <td>${task.dueTime}</td>
                <td>${task.priority}</td>
                <td>${task.status}</td>
                <td>${task.category}</td>
                <td>
                    <button onclick="editTask(${task.id})">&#9998;</button>
                    <button onclick="deleteTask(${task.id})">&#128465;</button>
                </td>
            `;

            tasksBody.appendChild(row);
        });
}

function applyFilters() {
    const priorityFilter = document.getElementById('priority-filter').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value.toLowerCase();
    const searchTerm = document.getElementById('task-search').value.toLowerCase();
    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = tasks.filter(task => {
        return (
            (priorityFilter === '' || task.priority.toLowerCase() === priorityFilter) &&
            (statusFilter === '' || task.status.toLowerCase() === statusFilter) &&
            (categoryFilter === '' || task.category.toLowerCase() === categoryFilter) &&
            (task.name.toLowerCase().includes(searchTerm) ||
             task.description.toLowerCase().includes(searchTerm) ||
             task.category.toLowerCase().includes(searchTerm) ||
             task.status.toLowerCase().includes(searchTerm))
        );
    });
    
    displayTasks(filteredTasks);
}

function displayTasks(tasks) {
    const tasksBody = document.getElementById('tasks-body');
    tasksBody.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.dateAdded}</td>
            <td>${task.dueDate}</td>
            <td>${task.dueTime}</td>
            <td>${task.priority}</td>
            <td>${task.status}</td>
            <td>${task.category}</td>
            <td>
                <button onclick="editTask(${task.id})">&#9998;</button>
                <button onclick="deleteTask(${task.id})">&#128465;</button>
            </td>
        `;

        tasksBody.appendChild(row);
    });

    // Update task counts
    updateTaskCounts();
}

function updateTaskCounts() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentHour = now.getHours();

    const completedTasks = tasks.filter(task => task.status.toLowerCase() === 'completed').length;
    const pendingTasks = tasks.filter(task => task.status.toLowerCase() !== 'completed').length;
    const todayTasks = tasks.filter(task => task.dueDate === today).length;
    const hourTasks = tasks.filter(task => {
        const taskDueDate = new Date(task.dueDate + 'T' + task.dueTime);
        return taskDueDate.getFullYear() === now.getFullYear() &&
               taskDueDate.getMonth() === now.getMonth() &&
               taskDueDate.getDate() === now.getDate() &&
               taskDueDate.getHours() === currentHour;
    }).length;

    document.getElementById('total-tasks-completed').innerText = `${completedTasks}`;
    document.getElementById('total-tasks-pending').innerText = `${pendingTasks}`;
    document.getElementById('total-tasks-today').innerText = `${todayTasks}`;
    document.getElementById('total-tasks-hour').innerText = `${hourTasks}`;
}

function clearTaskForm() {
    document.getElementById('task-form').reset();
}

function clearFilters() {
    document.getElementById('priority-filter').value = '';
    document.getElementById('status-filter').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('task-search').value = '';
    loadTasks();
}


// Function to handle voice search
function startVoiceSearch() {
    const recognition = new webkitSpeechRecognition() || SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('task-search').value = transcript;
        // Trigger search based on the transcribed text
        searchTasks();
    }

    recognition.start();
}

// CSS Adjustments
document.addEventListener('DOMContentLoaded', function () {
    var searchContainer = document.querySelector('.search-container');
    var voiceSearchBtn = document.querySelector('.voice-search-btn');

  
    // Add event listener for voice search button
    voiceSearchBtn.addEventListener('click', startVoiceSearch);
});