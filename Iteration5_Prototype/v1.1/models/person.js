var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId, 
	created: { type: Date, default: Date.now }, 
	name: String, 
	firstname: String, 
	title: String, 
	mail: String, 
	pwhash: String, 
	photo: String, 
	vita: String, 
	interests: String, 
	publications: String, 
	link: String, 
	followedideas: mongoose.Schema.Types.ObjectId,
	followedpersons: mongoose.Schema.Types.ObjectId, 
	contacs: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Person', PersonSchema);

