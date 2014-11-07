var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var Todo = (function (_super) {
        __extends(Todo, _super);
        function Todo(attributes, options) {
            _super.call(this, attributes, options);
        }
        Todo.prototype.defaults = function () {
            return Todo.defaults;
        };

        Todo.prototype.toggle = function () {
            this.save({ done: !this.get('done') });
        };

        Todo.prototype.toJSON = function () {
            return _super.prototype.toJSON.call(this);
        };
        Todo.defaults = {
            title: 'empty todo...',
            order: 1 /* Todos.nextOrder() */ ,
            done: false
        };
        return Todo;
    })(Backbone.Model);
    
    return Todo;
});
//# sourceMappingURL=Todo.js.map
