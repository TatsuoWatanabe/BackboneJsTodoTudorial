/// <reference path="typings/typings.d.ts" />

class Todo extends Backbone.Model {
    defaults() {
        return {
            title: 'empty todo...',
            order: 'Todos.nextOrder()',
            done: false
        };
    }

    public toggle() {
        this.save({done: !this.get('done')});
    }
}
export = Todo;