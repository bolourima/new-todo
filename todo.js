let addCartbtn = document.querySelectorAll(".addCard");
let addTaskBox = document.querySelector(".addTask");
let titleTextInput = document.getElementById("titleInput");
let destTextInput = document.getElementById("descriptionInput");
let statusSelectRef = document.getElementById("status-select");
let prioritySelectRef = document.getElementById("priority-select");
let taskCounttext = document.getElementById("taskCounttext");

// Add Task -ийг ил харагдуулах функц
let currentStatus = "todo";
function addCardFunction(event) {
  let currentStatus = event.target.id;

  let addTaskButton = document.getElementById("addTaskButton");
  addTaskButton.onclick = (event) => addTaskFunc(event, currentStatus);

  addTaskBox.style.display = "block";
}

addCartbtn.forEach(function (item, idx) {
  item.addEventListener("click", addCardFunction);
});

// Create empty array
const state = { tasks: [] };

// Main 4 cards
let cardTodo = document.getElementById("todo-cards");
let cardInProgress = document.getElementById("inprogress-cards");
let cardStuck = document.getElementById("stuck-cards");
let cardDone = document.getElementById("done-cards");

// Render Function
function render() {
  cardTodo.innerHTML = "";
  cardInProgress.innerHTML = "";
  cardStuck.innerHTML = "";
  cardDone.innerHTML = "";

  for (let i = 0; i < state.tasks.length; i++) {
    const card = document.createElement("div");
    card.className = "card";

    const checkBtn = document.createElement("button");
    checkBtn.className = "checkBtn";
    checkBtn.innerHTML = "ok";
    checkBtn.id = state.tasks[i].id;

    const titDescDiv = document.createElement("div");
    const taskTitle = document.createElement("p");
    taskTitle.className = "taskTitleStyle";
    taskTitle.textContent = state.tasks[i].title;
    const taskDesc = document.createElement("p");
    taskDesc.className = "taskDescStyle";
    taskDesc.textContent = state.tasks[i].text;

    const twoButtDiv = document.createElement("div");
    twoButtDiv.className = "twoButtDiv";
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.innerHTML = "x";
    deleteBtn.id = state.tasks[i].id;

    const editBtn = document.createElement("button");
    editBtn.className = "editBtn";
    editBtn.innerHTML = "edit";
    editBtn.id = state.tasks[i].id;

    const priorityDiv = document.createElement("div");
    priorityDiv.className = "priorityDiv";
    priorityDiv.textContent = state.tasks[i].priority;

    deleteBtn.onclick = function (event) {
      let taskIdToDelete = event.target.id;
      state.tasks[i] = state.tasks.filter((task) => task.id !== taskIdToDelete);
      render();
    };
    editBtn.onclick = function (event) {
      titleTextInput.value = taskTitle.textContent;
      destTextInput.value = taskDesc.textContent;
      taskId.value = state.tasks[i].id;
      let taskIdToDelete = event.target.id;
      state.tasks[i] = state.tasks.filter(
        (task) => state.tasks[i].id !== taskIdToDelete
      );
      addTaskBox.style.display = "flex";
      addTaskBox.style.flexDirection = "column";
      state.tasks[i].text = "";
      state.tasks[i].title = "";
    };

    checkBtn.onclick = function (event) {
      const taskIdtoDone = event.target.id;
      state.tasks = state.tasks.map((task) =>
        task.id === taskIdtoDone ? { ...task, status: "done" } : task
      );
      render();
    };
    

    function taskCount() {
      let tasknum = cardTodo.childElementCount;
      taskCounttext.textContent = tasknum;
    }
    taskCount();

    card.appendChild(checkBtn);
    card.appendChild(titDescDiv);
    titDescDiv.appendChild(taskTitle);
    titDescDiv.appendChild(taskDesc);
    titDescDiv.appendChild(priorityDiv);
    card.appendChild(twoButtDiv);
    twoButtDiv.appendChild(deleteBtn);
    twoButtDiv.appendChild(editBtn);
    // Sort
    if (state.tasks[i].status === "todo") {
      cardTodo.appendChild(card);
    }
    if (state.tasks[i].status === "inprogress") {
      cardInProgress.appendChild(card);
    }
    if (state.tasks[i].status === "stuck") {
      cardStuck.appendChild(card);
    }
    if (state.tasks[i].status === "done") {
      cardDone.appendChild(card);
    }
  }
}
// Add task Function
let writenTextTitle;
let writenDescInput;
let taskId;
function addTaskFunc(event, currentStatus) {
  writenTextTitle = titleTextInput.value.trim();
  writenDescInput = destTextInput.value.trim();
  taskId = Math.random().toString(16).slice(2);

  if (writenTextTitle !== "" && destTextInput !== "") {
    state.tasks.push({
      title: writenTextTitle,
      text: writenDescInput,
      status: statusSelectRef.value || currentStatus,
      priority: prioritySelectRef.value,
      id: taskId,
    });
    render();
    titleTextInput.value = "";
    destTextInput.value = "";

    addTaskBox.style.display = "none";
  }
}
