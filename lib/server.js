var http = require("http");
var url = require("url");
var router = require("./router.js");

function start() {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        router.route(pathname, response);
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;