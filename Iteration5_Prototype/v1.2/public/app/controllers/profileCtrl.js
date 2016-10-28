'use strict';
/* controller which handles all functionality of the profile html screen*/
app.controller('ProfileCtrl', function ($scope, indexData, $mdDialog, authentication, profileService, ideaService) {
    // set default user of the profile page
    $scope.getProfileInfo = $scope.user;

    /*
       function: set hashtags in the hashtag pop-up, which are selected in teh user profile
       input: tags: name of the hashtags
       output:-
       */
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

    //load hashtag list
    $scope.loadHashtagList();

    //set hashtags of the user, when the page is loads
    setHashtags($scope.user.tags);

    /*
          function: open hashtag pop-up
          input: ev : $event
          output:-
          */
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
                    //after closing the pop-up save the new profile data
                    updateProfileData();
                });
    }

    /*
        function: add new hahstag to the hashtag list
        input: -
        output:-
        */
    $scope.addNewHastag = function () {

        var dummyNewHashtag = {
            name: $scope.addHashtag,
            priority: 0 // 0 ist default wert, wenn er neu initalisiert wird
        }
        $scope.addItemToHashtagList(dummyNewHashtag);

        $scope.setSelectedHashtags($scope.addHashtag, false);
        $scope.addHashtag = '';

        //reset the text area
        $scope.hashtagForm.$setPristine();
        $scope.hashtagForm.$setUntouched();

    }

    /*
      function: open the descirption of the user pop-up
      input: ev: $event
      output:-
      */
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
                    //after closing the pop-up save the new profile data
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

    /*
     function: update the profile data and sent the new data to the server,
                 if the server request succesfull, get the actual signed in user
                 and update the data 
     input: -
     output:-
     */
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