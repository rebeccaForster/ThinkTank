//messages.route 

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/comment.model.js');
var Idea = require('../models/idea.model.js');
var Person = require('../models/users.model.js');

var messages = {};

router.get('/getMyMessages/:user', function (req, res, next) {
    res.json(messages);
});


module.exports = router;