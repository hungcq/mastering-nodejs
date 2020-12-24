const stream = require('stream');
let readable = new stream.Readable({
  encoding: "utf8",
  highWaterMark: 16000,
  objectMode: true
});

let Feed = function(channel) {
  let readable = new stream.Readable({});
  let news = [
    "Big Win!",
    "Stocks Down!",
    "Actor Sad!"
  ];
  readable._read = () => {
    if(news.length) {
      return readable.push(news.shift() + "\n");
    }
    readable.push(null);
  };
  return readable;
};

let feed = new Feed();
feed.on("readable", () => {
  let data = feed.read();
  data && process.stdout.write(data);
});
feed.on("end", () => console.log("No more news"));
// Big Win!
// Stocks Down!
// Actor Sad!
// No more news