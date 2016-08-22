(function() {

  angular
    .module('App')
    .service('whiteboardService', WhiteboardService);


  function WhiteboardService ($http, authentication) {

    // var getProfile = function () {
    //   return $http.get('/api/profile', {
    //     headers: {
    //       Authorization: 'Bearer '+ authentication.getToken()
    //     }
    //   });
    // };

    // return {
    //   getProfile : getProfile
    // };
  }

})();