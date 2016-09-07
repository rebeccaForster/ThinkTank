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
						"created": dateFormat(entry.created, "dd/mm/yyyy HH:MM")})
		});
		res.status(200);
		res.json(usersPrint);	
	});
});

router.get('/getUser/:id', function (req, res, next) {

	if (!req.params.id || typeof req.params.id != typeof "String" ) {
			res.status(400);
			res.json("id not valid");
		} else {

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

			User.find({ _id: { $in: user.followedpersons }}, function(err, followList) {
				if (err) {
					console.log(err);
					res.status(400);
					res.json(err);
				} else {

					Idea.find({ _id: { $in: user.followedideas }}, function(err, followIdeasList) {
						if (err) {
							console.log(err);
							res.status(400);
							res.json(err);
						} else {

							var followedideas = new Array;
							followIdeasList.forEach(function(cont) {

								User.find({ _id: cont }, function(err, auth) {
									if (err) {
										console.log(err);
										res.status(400);
										res.json(err);
									} else {

									followedideas.push({
												"_id": cont._id,
												"livetime": cont.livetime,
												"description": cont.description,
												"abstract": cont.abstract,
												"title": cont.title,
												"author": {
													"_id": auth._id,
													"profileImg": auth.profileImg,
													"url": auth.url,
													"title": auth.title,
													"firstname": auth.firstname,
													"email": auth.email,
													"name": auth.name,
													"tags": auth.tags,
													"contacs": auth.authacs,
													"followedpersons": auth.followedpersons,
													"followedideas": auth.followedideas,
													"created": dateFormat(auth.created, "dd/mm/yyyy HH:MM")
												},
												"img": cont.img,
												"scribbles": cont.scribbles,
												"tags": cont.tags,
												"milestones": cont.milestones,
												"likes": cont.likes,
												"contributors": cont.contributors,
												"lastchanged": dateFormat(cont.lastchanged, "dd/mm/yyyy HH:MM"),
												"created": dateFormat(cont.created, "dd/mm/yyyy HH:MM")
											});
										}
									})
								});



							var followedpersons = new Array;
							followList.forEach(function(cont) {
								followedpersons.push({
									"_id": cont._id,
									"profileImg": cont.profileImg,
									"url": cont.url,
									"title": cont.title,
									"firstname": cont.firstname,
									"email": cont.email,
									"name": cont.name,
									"tags": cont.tags,
									"contacs": cont.contacs,
									"followedpersons": cont.followedpersons,
									"followedideas": cont.followedideas,
									"created": dateFormat(cont.created, "dd/mm/yyyy HH:MM")
								});
							});

							Idea.find({$or: [{author: user._id }, {contributors: user._id}]} , function(err, ownideas) {
								if (err) {
									console.log(err);
									res.status(400);
									res.json(err);
								} else {

									// var ownIdeas = new Array;
									// ownideas.forEach(function(ownIdea) {
									// 	User.find({ _id: ownIdea.author }, function(err, ownIdeaAuthor) {
									// 		if (err) {
									// 			console.log(err);
									// 			res.status(400);
									// 			res.json(err);
									// 		} else {

									// 			ownIdeas.push({"_id": ownIdea._id,
									// 						"livetime": ownIdea.livetime,
									// 						"description": ownIdea.description,
									// 						"abstract": ownIdea.abstract,
									// 						"title": ownIdea.title,
									// 						"author": 
									// 						{
									// 							"_id": ownIdeaAuthor._id,
									// 							"profileImg": ownIdeaAuthor.profileImg,
									// 							"url": ownIdeaAuthor.url,
									// 							"title": ownIdeaAuthor.title,
									// 							"firstname": ownIdeaAuthor.firstname,
									// 							"email": ownIdeaAuthor.email,
									// 							"name": ownIdeaAuthor.name,
									// 							"tags": ownIdeaAuthor.tags,
									// 							"contacs": ownIdeaAuthor.contacts,
									// 							"followedpersons": ownIdeaAuthor.followedpersons,
									// 							"followedideas": ownIdeaAuthor.followedideas,
									// 							"created": dateFormat(ownIdeaAuthor.created, "dd/mm/yyyy")
									// 						},
									// 						"img": ownIdea.img,
									// 						"scribbles": ownIdea.scribbles,
									// 						"tags": ownIdea.tags,
									// 						"milestones": ownIdea.milestones,
									// 						"likes": ownIdea.likes,
									// 						"contributors": ownIdea.contributors,
									// 						"lastchanged": dateFormat(ownIdea.lastchanged, "dd/mm/yyyy"),
									// 						"created": dateFormat(ownIdea.created, "dd/mm/yyyy") });
									// 		}
									// 	})
									// });

									//Original 
									// var ownIdeas = new Array;
									// ownideas.forEach(function(ownIdea) {
									// ownIdeas.push({"_id": ownIdea._id,
									// 			"livetime": ownIdea.livetime,
									// 			"description": ownIdea.description,
									// 			"abstract": ownIdea.abstract,
									// 			"title": ownIdea.title,
									// 			"author": ownIdea.author,
									// 			"img": ownIdea.img,
									// 			"scribbles": ownIdea.scribbles,
									// 			"tags": ownIdea.tags,
									// 			"milestones": ownIdea.milestones,
									// 			"likes": ownIdea.likes,
									// 			"contributors": ownIdea.contributors,
									// 			"lastchanged": dateFormat(ownIdea.lastchanged, "dd/mm/yyyy"),
									// 			"created": dateFormat(ownIdea.created, "dd/mm/yyyy") });
									// });

									// Fake
									var ownIdeas = new Array;
									ownideas.forEach(function(ownIdea) {
									ownIdeas.push({"_id": ownIdea._id,
												"livetime": ownIdea.livetime,
												"description": ownIdea.description,
												"abstract": ownIdea.abstract,
												"title": ownIdea.title,
												"author": 
												{
														"_id": user._id,
														"profileImg": user.profileImg,
														"url": user.url,
														"title": user.title,
														"firstname": user.firstname,
														"email": user.email,
														"name": user.name,
														"tags": user.tags,
														"contacs": user.contacs,
														"followedpersons": user.followedpersons,
														"followedideas": user.followedideas,
														"created": dateFormat(user.created, "dd/mm/yyyy HH:MM")
													},
												"img": ownIdea.img,
												"scribbles": ownIdea.scribbles,
												"tags": ownIdea.tags,
												"milestones": ownIdea.milestones,
												"likes": ownIdea.likes,
												"contributors": ownIdea.contributors,
												"lastchanged": dateFormat(ownIdea.lastchanged, "dd/mm/yyyy HH:MM"),
												"created": dateFormat(ownIdea.created, "dd/mm/yyyy HH:MM") });
									});

									res.status(200);
									res.json({"_id": user._id,
												"profileImg": user.profileImg,
												"url": user.url,
												"title": user.title,
												"firstname": user.firstname,
												"email": user.email,
												"name": user.name,
												"tags": user.tags,
												"contacs": user.contacs,
												"followedpersons": followedpersons,
												"followedideas": followedideas,
												"ownIdeas": ownIdeas, 
												"created": dateFormat(user.created, "dd/mm/yyyy HH:MM")}
												);
								}
							})
						}
					})
				}
			})
		} 
	})
}
});

router.post('/updateUser', userControler.updateUser);
router.post('/followUser', userControler.followUser);
router.post('/unFollowUser', userControler.unFollowUser);

module.exports = router;

