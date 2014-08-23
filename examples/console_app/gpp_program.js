#!/usr/local/bin/node

var args = process.argv.slice(2),
    Parser = require('../../lib/GuitarProParser.js'),
    fs = require('fs');

if (args.length == 0)
    console.log("Usage: gpp_program.js [arguments] \narguments - paths to gp4 files.");

args.map( function(file_path){
    var data = fs.readFileSync(file_path),
        parser = new Parser(data),
        parsed = parser.parse();

    console.log("\n\n");
    console.dir(parsed);
});
