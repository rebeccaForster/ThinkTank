'use strict';
app.controller('ContactsCtrl', function($scope,indexData, $mdDialog,profileService, ideaService) {
        indexData
        .loadAllUsers()
        .then(function (res) {

            $scope.getAllUserList = res;
        });
    
   
        $scope.getUser = function (id) {
            profileService
                .getUser(id)
                .then(function (res) {

                   $scope.getProfileInfo =  res;
                });

        };
        $scope.getIdea = function (id) {
            ideaService
                .getIdea(id)
                .then(function (res) {

                    $scope.getIdeaInfo = res;
                });
        };
    
        /*
           function: 
           input: id of the idea
           output:
           */
        $scope.showProfile = function (id, ev) {
                $scope.getUser(id);

            $mdDialog.show({
                    controller: ProfilePopupController,
                    templateUrl: 'app/views/profile-popup.html',
                    targetEvent: ev,
                    scope: $scope, // use parent scope in template
                    preserveScope: true,
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: {
                    }
                })
                .then(function () {}, function () {});


        };
     $scope.showIdea = function (id, ev) {
                $scope.getIdea(id);

            $mdDialog.show({
                    controller: IdeaPopupController,
                    templateUrl: 'app/views/idea-popup.html',
                    scope: $scope, // use parent scope in template
                    preserveScope: true,
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: {
                    }
                })
                .then(function () {
                    $scope.saveComment = defaultCommentText;

                }, function () {
                    $scope.saveComment = defaultCommentText;

                });


        };

    });