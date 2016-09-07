var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var user = new User();
  console.log(req.body);

  user.name = req.body.name;
  user.email = req.body.email;
  user.created = Date.now();
  if (req.body.firstname) {
    user.firstname = req.body.firstname
  }
  if (req.body.title) {
    user.title = req.body.title;
  }
  if (req.body.url) {
    user.url = req.body.url;
  }

  if (req.body.tags) {
    user.tags = req.body.tags;
  } else {
    user.tags = new Array;
  }

  if (req.body.profileImg) {
    user.profileImg = req.body.profileImg;
  } else {
    user.profileImg = "app/img/user.svg";
  }

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};