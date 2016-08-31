var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
	created: { type: Date, default: Date.now }, 
	email: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	firstname: String, 
	hash: String,
	salt: String, 
	title: String,  
	profileImg: String, 
	vita: String, 
	interests: String, 
	publications: String, 
	//todo hier fehlen noch die tags         tags: ["tag11", "tag21", "g11", "tag112", "tag212", "g112"],
	// brauchen nohc eine Liste wo die eignenen ideen drinnen stehen
	url: String, 
	followedideas: [ mongoose.Schema.Types.ObjectId ],
	followedpersons: [ mongoose.Schema.Types.ObjectId ], 
	contacs: [ mongoose.Schema.Types.ObjectId ] // todo gibt es nicht mehr
	}, 
	{ collection : 'users' }
);


userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', userSchema);
