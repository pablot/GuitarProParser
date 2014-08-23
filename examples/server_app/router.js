function route(pathname, response) {
    if (pathname == "/start") {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("This can start our app...");
        response.end();
    }

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Go to /start to see something!");
    response.end();
}

exports.route = route;