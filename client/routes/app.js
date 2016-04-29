var React = require('react/addons');
var Router = require('react-router').Router;
var Route = require('react-router').Route;

// Components
var App = require('../components/App.react');

var routes = (
    <Router>
        <Route name="app" path="/" component={App}>
        </Route>
    </Router>
);

module.exports = routes;
