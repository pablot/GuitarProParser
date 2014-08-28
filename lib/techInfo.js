var binary = require('binary'),
    common = require('./common');

function TechInfo( v ) {

    v.word32ls('tempo');
    var tempo = v.vars.tempo;
    v.word8ls('key');
    var key = common.getMusicKey(v.vars.key);
    v.word8ls('octave');
    var octave = Math.floor(v.vars.octave / 8);

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
