var proxy = require('redbird')({
  port: 80, // http port is needed for LetsEncrypt challenge during request / renewal. Also enables automatic http->https redirection for registered https routes.
  letsencrypt: {
    path: __dirname + '/certs',
    port: 9999 // LetsEncrypt minimal web server port for handling challenges. Routed 80->9999, no need to open 9999 in firewall. Default 3000 if not defined.
  },
  ssl: {
    http2: true,
    port: 443, // SSL port used to serve registered https routes with LetsEncrypt certificate.
  }
});

proxy.register('example.com', 'http://54.254.230.115:8452', {
  ssl: {
    letsencrypt: {
      email: 'hungcq1996@gmail.com', // Domain owner/admin email
      // path: './'
      // production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
    },
  },
});
