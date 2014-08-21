var server = require("./server.js");
var open = require("open");

server.start();

open("http://localhost:8888/start");