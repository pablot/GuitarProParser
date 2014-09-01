var binary = require('binary'),
    common = require('./common');

function Lyrics( v ) {

    v.word32ls('lyrics.trackNumber');

    var lyr = Array.apply(null, Array(5)).map(parseLyricsLine(v)).join('\n');
    v.vars.lyrics.lyric = lyr;
}

function parseLyricsLine(v){
  return function (el, i)
  {
    v.word32ls('int');
    v.buffer('lyrics.lyric', v.vars.int);
    if( i < 4 ) v.skip(common.WORD_SIZE);
    delete v.vars.int;
    return v.vars.lyrics.lyric.toString();
  }
}

module.exports = Lyrics;
