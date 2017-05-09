var mongoose = require('mongoose');
var env;
if (process.env.ENV === 'dev') {
  env = require('./.env/dev');
} else if (process.env.ENV === 'prod') {
  env = require('./.env/prod');
}
var username = process.env.USERNAME || env.USERNAME;
var password = process.env.PASSWORD || env.PASSWORD;
mongoose.connect('mongodb://'+ username +':'+ password +'@ds135830.mlab.com:35830/myblog');