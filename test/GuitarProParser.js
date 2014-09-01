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

  before( function() {
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

    it('Should parse subtitle', function(){
      expect( parsed.header.subtitle).to.be('Subtitle');
    });

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

    it('Should parse information', function () {
      expect( parsed.header.instruction).to.be('Instruction');
    });

    it('Should parse notice', function() {
      expect( parsed.header.notice1 ).to.be( 'N line 1' );
    } );

    it('Should parse notice', function() {
      expect( parsed.header.notice2 ).to.be( 'N line 2' );
    } );

    it('Should parse notice', function() {
      expect( parsed.header.notice3 ).to.be( 'N line 3' );
    } );

    it('Should parse notice', function() {
      expect( parsed.header.notice4 ).to.be( 'N line 4' );
    } );

    it('Should parse triplet feel', function() {
      expect( parsed.header.tripletFeel ).to.be( false );
    } );

  } );

  describe('Lyrics', function() {

    it('Should parse track number that lyrics is bound to', function() {
      expect( parsed.lyrics.trackNumber ).to.be(1);
    } );

    it('Should parse lyrics', function () {
        expect(parsed.lyrics.lyric).to.be( '1111\r\n1111\r\n1111\r\n1111\n2222\r\n2222\r\n2222\r\n2222\n3333\r\n3333\r\n3333\n4444\r\n4444\n5555');
      });
  } );

  describe('TechInfo', function() {
    it('Should parse tempo', function() {
      expect( parsed.technicalInfo.tempo ).to.be(120);
    });

    it('Should parse key', function() {
      expect( parsed.technicalInfo.key ).to.be('G Major');
    });

    it('Should parse octave', function() {
      expect( parsed.technicalInfo.octave ).to.be(0);
    });

    it('Should parse midi channels to array', function() {
      expect( parsed.technicalInfo.midiChannelsArray ).to.be.a( Array );
    });

    it('Should have 64 midi channels', function() {
      expect( parsed.technicalInfo.midiChannelsArray.length ).to.be( 64 );
    });

    it('Should parse measures', function() {
      expect( parsed.technicalInfo.measures ).to.be( 2 );
    });

    it('Should parse number of tracks', function() {
      expect( parsed.technicalInfo.tackNum ).to.be( 1 );
    });
  });
} );
