var common = require('./common');

var HEADER_KEYS = ['header.title','header.subtitle','header.artist','header.album','header.author','header.copyrights','header.tabAuthor'];
var NOTICE_REGEXP = /^notice\d/;

function Header( v ) {
  v.loop( function( end, vars ) {
    this.skip(1); // first byte isn't intersting

    this.buffer( 'header.version', 24 );

    // version number + zeroes
    // http://dguitar.sourceforge.net/GP4format.html#Information_About_the_Piece
    this.skip(10);

    end();
  } );

  HEADER_KEYS.forEach( function(key) {
    v.loop( common.readString(key) )
     .skip( common.WORD_SIZE);
  });

  v.loop(common.readString('header.instruction'));

  var count = common.readInteger(v);

  for(var i = 0; i < count; i++ ) {
    v.loop( common.readString( 'header.notice' + (i+1) ) )
     .skip( common.WORD_SIZE );
  }

  v.buffer( 'header.tripletFeel', 1 );

  var keys = Object.keys(v.vars.header);
  keys.forEach(function(key) {
    v.vars.header[key] = v.vars.header[key].toString();
  });

  v.vars.header.tripletFeel = v.vars.header.tripletFeel !== '\u0000';
}

module.exports = Header;
