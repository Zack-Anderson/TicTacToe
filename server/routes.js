var board = require('./board/board');

// All routes
var routes = [
    // heartbeat for load balancer
    {
        method: 'GET',
        path: '/heartbeat',
        handler: function(request, response) {
        	response();
        }
    },
    {
    	method: 'GET',
    	path: '/board',
    	handler: function(request, response) {
    		board.get(request.query.game_identifier, function(json) {
    			response(json).type('application/json');
    		});
        }
    },
    {
    	method: 'GET',
    	path: '/player',
    	handler: function(request, response) {
    		board.player(request.query.game_identifier, function(json) {
    			response(json).type('application/json');
    		});
        }
    },
    {
    	method: 'POST',
    	path: '/set',
    	handler: function(request, response) {
    		board.set(request.query.game_identifier, request.payload.player_identifier, request.payload.x, request.payload.y, function(json) {
    			response(json).type('application/json');
    		});
        }
    }
];

module.exports = routes;