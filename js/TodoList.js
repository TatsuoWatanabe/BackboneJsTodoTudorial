var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'Todo'], function(require, exports, Todo) {
    var TodoList = (function (_super) {
        __extends(TodoList, _super);
        function TodoList(models, options) {
            _super.call(this, models, options);
            this.model = Todo;
            this.localStorage = new Backbone.LocalStorage('todos-backbone');
        }
        TodoList.prototype.done = function () {
            return this.where({ done: true });
        };
        TodoList.prototype.remaining = function () {
            return this.without.apply(this, this.done());
        };
        TodoList.prototype.nextOrder = function () {
            return this.length ? Number(this.last().get('order')) + 1 : 1;
        };
        return TodoList;
    })(Backbone.Collection);

    
    return TodoList;
});
//# sourceMappingURL=TodoList.js.map
