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
    plugins: [
        commonsPlugin,
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                DEV_BOX: JSON.stringify(process.env.DEV_BOX)
            }
        })
    ],

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.json$/, loader: 'json-loader', exclude: /node_modules/ },
            { test: /\.(html)$/, loader: 'file-loader?name=[name].[ext]', exclude: /node_modules/ }
        ]
    },

    devServer: {
        port: 8887,
        publicPath: '/',
        host: 'localhost',
        stats: 'minimal'
    }
};

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}

console.log('node_env: ' + process.env.NODE_ENV); //eslint-disable-line

module.exports = config;