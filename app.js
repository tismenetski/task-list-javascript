// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// call load All event listeners

loadEventListeners();

function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task event
  form.addEventListener('submit', addTask);

  // Remove task event
  taskList.addEventListener('click', removeTask);

  // Clear Tasks
  clearBtn.addEventListener('click', clearTasks);

  // Filter Tasks
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from local storage
function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // Create text node and append to the li
    li.appendChild(document.createTextNode(task));

    // Create a new link element
    const link = document.createElement('a');

    // Add class

    link.className = 'delete-item secondary-content';

    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');

  // Add class
  li.className = 'collection-item';

  // Create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create a new link element
  const link = document.createElement('a');

  // Add class

  link.className = 'delete-item secondary-content';

  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from local storage

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(element) {
  tasks = JSON.parse(localStorage.getItem('tasks'));

  index = tasks.indexOf(element.textContent);
  console.log(index);
  console.log(element.textContent);
  // tasks = tasks.filter((task) => task !== element.textContent);
  tasks.splice(index, 1);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  while (taskList.firstChild) {
    // taskList.firstChild.remove();
    taskList.removeChild(taskList.firstChild);
  }

  // Clear Local Storage
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  // let children = taskList.children;
  // for (i = 0; i < children.length; i++) {
  //   let text = children[i].innerText;
  //   if (!text.includes(filter.value)) {
  //     children[i].;
  //   } else {
  //     children[i].style.display = 'inherit';
  //   }
  // }

  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
