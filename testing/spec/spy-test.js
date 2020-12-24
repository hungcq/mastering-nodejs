const sinon = require('sinon');
let argA = "foo";
let argB = "bar";
let callback = sinon.spy();
callback(argA);
callback(argB);
console.log(
  callback.called,
  callback.callCount,
  callback.calledWith(argA),
  callback.calledWith(argB),
  callback.calledWith('baz')
);

const redis = require("redis");
const client1 = redis.createClient('//120.138.65.103:8501');
const client2 = redis.createClient('//120.138.65.103:8501');
// Testing this
function nowPublish(channel, msg) {
  client2.publish(channel, msg);
}

describe('Testing pub/sub', function() {
  before(function() {
    sinon.spy(client1, "subscribe");
  });
  after(function() {
    client1.subscribe.restore();
  });
  // it('tests that #subscribe works', () => {
  //   client1.subscribe("channel");
  //   expect(client1.subscribe.calledOnce);
  // });
  it('tests that #nowPublish works', done => {
    let callback = sinon.spy();
    client1.subscribe('channel', callback);
    client1.on('subscribe', () => {
      nowPublish('channel', 'message');
      expect(callback.calledWith('message'));
      expect(client1.subscribe.calledTwice);
      done();
    });
  });
});