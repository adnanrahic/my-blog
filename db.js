var mongoose = require('mongoose');
var username = process.env.USERNAME || 'sita';
var password = process.env.PASSWORD || 'kmetboy';
// mongoose.connect('mongodb://'+ username +':'+ password +'@ds135830.mlab.com:35830/myblog');
mongoose.connect('mongodb://admin:supersecret@ds135830.mlab.com:35830/myblog');