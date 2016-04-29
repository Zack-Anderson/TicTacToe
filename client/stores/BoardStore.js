var Store = require('flux/utils').Store;

var ActionTypes = require('../constants/ActionTypes');
var constants = require('../constants/constants');

class BoardStore extends Store {

    constructor(dispatcher) {
        super(dispatcher);
        var board = [[0,0,0],[0,0,0],[0,0,0]];
        board[0][0] = constants.player.X;
        this._state = {
            board: board
        };
    }

    get() {
        return this._state;
    }

    __onDispatch(action) {
        switch (action.type) {
            case ActionTypes.actionTypes.SET_BOARD:
		this._state.board = action.payload;
                break;
        }
    }

}

module.exports = new BoardStore(require('../Dispatcher'));
