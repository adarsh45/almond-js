let allTodos = [];

const formRef = document.getElementById("todo-form");
const todosContainerRef = document.getElementById("todos-list-container");

formRef.addEventListener("submit", todoSubmitHandler);

function todoSubmitHandler(event) {
  event.preventDefault();

  // create data for updating state
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const { todo_input: todoText } = data;
  const todoItem = {
    id: Math.floor(Math.random() * 1000),
    text: todoText,
  };

  // state update
  allTodos.push(todoItem);
  // reset form state
  formRef.reset();
  // re-render
  appendNewTodoItem(todoItem);
}

function appendNewTodoItem(todoItem) {
  const todoElement = createTodoElement(todoItem);
  todosContainerRef.appendChild(todoElement);
}

function createTodoElement(todoItem) {
  const todoElement = document.createElement("li");
  todoElement.setAttribute("class", "todo-item-container");
  todoElement.setAttribute("id", `todo-container-${todoItem.id}`);
  todoElement.setAttribute("data-todo-id", todoItem.id);

  const textElement = createTodoText(todoItem);
  const doneBtnElement = createDoneButton(todoItem);

  todoElement.append(textElement, doneBtnElement);

  return todoElement;
}

function createTodoText(todoItem) {
  const textElement = document.createElement("span");
  textElement.setAttribute("class", "todo-item-text");
  textElement.innerText = todoItem.text;

  textElement.addEventListener("dblclick", () => {
    // replace regular todo item with editable todo item
    const editTodoElement = createEditElement(todoItem);
    makeTodoItemEditable(todoItem, editTodoElement);
    // focus
    editTodoElement.childNodes[0].focus();
  });

  return textElement;
}

function makeTodoItemEditable(todoItem, editTodoElement) {
  const containerRef = document.getElementById("todos-list-container");
  const todoItemElement = document.getElementById(
    `todo-container-${todoItem.id}`
  );
  containerRef.replaceChild(editTodoElement, todoItemElement);
}

function createDoneButton(todoItem) {
  const doneBtnElement = document.createElement("button");
  doneBtnElement.innerText = "Done";
  doneBtnElement.addEventListener("click", () => {
    markAsDone(todoItem);
  });
  return doneBtnElement;
}

function markAsDone(todoItem) {
  allTodos = allTodos.filter((item) => todoItem.id !== item.id);
  const todoItemElement = document.getElementById(
    `todo-container-${todoItem.id}`
  );
  todosContainerRef.removeChild(todoItemElement);
}

function createEditElement(todoItem) {
  const editableFormElement = document.createElement("form");
  editableFormElement.setAttribute("class", "edit-form");
  editableFormElement.setAttribute("action", "#");
  editableFormElement.setAttribute("method", "");

  const editText = document.createElement("input");
  editText.setAttribute("type", "text");
  editText.setAttribute("name", "todo_input");
  editText.setAttribute("value", todoItem.text);

  const hiddenTodoIdInput = document.createElement("input");
  hiddenTodoIdInput.setAttribute("type", "hidden");
  hiddenTodoIdInput.setAttribute("name", "todo_id");
  hiddenTodoIdInput.setAttribute("value", todoItem.id);

  const hiddenOriginalText = document.createElement("input");
  hiddenOriginalText.setAttribute("type", "hidden");
  hiddenOriginalText.setAttribute("name", "original_text");
  hiddenOriginalText.setAttribute("value", todoItem.text);

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Save";
  saveBtn.setAttribute("type", "submit");

  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "Cancel";
  cancelBtn.setAttribute("type", "reset");

  editableFormElement.append(
    editText,
    hiddenTodoIdInput,
    hiddenOriginalText,
    saveBtn,
    cancelBtn
  );
  editableFormElement.addEventListener("submit", makeEditInTodoHandler);
  editableFormElement.addEventListener("reset", makeEditInTodoHandler);
  return editableFormElement;
}

function makeEditInTodoHandler(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const {
    todo_input: editedTodoText,
    todo_id: todoIdText,
    original_text: originalText,
  } = data;

  // sanitize & preprocess
  const todoId = parseInt(todoIdText);
  const todoText = event.type === "submit" ? editedTodoText : originalText;

  const newTodoItem = {
    id: todoId,
    text: todoText,
  };

  // state update
  if (event.type === "submit") {
    updateAllTodosState(newTodoItem);
  }

  // replace this editable UI with original todo item UI
  const originalTodoElement = createTodoElement(newTodoItem);
  const containerRef = document.getElementById("todos-list-container");
  containerRef.replaceChild(originalTodoElement, event.target);
}

function updateAllTodosState(newTodoItem) {
  allTodos = allTodos.map((todoItem) => {
    if (todoItem.id === newTodoItem.id) {
      return newTodoItem;
    }
    return todoItem;
  });
}
