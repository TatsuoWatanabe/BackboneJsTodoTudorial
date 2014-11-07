import Todo     = require('Todo');
import TodoList = require('TodoList');
import TodoView = require('TodoView');

class AppView extends Backbone.View<Todo> {
    public $el           = $('#todoapp');
    public input         = this.$('#new-todo');
    public footer        = this.$('footer');
    public main          = this.$('#main');
    public allCheckbox   = <HTMLInputElement>this.$('#toggle-all')[0];
    public statsTemplate = _.template($('#stats-template').html());
    public todos         = new TodoList();

    constructor(options?: Backbone.ViewOptions<Todo>) {
        super(options);
        this.delegateEvents({
            'keypress #new-todo'         : 'createOnEnter',
            'click    #clear-completed'  : 'clearCompleted',
            'click    #toggle-all'       : 'toggleAllComplete'
        });

        this.listenTo(this.todos, 'add',   this.addOne);
        this.listenTo(this.todos, 'reset', this.addAll);
        this.listenTo(this.todos, 'all',   this.render);
        this.todos.fetch();
    }

    public render() {
        var done       = this.todos.done().length;
        var remaining  = this.todos.remaining().length;
        var todoExists = this.todos.length !== 0;

        this.main.toggle(todoExists);
        this.footer.toggle(todoExists);
        if (todoExists) {
            this.footer.html(this.statsTemplate({
                done      : done,
                remaining : remaining
            }));
        }
        this.allCheckbox.checked = !remaining;
        return this;
    }

    public addOne(todo: Todo) {
        var view = new TodoView({ 
            model   : todo,
            tagName : 'li'
        });
        this.$('#todo-list').append(view.render().el)
    }

    public addAll() {
        this.todos.each(this.addOne, this);
    }

    public filterOne(todo: Todo) {
        todo.trigger('filter');
    }

    public filterAll() {
        this.todos.each(this.filterOne, this);
    }

    public createOnEnter(e) {
        if (e.keyCode !== 13)  { return; }
        if (!this.input.val()) { return; }

        this.todos.create({ title: this.input.val() });
        this.input.val('');
    }

    public clearCompleted() {
        _.invoke(this.todos.done(), 'destroy');
        return false;
    }

    public toggleAllComplete() {
        var done = this.allCheckbox.checked;
        this.todos.each((todo: Todo) => todo.save({ 'done': done }));
    }
}

export = AppView;