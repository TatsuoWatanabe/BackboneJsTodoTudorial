var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'app', 'Trace'], function(require, exports, app, Trace) {
    var Router = (function (_super) {
        __extends(Router, _super);
        function Router() {
            _super.apply(this, arguments);
        }
        Router.prototype.routes = function () {
            return { '*filter': this.setFilter };
        };

        Router.prototype.setFilter = function (param) {
            Trace.log(param, 'Router: setFilter');
            app.filter.setState(param);
        };
        return Router;
    })(Backbone.Router);

    
    return Router;
});
//# sourceMappingURL=Router.js.map
