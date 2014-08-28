var binary = require('binary'),
    common = require('./common');

function TechInfo( v ) {

    v.word32ls('tempo');
    var tempo = v.vars.tempo;
    v.buffer( 'key', 1 ); 
    var key = common.getMusicKey(v.vars.key.readInt8(0));
    v.buffer( 'octave', 1);
    var octave = Math.floor(v.vars.octave.readInt8(0) / 8);

    delete v.vars.key;
    delete v.vars.octave;
    delete v.vars.tempo;

    return { data: {
        tempo: tempo,
        key: key,
        octave: octave,
    }
  };
}

module.exports = TechInfo;
