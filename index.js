const addTaskBtn = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.input-task');
const taskList = document.querySelector('.task-list');

function addTask() {
    if(taskInput.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a task!',
        });
        return;
    }

    const task = taskInput.value;
    const taskItem = document.createElement('li');
    taskItem.className = 'flex items-center gap-3 mb-3 p-3 bg-base-100 rounded-lg shadow-sm';
    
    // Create a span for the task text
    const taskText = document.createElement('span');
    taskText.textContent = task;
    taskText.className = 'flex-1';  // This will make the text take up remaining space

    // Create delete button with styling
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn btn-danger btn-sm btn-'; // daisyUI button classes
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        Swal.fire({
            icon: 'success',
            title: 'Task Deleted!',
            showConfirmButton: false,
            timer: 1500
        });
    });

    // Create checkbox with styling
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox checkbox-primary';  // daisyUI checkbox class
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskText.style.textDecoration = 'line-through';
            taskText.className = 'flex-1 opacity-50';  // Add opacity when checked
        } else {
            taskText.style.textDecoration = 'none';
            taskText.className = 'flex-1';  // Remove opacity when unchecked
        }
    });

    // Append elements in the correct order
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);  // Using taskText instead of direct text content
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
    taskInput.value = '';
}