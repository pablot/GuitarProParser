var binary = require('binary'),
    common = require('./common');

function TechInfo( v ) {

    v.word32ls('tempo');
    v.buffer( 'key', 1 );
    v.buffer( 'octave', 1);

    return { data: {
        tempo: v.vars.tempo,
        key: v.vars.key.readInt8(0),
        octave: v.vars.octave.readInt8(0),
    }
  };
}

module.exports = TechInfo;
