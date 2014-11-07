import AppView = require('AppView');
import Router  = require('Router');

// --- filter settings --------------------------
var filters = { remaining: 'remaining', done: 'done' };
var filter = '';
export function setFilter(value: string) {
    filter = value;
    appView.filterAll();
}
export function isRemainingFiltered() { return filter === filters.remaining; }
export function isDoneFiltered()      { return filter === filters.done; }
// ----------------------------------------------

var router         = new Router();
export var appView = new AppView();
Backbone.history.start();
