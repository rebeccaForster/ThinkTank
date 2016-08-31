//idea.route 

var express = require('express');
var mongoose = require('mongoose');
var Idea = require('../models/idea.model.js');
var router = express.Router();
var ideaControler = require('../controllers/ideaControler');
var dateFormat = require('dateformat');
var Comment = require('../models/comment.model.js');


router.get('/getAllIeas', function (req, res, next) {
    
    console.log("getAllIdeas triggerd");
	Idea.find({}, function(err, ideas) {

		if (err) {
			console.log(err);
			res.status(400);
			res.json(err);
		} else {
			res.status(200);
			res.json(ideas);
		}
	})
});

router.get('/getIdea/:id', function (req, res, next) {

	console.log("getIdea triggerd");
	Idea.findOne({ _id: req.params.id }, function(err, idea) {

		if (err) {
			console.log(err);
			res.status(400);
			res.json(err);
		} else {
			
			res.status(200);
			res.json({"_id": idea._id,
						"livetime": idea.livetime,
						"description": idea.description,
						"abstract": idea.abstract,
						"title": idea.title,
						"author": idea.author,
						"img": idea.img,
						"scribbles": idea.scribbles,
						"tags": idea.tags,
						"milestones": idea.milestones,
						"likes": idea.likes,
						"contributors": idea.contributors,
						"lastchanged": dateFormat(idea.lastchanged, "dd/mm/yyyy"),
						"created": dateFormat(idea.created, "dd/mm/yyyy")
					});
		}
	})

	//for messages 
	// var comments;
	// Idea.findOne({ _id: req.params.id }, function(err, idea) {

	// 	if (err) {
	// 		console.log(err);
	// 		res.status(400);
	// 		res.json(err);
	// 	} else {
	// 		Comment.find({ idea: idea._id }, function(err, doc) {
	// 			if (err) {
	// 				console.log(err);
	// 				res.status(400);
	// 				res.json(err);
	// 			} else {
	// 				comments = doc;
	// 			}
	// 		}).then(function() {

	// 			res.status(200);
	// 			res.json({"_id": idea._id,
	// 						"livetime": idea.livetime,
	// 						"description": idea.description,
	// 						"abstract": idea.abstract,
	// 						"title": idea.title,
	// 						"author": idea.author,
	// 						"img": idea.img,
	// 						"scribbles": idea.scribbles,
	// 						"tags": idea.tags,
	// 						"milestones": idea.milestones,
	// 						"likes": idea.likes,
	// 						"contributors": idea.contributors,
	// 						"lastchanged": dateFormat(idea.lastchanged, "mm/dd/yyyy"),
	// 						"created": dateFormat(idea.created, "mm/dd/yyyy"), 
	// 						"comments": comments
	// 					});
	// 		});
	// 	}
	// })

});

router.get('/getAllIdeasSorted/:sorting', function (req, res, next) {
    
    var options = {
	    "sort": req.params.sorting
	}
	//todo: send error if nothing was found

	var ideas = Idea.find( {}, options);

	res.status(200);
	res.json(ideas);
});


router.get('/getOwnIdeas/:user', function (req, res, next) {
    var ideas = [{}];
    res.json(ideas);
});

router.get('/getFollowedIdeas/:user', function (req, res, next) {
    var ideas = [{}];
    res.json(ideas);
});

router.get('/searchIdea/:term', function (req, res, next) {
    var ideas = [{}];
    res.json(ideas);
});


router.post('/saveNewIdea', ideaControler.saveNewIdea);


module.exports = router;