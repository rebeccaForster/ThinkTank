(function(){
  'use strict';

  // angular.module('App')
  //        .service('dashService', ['$http', '$q', function ($scope, $http, $q) {

  angular.module('App')
         .factory('dashService', function ($http, $q) {

          var dash = null; 

          return {
            loadDashboard : function() {
              $http.get("/dashboardData").then(function (response) {
                  dash = response.data;
              });

              return $q.when(dash);
              }
          };
  }
);
})();


      // loadDashboardbySearch : function(query, sort) {
      //   $http.get("/dashboard/:query/:sort").then(function (response) {
      //       $scope.dash = response.data;
      //   });

      //   return $q.when(dash);
      // }

      // loadFollowedDashboard: function(userid, sort) {
      //     $http.get("/dashboard/follow/:userid/:sort").then(function (response) {
      //       $scope.dash = response.data;
      //   });

      //   return $q.when(dash);
      // }

