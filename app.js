// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task");  // Add a new task.
var addButton = document.getElementsByTagName("button")[0];  // first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks");  // ul of #incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks");  // completed-tasks

// New task list item
var createNewTaskElement = function(taskString){
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  listItem.classList.add("task");

  label.innerText = taskString;
  label.className = "task__label";

  // Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = "task__status";

  editInput.type = "text";
  editInput.className = "task__text";

  editButton.innerText = "Edit";  // innerText encodes special characters, HTML does not.
  editButton.classList.add("task__btn");
  editButton.classList.add("edit-btn");

  deleteButton.classList.add("task__btn");
  deleteButton.classList.add("delete-btn");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "delete-btn__img";
  deleteButton.appendChild(deleteButtonImg);

  // and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function(){
  // Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

// Edit an existing task.
var editTask = function(){
  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".task__text");
  var label = listItem.querySelector(".task__label");
  var editBtn = listItem.querySelector(".edit-btn");
  var containsClass = listItem.classList.contains("edit-mode");
  // If class of the parent is .editmode
  if(containsClass){
    // switch to .editmode
    // label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  // toggle .editmode on the parent.
  editInput.classList.toggle("task__text_edited");
  label.classList.toggle("task__label_edited");
  listItem.classList.toggle("edit-mode");
};


// Delete task.
var deleteTask = function(){
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

// Mark task completed
var taskCompleted = function(){
  // Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  var taskLabel = listItem.querySelector(".task__label");
  taskLabel.classList.toggle("task__label_completed");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function(){
  // Mark task as incomplete.
  // When the checkbox is unchecked
  // Append the task list item to the #incomplete-tasks.
  var listItem = this.parentNode;
  var taskLabel = listItem.querySelector(".task__label");
  taskLabel.classList.toggle("task__label_completed");
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function(){
  console.log("AJAX Request");
}

// The glue to hold it all together.

// Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  // select ListItems children
  var checkBox = taskListItem.querySelector(".task__status");
  var editButton = taskListItem.querySelector(".edit-btn");
  var deleteButton = taskListItem.querySelector(".delete-btn");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  // Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

// cycle over incompleteTaskHolder ul list items
// for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++){
  // bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++){
  // bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

// prevent creation of empty tasks.

// Change edit to save when you are in edit mode.