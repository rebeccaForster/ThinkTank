var mongoose = require('mongoose');

var IdeaSchema = new mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId, 
		created: { type: Date, default: Date.now }, 
		lastchanged: { type: Date, default: Date.now }, 
		title: String, 
		abstract: String,
		description: String,
		img: String, 
		author: mongoose.Schema.Types.ObjectId, //person ID 
		contributor: [mongoose.Schema.Types.ObjectId], //persons object IDs
		milestones: [{
				name: String, 
				extratime: Number,
				percentage: Number,
				icon: String 
		}] , 
		tags: [String], //plane text tags
		livetime: Number,  //days of total live time. 
		scribbles: [String] // list of scribble object IDs
		// Todo: (Rebecca) was hier noch fehlt sind die Nachrichten
		/*
		  messages: [

            {
                author: mongoose.Schema.Types.ObjectId,
                text: String,
                likeIdeaStatus: boolean,
                newInputStatus: boolean,
                troubleStatus: boolean,
                other: boolean
            }
		*/
	}, 
    { collection : 'ideas' }
);

module.exports = mongoose.model('Idea', IdeaSchema);

