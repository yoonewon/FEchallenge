
document.getElementById('add-task').addEventListener('click', function() {
  var taskDescription = document.getElementById('new-task').value;
  var taskPriority = document.getElementById('priority').value;
  if(taskDescription) {
    addTask(taskDescription, taskPriority);
    document.getElementById('new-task').value = '';
    sortTasks(); 
  }
});

function addTask(description, priority) {
  var taskItem = document.createElement('div');
  taskItem.className = 'task-item';
  taskItem.setAttribute('data-status', 'uncompleted');
  taskItem.innerHTML = `<input type="checkbox"><span class="task-description">${description}</span><div class="task-actions"> <span class="priority ${priority}">[${priority}]</span><span class="edit">수정</span><span class="delete">삭제</span></div>`;
  var taskList = document.getElementById('tasks');
  taskList.appendChild(taskItem);

  var checkbox = taskItem.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      taskItem.classList.add('completed');
    } else {
      taskItem.classList.remove('completed');
    }
});

  var editBtn = taskItem.querySelector('.edit');
  editBtn.addEventListener('click', function() {
    var newDescription = prompt("할 일 수정:", taskItem.querySelector('.task-description').textContent);
    if (newDescription) {
      taskItem.querySelector('.task-description').textContent = newDescription;
    }
  });

  var deleteBtn = taskItem.querySelector('.delete');
  deleteBtn.addEventListener('click', function() {
    if (confirm("이 할 일을 삭제하시겠습니까?")) {
      taskItem.remove();
    }
  });
}

document.getElementById('sort-asc').addEventListener('click', function() {
  sortTasks(true);
});

document.getElementById('sort-desc').addEventListener('click', function() {
  sortTasks(false);
});

function sortTasks(asc = true) {
  let tasks = Array.from(document.getElementById('tasks').children);
  const priorityOrder = { 'very-high': 1, 'high': 2, 'medium': 3, 'low': 4 };

  tasks.sort((a, b) => {
    const priorityA = priorityOrder[a.querySelector('.priority').className.split(' ')[1]];
    const priorityB = priorityOrder[b.querySelector('.priority').className.split(' ')[1]];
    return asc ? priorityA - priorityB : priorityB - priorityA;
  });

  const tasksContainer = document.getElementById('tasks');
  tasksContainer.innerHTML = '';
  tasks.forEach(task => tasksContainer.appendChild(task));
}

function filterTasks() {
  var tasks = document.querySelectorAll('.task-item');
  var activeTab = document.querySelector('.tab.active').getAttribute('data-status');
  tasks.forEach(task => {
    var isCompleted = task.querySelector('input[type="checkbox"]').checked;
    var shouldDisplay = false;
    switch(activeTab) {
      case 'all':
        shouldDisplay = true;
        break;
      case 'completed':
        shouldDisplay = isCompleted;
        break;
      case 'uncompleted':
        shouldDisplay = !isCompleted;
        break;
    }
    task.style.display = shouldDisplay ? '' : 'none';
  });
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    filterTasks();
  });
});

document.addEventListener('change', function(e) {
  if(e.target.type === 'checkbox') {
    filterTasks();
  }
});
