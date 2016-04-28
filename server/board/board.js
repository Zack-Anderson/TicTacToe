var cache = require('memory-cache');
var ReadWriteLock = require('rwlock');
var lock = new ReadWriteLock();
function guid() {
	function s4() {
	  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var board = {
	LOCK_NAME: "gameBoard",
	
	_create: function _create() {
		return {
			game_identifier: guid(),
			player_turn: Math.floor(Math.random() * 2),
			player_identifier: [null, null],
			board: [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
		};
	},

	_update: function _update(board) {
		cache.put(board.game_identifier, board);
	},

	_get: function _get(game_identifier) {
		return cache.get(game_identifier);
	},
	
	_returnBoard: function _returnBoard(board) {
		if (board == null) {
			return null;
		}
		
		var winner = this._hasWon(board);
		if (winner === -1) {
			return { 
				game_identifier: board.game_identifier, 
				player_turn: board.player_turn,
				board: board.board
			};
		} else {
			return { 
				game_identifier: board.game_identifier, 
				winner: winner,
				board: board.board
			};
		}
	},
	
	_hasWon: function _hasWon(board) {
		if (board.board[0][0] !== -1
				&& (
					((board.board[0][0] === board.board[0][1]) && (board.board[0][0] === board.board[0][2]))
						|| ((board.board[0][0] === board.board[1][0]) && (board.board[0][0] === board.board[2][0]))
				)
			) {
			return board.board[0][0]
		} else if (board.board[1][1] !== -1
				&& (
						((board.board[1][1] === board.board[0][1]) && (board.board[1][1] === board.board[2][1]))
							|| ((board.board[1][1] === board.board[1][0]) && (board.board[1][1] === board.board[1][2]))
							|| ((board.board[1][1] === board.board[0][0]) && (board.board[1][1] === board.board[2][2]))
							|| ((board.board[1][1] === board.board[0][2]) && (board.board[1][1] === board.board[2][0]))
					)
				) {
			return board.board[1][1]
		} else if (board.board[2][2] !== -1
				&& (
						((board.board[2][2] === board.board[0][2]) && (board.board[2][2] === board.board[1][2]))
							|| ((board.board[2][2] === board.board[2][0]) && (board.board[2][2] === board.board[2][1]))
					)
				) {
			return board.board[2][2]
		}
		return -1;
	},
	
	_addPlayer: function _addPlayer(board) {
		var player = null;
		if (board != null) {
			for (var i = 0; i < board.player_identifier.length; i++) {
				if (board.player_identifier[i] == null) {
					var player_identifier = guid();
					board.player_identifier[i] = player_identifier;
					this._update(board);
					return player = {
						game_identifier: board.game_identifier,
						player_identifier: player_identifier,
						player_order: i
					}
				}
			}
		}
		return null;
	},
	
	create: function create(callback) {
		var board = this._create();
		this._update(board);
		callback(this._returnBoard(board));
	},
	
	get: function get(game_identifier, callback) {
		if (game_identifier != null) {
			lock.readLock(this.LOCK_NAME + game_identifier, function(release) {
				var board = this._get(game_identifier);
				
				release();
				callback(this._returnBoard(board));
			}.bind(this));
		} else {
			this.create(callback);
		};
	},
	
	player: function player(game_identifier, callback) {
		if (game_identifier != null) {
			lock.writeLock(this.LOCK_NAME + game_identifier, function(release) {
				var board = this._get(game_identifier);
				var player = this._addPlayer(board);
				
				release();
				callback(player);
			}.bind(this));
		} else {
			var board = this._create();
			var player = this._addPlayer(board);
			
			callback(player);
		}
	},
	
	set: function set(game_identifier, player_identifier, x, y, callback) {
		lock.writeLock(this.LOCK_NAME + game_identifier, function(release) {
			var board = this._get(game_identifier);
			if (board == null) { 
				release();
				callback(null);
			} else {
				var position = null;
				for (var i = 0; i < board.player_identifier.length; i++) {
					if (board.player_identifier[i] === player_identifier) {
						position = i;
						break;
					}
				}
				
				if (board.player_turn !== position
						|| board.board[x][y] !== -1
						|| this._hasWon(board) !== -1) {
					release();
					callback(this._returnBoard(board));
				} else {
					board.board[x][y] = position;
					board.player_turn = (position + 1) % board.player_identifier.length
					this._update(board);
					release();
					callback(this._returnBoard(board));
				}
			}
		}.bind(this));
	}
}

module.exports = board;