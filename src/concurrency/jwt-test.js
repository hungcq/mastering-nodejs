const jwt = require('jwt-simple');
const express = require('express');

const app = express();

app.set('jwtSecret', 'shhhhhhhhh');

app.post('/login',
    // auth,
    function (req, res) {
  let nowSeconds = Math.floor(Date.now() / 1000);
  let plus7Days = nowSeconds + 60 * 60 * 24 * 7;
  let token = jwt.encode(
    {
      iss: 'http://blogengine.com',
      aud: ['http://blogsearch.com', 'http://blogstorage'],
      sub: 'blogengine:uniqueuserid',
      iat: nowSeconds,
      exp: plus7Days,
      sessionData:
        // encrypt(
        JSON.stringify({
          department: 'sales',
        }),
      // ),
    },
    app.get('jwtSecret')
  );
  res.send({
    token: token,
  });
});

app.post('/tokendata', function (req, res) {
  let token = req.get('Authorization').replace('Bearer ', '');
  let decoded = jwt.decode(token, app.get('jwtSecret'));
  decoded.sessionData = JSON.parse(
    // decrypt(
    decoded.sessionData
    // )
  );
  let now = Math.floor(Date.now() / 1000);
  if (now > decoded.exp) {
    return res.end(
      JSON.stringify({
        error: 'Token expired',
      })
    );
  }
  res.send(decoded);
});

app.listen(8080);
