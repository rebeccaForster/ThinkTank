var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/comment.js');
var Idea = require('../models/idea.js');
var Person = require('../models/person.js');
var Scibble = require('../models/scibble.js');
var Dash = []; 

//Test for connection: 
var idea = {
	_id: "ObjectID(AAAAA)",
	created: 1234567, 
	lastchanged: 123456, 
	title: "Test Idea", 
	abstract: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,", 
	description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,", 
	picture: "/uploads/pictures/938378229.png", 
	author: "ObjectID(BABAA)", 
	contirubutors: ["ObjectID(CADSSA)", "ObjectID(ASDAS)"], 
	tags: "#ergonomics #test #hashtag", 
	livetime: 1584694, 
	scribbles: ["/uploads/scribbles/65466.svg", "/uploads/scribbles/861654.svg"]
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send(idea);
  Idea.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });

});

// router.get('/dashboardData/:query/:sort', function(req, res, next) {
//   Dash.push(findById(req.params.query, function (err, post) {
//     if (err) return next(err);

    
//     res.json(post);
//   }));
// });

module.exports = router;
