var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var User = require('./User');

// CREATES A NEW USER  
router.post('/', function (req, res) {
  User.create({
      email: req.body.email,
      password: req.body.password
    }, 
    function (err, user) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(200).send(user);
    });
});

module.exports = router;