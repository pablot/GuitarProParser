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
