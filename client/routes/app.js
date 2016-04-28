var React = require('react/addons');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var appHistory = require('./appHistory');

// Components
var App = require('../components/App.react');

var routes = (
    <Router history={appHistory}>
        <Route name="app" path="/" component={App}>
        </Route>
    </Router>
);

module.exports = routes;
