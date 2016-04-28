// All routes
var routes = [
    // heartbeat for load balancer
    {
        method: 'GET',
        path: '/heartbeat',
        handler: function(request, reply) {
            reply();
        }
    }
];

module.exports = routes;