import Todo = require('Todo');

class TodoList extends Backbone.Collection<Todo> {
    public model        = Todo;
    public localStorage = new Backbone.LocalStorage('todos-backbone');

    constructor(models?: Todo[], options?: any) {
        super(models, options);
    }

    public done()      { return this.where({ done: true }); }
    public remaining() { return this.where({ done: false }); }
    public nextOrder() { return this.length ? Number(this.last().get('order')) + 1 : 1 }
}

export = TodoList;