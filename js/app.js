define(["require", "exports", 'AppView', 'Router'], function(require, exports, AppView, Router) {
    /** app filter module.*/
    (function (filter) {
        /** filter difinition of app.*/
        var states = { remaining: 'remaining', done: 'done' };

        /** filter state of app. */
        var state = '';

        /** set the filter words to app and apply it.*/
        function setState(value) {
            state = value;
            appView.filterAll();
        }
        filter.setState = setState;

        /** return true if app filter state is "remaining".*/
        function isRemaining() {
            return state === states.remaining;
        }
        filter.isRemaining = isRemaining;

        /** return true if app filter state is "done".*/
        function isDone() {
            return state === states.done;
        }
        filter.isDone = isDone;
    })(exports.filter || (exports.filter = {}));
    var filter = exports.filter;
    ;

    var router = new Router();
    var appView = new AppView();
    Backbone.history.start();
});
//# sourceMappingURL=app.js.map
