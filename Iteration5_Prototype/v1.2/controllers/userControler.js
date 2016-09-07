var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var fs = require('fs');
var sys = require('sys');
var router = express.Router();

var Comment = require('../models/comment.model.js');
var Idea = require('../models/idea.model.js');
var User = require('../models/users.model.js');

module.exports.updateUser = function(req, res) {
	//we need: userObject, currentUser
	console.log("update user triggerd");
	console.log(req.body.currentUser);
	console.log(req.body.user);

  if(!req.body.user.id || !req.body.currentUser) {
    console.log("user was not updated because of incomplete data");
    sendJSONresponse(res, 400, {
      "message": "user and idea required"
    });
    return;
  }

  User.findOne({ _id: req.body.currentUser.id }, function(err, userRes) {
		if (err) {
			console.log(err);
			res.status(400);
			res.json(err);
		} else {
			
			  var user = userRes; 

			  if (req.body.user.email) {
			  	user.email = req.body.user.email;
			  }

			  if (req.body.user.name) {
			  	user.name = req.body.user.name;
			  }

			  if (req.body.user.firstname) {
			  	user.firstname = req.body.user.firstname;
			  }

			  if (req.body.user.title) {
			  	user.title = req.body.user.title;
			  }

			  if (req.body.user.profileImg) {
			  	user.profileImg = req.body.user.profileImg;
			  }

			  if (req.body.user.tags) {
			  	user.tags = req.body.user.tags;
			  }

			  if (req.body.user.url) {
			  	user.url = req.body.user.url;
			  }

			  if (req.body.user.followedideas) {
			  	user.followedideas = req.body.user.followedideas;
			  }

			  if (req.body.user.followedpersons) {
			  	user.followedpersons = req.body.user.followedpersons;
			  }

			  if (req.body.user.contacs) {
			  	user.contacs = req.body.user.contacs;
			  }

			  if (req.body.user.vita) {
			  	user.vita = req.body.user.vita;
			  }

			  if (req.body.user.interests) {
			  	user.interests = req.body.user.interests;
			  }

			  if (req.body.user.publications) {
			  	user.publications = req.body.user.publications;
			  }


				console.log(user);

				Idea.update({ _id: user._id} , {
					"email" : user.email,
					"name" : user.name,
					"firstname" : user.firstname,
					"title" : user.title,
					"profileImg" : user.profileImg,
					"tags" : user.tags,
					"url" : user.url,
					"followedideas" : user.followedideas,
					"followedpersons" : user.followedpersons,
					"contacs" : user.contacs,
					"vita" : user.vita,
					"interests" : user.interests,
					"publications" : user.publications
				}, function(err, room) {

					if (err) {
						console.log("error: ");
						console.log(err);
						res.json({
						  id : err
						});
					} else {
						console.log("Idea saved: ");
						console.log(room._id);

						res.status(200);
						res.json({
						  "done" : "updated"
						});
					}
				});
		} 
	});
};

module.exports.followUser = function(req, res) {
	//we need: userId, follower=currenUser
	console.log(req.body);
	if(!req.body.user._id || !req.body.followedPersonId) {
	    console.log("was not saved because of incomplete data");
	    sendJSONresponse(res, 400, {
	      "message": "user and follower required"
	    });
	    return;
	  }

	  Person.update({ _id: req.body.user._id },
		   { $push: { followedpersons: req.body.followedPersonId } }, function(err, room) {

		if (err) {
			console.log("error: ");
			console.log(err);
			res.json({
			  id : err
			});
		} else {
			console.log("followed: ");

			res.status(200);
			res.json({
			  "done" : "followed"
			});
		}
		
	});
};


module.exports.unFollowUser = function(req, res) {
	//we need: userId, follower=currenUser
	if(!req.body.user._id || !req.body.followedPersonId) {
	    console.log("was not saved because of incomplete data");
	    sendJSONresponse(res, 400, {
	      "message": "user and follower required"
	    });
	    return;
	  }

	  Person.update({ _id: req.body.user._id },
		   { $pull: { followedpersons: req.body.followedPersonId } }, function(err, room) {

		if (err) {
			console.log("error: ");
			console.log(err);
			res.json({
			  id : err
			});
		} else {
			console.log("unfollowed: ");

			res.status(200);
			res.json({
			  "done" : "unfollowed"
			});
		}
		
	});
};
