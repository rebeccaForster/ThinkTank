var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var fs = require('fs');
var sys = require('sys');
var router = express.Router();

var Comment = require('../models/comment.model.js');
var Idea = require('../models/idea.model.js');
var Person = require('../models/users.model.js');

module.exports.updateUser = function(req, res) {
	//we need: userObject, currentUser
};

module.exports.followUser = function(req, res) {
	//we need: userId, follower=currenUser
};