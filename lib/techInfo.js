var binary = require('binary'),
    common = require('./common');

function TechInfo( v ) {

    v.word32ls('tempo');
    var tempo = v.vars.tempo;
    v.word8ls('key');
    var key = common.getMusicKey(v.vars.key);
    v.word8ls('octave');
    var octave = Math.floor(v.vars.octave / 8);
    var midiChannelsArray = Array.apply(null, Array(64)).map(parseChannel(v));
    v.word32ls('measures');
    var measures = v.vars.measures;
    v.word32ls('trackNum');
    var trackNum = v.vars.trackNum;

    cleanup(v);

    return { data: {
        tempo: tempo,
        key: key,
        octave: octave,
        midiChannels: midiChannelsArray,
        measures: measures,
        trackCount: trackNum
    }
  };
}

function parseChannel(v) {
  return function() {
    v.word32ls('instrument');
    v.word8ls('volume');
    v.word8ls('balance');
    v.word8ls('chorus');
    v.word8ls('reverb');
    v.word8ls('phaser');
    v.word8ls('tremolo');
    v.word8ls('blank1');
    v.word8ls('blank2');

    return {
      data: {
        instrument: v.vars.instrument,
        volume: v.vars.volume,
        balance: v.vars.balance,
        chorus: v.vars.chorus,
        reverb: v.vars.reverb,
        phaser: v.vars.phaser,
        tremolo: v.vars.tremolo,
        blank1: v.vars.blank1,
        blank2: v.vars.blank2
      }
    }
  };
}

function cleanup(v) {
  delete v.vars.key;
  delete v.vars.octave;
  delete v.vars.tempo;
  delete v.vars.instrument,
  delete v.vars.volume,
  delete v.vars.balance,
  delete v.vars.chorus,
  delete v.vars.reverb,
  delete v.vars.phaser,
  delete v.vars.tremolo,
  delete v.vars.blank1,
  delete v.vars.blank2,
  delete v.vars.measures,
  delete v.vars.trackNum
}
module.exports = TechInfo;
