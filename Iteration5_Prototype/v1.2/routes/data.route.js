//data.route 

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/comment.model.js');
var Idea = require('../models/idea.model.js');
var User = require('../models/users.model.js');
var dateFormat = require('dateformat');


router.get('/getAllHashtags', function (req, res, next) {
    
    console.log("getAllHashtags triggerd");
	var tags = new Array;
	var ideas = new Array;
	var hashTags = new Array;
	var hashTagObjecs = new Array;
	Idea.find({}, function(err, doc) {

		if (err) {
			console.log(err);
			res.status(400);
			res.json(err);
		} else {
			ideas = doc; 
		}
	}).then(function() {
		
		ideas.forEach(function(entry) {
			tags = tags.concat(entry.tags);
		});

		//Make it uiniqu and set prio all to one 
		// hashTags = tags.filter(function(elem, pos) {
		// 	  return tags.indexOf(elem) == pos;
		// 	});

		// hashTags.forEach(function(tag) {
		// 	hashTagObjecs.push({
		// 		name: tag,
		// 		priority: 1
		// 	})
		// });
		// res.status(200);
		// res.json(hashTagObjecs);	

	    var prev, maxPrio = 5, mostComPrio = 0;

	    tags.sort();

	    for ( var i = 0; i < tags.length; i++ ) {
	        if ( tags[i] !== prev ) {
	            hashTagObjecs.push({
	            	name: tags[i], 
	            	priority: 1
	            });
	        } else {
	            hashTagObjecs[hashTagObjecs.length-1].priority++;
	        }
	        prev = tags[i];
	    }

		hashTagObjecs.forEach(function(tag) {
			if(tag.priority > mostComPrio) mostComPrio = tag.priority;
		});

	    for ( var i = 0; i < hashTagObjecs.length; i++ ) {
	        hashTagObjecs[i].priority = Math.round((hashTagObjecs[i].priority/mostComPrio)*maxPrio);
	    }
	       

		res.status(200);
		res.json(hashTagObjecs);	
	});
});

router.get('/getAllMilestones', function (req, res, next) {
	
	console.log("getAllMilestones triggerd");
	var milestonses = new Array;
	var ideas = new Array;
	var uniqueMilestones = new Array;
	Idea.find({}, function(err, doc) {

		if (err) {
			console.log(err);
			res.status(400);
			res.json(err);
		} else {
			ideas = doc; 
		}
	}).then(function() {
		ideas.forEach(function(entry) {
			milestonses = milestonses.concat(entry.milestones);
			// console.log(entry.milestones);
		});
		uniqueMilestones = milestonses.filter(function(elem, pos) {
			  return milestonses.indexOf(elem) == pos;
			});
		res.status(200);
		res.json(uniqueMilestones);	
	});
});


module.exports = router;