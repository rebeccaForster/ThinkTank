var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId, 
	created: { type: Date, default: Date.now }, 
	reaction: String, 
	text: String,
	commentator: mongoose.Schema.Types.ObjectId,// person ID 
	idea: mongoose.Schema.Types.ObjectId // idea ID 
});

module.exports = mongoose.model('Comment', CommentSchema);

