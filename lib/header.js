var binary = require('binary'),
    common = require('./common');

var HEADER_KEYS = ['title','subtitle','artist','album','author','copyrights','tabAuthor'];
var NOTICE_REGEXP = /^notice\d/;

function Header( data ) {
  var v =
    binary.parse(data)
          .loop( function( end, vars ) {
            this.skip(1); // first byte isn't intersting

            this.buffer( 'version', 29 );

            end();
          } )
          .skip(5);

  HEADER_KEYS.forEach( function(key) {
    v.loop( common.readString(key) )
     .skip( common.WORD_SIZE);
  });

  v.loop( common.readString( 'instruction' ) );

  var count = common.readInteger(v);

  for(var i = 0; i < count; i++ ) {
    v.loop( common.readString( 'notice' + i ) )
     .skip( common.WORD_SIZE );
  }

  v = v.vars;

  ( HEADER_KEYS.concat( 'instruction' ) ).forEach(function(key) {
    v[key] = v[key].toString();
  } );

  v.notice = Object.keys( v )
                   .filter( function( key ) {
                     return NOTICE_REGEXP.test( key );
                   } )
                   .reduce( function( curr, next ) {
                     var n = curr + v[next] + '\n';
                     delete v[next];
                     return n;
                   }, '' );

  return v;
}

module.exports = Header;