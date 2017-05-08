var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get config file
var User = require('../user/User');

router.post('/', function(req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    if (user.password != req.body.password) return res.status(401).send({ auth: false, token: null });

    // if user is found and password is right
    // create a token
    var token = jwt.sign(user, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({
      auth: true,
      token: token
    });
  });

});

module.exports = router;