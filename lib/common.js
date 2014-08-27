module.exports.WORD_SIZE = 4;
module.exports.INTEGER_SIZE = 8;

module.exports.readInteger = function(v) {
  v.buffer('int', module.exports.INTEGER_SIZE);

  var i = v.vars.int.readInt8(0);
  delete v.vars.int;

  return i;
};

module.exports.readString = function(key) {
  return function( end, vars ) {
    this.word8lu('len');
    this.buffer( key, +vars.len );
    end();
    delete vars.len;
  };
};

module.exports.skipString = function() {
  return function (end, vars) {
    this.word8lu('len');
    this.skip(+vars.len );
    end();
    delete vars.len;
 };
};

module.exports.getMusicKey = function(key) {
    switch (key) {
      case 1: return 'G Major';
      case 2: return 'D Major';
      case 3: return 'A Major';
      case 4: return 'E Major';
      case 5: return 'B Major';
      case 6: return 'F# Major';
      case 7: return 'C# Major';
      case -1: return 'F Major';
      case -2: return 'Bb Major';
      case -3: return 'Eb Major';
      case -4: return 'Ab Major';
      case -5: return 'Db Major';
      case -6: return 'Gb Major';
      case -7: return 'Cb Major';
      default: return 'C Major';
    };
};
