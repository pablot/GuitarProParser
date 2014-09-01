var Header = require('./header'),
    Lyrics = require('./lyrics'),
    TechInfo = require('./techInfo'),
    binary = require('binary');

var parse = function parser( data ) {
  return function() {
    var v = binary.parse(data);
    var header = Header( v );
    var lyrics = Lyrics( v );
    var techInfo = TechInfo ( v );

    return v.vars;
  };
};

function GuitarProParser( data ) {
  return {
    parse: parse( data ),
  };
}

module.exports = GuitarProParser;
