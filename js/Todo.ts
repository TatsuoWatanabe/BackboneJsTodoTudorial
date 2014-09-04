
class Todo extends Backbone.Model {

    constructor(attributes?: any, options?: any) {
        super(attributes, options);
    }

    public defaults() {
        return {
            title: 'empty todo...',
            order: 1 /* Todos.nextOrder() */ ,
            done: false
        };
    }

    public toggle() {
        this.save({ done: !this.get('done') });
    }
}
export = Todo;