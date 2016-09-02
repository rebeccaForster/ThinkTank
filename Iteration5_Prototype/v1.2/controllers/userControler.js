var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var fs = require('fs');
var sys = require('sys');
var router = express.Router();

var Comment = require('../models/comment.model.js');
var Idea = require('../models/idea.model.js');
var Person = require('../models/users.model.js');

module.exports.updateUser = function(req, res) {
	//we need: userObject, currentUser
};

module.exports.followUser = function(req, res) {
	//we need: userId, follower=currenUser
	if(!req.body.user.id || !req.body.followedPersonId) {
	    console.log("was not saved because of incomplete data");
	    sendJSONresponse(res, 400, {
	      "message": "user and follower required"
	    });
	    return;
	  }



	  Users.update({ _id: req.body.user.id },
		   { $push: { followedpersons: req.body.followedPersonId } }, function(err, room) {

		if (err) {
			console.log("error: ");
			console.log(err);
			res.json({
			  id : err
			});
		} else {
			console.log("followed: ");
			console.log(room._id);

			res.status(200);
			res.json({
			  id : room._id
			});
		}
		
	});
};