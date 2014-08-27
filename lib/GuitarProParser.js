var Header = require('./header');
var Lyrics = require('./lyrics');
var TechInfo = require('./techInfo');

var parse = function parser( data ) {
  return function() {
    var header = Header( data );
    var lyrics = Lyrics( header.binaryParser );
    var techInfo = TechInfo ( header.binaryParser );

    return {
      header: header.data,
      lyrics: lyrics.data,
      techInfo: techInfo.data
    };
  };
};

function GuitarProParser( data ) {

  return {
    parse: parse( data ),
  };
}

module.exports = GuitarProParser;
