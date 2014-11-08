import app   = require('app');
import Trace = require('Trace');

class Router extends Backbone.Router {

    public routes() {
        return { '*filter': this.setFilter }
    }

    public setFilter(param: string) {
        Trace.log(param, 'Router: setFilter');
        app.filter.setState(param);
    }
}

export = Router;