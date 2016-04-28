var webpack = require('webpack');
var Path = require('path');

var commonsPlugin =
    new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: './js/common.js', minChunks: 4 });

var config = {
    entry: {
        app: './client/basic.js',
        
        'index.html': './client/index.html'
    },

    output: {
        filename: './js/[name].js',
        chunkFilename: './js/[id].chunk.js',
        path: './build',
        publicPath: '/'
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.json$/, loader: 'json-loader', exclude: /node_modules/ },
            { test: /\.(html)$/, loader: 'file-loader?name=[name].[ext]', exclude: /node_modules/ }
        ]
    },

    devServer: {
        port: process.env.PORT,
        publicPath: '/',
        host: process.env.HOST,
        stats: 'minimal'
    }
};

module.exports = config;