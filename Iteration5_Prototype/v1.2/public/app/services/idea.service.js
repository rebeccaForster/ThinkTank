(function() {

  angular
    .module('App')
    .service('ideaService', IdeaService);


  function IdeaService ($http, authentication) {

    var saveNewIdea = function(idea, user) {
        var data = {
            idea: idea,
            user: user
        }
        return $http.post('/api/ideaData/saveNewIdea', data)
                .then(function (data) {
                    console.log(data.data.id);
                    return data.data.id;
        });

    };

    var getIdea = function(id) {
      var a = "/api/ideaData/getIdea/";
       return $http.get(a.concat(id)).then(function (response) {
          var idea = response.data;
          console.log(idea);
            return idea;
        });
     };

     var updateIdea = function(idea, user) {
        var data = {
            idea: idea,
            user: user
        }
        if (!idea.id) return "idea not valid";

        return $http.post('/api/ideaData/saveNewIdea', whiteboard)
                .success(function (data) {
                    console.log(data)
                    return data;
                });
    };

    var writeComment = function(ideaId, comment, user) {
        var data = {
            ideaID, ideaID, //String
            comment: comment, //object (text, reaction, optional: title, scribble )
            user: user //currentUser object
        }

        return $http.post('/api/ideaData/writeComment', whiteboard)
                .success(function (data) {
                    console.log(data)
                    return data;
                });
    };

    return {
      saveNewIdea : saveNewIdea, 
      updateIdea : updateIdea, 
      getIdea : getIdea
    };
  }

})();