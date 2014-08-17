var Header = require('./header');

function GuitarProParser( data ) {

  return {
    parse: function () {
      return {
        header: Header( data )
      };
    },
  };
}

module.exports = GuitarProParser;
