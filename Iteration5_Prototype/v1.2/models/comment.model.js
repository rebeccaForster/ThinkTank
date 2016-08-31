var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	created: { type: Date, default: Date.now }, 
	reaction: String, //trouble, input, like or more 
	// Frage: wie stellst du dir den reaction string vor????????? ich bekomme nur true oder false zuück und keine Namen
	title: String,
	text: String,
	user: mongoose.Schema.Types.ObjectId,// person ID 
	idea: mongoose.Schema.Types.ObjectId, // idea ID 
	scribble: String // scribble path
	}, 
    { collection : 'comments' }
);

module.exports = mongoose.model('Comments', CommentSchema);

