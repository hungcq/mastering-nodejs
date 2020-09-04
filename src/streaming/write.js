const stream = require('stream');
let writable1 = new stream.Writable({
  highWaterMark: 16000,
  decodeStrings: true
});

let writable = new stream.Writable({
  decodeStrings: false
});
writable._write = (chunk, encoding, callback) => {
  console.log(chunk.toString());
  callback();
};

let written = writable.write(Buffer.alloc(32, 'A'));
writable.end();
console.log(written);
// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// true