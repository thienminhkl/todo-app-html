function ListTodo() {
    this.todoArr = [];

    this.addTodo = function (todo) {
        this.todoArr.push(todo);
    }

    this.findIndexTodo = function (id) {
        var indexFind = -1;
        indexFind = this.todoArr.findIndex(function (todo) {
            return todo.id == id;
        })
        return indexFind;
    }

    this.delTodo = function (id) {
        var index = this.findIndexTodo(id);
        if (index != -1) {
            this.todoArr.splice(index, 1);
        }
    }

    this.updateTodo = function (todo) {
        var index = this.findIndexTodo(todo.id);
        if (index != -1) {
            this.todoArr[index] = todo;
        }
    }
}
