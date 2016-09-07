'use strict';
app.controller('ProfileCtrl', function ($scope, indexData, $mdDialog, authentication, profileService, ideaService) {
 
       $scope.credentials = {
        email: $scope.user.email,
        name: $scope.user.name,
        title: $scope.user.title,
        firstname: $scope.user.firstname,
        url: $scope.user.url,
        profileImg: $scope.user.profileImg
    };
        $scope.selectedHashtags = $scope.user.tags;
    // number of columns of the profile site for md-cards
        $scope.maxProfileColumn = 2;
    $scope.addHashtags = function (ev) {
        
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
                templateUrl: 'app/views/user-data-popup.html',
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