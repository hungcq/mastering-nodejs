// const Nightmare = require('nightmare');
//
// Nightmare.action('getLinkText', function (selector, done) {
//   // `this` is the nightmare instance
//   this.evaluate_now(
//     selector => {
//       return document.querySelector(selector).href;
//     },
//     done,
//     selector
//   );
// });
//
// describe(`Nightmare`, function () {
//   this.timeout(30000);
//   let nightmare;
//   beforeEach(
//     () =>
//       (nightmare = Nightmare({
//         show: true,
//       }))
//   );
//   afterEach(function (done) {
//     nightmare.end(done);
//   });
//   it(`Title should be 'Example Domain'`, function (done) {
//     nightmare
//       .goto('http://example.org')
//       .title()
//       .then(title => expect(title).to.equal(`Example Domain`))
//       .then(() => done())
//       .catch(done);
//   });
//   it('Yahoo search should find Nightmare homepage', done => {
//     nightmare
//       .goto('http://www.yahoo.com')
//       .type('form[action*="/search"] [name=p]', 'nightmare.js')
//       .click('form[action*="/search"] [type=submit]')
//       .wait('#main')
//       // .evaluate(() => document.querySelector('#main .searchCenterMiddle a').href)
//       .getLinkText('#main .searchCenterMiddle a') // Call action
//       .then(result => expect(result).to.equal(`https://github.com/segmentio/nightmare`))
//       .then(() => done())
//       .catch(done);
//   });
// });