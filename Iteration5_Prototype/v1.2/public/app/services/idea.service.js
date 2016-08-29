(function() {

  angular
    .module('App')
    .service('ideaService', IdeaService);


  function IdeaService ($http, authentication) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var saveNewIdea = function(idea, user) {
        var data = {
            idea: idea,
            user: user
        }
        return $http.post('/api/ideaData/saveNewIdea', data)
                .success(function (data) {
                    console.log(data)
                });
    };

     var updateIdea = function(idea, user) {
        var data = {
            idea: idea,
            user: user
        }

        return $http.post('/api/idea/new', whiteboard)
                .success(function (data) {
                    console.log(data)
                });
    };

    return {
      getProfile : getProfile, 
      saveNewIdea : saveNewIdea, 
      updateIdea : updateIdea
    };
  }

})();