import Todo     = require('Todo');
import TodoList = require('TodoList');
import TodoView = require('TodoView');

class AppView extends Backbone.View<Todo> {
    public $el           = $('#todoapp');
    public input         = this.$('#new-todo');
    public footer        = this.$('#footer');
    public main          = this.$('#main');
    public allCheckbox   = <HTMLInputElement>this.$('#toggle-all')[0];
    public statsTemplate = _.template($('#stats-template').html());
    private Todos        = new TodoList();

    constructor() {
        super();

        this.delegateEvents({
            'keypress #new-todo'         : 'createOnEnter',
            'click    #clear-completed'  : 'clearCompleted',
            'click    #toggle-all'       : 'toggleAllComplete'
        });
        this.listenTo(this.Todos, 'add',   this.addOne);
        this.listenTo(this.Todos, 'reset', this.addAll);
        this.listenTo(this.Todos, 'all',   this.render);
        this.Todos.fetch();
    }

    public render() {
        var done       = this.Todos.done().length;
        var remaining  = this.Todos.remaining().length;
        var todoExists = this.Todos.length !== 0;
        
        this.main.toggle(todoExists);
        this.footer.toggle(todoExists);
        if (todoExists) {
            this.footer.html(this.statsTemplate({
                done:      done,
                remaining: remaining
            }));
        }
        this.allCheckbox.checked = !remaining;
        return this;
    }

    public addOne(todo: Todo) {
        var view = new TodoView(todo);
        this.$('#todo-list').append(view.render().el)
    }

    public addAll() {
        this.Todos.each(this.addOne, this);
    }

    public createOnEnter(e) {
        console.log(e);
        if (e.keyCode !== 13)  { return; }
        if (!this.input.val()) { return; }

        this.Todos.create({ title: this.input.val() });
        this.input.val('');
    }

    public clearCompleted() {
        _.invoke(this.Todos.done(), 'destroy');
        return false;
    }

    public toggleAllComplete() {
        var allCheckbox = <HTMLInputElement>this.allCheckbox;
        var done = allCheckbox.checked;
        this.Todos.each((todo: Todo) => todo.save({ 'done': done }) );
    }
}
export = AppView;