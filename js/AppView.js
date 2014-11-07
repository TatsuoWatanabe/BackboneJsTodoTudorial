var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'TodoList', 'TodoView'], function(require, exports, TodoList, TodoView) {
    var AppView = (function (_super) {
        __extends(AppView, _super);
        function AppView(options) {
            _super.call(this, options);
            this.$el = $('#todoapp');
            this.input = this.$('#new-todo');
            this.footer = this.$('footer');
            this.main = this.$('#main');
            this.allCheckbox = this.$('#toggle-all')[0];
            this.statsTemplate = _.template($('#stats-template').html());
            this.todos = new TodoList();
            this.delegateEvents({
                'keypress #new-todo': 'createOnEnter',
                'click    #clear-completed': 'clearCompleted',
                'click    #toggle-all': 'toggleAllComplete'
            });

            this.listenTo(this.todos, 'add', this.addOne);
            this.listenTo(this.todos, 'reset', this.addAll);
            this.listenTo(this.todos, 'all', this.render);
            this.todos.fetch();
        }
        AppView.prototype.render = function () {
            var done = this.todos.done().length;
            var remaining = this.todos.remaining().length;
            var todoExists = this.todos.length !== 0;

            this.main.toggle(todoExists);
            this.footer.toggle(todoExists);
            if (todoExists) {
                this.footer.html(this.statsTemplate({
                    done: done,
                    remaining: remaining
                }));
            }
            this.allCheckbox.checked = !remaining;
            return this;
        };

        AppView.prototype.addOne = function (todo) {
            var view = new TodoView({
                model: todo,
                tagName: 'li'
            });
            this.$('#todo-list').append(view.render().el);
        };

        AppView.prototype.addAll = function () {
            this.todos.each(this.addOne, this);
        };

        AppView.prototype.filterOne = function (todo) {
            todo.trigger('filter');
        };

        AppView.prototype.filterAll = function () {
            this.todos.each(this.filterOne, this);
        };

        AppView.prototype.createOnEnter = function (e) {
            if (e.keyCode !== 13) {
                return;
            }
            if (!this.input.val()) {
                return;
            }

            this.todos.create({ title: this.input.val() });
            this.input.val('');
        };

        AppView.prototype.clearCompleted = function () {
            _.invoke(this.todos.done(), 'destroy');
            return false;
        };

        AppView.prototype.toggleAllComplete = function () {
            var done = this.allCheckbox.checked;
            this.todos.each(function (todo) {
                return todo.save({ 'done': done });
            });
        };
        return AppView;
    })(Backbone.View);

    
    return AppView;
});
//# sourceMappingURL=AppView.js.map
