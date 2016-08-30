(function(){
  'use strict';


  angular.module('App')
         .factory('dashService', function ($http, $q) {
 
          return {
            loadAllIdeas : function() {
                // $http.get("/api/dashboardData/allideas").then(function (response) {
                return $http.get("/api/ideaData/getAllIeas").then(function (response) {
                  return response.data;
                  console.log( response.data);
                });
             }, 

             searchIdeasByTag : function(tags) {
                return $http.get("/api/dashboardData/bytags", {params: {"tags": tags.join(", ")}})
                  .then(function (response) {
                      return response.data;
                });
             }, 

             searchIdeasByQuery : function(query) {
              return $http.get("/api/dashboardData/byquery", {params: {"tags": query}})
                  .then(function (response) {
                      return response.data;
                });
             }
          };
  }
);
})();