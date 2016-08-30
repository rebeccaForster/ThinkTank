var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var fs = require('fs');
var sys = require('sys');
var router = express.Router();

var Comment = require('../models/comment.model.js');
var Idea = require('../models/idea.model.js');
var Person = require('../models/users.model.js');


module.exports.writeComment = function(req, res) {

	console.log("save idea triggerd");
	console.log(req.body.comment);

  if(!req.body.user.id || !req.body.comment || !req.body.ideaId || !req.body.comment.text) {
    console.log("comment was not saved because of incomplete data");
    sendJSONresponse(res, 400, {
      "message": "comment was not saved because of incomplete data"
    });
    return;
  }

	var comment = new Comment();

	comment.user = req.body.user.id;
	comment.reaction = req.body.comment.reaction;
	comment.text = req.body.comment.text;
	comment.idea = req.body.ideaId;
	comment.created = Date.now();
	
	console.log(comment);

	comment.save(function(err, doc) {

		if (err) {
			console.log("error: ");
			console.log(err);
			res.status(400);
			res.json(err);
		} else {
			console.log("Idea saved: ");
			console.log(room._id);

			res.status(200);
			res.json(doc);
		}
		
	});

};