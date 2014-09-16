var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var TodoView = (function (_super) {
        __extends(TodoView, _super);
        function TodoView(options) {
            _super.call(this, options);
            this.template = _.template($('#item-template').html());
            this.input = this.$('.edit');

            this.delegateEvents({
                'click    .toggle': 'toggleDone',
                'dblclick .view': 'edit',
                'click    a.destroy': 'clear',
                'keypress .edit': 'updateOnEnter',
                'blur     .edit': 'close'
            });
        }
        TodoView.prototype.initialize = function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        };

        TodoView.prototype.render = function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('done', this.model.get('done'));
            this.input = this.$('.edit');
            return this;
        };

        TodoView.prototype.toggleDone = function () {
            this.model.toggle();
        };

        TodoView.prototype.edit = function () {
            this.$el.addClass('editing');
            this.input.focus();
        };

        TodoView.prototype.close = function () {
            var value = this.input.val();
            if (!value) {
                this.clear();
            } else {
                this.model.save({ title: value });
                this.$el.removeClass('editing');
            }
        };

        TodoView.prototype.updateOnEnter = function (e) {
            if (e.keyCode === 13) {
                this.close();
            }
        };

        TodoView.prototype.clear = function () {
            this.model.destroy();
        };
        return TodoView;
    })(Backbone.View);
    
    return TodoView;
});
//# sourceMappingURL=TodoView.js.map
