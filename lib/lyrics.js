var binary = require('binary'),
    common = require('./common');

function Lyrics( v ) {

    v.word32ls('trackNumber');
    var track = v.vars.trackNumber;
    delete v.vars.trackNumber;

    var lyr = Array.apply(null, Array(5)).map(parseLyricsLine(v)).join('\n');

    cleanup(v);
    
    return { data: {
        trackNumber: track,
        lyrics: lyr
    }
  };
}

function parseLyricsLine(v){
  return function ()
  {
    v.word32ls('int');
    v.buffer('line', v.vars.int);
    v.skip(common.WORD_SIZE);
    return v.vars.line.toString();
  }
}

function cleanup(v) {
  delete v.vars.line;
  delete v.vars.int;
}

module.exports = Lyrics;
