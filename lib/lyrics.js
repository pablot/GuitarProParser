var binary = require('binary'),
    common = require('./common');

function Lyrics( v ) {

    v.word32ls('trackNumber');

    v.word32ls('int');
    var count = v.vars.int;
    var lyr = '';
    v.loop(
        function(end, vars) {
            this.buffer('lyrics', count);
            lyr = vars.lyrics.toString();
            end();
            delete vars.int;
            delete vars.lyrics;
        });

    return { data: {
        trackNumber: v.vars.trackNumber,
        lyrics: lyr
    }
  };
}

module.exports = Lyrics;
