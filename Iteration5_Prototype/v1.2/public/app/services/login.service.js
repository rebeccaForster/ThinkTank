(function () {

  angular
    .module('App')
    .service('login', loginService);

  loginService.$inject = ['$location', 'authentication'];
  function loginService($location, authentication) {
    var vm = this;

     vm.credentials = {
        email : "",
        password : ""
      };

      vm.onSubmit = function () {
        authentication
          .login($scope.credentials)
          .error(function(err){
            alert(err);
          })
          .then(function(){
            $location.path('profile');
          });
      };

  }

})();