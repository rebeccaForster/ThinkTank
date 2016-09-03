'use strict';
app.controller('ProfileCtrl', function ($scope, indexData, $mdDialog, authentication, profileService, ideaService) {
    $scope.user = authentication.currentUser();
    $scope.isProfile = true;
    $scope.credentials = {
        email: $scope.user.email,
        name: $scope.user.name,
        title: $scope.user.title,
        firstname: $scope.user.firstname,
        url: $scope.user.url,
        profileImg: $scope.user.profileImg
    };
    
    
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
    
    
    // number of columns of the profile site for md-cards
        $scope.maxProfileColumn = 2;
    $scope.addHashtags = function (ev) {
        $scope.hashtags = [];
        indexData
            .getAllTags()
            .then(function (res) {
                $scope.hashtags = res;
            });
        $scope.addHashtag = '';
        $mdDialog.show({
                controller: HashtagPopupController,
                templateUrl: 'app/views/hashtag-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {}
            })
            .then(function () {}, function () {});
    }

    $scope.updateDescription = function (ev) {
        $mdDialog.show({
                controller: UpdateProfilePopupController,
                templateUrl: 'app/views/register-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {}
            })
            .then(function () {}, function () {});
    }
});


function UpdateProfilePopupController($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}