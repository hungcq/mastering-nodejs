let Caller = require('../scripts/caller.js');
const sinon = require('sinon');
const Capitalizer = require('../scripts/capitalizer')

describe('Testing endpoint responses', function () {
  let caller = new Caller();

  function setTestForCode(code) {
    return done => {
      sinon.stub(caller, 'makeCall').yields(
        caller.parseResponse({
          statusCode: code,
        })
      );
      caller.makeCall('anyURLWillDo', h => {
        expect(h).to.be.a('string').and.equal('handled');
        done();
      });
    };
  }

  afterEach(() => caller.makeCall.restore());
  it('Tests 200 handling', setTestForCode(200));
  it('Tests 404 handling', setTestForCode(404));
  // it('Tests 403 handling', setTestForCode(403));
});

describe('Testing Capitalization', () => {
  const capitalizer = new Capitalizer();
  it('capitalizes a string', () => {
    let result = capitalizer.capitalize('foobar');
    expect(result).to.be.a('string').and.equal('FOOBAR');
  });
});