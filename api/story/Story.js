var mongoose = require('mongoose');  
var StorySchema = new mongoose.Schema({  
  title: String,
  urlCode: String,
  subtitle: String,
  body: String,
  img: String,
  createdAt: String
});
mongoose.model('Story', StorySchema);

module.exports = mongoose.model('Story');