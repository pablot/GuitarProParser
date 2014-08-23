#!/usr/local/bin/node

var argv = require("optimist")
    .usage('Retreive information from gp4 file.\nUsage: $0 -f filename.gp4')
    .demand("f")
    .argv,
Parser = require('../lib/GuitarProParser.js'),
fs = require('fs');
 
var data = fs.readFileSync(argv.f),
    parser = new Parser(data),
    parsed = parser.parse();

console.dir(parsed.header);