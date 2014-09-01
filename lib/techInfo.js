var binary = require('binary'),
    common = require('./common');

function TechInfo( v ) {

    v.word32ls('technicalInfo.tempo');

    v.word8ls('technicalInfo.key');
    var key = common.getMusicKey(v.vars.technicalInfo.key);
    v.vars.technicalInfo.key = key;

    v.word8ls('technicalInfo.octave');
    var octave = Math.floor(v.vars.technicalInfo.octave / 8);
    v.vars.technicalInfo.octave = octave;

    var midiChannelsArray = Array.apply(null, Array(64)).map(parseChannel(v));

    v.vars.technicalInfo.midiChannelsArray = midiChannelsArray;

    cleanParseChannels(v);

    v.word32bs('technicalInfo.measures');

    v.word32bs('technicalInfo.trackNumber');
}


function parseChannel(v) {
  return function() {
    v.word32bs('technicalInfo.instrument');
    v.word8ls('technicalInfo.volume');
    v.word8ls('technicalInfo.balance');
    v.word8ls('technicalInfo.chorus');
    v.word8ls('technicalInfo.reverb');
    v.word8ls('technicalInfo.phaser');
    v.word8ls('technicalInfo.tremolo');
    v.word8ls('technicalInfo.blank1');
    v.word8ls('technicalInfo.blank2');

    return {
      data: {
        instrument: v.vars.technicalInfo.instrument,
        volume: v.vars.technicalInfo.volume,
        balance: v.vars.technicalInfo.balance,
        chorus: v.vars.technicalInfo.chorus,
        reverb: v.vars.technicalInfo.reverb,
        phaser: v.vars.technicalInfo.phaser,
        tremolo: v.vars.technicalInfo.tremolo,
        blank1: v.vars.technicalInfo.blank1,
        blank2: v.vars.technicalInfo.blank2
      }
    };
  };
}

function cleanParseChannels(v) {
  delete v.vars.technicalInfo.instrument;
  delete v.vars.technicalInfo.volume;
  delete v.vars.technicalInfo.balance;
  delete v.vars.technicalInfo.chorus;
  delete v.vars.technicalInfo.reverb;
  delete v.vars.technicalInfo.phaser;
  delete v.vars.technicalInfo.tremolo;
  delete v.vars.technicalInfo.blank1;
  delete v.vars.technicalInfo.blank2;
}

module.exports = TechInfo;
