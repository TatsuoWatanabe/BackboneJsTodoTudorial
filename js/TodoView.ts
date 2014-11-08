import app  = require('app');
import Todo = require('Todo');

class TodoView extends Backbone.View<Todo> {
    public template = _.template($('#item-template').html());
    public input = this.$('.edit');

    constructor(options: Backbone.ViewOptions<Todo>) {
        super(options);

        this.delegateEvents({
            'click    .toggle'  : 'toggleDone',
            'dblclick .view'    : 'edit',
            'click    a.destroy': 'clear',
            'keypress .edit'    : 'updateOnEnter',
            'blur     .edit'    : 'close'
        });
    }

    public initialize() {
        this.listenTo(this.model, 'change',  this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'filter',  this.applyFilterState);
    }

    public applyFilterState() {
        var isDone      = this.model.toJSON().done;
        var isRemaining = !isDone;
        var isHidden    = app.filter.isDone()      && !isDone      ? true :
                          app.filter.isRemaining() && !isRemaining ? true : false;
 
        this.$el.toggleClass('hidden', isHidden);
    }

    public render(): TodoView {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('done', this.model.get('done'));
        this.applyFilterState();
        this.input = this.$('.edit');
        return this;
    }

    public toggleDone() {
        this.model.toggle();
    }

    public edit() {
        this.$el.addClass('editing');
        this.input.focus();
    }

    public close() {
        var value = this.input.val();
        if (!value) {
            this.clear();
        } else {
            this.model.save({ title: value });
            this.$el.removeClass('editing');
        }
    }

    public updateOnEnter(e) {
        if (e.keyCode === 13) { this.close(); }
    }

    public clear() {
        this.model.destroy()
    }

}
export = TodoView;