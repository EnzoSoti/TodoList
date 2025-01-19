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
    taskItem.className = 'd-flex align-items-center gap-3 mb-3 p-3 bg-white rounded shadow-sm';
    
    // Create a span for the task text
    const taskText = document.createElement('span');
    taskText.textContent = task;
    taskText.className = 'flex-grow-1'; // Bootstrap's flex-grow-1 instead of flex-1
    
    // Create delete button with Bootstrap styling
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn btn-danger btn-sm ms-2'; // Bootstrap button classes
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskItem);
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
    checkbox.className = 'form-check-input me-2'; // Bootstrap checkbox class
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskText.style.textDecoration = 'line-through';
            taskText.className = 'flex-grow-1 text-muted'; // Add text-muted when checked
        } else {
            taskText.style.textDecoration = 'none';
            taskText.className = 'flex-grow-1'; // Remove text-muted when unchecked
        }
    });

    // Append elements in the correct order
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
    taskInput.value = '';
}