let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-top">
        <span onclick="toggleTask(${index})" class="task-text ${task.completed ? 'completed' : ''}">
          ${task.text}
        </span>
      </div>
      <div class="task-date">
        ${task.date || "No date"} ${task.time || ""}
      </div>
    `;

    list.appendChild(li);
  });
}

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("dateInput").value;
  const time = document.getElementById("timeInput").value;

  if (text === "") return;

  tasks.push({
    text,
    date,
    time,
    completed: false
  });

  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("timeInput").value = "";

  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Enter key support
document.getElementById("taskInput")
  .addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

renderTasks();