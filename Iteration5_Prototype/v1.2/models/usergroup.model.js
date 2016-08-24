var mongoose = require('mongoose');

var UserGroupSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId, 
	created: { type: Date, default: Date.now }, 
	name: String, 
	description: String,
	users: [ mongoose.Schema.Types.ObjectId ]
	}, 
    { collection : 'usergroups' }
);

module.exports = mongoose.model('Usergroups', UserGroupSchema);