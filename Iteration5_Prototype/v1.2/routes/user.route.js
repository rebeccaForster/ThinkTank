//user.route 

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/comment.model.js');
var Idea = require('../models/idea.model.js');
var User = require('../models/users.model.js');
var Scibble = require('../models/scibble.model.js');


// router.get('/:id', function (req, res, next) {
//     res.json(user);
// });

router.get('/getAllUsers', function (req, res, next) {
	
	console.log("test");
	User.find({}, function(err, user) {

		if (err) { 
			console.log(err);
			return handleError(err);
		}

		console.log(user);
		res.status(200);
		res.json(user);
	})
    
});

module.exports = router;