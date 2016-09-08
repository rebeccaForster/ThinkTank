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

  if(!req.body.user || !req.body.currentUser) {
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

				User.update({ _id: user._id} , {
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
						console.log("User updated: ");
						console.log(room);

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

	var userID;

	if(req.body.user._id) {
		userID = req.body.user._id;
	} else if (req.body.user.id) {
		userID = req.body.user.id;
	} else {
		console.log("was not saved because of incomplete data");
	    sendJSONresponse(res, 400, {
	      "message": "user and follower required"
	    });
	    return;
	}

	console.log(req.body);
	if(!userID || !req.body.followedPersonId) {
	    console.log("was not saved because of incomplete data");
	    sendJSONresponse(res, 400, {
	      "message": "user and follower required"
	    });
	    return;
	  }

	  User.update({ _id: userID },
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
	var userID;

	if(req.body.user._id) {
		userID = req.body.user._id;
	} else if (req.body.user.id) {
		userID = req.body.user.id;
	} else {
		console.log("was not saved because of incomplete data");
	    sendJSONresponse(res, 400, {
	      "message": "user and follower required"
	    });
	    return;
	}

	console.log(req.body);
	if(!userID || !req.body.followedPersonId) {
	    console.log("was not saved because of incomplete data");
	    sendJSONresponse(res, 400, {
	      "message": "user and follower required"
	    });
	    return;
	  }

	  User.update({ _id: userID },
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


module.exports.getUserV2 = function(req, res) {


	console.log("getUser V2 triggerd");
	if (!req.params.id || typeof req.params.id != typeof "String" ) {
		res.status(400);
		res.json("id not valid");
	    sendJSONresponse(res, 400, {
	      "message": "id not valid"
	    });
	    return;
	}


	var ideasList = new Array;

	User.findOne({ _id: req.params.id }).then(function(ideas){
		ideasList = ideas;
	}).then(function(ideas){
		res.status(200);
		res.json(ideasList);
	});

	// DBModel.get('posts').then(function (posts) {
	//     return Promise.all(
	//         posts.map(function (post) {
	//             return DBModel.get('authorID', post).
	//         })
	//     )
	// }).then(function (alle posts mit author) {
	    
	// }).then(function (data) {
	//     res.send(data);
	// })
};