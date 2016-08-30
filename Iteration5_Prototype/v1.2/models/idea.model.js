var mongoose = require('mongoose');

var IdeaSchema = new mongoose.Schema({
		created: { type: Date, default: Date.now }, 
		lastchanged: { type: Date, default: Date.now }, 
		title: String, 
		abstract: String,
		description: String,
		img: String, 
		author: mongoose.Schema.Types.ObjectId, //person ID 
		contributors: [mongoose.Schema.Types.ObjectId], //persons object IDs
		likes: [mongoose.Schema.Types.ObjectId], //persons object IDs
		milestones: [String] , 
		tags: [String], //plane text tags
		livetime: Number,  //days of total live time. 
		scribbles: [String] // list of scribble object IDs
	}, 
    { collection : 'ideas' }
);

module.exports = mongoose.model('Idea', IdeaSchema);