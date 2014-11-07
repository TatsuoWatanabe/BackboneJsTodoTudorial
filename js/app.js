define(["require", "exports", 'AppView', 'Router'], function(require, exports, AppView, Router) {
    // --- filter settings --------------------------
    var filters = { remaining: 'remaining', done: 'done' };
    var filter = '';
    function setFilter(value) {
        filter = value;
        exports.appView.filterAll();
    }
    exports.setFilter = setFilter;
    function isRemainingFiltered() {
        return filter === filters.remaining;
    }
    exports.isRemainingFiltered = isRemainingFiltered;
    function isDoneFiltered() {
        return filter === filters.done;
    }
    exports.isDoneFiltered = isDoneFiltered;

    // ----------------------------------------------
    var router = new Router();
    exports.appView = new AppView();
    Backbone.history.start();
});
//# sourceMappingURL=app.js.map
