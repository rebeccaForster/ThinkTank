//user.route 

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/comment.model.js');
var Idea = require('../models/idea.model.js');
var User = require('../models/users.model.js');
var dateFormat = require('dateformat');
var userControler = require('../controllers/userControler');


// router.get('/:id', function (req, res, next) {
//     res.json(user);
// });

router.get('/getAllUsers', function (req, res, next) {
	
	console.log("getAllUsers triggerd");
	var users = [];
	var usersPrint = [];
	User.find({}, function(err, user) {	
		if (err) {
			console.log(err);
			res.status(400);
			res.json(err);
		} else {
			users = user; 
		}
	}).then(function() {
		users.forEach(function(entry) {
			usersPrint.push({"_id": entry._id,
						"profileImg": entry.profileImg,
						"url": entry.url,
						"title": entry.title,
						"firstname": entry.firstname,
						"email": entry.email,
						"name": entry.name,
						"contacs": entry.contacs,
						"followedpersons": entry.followedpersons,
						"followedideas": entry.followedideas,
						"created": dateFormat(entry.created, "dd/mm/yyyy")})
		});
		res.status(200);
		res.json(usersPrint);	
	});
});

router.get('/getUser/:id', function (req, res, next) {

	console.log("getUser triggerd");
	User.findOne({ 
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

		if (err) {
			console.log(err);
			res.status(400);
			res.json(err);
		} else {
			res.status(200);
			res.json({"_id": user._id,
						"profileImg": user.profileImg,
						"url": user.url,
						"title": user.title,
						"firstname": user.firstname,
						"email": user.email,
						"name": user.name,
						"contacs": user.contacs,
						"followedpersons": user.followedpersons,
						"followedideas": user.followedideas,
						"created": dateFormat(user.created, "dd/mm/yyyy")}
						);
		}
	})
});

router.post('/updateUser', userControler.updateUser);
router.post('/followUser', userControler.followUser);

module.exports = router;