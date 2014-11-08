import AppView = require('AppView');
import Router  = require('Router');

/** app filter module.*/
export module filter {
    /** filter difinition of app.*/
    var states = { remaining: 'remaining', done: 'done' };
    /** filter state of app. */
    var state  = '';

    /** set the filter words to app and apply it.*/
    export function setState(value: string) {
        state = value;
        appView.filterAll();
    }

    /** return true if app filter state is "remaining".*/
    export function isRemaining() { return state === states.remaining; }
    /** return true if app filter state is "done".*/
    export function isDone()      { return state === states.done; }
};

var router  = new Router();
var appView = new AppView();
Backbone.history.start();
