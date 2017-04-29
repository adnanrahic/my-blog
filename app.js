var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var request = require("request");

/**
 * API
 */ 
var db = require('./db');
var AuthController = require('./api/auth/AuthController');
var StoryController = require('./api/story/StoryController');
var UserController = require('./api/user/UserController');
app.use('/api/auth', AuthController);
app.use('/api/stories', StoryController);
app.use('/api/users', UserController);

/**
 * STATIC FILES
 */
app.use(favicon(__dirname + '/app/favicon.ico'));
if (process.env.PROD) {
  app.use('/', express.static('dist'));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
  });
}
else {
  app.use('/', express.static('app'));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
  });
}

module.exports = app;