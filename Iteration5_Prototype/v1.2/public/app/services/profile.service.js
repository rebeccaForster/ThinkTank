(function() {

  angular
    .module('App')
    .service('profileService', ProfileService);


  function ProfileService ($http, authentication) {

    var loadAllUsers = function () {
      $http.get("/api/userData/getAllUsers").then(function (response) {
          var users = response.data;
      });
      return $q.when(users);
    };

    var getUser = function(id) {
      var a = "/api/userData/getUser/";
        $http.get(a.concat(id)).then(function (response) {
          var idea = response.data;
          console.log(idea);
        });
        return $q.when(idea);
     };

    return {
      loadAllUsers : loadAllUsers, 
      getUser : getUser
    };
  }

})();