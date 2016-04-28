var config = {
    $meta: 'Configuration for Tic Tac Toe',
    projectName: 'TicTacToe',

    // Connection settings
    connection: {
        host: process.env.HOST,
        port: process.env.PORT
    }
}


module.exports = config;