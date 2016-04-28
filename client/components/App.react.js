var React = require('react/addons');
var Container = require('flux/utils').Container;

var AppUI = React.createClass({
    propTypes: {
    },

    render: function() {
        return (
            <div>
		hello component.
            </div>
        );
    }
});

class AppContainer extends React.Component {
    static getStores() {
        return [];
    }

    static calculateState() {
        return {
        };
    }

    render() {
        return (
            <AppUI />
        );
    }
}

module.exports = Container.create(AppContainer);
