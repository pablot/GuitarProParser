var binary = require('binary'),
    common = require('./common');

function Lyrics( v ) {

    v.word32ls('trackNumber');
    var track = v.vars.trackNumber;
    delete v.vars.trackNumber;

    var lyr = '';
    for (i=0; i<5; i++){
      lyr+=parseLyricsLine(v, lyr);
    };

    return { data: {
        trackNumber: track,
        lyrics: lyr
    }
  };
}

function parseLyricsLine(v, lyr){
  delete v.vars.line;
  delete v.vars.int;
  v.word32ls('int');
  v.buffer('line', v.vars.int);
  v.skip(common.WORD_SIZE);
  return v.vars.line.toString() + '\n';
}

module.exports = Lyrics;
