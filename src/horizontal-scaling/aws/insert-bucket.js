const AWS = require('aws-sdk');
const fs = require('fs');
const http = require('http');
AWS.config.loadFromPath('./config.json');
const S3 = new AWS.S3({
  params: { Bucket: 'images-1918' },
});
let body = JSON.stringify({ foo: 'bar' });
// let s3Obj = {
//   Key: 'demos/putObject/first.json',
//   Body: body,
//   ServerSideEncryption: "AES256",
//   ContentType: "application/json",
//   ContentLength: body.length,
//   ACL: "private" };
// S3.putObject(s3Obj, (err, data) => {
//   if(err) { throw err; }
//   console.log(data);
// });

// fs.stat("./Avatar.jpg", (err, stat) => {
//   let s3Obj = {
//     Key : 'demos/putObject/Avatar.jpg',
//     Body : fs.createReadStream("./Avatar.jpg"),
//     ContentLength : stat.size,
//     ContentType : "image/jpeg",
//     ACL : "public-read"
//   };
//   S3.putObject(s3Obj, (err, data) => { if(err) { throw err; }
//     console.log(data);
//   });
// });

// let outFile = fs.createWriteStream('./download.jpg');
// S3.getObject({
//   Key : 'demos/putObject/Avatar.jpg'
// }).createReadStream().pipe(outFile);

// S3.getObject({
//   Key: 'demos/putObject/Avatar.jpg',
// })
//   .on('httpData', chunk => outFile.write(chunk))
//   .on('httpDone', () => outFile.end())
//   .send();

// S3.deleteObject(
//   {
//     Bucket: 'images-1918',
//     Key: 'demos/putObject/Avatar.jpg',
//   },
//   (err, data) => {}
// );

// delete multi
// S3.deleteObjects(
//   {
//     Bucket: 'nodejs-book',
//     Delete: {
//       Objects: [
//         {
//           Key: 'demos/putObject/first.json',
//         },
//         {
//           Key: 'demos/putObject/testimage2.jpg',
//         },
//       ],
//     },
//   },
//   (err, data) => {}
// );

http
  .createServer(function (request, response) {
    let requestedFile = request.url.substring(1);
    S3.headObject(
      {
        Key: requestedFile,
      },
      (err, data) => {
        // 404, etc.
        if (err) {
          response.writeHead(err.statusCode);
          return response.end(err.name);
        }
        response.writeHead(200, {
          'Last-Modified': data.LastModified,
          'Content-Length': data.ContentLength,
          'Content-Type': data.ContentType,
          ETag: data.ETag,
        });
        S3.getObject({
          Key: requestedFile,
        })
          .createReadStream()
          .pipe(response);
      }
    );
  })
  .listen(8080);
