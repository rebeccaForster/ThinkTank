(function() {

  angular
    .module('App')
    .service('indexData', IndexData);


  function IndexData ($http, authentication, $q) {

    var tags = [];
    var users = [];

    var getAllTags = function () {
      $http.get("/api/indexData/tags").then(function (response) {
          tags = response.data;
        });
        return $q.when(tags);
    };

    var loadAllUsers = function() {
       $http.get("/api/indexData/users").then(function (response) {
            users = response.data;
          });
          return $q.when(users);
      }

    return {
      getAllTags : getAllTags, 
      loadAllUsers : loadAllUsers
    };
  }

})();