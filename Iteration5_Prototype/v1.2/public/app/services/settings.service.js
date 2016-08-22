(function() {

  angular
    .module('App')
    .service('settingsService', SettingsService);


  function SettingsService ($http, authentication) {

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