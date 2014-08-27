var binary = require('binary'),
    common = require('./common');

var HEADER_KEYS = ['artist','album','author','copyrights','tabAuthor'];
var NOTICE_REGEXP = /^notice\d/;

function Header( data ) {
  var v =
    binary.parse(data)
          .loop( function( end, vars ) {
            this.skip(1); // first byte isn't intersting

            this.buffer( 'version', 24 );
            this.skip(10);
            end();
          } );

  v.loop(common.readString('title'))
    .skip(common.WORD_SIZE);

  v.loop(common.skipString()).skip(common.WORD_SIZE);


  HEADER_KEYS.forEach( function(key) {
    v.loop( common.readString(key) )
     .skip( common.WORD_SIZE);
  });

  v.loop(common.skipString());

  var count = common.readInteger(v);

  for(var i = 0; i < count; i++ ) {
    v.loop( common.readString( 'notice' + i ) )
     .skip( common.WORD_SIZE );
  }

  v.buffer( 'tripletFeel', 1 );

  var vars = v.vars;
  var offset = vars.tripletFeel.offset;

  var keys = Object.keys(vars);
  keys.forEach(function(key) {
    vars[key] = vars[key].toString();
  } );

  vars.notice = keys.filter( function( key ) {
                      return NOTICE_REGEXP.test( key );
                    } )
                    .reduce( function( curr, next ) {
                      var n = curr + vars[next] + '\n';
                      delete vars[next];
                      return n;
                    }, '' );

  vars.tripletFeel = vars.tripletFeel !== '\u0000';

  //delete unused property in v 4.00
  delete vars.subtitle;

  return { data: vars, binaryParser: v };
}

module.exports = Header;
