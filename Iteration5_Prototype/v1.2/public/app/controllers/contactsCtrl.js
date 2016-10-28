'use strict';
/* This controller handles all fronted specific task from the contact screen*/
app.controller('ContactsCtrl', function ($scope, $mdDialog, profileService, ideaService) {
    
    /* loads all the signed up user and will be used in the contacts html page to list the users.*/
    profileService
        .loadAllUsers()
        .then(function (res) {

            $scope.getAllUserList = res;
        });


});