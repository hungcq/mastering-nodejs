const fs = require('fs');

fs.stat("attribute.js", (err, stats) => {
  console.log(stats);
});