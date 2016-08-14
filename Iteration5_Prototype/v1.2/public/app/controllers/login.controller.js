(function () {

  angular
  .module('App')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication'];
  function loginCtrl($location, authentication, $scope) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.emailAdress = "";

    vm.onSubmit = function () {

      authentication
        .login(vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('profile');
        });
    };
}

})();