var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	_id: String, //Schema.Types.ObjectId, 
	created: { type: Date, default: Date.now }, 
	reaction: String, 
	text: String,
	commentator: String, //Schema.Types.ObjectId,// person ID 
	idea: String //Schema.Types.ObjectId // idea ID 
});

module.exports = mongoose.model('Comment', CommentSchema);

