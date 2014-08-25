var binary = require('binary'),
    common = require('./common');

function Lyrics( v ) {

    v.word32ls('trackNumber');

    var lyrics = '';
    for (i = 0; i <= 4; i++) {
        v.word32ls('int');
        var count = v.vars.int;
        console.log(count);
        if (count <= 1835)
            v.loop(
                function(end, vars) {
                    this.buffer('line', count);
                    lyrics += v.vars.line;
                    end();
                    delete vars.int;
                    delete vars.line;
                });
    }
    return { data: {
      trackNumber: v.vars.trackNumber,
      lyrics: lyrics
    }
  };
}

module.exports = Lyrics;
