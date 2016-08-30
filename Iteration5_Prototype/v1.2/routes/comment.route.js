//comment.route 

var express = require('express');
var mongoose = require('mongoose');
var Idea = require('../models/idea.model.js');
var router = express.Router();
var commentControler = require('../controllers/commentControler');
var dateFormat = require('dateformat');
var Comment = require('../models/comment.model.js');

router.get('/getComments/:id', function (req, res, next) {

	console.log("getComments triggerd");
	Comment.find({ idea: req.params.id }, function(err, doc) {
		if (err) {
			console.log(err);
			res.status(400);
			res.json(err);
		} else {
			res.status(200);
			res.json(doc);
		}
	});
});

router.post('/writeComment', commentControler.writeComment);


module.exports = router;