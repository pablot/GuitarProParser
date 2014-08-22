var Parser = require('../lib/GuitarProParser.js'),
    fs = require('fs'),
    expect = require('expect.js');

describe('Parser', function () {

  it('Should exists', function () {
    expect( Parser ).to.be.a( Function );
  });

});

describe('Parsing', function() {
  var parser,
      parsed;

  beforeEach( function() {
    var data = fs.readFileSync( __dirname + '/files/test.gp4' );
    parser = new Parser(data);
    parsed = parser.parse();
  } );

  describe('Header', function() {

    it('Should parse file version', function() {
      expect( parsed.header.version ).to.match( /FICHIER GUITAR PRO v4./ );
    } );

    it('Should parse title', function() {
      expect( parsed.header.title ).to.be( 'Title' );
    } );

    it('Should parse subtitle', function() {
      expect( parsed.header.subtitle ).to.be( 'Subtitle' );
    } );

    it('Should parse artist', function() {
      expect( parsed.header.artist ).to.be( 'Artist' );
    } );

    it('Should parse album', function() {
      expect( parsed.header.album ).to.be( 'Album' );
    } );

    it('Should parse author', function() {
      expect( parsed.header.author ).to.be( 'Author' );
    } );

    it('Should parse copyrights', function() {
      expect( parsed.header.copyrights ).to.be( 'Copyright' );
    } );

    it('Should parse tab author', function() {
      expect( parsed.header.tabAuthor ).to.be( 'Tab' );
    } );

    it('Should parse instruction', function() {
      expect( parsed.header.instruction ).to.be( 'Instruction' );
    } );

    it('Should parse notice', function() {
      expect( parsed.header.notice ).to.be( 'N line 1\nN line 2\nN line 3\nN line 4\n' );
    } );

    it('Should parse triplet feel', function() {
      expect( parsed.header.tripletFeel ).to.be( false );
    } );

  } );

  describe('Lyrics', function() {

    it('Should parse lyrics', function() {
      expect( parsed.lyrics ).to.be.ok();
    } );

  } );
} );
