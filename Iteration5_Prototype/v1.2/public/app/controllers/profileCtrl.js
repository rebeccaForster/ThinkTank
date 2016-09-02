'use strict';
app.controller('ProfileCtrl', function ($scope, indexData, $mdDialog, authentication) {
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