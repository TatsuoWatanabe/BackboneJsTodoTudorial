
class Todo extends Backbone.Model {
    public static defaults = {
        title: 'empty todo...',
        order: 1 /* Todos.nextOrder() */ ,
        done: false
    };

    constructor(attributes?: any, options?: any) {
        super(attributes, options);
    }

    public defaults() {
        return Todo.defaults;
    }

    public toggle() {
        this.save({ done: !this.get('done') });
    }

    public toJSON(): typeof Todo.defaults {
        return super.toJSON();
    }
}
export = Todo;