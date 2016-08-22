//user.route 

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/comment.model.js');
var Idea = require('../models/idea.model.js');
var Person = require('../models/users.model.js');
var Scibble = require('../models/scibble.model.js');

var user = {};

router.get('/:id', function (req, res, next) {
    res.json(user);
});


module.exports = router;