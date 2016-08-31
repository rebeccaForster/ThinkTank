var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var fs = require('fs');
var sys = require('sys');
var router = express.Router();

var Comment = require('../models/comment.model.js');
var Idea = require('../models/idea.model.js');
var Person = require('../models/users.model.js');


module.exports.saveNewIdea = function(req, res) {

	console.log("save idea triggerd");
	console.log(req.body.idea.privacyType);

  if(!req.body.user.id || !req.body.idea) {
    console.log("idea was not saved because of incomplete data");
    sendJSONresponse(res, 400, {
      "message": "user and idea required"
    });
    return;
  }

  var idea = new Idea();

  if(req.body.idea.scribble) {

  	var a = "useruploads/";
  	var b = "public/app/";
  	var now = Date.now();
  	var scribblePath = a.concat(now , ".png");
  	var scribbleSavePath = b.concat(a, now, ".png");
  	idea.scribble = scribblePath;
  	idea.img = scribblePath;

	// strip off the data: url prefix to get just the base64-encoded bytes
	var data = req.body.idea.scribble.replace(/^data:image\/\w+;base64,/, "");
	var buf = new Buffer(data, 'base64');
	fs.writeFile(scribbleSavePath, buf)


  } else {
  	idea.scribble = "";
  	idea.img = "";
  }

 	idea.author = req.body.user.id;
	idea.created = Date.now();
	idea.lastchanged = Date.now();
	idea.title = req.body.idea.title;
	idea.abstract = "";

	if(req.body.idea.description) {
		idea.description = req.body.idea.description;
	} else {
		idea.description = "no description";
	}
	
	// TODO: Disabled untill form passes objectIDs of users
	
	console.log("Contributors: ");
	console.log(req.body.idea.contributors);
	// if(req.body.idea.contributors) {
	// 	idea.contributors = req.body.idea.contributors;
	// } else {
	// 	idea.contributors = [];
	// }

	if(req.body.idea.milestones) {
		idea.milestones = req.body.idea.milestones;
	} else {
		idea.milestones = "no milestones";
	}

	if(req.body.idea.tags && req.body.idea.tags.length > 0) {
		var tagNames = [];
		for (var i in req.body.idea.tags) {
		  tagNames.push(req.body.idea.tags[i].name);
		}
		idea.tags = tagNames;
	} else {
		idea.tags = [];
	}

	if(req.body.idea.privacyType >= 0) {
		idea.privacyType = req.body.idea.privacyType;
	} else {
		idea.privacyType = 0;
	}

	if(req.body.idea.lifetime && typeof req.body.idea.lifetime === typeof 1) {
		idea.lifetime = Date.now() +  (req.body.idea.lifetime * 24*60*60 );
	} else {
		idea.lifetime = 2592000; 
		// idea.lifetime = Date.now() + 2592000; //30 Tage 
	}

	console.log(idea);

	idea.save(function(err, room) {

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
			  id : room._id
			});
		}
		
	});
};


module.exports.followIdea = function(req, res) {
	//we need: ideaId, userId
};

module.exports.likeIdea = function(req, res) {
	//we need: ideaId, userId
};

