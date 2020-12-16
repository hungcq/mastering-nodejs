const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
let ses = new AWS.SES();
ses.getSendQuota((err, data) => {
  console.log(err, data);
});
ses.sendEmail({
  Source : "shinichi1918@gmail.com",
  Destination : {
    ToAddresses : [ "hungcq1996@gmail.com" ]
  },
  Message : {
    Subject: { Data : "NodeJS and AWS SES" },
    Body : {
      Text : { Data : "It worked!" }
    }
  }
}, (err, resp) => console.log(err, resp));