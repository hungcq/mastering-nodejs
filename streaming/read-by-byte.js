const stream = require('stream');

let Feed = function(channel) {
  let readable = new stream.Readable({});
  let news = 'A long headline might go here';
  readable._read = () => {
    readable.push(news);
    readable.push(null);
  };
  return readable;
};

const feed = new Feed();
feed.on('readable', () => {
  let character;
  while(character = feed.read(1)) {
    console.log(character.toString());
  }
});
// A
//
// l
// o
// n
// ...