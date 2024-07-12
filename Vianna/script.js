function addTask() {
  var taskInput = document.getElementById('newTask');
  var taskText = taskInput.value.trim();

  if (taskText !== '') {
    var taskList = document.getElementById('taskList');

    // Create a new list item
    var listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center'; // Added flex classes

    // Create an image for unchecked status
    var uncheckedImage = document.createElement('img');
    uncheckedImage.src = 'unchecked_star.png';
    uncheckedImage.alt = 'Unchecked';
    uncheckedImage.className = 'task-image';
    uncheckedImage.onclick = function() {
      // Toggle between unchecked and checked images
      checkedImage.style.display = 'inline';
      uncheckedImage.style.display = 'none';
      // Apply the completed style to the task text
      taskSpan.classList.add('completed');
      // Save tasks to local storage
      saveTasksToLocalStorage();
    };

    // Create an image for checked status
    var checkedImage = document.createElement('img');
    checkedImage.src = 'checked_star.png';
    checkedImage.alt = 'Checked';
    checkedImage.className = 'task-image';
    checkedImage.style.display = 'none'; // Initially hidden
    checkedImage.onclick = function() {
      // Toggle between checked and unchecked images
      uncheckedImage.style.display = 'inline';
      checkedImage.style.display = 'none';
      // Remove the completed style from the task text
      taskSpan.classList.remove('completed');
      // Save tasks to local storage
      saveTasksToLocalStorage();
    };

    // Create a span for the task text
    var taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.className = 'mr-auto'; 

    // Create a button for deleting the task
    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button btn btn-light btn-sm float-right';
    deleteButton.innerHTML = '&times;';
    deleteButton.style.fontSize = '20px';
    // Center the content (x) horizontally and vertically
    deleteButton.style.display = 'flex';
    deleteButton.style.alignItems = 'center';
    deleteButton.style.justifyContent = 'center';
    deleteButton.onclick = function() {
      // Remove the task when the delete button is clicked
      taskList.removeChild(listItem);
      // Save tasks to local storage
      saveTasksToLocalStorage();
    };

    // Append the images, task text span, and delete button to the list item
    listItem.appendChild(uncheckedImage);
    listItem.appendChild(checkedImage);
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);

    // Append the list item to the task list
    taskList.appendChild(listItem);

    // Clear the input field
    taskInput.value = '';

    // Save tasks to local storage
    saveTasksToLocalStorage();
  }
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  var taskList = document.getElementById('taskList');
  var tasks = [];
  for (var i = 0; i < taskList.children.length; i++) {
    var task = {
      text: taskList.children[i].getElementsByTagName('span')[0].textContent,
      completed: taskList.children[i].classList.contains('completed')
    };
    tasks.push(task);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  var taskList = document.getElementById('taskList');
  for (var i = 0; i < tasks.length; i++) {
    var listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    var uncheckedImage = document.createElement('img');
    uncheckedImage.src = 'unchecked_star.png';
    uncheckedImage.alt = 'Unchecked';
    uncheckedImage.className = 'task-image';
    uncheckedImage.style.display = tasks[i].completed ? 'none' : 'inline';
    uncheckedImage.onclick = function() {
      checkedImage.style.display = 'inline';
      uncheckedImage.style.display = 'none';
      taskSpan.classList.add('completed');
      saveTasksToLocalStorage();
    };

    var checkedImage = document.createElement('img');
    checkedImage.src = 'checked_star.png';
    checkedImage.alt = 'Checked';
    checkedImage.className = 'task-image';
    checkedImage.style.display = tasks[i].completed ? 'inline' : 'none';
    checkedImage.onclick = function() {
      uncheckedImage.style.display = 'inline';
      checkedImage.style.display = 'none';
      taskSpan.classList.remove('completed');
      saveTasksToLocalStorage();
    };

    var taskSpan = document.createElement('span');
    taskSpan.textContent = tasks[i].text;
    taskSpan.className = 'mr-auto';

    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button btn btn-light btn-sm float-right';
    deleteButton.innerHTML = '&times;';
    deleteButton.style.fontSize = '20px';
    // Center the content (x) horizontally and vertically
    deleteButton.style.display = 'flex';
    deleteButton.style.alignItems = 'center';
    deleteButton.style.justifyContent = 'center';
    deleteButton.onclick = function() {
      taskList.removeChild(listItem);
      saveTasksToLocalStorage();
    };

    listItem.appendChild(uncheckedImage);
    listItem.appendChild(checkedImage);
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  }
}

// Load tasks from local storage when the page is loaded
window.onload = loadTasksFromLocalStorage;