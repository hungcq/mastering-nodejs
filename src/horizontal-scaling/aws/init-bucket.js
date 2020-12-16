const AWS = require('aws-sdk');
const bucketName = 'images-1918';
AWS.config.loadFromPath('./config.json');
const S3 = new AWS.S3();
// S3.createBucket(
//   {
//     Bucket: bucketName,
//   },
//   (err, data) => {
//     if (err) {
//       throw err;
//     }
//     console.log(data);
//   }
// );

S3.listBuckets((err, data) => {
  console.log(data.Buckets);
});