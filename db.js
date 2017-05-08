var mongoose = require('mongoose');
var envDev = require('./.env/dev');
var username = process.env.USERNAME || envDev.USERNAME;
var password = process.env.PASSWORD || envDev.PASSWORD;
mongoose.connect('mongodb://'+ username +':'+ password +'@ds135830.mlab.com:35830/myblog');