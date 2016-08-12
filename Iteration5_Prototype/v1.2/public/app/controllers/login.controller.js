(function () {

  angular
  .module('App')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication'];
  function loginCtrl($location, authentication, $scope, $mdDialog, $mdMedia) {
    // var vm = this;

    $scope.credentials = {
      email : "",
      password : ""
    };

    $scope.onSubmit = function () {
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