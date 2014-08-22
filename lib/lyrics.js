var binary = require('binary'),
    common = require('./common');

function Lyrics( v ) {

  v.word32ls( 'trackNumber' );

  return { data: {
      trackNumber: v.vars.trackNumber,
      
    }
  };
}

module.exports = Lyrics;
