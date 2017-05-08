var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var Story = require('./Story');
var policies = require('../policies');

// RETURNS ALL THE STORIES IN THE DATABASE
router.get('/', function (req, res) {
    Story.find({}, function (err, stories) {
        if (err) return res.status(500).send("There was a problem finding the stories.");
        res.status(200).send(stories);
    });
});

// GETS A SINGLE STORY FROM THE DATABASE
router.get('/:id', function (req, res) {
    Story.findById(req.params.id, function (err, story) {
        if (err) return res.status(500).send("There was a problem finding the Story.");
        if (!story) return res.status(404).send("No Story found.");
        res.status(200).send(story);
    });
});

// ROUTES BELOW REQUIRE AUTHENTICATION
router.use(policies);

// CREATES A NEW STORY  
router.post('/', function (req, res) {
    Story.create({
            title: req.body.title,
            urlCode: req.body.urlCode,
            subtitle: req.body.subtitle,
            body: req.body.body,
            img: req.body.img,
            createdAt: req.body.createdAt
        }, 
        function (err, story) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(story);
        });
});

// DELETES A STORY FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Story.findByIdAndRemove(req.params.id, function (err, story) {
        if (err) return res.status(500).send("There was a problem deleting the Story.");
        res.status(200).send(story);
    });
});

// UPDATES A SINGLE STORY IN THE DATABASE
router.put('/:id', function (req, res) {
    Story.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, story) {
        if (err) return res.status(500).send(err);
        res.status(200).send(story);
    });
});


module.exports = router;