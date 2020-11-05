const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const formidable = require('formidable');

http
  .createServer((request, response) => {
    let rm = request.method.toLowerCase();
    if (rm === 'post') {
      let form = new formidable.IncomingForm();
      form.uploadDir = process.cwd();
      form
        .on('file', (field, file) => {
          // process files
        })
        .on('field', (field, value) => {
          // process POSTED field data
        })
        .on('end', () => {
          response.end('Received');
        })
        .parse(request);
      return;
    }
    // Only GET is handled if not POST
    if (rm !== 'get') {
      return response.end('Unsupported Method');
    }
    let filename = path.join(__dirname, request.url);
    fs.stat(filename, (err, stat) => {
      if (err) {
        response.statusCode = err.errno === 34 ? 404 : 500;
        return response.end();
      }
      var etag = crypto
        .createHash('md5')
        .update(stat.size + stat.mtime)
        .digest('hex');
      response.setHeader('Last-Modified', stat.mtime);
      if (request.headers['if-none-match'] === etag) {
        response.statusCode = 304;
        return response.end();
      }
      response.setHeader('Content-Length', stat.size);
      response.setHeader('ETag', etag);
      response.statusCode = 200;
      fs.createReadStream(filename).pipe(response);
    });
  })
  .listen(8000);
