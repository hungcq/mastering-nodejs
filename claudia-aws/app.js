const ApiBuilder = require("claudia-api-builder");
const api = new ApiBuilder();

module.exports = api;

api.get('/hello', function (request, context, callback) {
  return request;
});