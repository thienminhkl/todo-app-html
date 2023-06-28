const todoList = new ListTodo();
const validation = new Validation();

const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

let editTodo = {
    id: '',
    done: false
};

function getELE(id) {
    return document.getElementById(id);
}

function showTable(arr) {
    var content = "";
    arr.map(function (todo) {
        if (todo.done) {
            todo.status = 'Done'
        } else if (!todo.done && (new Date(todo.dueDate).getTime() >= new Date().getTime())) {
            todo.status = 'Doing'
        } else {
            todo.status = 'Out date';
            function showToast() {
                $.toast({
                    text: `Todo task: ${todo.title} has out date!`
                })
            };
            showToast()
        };

        var trELE = `<tr>
            <td>${todo.title}</td>
            <td>${todo.dueDate}</td>
            <td>${todo.status}</td>
            <td class="text-center">
                <button onclick="detail('${todo.id}')" class="btn btn-info">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button 
                onclick="doneTodo('${todo.id}')" 
                class="btn ${!todo.done ? 'btn-warning' : 'btn-success'}">
                ${!todo.done ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-circle-check"></i>`}
                </button>
                <button onclick="deleteTodo('${todo.id}')" class="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>`
        content += trELE;
    })
    getELE("table-todo").innerHTML = content;
}

getELE('btn-save').style.display = 'none';

function setLocalStorage(arr) {
    localStorage.setItem("todoList", JSON.stringify(arr));

}

function getLocalStorage() {
    if (localStorage.getItem("todoList") != null) {
        todoList.todoArr = JSON.parse(localStorage.getItem("todoList"));
        showTable(todoList.todoArr);
    }
}
getLocalStorage();


function addNewTodo() {
    var title = getELE("todo-text").value;
    var dueDate = getELE("todo-date").value;
    var isValid = true;
    isValid &= validation.checkEmpty(title, "todo-span", "Title can not be empty")
    isValid &= validation.checkEmpty(dueDate, "date-span", "Due date can not be empty")

    if (isValid) {
        var todo = new Todo(uid(), title, dueDate);
        todo.statusChange();
        todoList.addTodo(todo);
        showTable(todoList.todoArr);
        setLocalStorage(todoList.todoArr);
        getELE('form-todo').reset();
    }

}

function deleteTodo(id) {
    if (window.confirm("Are you sure to delete this todo?")) {
        todoList.delTodo(id);
        setLocalStorage(todoList.todoArr);
        getLocalStorage()
    }
}

function doneTodo(id) {
    var index = todoList.findIndexTodo(id);
    if (index != -1) {
        todoList.todoArr[index].done = !todoList.todoArr[index].done;
    }
    setLocalStorage(todoList.todoArr);
    getLocalStorage()
}

function detail(id) {
    var index = todoList.findIndexTodo(id);

    if (index != -1) {
        getELE("todo-text").value = todoList.todoArr[index].title;
        getELE("todo-date").value = todoList.todoArr[index].dueDate;
        editTodo = {
            id: id,
            done: todoList.todoArr[index].done
        };
    }
    setLocalStorage(todoList.todoArr);
    getLocalStorage();
    getELE('btn-save').style.display = 'block';
    getELE('btn-submit').style.display = 'none';
}

function update() {
    var title = getELE("todo-text").value;
    var dueDate = getELE("todo-date").value;
    var isValid = true;
    isValid &= validation.checkEmpty(title, "todo-span", "Title can not be empty")
    isValid &= validation.checkEmpty(dueDate, "date-span", "Due date can not be empty")

    if (isValid) {
        var todo = new Todo(editTodo, title, dueDate);
        todo.statusChange();
        todoList.updateTodo(todo);
        showTable(todoList.todoArr);
        setLocalStorage(todoList.todoArr);
        getELE('btn-save').style.display = 'none';
        getELE('btn-submit').style.display = 'block';
        getELE('form-todo').reset();
        editTodo = {
            id: '',
            done: false
        };
    }
}