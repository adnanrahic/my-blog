var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var request = require("request");

// api 
var db = require('./db');
var StoryController = require('./api/story/StoryController');
app.use('/api/stories', StoryController);
app.get('/api/', function (req, res) {
  res.status(200).send('f*** me sideways');
});

// serve static files
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