const https = require('https');
const fs = require('fs');
https.createServer({
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
}, (req, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.write("PONG");
  response.end();
}).listen(443);