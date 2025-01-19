const addTaskBtn = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.input-task');
const taskList = document.querySelector('.task-list');
const editTaskBtn = document.querySelector('.edit-task-btn');
const modalTaskList = document.getElementById('modalTaskList');
const noTaskMessage = document.getElementById('noTaskMessage');

function addTask() {
    if (taskInput.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a task!',
        });
        return;
    }

    // Hide the "No todo is putted" message if it's visible
    if (noTaskMessage) {
        noTaskMessage.style.display = 'none';
    }

    const task = taskInput.value;
    const taskItem = document.createElement('li');
    taskItem.className = 'd-flex align-items-center gap-3 mb-3 p-3 bg-white rounded shadow-sm';

    // Create a span for the task text
    const taskText = document.createElement('span');
    taskText.textContent = task;
    taskText.className = 'flex-grow-1';

    // Create delete button with Bootstrap styling
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn btn-danger btn-sm ms-2';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        // Show the "No todo is putted" message if no tasks are left
        if (taskList.children.length === 1) { // 1 because of the noTaskMessage li
            noTaskMessage.style.display = 'block';
        }
        Swal.fire({
            icon: 'success',
            title: 'Task Deleted!',
            showConfirmButton: false,
            timer: 1500
        });
    });

    // Create checkbox with Bootstrap styling
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-2';
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskText.style.textDecoration = 'line-through';
            taskText.className = 'flex-grow-1 text-muted';
        } else {
            taskText.style.textDecoration = 'none';
            taskText.className = 'flex-grow-1';
        }
    });

    // Append elements in the correct order
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
    taskInput.value = '';
}

function openEditModal() {
    // Clear the modal task list
    modalTaskList.innerHTML = '';

    // Get all tasks from the main list
    const tasks = taskList.querySelectorAll('li');

    // If there are no tasks, show a message in the modal
    if (tasks.length === 1 && tasks[0] === noTaskMessage) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No tasks to edit.';
        listItem.className = 'text-muted';
        modalTaskList.appendChild(listItem);
    } else {
        // Populate the modal with tasks
        tasks.forEach(task => {
            if (task !== noTaskMessage) { // Skip the noTaskMessage li
                const taskTextElement = task.querySelector('span');
                if (!taskTextElement) {
                    console.warn('Task does not have a span element:', task);
                    return;
                }

                const taskText = taskTextElement.textContent;
                const listItem = document.createElement('li');
                listItem.className = 'd-flex align-items-center gap-3 mb-3 p-3 bg-white rounded shadow-sm';

                const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.value = taskText;
                inputField.className = 'form-control flex-grow-1';

                listItem.appendChild(inputField);
                modalTaskList.appendChild(listItem);
            }
        });
    }

    // Show the modal
    const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    editTaskModal.show();
}

function saveEditedTasks() {
    const tasks = taskList.querySelectorAll('li');
    const modalTasks = modalTaskList.querySelectorAll('li');

    // Check if there are tasks to save
    if (tasks.length === 1 && tasks[0] === noTaskMessage) {
        Swal.fire({
            icon: 'info',
            title: 'No tasks to save!',
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }

    // Iterate over tasks and update them
    tasks.forEach((task, index) => {
        // Skip the "No todo is putted" message
        if (task === noTaskMessage) return;

        // Check if the corresponding modal task exists
        if (!modalTasks[index]) {
            console.warn('No corresponding modal task for task:', task);
            return;
        }

        // Check if the task has a span element
        const taskText = task.querySelector('span');
        if (!taskText) {
            console.warn('Task does not have a span element:', task);
            return;
        }

        // Update the task text
        const editedText = modalTasks[index].querySelector('input').value;
        taskText.textContent = editedText;
    });

    // Hide the modal
    const editTaskModal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
    editTaskModal.hide();

    Swal.fire({
        icon: 'success',
        title: 'Tasks Updated!',
        showConfirmButton: false,
        timer: 1500
    });
}