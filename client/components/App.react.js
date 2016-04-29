var React = require('react/addons');
var Container = require('flux/utils').Container;

var ReactPropTypes = React.PropTypes;

//Stores
var BoardStore = require('../stores/BoardStore'); 

var AppUI = React.createClass({
    propTypes: {
        board: ReactPropTypes.array
    },

    render: function() {
        return (
            <div>
		{this.props.board[0][0]}
            </div>
        );
    }
});

class AppContainer extends React.Component {
    static getStores() {
        return [BoardStore];
    }

    static calculateState() {
        return {
            board: BoardStore.get().board
        };
    }

    render() {
        return (
            <AppUI 
                board={this.state.board}
            />
        );
    }
}

module.exports = Container.create(AppContainer);
