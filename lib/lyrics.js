var binary = require('binary'),
    common = require('./common');

function Lyrics( v ) {

    v.word32ls('trackNumber');
    var track = v.vars.trackNumber;
    delete v.vars.trackNumber;

    var lyr = '';
    for (i=0; i<5; i++){
      v.word32ls('int');
      var count = v.vars.int;
      v.buffer('line1', count);
      lyr+=v.vars.line1.toString() + '\n';
      delete v.vars.line1;
      delete v.vars.int;
      v.skip(4);
    };

    return { data: {
        trackNumber: track,
        lyrics: lyr
    }
  };
}

module.exports = Lyrics;
