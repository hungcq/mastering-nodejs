let tweetFile = "tweets.txt";

const fs = require("fs");
const Twit = require('twit');

let twit = new Twit({
  consumer_key: 'your key',
  consumer_secret: 'your secret',
  access_token: 'your token',
  access_token_secret: 'your secret token'
});

let writeStream = fs.createWriteStream(tweetFile, {
  flags: "a" // indicate that we want to (a)ppend to the file
});

let cleanBuffer = function(len) {
  let buf = Buffer.alloc(len);
  buf.fill('\0');
  return buf;
};

let check = function() {
  twit.get('search/tweets', {
    q: '#nodejs since:2013-01-01'
  }, (err, reply) => {
    let buffer = cleanBuffer(reply.statuses.length * 140);
    reply.statuses.forEach((obj, idx) => {
      buffer.write(obj.text, idx*140, 140);
    });
    writeStream.write(buffer);
  })
  setTimeout(check, 10000);
};
check();