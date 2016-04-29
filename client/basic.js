var React = require('react/addons');
var routes = require('./routes/app');

const _appRoot = document.querySelector('[data-component=app]');
React.render(routes, _appRoot);
