var binary = require('binary'),
    common = require('./common');

function Lyrics( v ) {

    v.word32ls('trackNumber');
    var track = v.vars.trackNumber;
    delete v.vars.trackNumber;

    var lyr = [parseLyricsLine(v), parseLyricsLine(v), parseLyricsLine(v), parseLyricsLine(v), parseLyricsLine(v)].join('\n').toString();

    return { data: {
        trackNumber: track,
        lyrics: lyr
    }
  };
}

function parseLyricsLine(v){
  delete v.vars.line;
  delete v.vars.int;
  v.word32ls('int');
  v.buffer('line', v.vars.int);
  v.skip(common.WORD_SIZE);
  return v.vars.line.toString();
}

module.exports = Lyrics;
