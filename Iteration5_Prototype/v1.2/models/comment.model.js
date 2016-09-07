var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	created: { type: Date, default: Date.now }, 
	likeIdeaStatus: Boolean,
  	newInputStatus: Boolean,
  	troubleStatus: Boolean,
  	otherreaction: Boolean,
	title: String,
	text: String,
	author: mongoose.Schema.Types.ObjectId,// person ID 
	idea: mongoose.Schema.Types.ObjectId // idea ID 
	}, 
    { collection : 'comments' }
);

module.exports = mongoose.model('Comments', CommentSchema);

