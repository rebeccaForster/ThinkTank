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
		hashTags = tags.filter(function(elem, pos) {
			  return tags.indexOf(elem) == pos;
			});
		res.status(200);
		res.json(hashTags);	
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
			milestonses = milestonses.concat(entry.milestonses);
		});
		uniqueMilestones = milestonses.filter(function(elem, pos) {
			  return milestonses.indexOf(elem) == pos;
			});
		res.status(200);
		res.json(uniqueMilestones);	
	});
});


module.exports = router;