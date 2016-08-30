(function(){
  'use strict';


  angular.module('App')
         .factory('dashService', function ($http, $q) {
 
        var ideas = []; 
        var users = [];

          return {
            loadAllIdeas : function() {
                // $http.get("/api/dashboardData/allideas").then(function (response) {
                $http.get("/api/ideaData/getAllIeas").then(function (response) {
                  ideas = response.data;
                  console.log(ideas);
                });
                return $q.when(ideas);
             }, 

             searchIdeasByTag : function(tags) {
                $http.get("/api/dashboardData/bytags", {params: {"tags": tags.join(", ")}})
                  .then(function (response) {
                      ideas = response.data;
                });
                  return $q.when(ideas);
             }, 

             searchIdeasByQuery : function(query) {
              $http.get("/api/dashboardData/byquery", {params: {"tags": query}})
                  .then(function (response) {
                      ideas = response.data;
                });
                  return $q.when(ideas);
             }
          };
  }
);
})();