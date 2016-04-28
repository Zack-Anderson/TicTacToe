/* eslint-disable no-console */
var http = require('http');
var ecstatic = require('ecstatic');

http.createServer(
  ecstatic({ root: __dirname + '/public' })
).listen(8888);

console.log('Site at http://localhost:8888/index.html');