var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId, 
	created: { type: Date, default: Date.now }, 
	reaction: String, 
	text: String,
	likeIdeaStatus: Boolean,
    newInputStatus: Boolean,
    troubleStatus: Boolean,
	other: Boolean,
	commentator: mongoose.Schema.Types.ObjectId,// person ID 
	idea: mongoose.Schema.Types.ObjectId // idea ID 
	}, 
    { collection : 'comments' }
);

module.exports = mongoose.model('Comments', CommentSchema);

