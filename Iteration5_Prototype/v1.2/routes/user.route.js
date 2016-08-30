//user.route 

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/comment.model.js');
var Idea = require('../models/idea.model.js');
var User = require('../models/users.model.js');


// router.get('/:id', function (req, res, next) {
//     res.json(user);
// });

router.get('/getAllUsers', function (req, res, next) {
	
	console.log("getAllUsers triggerd");
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

router.get('/getUser/:id', function (req, res, next) {

	console.log("getUser triggerd");
	User.find({ 
				_id: req.params.id 
			}, { 
				_id : 1,
				"profileImg" : 1,
				"url" : 1,
				"title" : 1,
				"firstname" : 1,
				"email" : 1,
				"name" : 1,
				__v : 1,
				"contacs" : 1,
				"followedpersons" : 1,
				"followedideas" : 1,
				"created" : 1
			}, 
				function(err, user) {

		if (err) return console.log(err);

		res.status(200);
		res.json(user);
	})

});

module.exports = router;