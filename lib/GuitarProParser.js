var Header = require('./header');
var Lyrics = require('./lyrics');

var parse = function parser( data ) {
  return function() {
    var header = Header( data );
    var lyrics = Lyrics( header.binaryParser );

    return {
      header: header.data,
      lyrics: lyrics.data,
    };
  };
};

function GuitarProParser( data ) {

  return {
    parse: parse( data ),
  };
}

module.exports = GuitarProParser;
