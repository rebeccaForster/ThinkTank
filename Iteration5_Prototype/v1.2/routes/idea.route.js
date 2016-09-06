//idea.route 

var express = require('express');
var mongoose = require('mongoose');
var Idea = require('../models/idea.model.js');
var router = express.Router();
var ideaControler = require('../controllers/ideaControler');
var dateFormat = require('dateformat');
var Comment = require('../models/comment.model.js');
var User = require('../models/users.model.js');


router.get('/getAllIeas', function (req, res, next) {
    
    console.log("getAllIdeas triggerd");
	Idea.aggregate({
		   $lookup:
		     {
		       from: "users",
		       localField: "author",
		       foreignField: "_id",
		       as: "author"
		     }}, function(err, ideas) {
	// Idea.find([{}], function(err, ideas) {


		if (err) {
			console.log(err);
			res.status(400);
			res.json(err);
		} else {
			var ideasList = new Array;

			ideas.forEach(function(idea) {
				ideasList.push({"_id": idea._id,
								"livetime": idea.livetime,
								"description": idea.description,
								"abstract": idea.abstract,
								"title": idea.title,
								"author": {
									"_id": idea.author[0]._id,
									"profileImg": idea.author[0].profileImg,
									"url": idea.author[0].url,
									"title": idea.author[0].title,
									"firstname": idea.author[0].firstname,
									"email": idea.author[0].email,
									"name": idea.author[0].name,
									"contacs": idea.author[0].contacs,
									"followedpersons": idea.author[0].followedpersons,
									"followedideas": idea.author[0].followedideas,
									"created": dateFormat(idea.author[0].created, "dd/mm/yyyy")
								},
								"img": idea.img,
								"scribbles": idea.scribbles,
								"tags": idea.tags,
								"milestones": idea.milestones,
								"likes": idea.likes,
								"contributors": idea.contributors,
								"lastchanged": dateFormat(idea.lastchanged, "dd/mm/yyyy"),
								"created": dateFormat(idea.created, "dd/mm/yyyy")
							});
				});

			res.status(200);
			res.json(ideasList);
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
				
				var author = new Array;
				User.findOne({ _id: idea.author }, function(err, doc) {
				if (err) {
					console.log(err);
					res.status(400);
					res.json(err);
				} else {
					
					res.status(200);
					var author = {
						"_id": doc._id,
						"profileImg": doc.profileImg,
						"url": doc.url,
						"title": doc.title,
						"firstname": doc.firstname,
						"email": doc.email,
						"name": doc.name,
						"contacs": doc.contacs,
						"followedpersons": doc.followedpersons,
						"followedideas": doc.followedideas,
						"created": dateFormat(doc.created, "dd/mm/yyyy")};

						console.log(typeof idea.contributors);
						User.find({ _id: { $in: idea.contributors }}, function(err, contributorList) {
							if (err) {
								console.log(err);
								res.status(400);
								res.json(err);
							} else {

								var contributors = new Array;

								contributorList.forEach(function(cont) {
									contributors.push({
										"_id": cont._id,
										"profileImg": cont.profileImg,
										"url": cont.url,
										"title": cont.title,
										"firstname": cont.firstname,
										"email": cont.email,
										"name": cont.name,
										"contacs": cont.contacs,
										"followedpersons": cont.followedpersons,
										"followedideas": cont.followedideas,
										"created": dateFormat(cont.created, "dd/mm/yyyy")
									});
								});

								Comment.find({ idea: idea._id }, function(err, commentsList) {
									if (err) {
										console.log(err);
										res.status(400);
										res.json(err);
									} else {
										comments = commentsList;
									
										res.status(200);
										console.log(idea.scribble);
										res.json({"_id": idea._id,
													"livetime": idea.livetime,
													"description": idea.description,
													"abstract": idea.abstract,
													"title": idea.title,
													"author": author,
													"img": idea.img,
													"scribble": idea.scribble,
													"tags": idea.tags,
													"milestones": idea.milestones,
													"likes": idea.likes,
													"contributors": contributors,
													"comments": comments,
													"lastchanged": dateFormat(idea.lastchanged, "dd/mm/yyyy"),
													"created": dateFormat(idea.created, "dd/mm/yyyy")
												});
									}
							})
						}
					})
				}
			})
		}
	});

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
router.post('/updateIdea', ideaControler.updateIdea); 
router.post('/writeComment', ideaControler.writeComment);


module.exports = router;