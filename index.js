const addTaskBtn = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.input-task');
const taskList = document.querySelector('.task-list');

// function to add task to the list and create delete button
function addTask() {
    // check if task input is empty
    if(taskInput.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a task!',
        });
        return;
    }

    // add task to the list
    const task = taskInput.value;
    const taskItem = document.createElement('li');
    taskItem.textContent = task;

    // create element to delete task
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        Swal.fire({
            icon: 'success',
            title: 'Task Deleted!',
            showConfirmButton: false,
            timer: 1500
        });
    });

    // create checkbox to mark task as completed
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskItem.style.textDecoration = 'line-through';
        } else {
            taskItem.style.textDecoration = 'none';
        }
    });

    // append checkbox, task, and delete button to the list
    taskItem.appendChild(checkbox);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
    taskInput.value = '';
}