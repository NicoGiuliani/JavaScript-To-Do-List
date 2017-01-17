// PREPARE: Write out the problem & solution
// PLAN: In comments, make an outline of what needs to be done
// PERFORM:
// a) Compartmentalize tasks into functions
// b) Store elements from the DOM into variables (HTML to JS)
// c) Realize each function


// Problem: User interaction doesn't produce desired result
// Solution: Add interactivity to the form


// New task list item
var createNewTaskElement = function(taskString) {
    // Create list item
    var listItem = document.createElement("li");

    // Create an input (checkbox)
    var checkbox = document.createElement("input");

    // Create a label
    var label = document.createElement("label");

    // Create an input (text)
    var editInput = document.createElement("input");

    // Create a button (edit)
    var editButton = document.createElement("button");

    // Create a button (delete)
    var deleteButton = document.createElement("button");

    checkbox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskString;

    // Append each element created above onto the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}


// Variables holding HTML elements
var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");


// Add a new task
var addTask = function() {
    if (taskInput.value != "") {
        console.log("Add task...");
        // Create a new list item with the text from the new task input
        var listItem = createNewTaskElement(taskInput.value);

        // Each li is appended to the incompleteTasksHolder
        incompleteTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
        taskInput.value = "";
    }
}


// Edit an existing task
var editTask = function() {
    console.log("Edit task...");
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");

    // If the class of the parent (the li) is edit mode:
    if (containsClass) {
        // Make the label text become whatever the input's value is
        label.innerText = editInput.value;
        // Button should say 'Edit'
        this.innerText = "Edit";
    }
    // If the class of the parent is not edit mode:
    else {
        // Make the input's value be whatever the label's text is
        editInput.value = label.innerText;
        // Button should say 'Save'
        this.innerText = "Save";
    }
    listItem.classList.toggle("editMode");
}


// Delete an existing task
var deleteTask = function() {
    console.log("Delete task...");
    // Remove the parent list item from the ul
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}


// Mark a task as complete
var taskCompleted = function() {
    console.log("Completed task...");

    // Append the task list item to the tasks completed ul
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


// Mark a task as incomplete
var taskIncomplete = function() {
    console.log("Incomplete task...");
    // Append the task list item to the tasks incompleted ul
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}


var bindTaskEvents = function(taskListItem, checkboxEventHandler) {
    console.log("Bind list item events...");
    // Select its children
    var checkbox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    // Bind the function, editTask, to the edit button
    editButton.onclick = editTask;

    // Bind the function, deleteTask, to the delete button
    deleteButton.onclick = deleteTask;

    // Bind checkBoxEventHandler to the checkbox
    checkbox.onchange = checkboxEventHandler;
}


var ajaxRequest = function() {
    console.log("AJAX request");
}


// Set the addButton's onclick event to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


// Iterate through the incompleteTasksHolder's list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    // Bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}


// Iterate through the completedTasksHolder's list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    // Bind events to list item's children (taskIncomplete)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}


/**
 * Created by Nico on 6/6/2016.
 */
