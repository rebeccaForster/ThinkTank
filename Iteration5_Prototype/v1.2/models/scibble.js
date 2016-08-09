var mongoose = require('mongoose');

var ScribbleSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId, 
	created: { type: Date, default: Date.now }, 
	lastchanged: { type: Date, default: Date.now }, 
	del: Boolean, 
	path: String //Pfad zur svg 
});

module.exports = mongoose.model('Scirbble', ScribbleSchema);

