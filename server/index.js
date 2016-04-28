var Hapi = require('hapi');
var routes = require('./routes');
var Config = require('./config');
var server = new Hapi.Server();

server.settings.maxSockets = 300;

//https unauth disable
//HACK ALERT - Setting to allow widget to load - maybe
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

//Ignore cookie parsing errors until setCookie, getCookie properly
//encode and decode cookies in .NET solution
//TODO: Remove when bug if fixed
server.settings.connections.routes.state.failAction = 'ignore';

//Make connection
server.connection(Config.connection);

server.route(routes);

//Only start server if being called directly.
if (!module.parent) {
  server.start(function() {
      console.log('Server started at ' + server.info.uri);
  });
}

module.exports = server;