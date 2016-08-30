//idea.route 

var express = require('express');
var mongoose = require('mongoose');
var Idea = require('../models/idea.model.js');
var router = express.Router();
var ideaControler = require('../controllers/ideaControler');


router.get('/getAllIeas', function (req, res, next) {
    
	Idea.find({}, function(err, ideas) {

		if (err) return handleError(err);

		res.status(200);
		res.json(ideas);
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
			res.json(idea);
		}
	})

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


router.get('/searchIdea/:term', function (req, res, next) {
    var ideas = [{}];
    res.json(ideas);
});


router.post('/saveNewIdea', ideaControler.saveNewIdea);
router.post('/updateIdea', ideaControler.updateIdea);


module.exports = router;