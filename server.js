/* eslint-disable no-console */
var http = require('http');
var ecstatic = require('ecstatic');

http.createServer(
  ecstatic({ root: process.cwd() + '/wrapper' })
).listen(8888);

console.log('Site at http://localhost:8888/index.html');