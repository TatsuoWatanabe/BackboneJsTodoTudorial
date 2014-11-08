define(["require", "exports"], function(require, exports) {
    var Trace = (function () {
        function Trace() {
        }
        Trace.log = function (message, title) {
            if (typeof title === "undefined") { title = 'Trace.log'; }
            var separator = ' --- ' + title + ' --- ';

            console.log(separator);
            console.log(message);
            console.log(Array(separator.length).join('-'));
        };
        return Trace;
    })();

    
    return Trace;
});
//# sourceMappingURL=Trace.js.map
