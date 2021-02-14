var data;
var todos = [];
var editValue = "";

const todoInput = document.querySelector(".todo_input");
const todoButton = document.querySelector(".todo_button");
const todoList = document.querySelector(".todo_list");
const filterOption = document.querySelector(".filter_todo");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

data = JSON.parse(localStorage.getItem("Data"));

if (data) {
  todos = data.filter((user) => user.email == localStorage.getItem("active"))[0]
    .todos;
} else {
  todos = [];
}

function addTodo(event) {
  event.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");

  newTodo.classList.add("todo_item");
  todoDiv.appendChild(newTodo);
  if (todoInput.value === "") {
    return null;
  }

  // add todo to localStorage
  saveLocalTodos(todoInput.value);

  const inputDisplay = document.createElement("INPUT");
  inputDisplay.setAttribute("type", "text");
  inputDisplay.value = todoInput.value;
  inputDisplay.disabled = true;
  inputDisplay.classList.add("input_display");
  todoDiv.appendChild(inputDisplay);

  // //Edit Button
  const editButton = document.createElement("button");
  //   editButton.innerHTML = '<img style="z-index: -100;" src="./img/edit.png">';
  editButton.classList.add("edit_btn");
  todoDiv.appendChild(editButton);

  //check mark BUTTON
  const completedButton = document.createElement("button");
  //   completedButton.innerHTML =
  // '<img style="z-index: -100;" src="./img/complete.png">';
  completedButton.classList.add("complete_btn");
  todoDiv.appendChild(completedButton);

  //delete BUTTON
  const deleteButton = document.createElement("button");
  //   deleteButton.innerHTML =
  // '<img style="z-index: -100;" src="./img/delete.png">';
  deleteButton.classList.add("delete_btn");
  todoDiv.appendChild(deleteButton);
  //Append to Actual LIST
  todoList.appendChild(todoDiv);
  //Clear todo input VALUE
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  //DELETE ITEM
  if (item.classList[0] === "delete_btn") {
    const todo = item.parentElement;
    //ANIMATION TRANSITION
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //COMPLETE ITEM
  if (item.classList[0] === "complete_btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completedItem");
  }

  //EDIT ITEM
  if (item.classList[0] === "edit_btn") {
    const item = e.target.parentElement;
    if (item.childNodes[1].disabled) {
      item.childNodes[1].disabled = false;
      item.childNodes[1].classList.add("edit_mode");
      item.childNodes[2].classList.add("editdone_btn");

      //   item.childNodes[2].innerHTML = '<img src="./img/editdone.png">';
      editValue = item.childNodes[1].value;
    } else {
      item.childNodes[1].disabled = true;
      item.childNodes[1].classList.remove("edit_mode");
      item.childNodes[2].classList.remove("editdone_btn");
      //   item.childNodes[2].innerHTML = '<img src="./img/edit.png">';
      todos.forEach(function (todo, i) {
        if (todo == editValue) todos[i] = item.childNodes[1].value;
      });
      data.filter(
        (user) => user.email == localStorage.getItem("active")
      )[0].todos = todos;
      localStorage.setItem("Data", JSON.stringify(data));
    }
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completedItem")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completedItem")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  todos.push(todo);
  data.filter(
    (user) => user.email == localStorage.getItem("active")
  )[0].todos = todos;
  localStorage.setItem("Data", JSON.stringify(data));
}

function getTodos() {
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    // newTodo.innerText = todo;
    newTodo.classList.add("todo_item");
    todoDiv.appendChild(newTodo);

    if (todo === "") {
      return null;
    }

    const inputDisplay = document.createElement("INPUT");
    inputDisplay.setAttribute("type", "text");
    inputDisplay.value = todo;
    inputDisplay.disabled = true;
    inputDisplay.classList.add("input_display");
    todoDiv.appendChild(inputDisplay);

    // Edit Button
    const editButton = document.createElement("button");
    // editButton.innerHTML = '<img style="z-index: -100;" src="./img/edit.png">';
    editButton.classList.add("edit_btn");
    todoDiv.appendChild(editButton);

    //check mark BUTTON
    const completedButton = document.createElement("button");
    // completedButton.innerHTML =
    //   '<img style="z-index: -100;" src="./img/complete.png" class="" >';
    completedButton.classList.add("complete_btn");
    todoDiv.appendChild(completedButton);

    //delete BUTTON
    const deleteButton = document.createElement("button");
    // deleteButton.innerHTML =
    //   '<img style="z-index: -100;" src="./img/delete.png">';
    deleteButton.classList.add("delete_btn");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  data.filter(
    (user) => user.email == localStorage.getItem("active")
  )[0].todos = todos;
  localStorage.setItem("Data", JSON.stringify(data));
}

//Display Active UserName
Activeusername = data.filter(
  (user) => user.email == localStorage.getItem("active")
)[0].name;
document.getElementById("Activeusername").innerHTML = Activeusername;
