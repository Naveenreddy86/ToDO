let todoListElement = document.getElementById('toDoListContainer');

let todoButtonElement = document.getElementById('buttonId');
let buttonElement = document.getElementById('toDoButton');

function getParsedData() {
    let getStringifyData = localStorage.getItem("todolist");
    let parsedData = JSON.parse(getStringifyData);
    if (parsedData === null) {
        return [];
    } else {
        return parsedData;
    }
}
let todolist = getParsedData();
buttonElement.onclick = function() {
    let strigifyData = localStorage.setItem("todolist", JSON.stringify(todolist));
}
let todoCount = todolist.length;

function onInputElement(inputId, labelId, todoId) {
    let inputElementOf = document.getElementById(inputId);
    let labelElementOf = document.getElementById(labelId);
    if (inputElementOf.checked === true) {
        labelElementOf.classList.add("checked");

    } else {
        labelElementOf.classList.remove("checked");
    }
    let ObjectIndex = todolist.findIndex(function(eachtodo) {
        let todoIdOf = "todo" + eachtodo.uniqueNo;
        if (todoIdOf === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let objectOf = todolist[ObjectIndex];
    if (objectOf.isChecked === true) {
        objectOf.isChecked = false;
    } else {
        objectOf.isChecked = true;
    }

}

function checkPassed(todoId) {
    let listElement = document.getElementById(todoId);
    todoListElement.removeChild(listElement);
    let deletedIndex = todolist.findIndex(function(eachtodo) {
        let eachTodoElement = "todo" + eachtodo.uniqueNo;
        if (todoId === eachTodoElement) {
            return true;
        } else {
            return false;
        }
    });
    todolist.splice(deletedIndex, 1);
}

function createAndAppendToDo(todo) {
    let inputId = "checkboxInput" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let listElement = document.createElement('li');
    listElement.id = todoId;
    listElement.classList.add("to-do-item-container", "d-flex", "flex-row");
    todoListElement.appendChild(listElement);

    let inputElement = document.createElement('input');
    inputElement.type = "checkbox";
    inputElement.classList.add("checkbox-input", "mt-2");
    inputElement.id = inputId;
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function() {
        onInputElement(inputId, labelId, todoId);
    }
    listElement.appendChild(inputElement);

    let containerElement1 = document.createElement('div');
    containerElement1.classList.add("d-flex", "flex-row", "label-container");
    listElement.appendChild(containerElement1);

    let labelElement = document.createElement('label');
    labelElement.classList.add("check-box-label");
    labelElement.id = labelId;
    labelElement.setAttribute("for", inputId);
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    containerElement1.appendChild(labelElement);

    let iconContainerElement = document.createElement('div');
    iconContainerElement.classList.add("delete-icon-container");
    containerElement1.appendChild(iconContainerElement);

    let iconElement = document.createElement('icon');
    iconElement.classList.add("fa", "fa-trash", "delete-icon");
    iconContainerElement.appendChild(iconElement);
    iconElement.onclick = function() {
        checkPassed(todoId);
    }
}
for (let todo of todolist) {
    createAndAppendToDo(todo);
}

function onAddTodo() {
    let userInputElement = document.getElementById('inputOf');
    let userValue = userInputElement.value;

    if (userValue === "") {
        alert("Invalid input");
        return;
    }
    let newTodo = {
        text: userValue,
        uniqueNo: todoCount,
        isChecked: false
    }
    todoCount = todoCount + 1;
    todolist.push(newTodo);
    createAndAppendToDo(newTodo);
    userInputElement.value = "";
}
todoButtonElement.onclick = function() {
    onAddTodo();
}