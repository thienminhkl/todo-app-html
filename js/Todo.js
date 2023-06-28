function Todo(id, title, dueDate, done) {
    this.title = title;
    this.id = id;
    this.dueDate = dueDate;
    this.done = done || false;
    this.status = '';

    this.statusChange = function () {
        if (this.done) {
            this.status = 'Done'
        } else if (!this.done && (new Date(this.dueDate).getTime() >= new Date().getTime())) {
            this.status = 'Doing'
        } else {
            this.status = 'Out date'
        }
    }
}