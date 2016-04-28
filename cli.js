#!/usr/bin/env node

var program = require('commander');

var spawn = require('child_process').spawn;

var nodemon = process.platform === 'win32' ? 'nodemon.cmd' : 'nodemon';
var npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
var webpackDevServer = process.platform === 'win32' ? 'webpack-dev-server.cmd' : 'webpack-dev-server';

program
    .command('start')
    .action(() => {        
        spawn(webpackDevServer, ['--hot', '--inline', '--no-info'],
            { stdio: 'inherit', env: Object.assign(process.env, { HOST: 'localhost', PORT: 8887 }) });

        spawn(nodemon, ['server/index.js'],
            { stdio: 'inherit', env: Object.assign(process.env, { HOST: 'localhost', PORT: 8888 }) });
    });

program.parse(process.argv);
