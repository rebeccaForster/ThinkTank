'use strict';
app.controller('ContactsCtrl', function($scope, $mdDialog,profileService, ideaService) {
       
     profileService
        .loadAllUsers()
        .then(function (res) {

            $scope.getAllUserList = res;
        });
    
   
       
    
      

    });