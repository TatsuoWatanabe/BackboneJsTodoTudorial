import app = require('app');

class Router extends Backbone.Router {

    public routes() {
        return { '*filter': this.setFilter }
    }

    public setFilter(param: string) {
        app.setFilter(param);
    }
}

export = Router;