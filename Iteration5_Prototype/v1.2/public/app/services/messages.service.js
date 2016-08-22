(function() {

  angular
    .module('App')
    .service('messagesService', MessagesService);


  function MessagesService ($http, authentication) {

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