var Parser = require('../lib/GuitarProParser.js'),
    expect = require('expect.js');

describe('Parser', function () {

  it('Should exists', function () {
    expect( Parser ).to.be.a(Function);
  });

});
