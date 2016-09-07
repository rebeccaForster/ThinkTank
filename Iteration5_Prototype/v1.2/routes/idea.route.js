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
									"created": dateFormat(idea.author[0].created, "dd/mm/yyyy hh:MM")
								},
								"img": idea.img,
								"scribbles": idea.scribbles,
								"tags": idea.tags,
								"milestones": idea.milestones,
								"likes": idea.likes,
								"privacyType": idea.privacyType,
								"contributors": idea.contributors,
								"lastchanged": dateFormat(idea.lastchanged, "dd/mm/yyyy hh:MM"),
								"created": dateFormat(idea.created, "dd/mm/yyyy hh:MM")
							});
				});

			res.status(200);
			res.json(ideasList);
		}
	})
});


// router.get('/getIdea/:id', function (req, res, next) {

// 	console.log("getIdea triggerd");
// 	// Idea.findOne({ _id: req.params.id }, function(err, idea) {
// 	Idea.aggregate({
// 	   $lookup:
// 	     {
// 	       from: "users",
// 	       localField: "author",
// 	       foreignField: "_id",
// 	       as: "author"
// 	     }}, function(err, ideas) {

// 		if (err) {
// 			console.log(err);
// 			res.status(400);
// 			res.json(err);
// 		} else {
					
// 			res.status(200);
// 			res.json({"_id": idea._id,
// 						"livetime": idea.livetime,
// 						"description": idea.description,
// 						"abstract": idea.abstract,
// 						"title": idea.title,
// 						"author": idea.author[0],
// 						"img": idea.img,
// 						"scribble": idea.scribble,
// 						"tags": idea.tags,
// 						"milestones": idea.milestones,
// 						"likes": idea.likes,
// 						"contributors": idea.contributors,
// 						"comments": idea.comments,
// 						"privacyType": idea.privacyType,
// 						"lastchanged": dateFormat(idea.lastchanged, "dd/mm/yyyy"),
// 						"created": dateFormat(idea.created, "dd/mm/yyyy")
// 					});
// 		}

// 	});

// });


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
						"tags": doc.tags,
						"contacs": doc.contacs,
						"followedpersons": doc.followedpersons,
						"followedideas": doc.followedideas,
						"created": dateFormat(doc.created, "dd/mm/yyyy hh:MM")};

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
										"created": dateFormat(cont.created, "dd/mm/yyyy hh:MM")
									});
								});

								Comment.find({ $query: { idea: idea._id }, $orderby: { created : -1 } }, function(err, commentsList) {
									if (err) {
										console.log(err);
										res.status(400);
										res.json(err);
									} else {
										comments = commentsList;

										var comments = new Array;

										commentsList.forEach(function(comment) {
											comments.push({
												"_id": comment._id,
												"created": dateFormat(comment.created, "dd/mm/yyyy hh:MM"), 
												"likeIdeaStatus": comment.likeIdeaStatus, 
												"newInputStatus": comment.newInputStatus, 
												"troubleStatus": comment.troubleStatus, 
												"otherreaction": comment.otherreaction, 
												"title": comment.title, 
												"text": comment.text, 
												"author": comment.author, 
												"idea": comment.idea
											});
										});
									
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
													"privacyType": idea.privacyType,
													"lastchanged": dateFormat(idea.lastchanged, "dd/mm/yyyy hh:MM"),
													"created": dateFormat(idea.created, "dd/mm/yyyy hh:MM")
												});
									}
							})
						}
					})
				}
			})
		}
	});

});

//not tested 
router.get('/getAllIdeasSorted/date', function (req, res, next) { 
    
	console.log("getAllIdeas Sorting Date");
		Idea.aggregate({
		   $lookup:
		     {
		       from: "users",
		       localField: "author",
		       foreignField: "_id",
		       as: "author"
		     }}, 
		      { $sort : { created : 1} } , 
		      function(err, ideas) {
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
									"created": dateFormat(idea.author[0].created, "dd/mm/yyyy hh:MM")
								},
								"img": idea.img,
								"scribbles": idea.scribbles,
								"tags": idea.tags,
								"milestones": idea.milestones,
								"likes": idea.likes,
								"contributors": idea.contributors,
								"lastchanged": dateFormat(idea.lastchanged, "dd/mm/yyyy hh:MM"),
								"created": dateFormat(idea.created, "dd/mm/yyyy hh:MM")
							});
				});

			res.status(200);
			res.json(ideasList);
		}
	})
});

router.post('/searchIdeas/', function (req, res, next) { 

	var searchTags = req.body.term;

	console.log("search for Tags triggerd");
		Idea.aggregate([
			{
			   $lookup:
			     {
			       from: "users",
			       localField: "author",
			       foreignField: "_id",
			       as: "author"
			     }}, 
			      { $match: { tags : { $in: searchTags }} } , function(err, ideas) {

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
									"created": dateFormat(idea.author[0].created, "dd/mm/yyyy hh:MM")
								},
								"img": idea.img,
								"scribbles": idea.scribbles,
								"tags": idea.tags,
								"milestones": idea.milestones,
								"likes": idea.likes,
								"contributors": idea.contributors,
								"lastchanged": dateFormat(idea.lastchanged, "dd/mm/yyyy hh:MM"),
								"created": dateFormat(idea.created, "dd/mm/yyyy hh:MM")
							});
				});

			res.status(200);
			res.json(ideasList);
		}
	}]) 

});



router.post('/saveNewIdea', ideaControler.saveNewIdea);
router.post('/updateIdea', ideaControler.updateIdea); 
router.post('/writeComment', ideaControler.writeComment);
router.post('/followIdea', ideaControler.followIdea);
router.post('/likeIdea', ideaControler.likeIdea);
router.post('/unFollowIdea', ideaControler.unFollowIdea);
router.post('/dislikeIdea', ideaControler.likeIdea);


module.exports = router;