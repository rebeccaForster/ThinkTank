'use strict';
app.controller('ProfileCtrl', function ($scope, indexData, $mdDialog, authentication, profileService, ideaService) {

$scope.getProfileInfo = $scope.user;
    function setHashtags(tags) {
        var i = 0;
        if (tags != null) {
            while (i < tags.length) {
                if (!$scope.hashtagSelected(tags[i])) {
                    $scope.setSelectedHashtags(tags[i], false);
                }
                i++;
            }
        }
    }
     $scope.loadHashtagList();

    setHashtags($scope.user.tags);
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
            .then(function () {},
                function () {
                    updateProfileData();
                });
    }
      $scope.addNewHastag = function () {

        var dummyNewHashtag = {
            name: $scope.addHashtag,
            priority: 0 // 0 ist default wert, wenn er neu initalisiert wird
        }
        $scope.addItemToHashtagList(dummyNewHashtag);

        $scope.setSelectedHashtags($scope.addHashtag, false);
        $scope.addHashtag = '';

        $scope.hashtagForm.$setPristine();
        $scope.hashtagForm.$setUntouched();

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
            .then(function () {},
                function () {
                    updateProfileData();
                });
    }

    $scope.credentials = {
        email: $scope.user.email,
        name: $scope.user.name,
        title: $scope.user.title,
        firstname: $scope.user.firstname,
        url: $scope.user.url,
        profileImg: $scope.user.profileImg
    };

    function updateProfileData() {

        $scope.user.tags = $scope.selectedHashtags;
        $scope.user.email = $scope.credentials.email;
        $scope.user.name = $scope.credentials.name;
        $scope.user.title = $scope.credentials.title;
        $scope.user.firstname = $scope.credentials.firstname;
        $scope.user.url = $scope.credentials.url;
        $scope.user.profileImg = $scope.credentials.profileImg;


        profileService
            .updateUser(authentication.currentUser(), $scope.user)
            .success(function (data) {
                $scope.getSignInUser($scope.user._id);
             $scope.loadHashtagList();

            });

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