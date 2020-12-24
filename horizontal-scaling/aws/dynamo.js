const AWS = require('aws-sdk');
const util = require('util');
AWS.config.loadFromPath('./config.json');
let db = new AWS.DynamoDB();
db.createTable({
  TableName: 'purchases',
  AttributeDefinitions : [{
    AttributeName : "Id", AttributeType : "N"
  }, {
    AttributeName : "Date", AttributeType : "N"
  }],
  KeySchema: [{
    AttributeName: 'Id', KeyType: 'HASH'
  }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 2,
    WriteCapacityUnits: 2
  }
}, (err, data) => console.log(util.inspect(data)));

// db.putItem(
//   {
//     TableName: 'purchases',
//     Item: {
//       Id: { N: '123' },
//       Date: { N: '1375314738466' },
//       UserId: { S: 'DD9DDD8892' },
//       Cart: { SS: ['song1', 'song2'] },
//       Action: { S: 'buy' },
//     },
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );
//
// db.putItem(
//   {
//     TableName: 'purchases',
//     Item: {
//       Id: { N: '1232' },
//       Date: { N: '1375314738467' },
//       UserId: { S: 'DD9DDD8892' },
//       Cart: { SS: ['song1', 'song2'] },
//       Action: { S: 'buy' },
//     },
//   },
//   (err, data) => {
//     console.log(data);
//     if (err) {
//       console.error(err);
//     }
//   }
// );

// db.getItem(
//   {
//     TableName: 'purchases',
//     Key: {
//       Id: { N: '1232' },
//     },
//     AttributesToGet: ['Action', 'Cart'],
//   },
//   (err, res) => console.log(err)
// );
