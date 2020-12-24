const sinon = require('sinon');
let Capitalizer = require('../scripts/Capitalizer.js');
let capitalizer = new Capitalizer();
let arr = ['a','b','c','d','e'];
let mock = sinon.mock(capitalizer);
// Expectations
mock.expects("capitalize").exactly(5).withArgs.apply(sinon, arr);
// Reality
arr.map(capitalizer.capitalize);
// Verification
console.log("mock result: " + mock.verify());
// true

const redis = require("redis");
const client = redis.createClient('//120.138.65.103:8501');
describe('Mocking pub/sub', function() {
  let mock = sinon.mock(client);
  mock.expects('subscribe').withExactArgs('channel').once();
  it('tests that #subscribe is being called correctly', function() {
    client.subscribe('channel');
    expect(mock.verify()).to.be.true;
  });
});