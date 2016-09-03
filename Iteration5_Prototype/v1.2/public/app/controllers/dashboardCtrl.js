'use strict';
angular
    .module('App')
    // the controller is used on the dashboard and profile site the reason ist that the functionaity is the same only the font design is differnt
    .controller('DashboardCtrl', function ($scope, dashService, profileService, ideaService, indexData, $location, $mdDialog, $mdMedia, $timeout) {

        $scope.ideas = [];

        // loads all ideas from the server and save it in a variable.
        // this variable will be loaded in the html  
        dashService
            .loadAllIdeas()
            .then(function (res) {
                console.log(res);
                $scope.ideas = res;
            });

        $scope.getUser = function (id) {
            profileService
                .getUser(id)
                .then(function (res) {

                    console.log('getuser:', res);
                });

        };
        $scope.getIdea = function (id) {
            ideaService
                .getIdea(id)
                .then(function (res) {

                    console.log('getidea:', res);
                });
        };

        $scope.hashtags = [];
        // loads all hashtags with name and priority from the server and save it in a variable.
        // this variable will be loaded in the hashtag popup 
        indexData
            .getAllTags()
            .then(function (res) {
                $scope.hashtags = res;
            });

        /* function: open an dialog with all hashtags and selected hashtags
                        via the dialog can hashtags be added or cleared to the searchbar
                        after the dialog is closed the dashboard must be updated with
                        the selected hashtags and the sorting item of the hashtag*/
        // input: $event
        // output: -
        $scope.searchHashtag = function (ev) {
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
                .then(function () {}, function () {
                    $scope.updateDashboard();
                });
        }

        /*
        function: calculate the days which are left after the idea was created
        input: date when the idea was created
        output: number of days which are left after the idea was created
        */
        $scope.calculateIdeaLeftDays = function (date) {
            var currentDate = new Date();
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
            if (date = '') {
                var dateParts = date.split("/");
                var createdDate = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0], 0, 0, 0);
                var days = (currentDate - createdDate) / (1000 * 60 * 60 * 24); // subtraiktion sind ms und umrechnen in tage

                return days;
            }
            return 0;

        }

        // number of columns of the dashboard site for md-cards
        $scope.maxColumn = 3;
        // number of columns of the profile site for md-cards
        $scope.maxProfileColumn = 2;


        /*
           function: 
           input: id of the idea
           output:
           */
        $scope.commentIdea = function (id) {


            }
            /*
              function: 
              input: id of the idea
              output:
              */
        $scope.followIdea = function (id) {

            }
            /*
              function: 
              input: id of the idea
              output:
              */
        $scope.participateIdea = function (id) {

        }



        /*
           function: 
           input: id of the idea
           output:
           */
        $scope.showProfile = function (profile, ev) {
            $mdDialog.show({
                    controller: ProfilePopupController,
                    templateUrl: 'app/views/profile-popup.html',
                    targetEvent: ev,
                    scope: $scope, // use parent scope in template
                    preserveScope: true,
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: {
                        profile: profile
                    }
                })
                .then(function () {}, function () {});


        };
        $scope.ideaCardAuthor = [];
        $scope.getIdeaCardAuthor = function (id) {
            profileService
                .getUser(id)
                .then(function (res) {

                    $scope.ideaCardAuthor.push(res);
                });

        };



        $scope.ideaAuthor = '';

        $scope.getIdeaAuthor = function (id) {
            profileService
                .getUser(id)
                .then(function (res) {

                    $scope.ideaAuthor = (res);
                });

        };


        $scope.ideaContr = [];

        $scope.getIdeaContr = function (id) {
            profileService
                .getUser(id)
                .then(function (res) {

                    $scope.ideaContr.push(res);
                });

        };

        $scope.addSearchTag = function (indexIdea, IndexTag, ev) {
            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Add Hashtag')
                .textContent('Index Idea: ' + indexIdea + '  Index Tag: ' + IndexTag)
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );
        }


        $scope.setImgPath = function (img) {
            var path = ('app/' + img);
            return path;
        }
        $scope.openWhiteboard = function (id) {
            $location.url("/whiteboard" + "/" + id);

        }
        $scope.showIdea = function (idea, ev) {
            $mdDialog.show({
                    controller: IdeaPopupController,
                    templateUrl: 'app/views/idea-popup.html',
                    scope: $scope, // use parent scope in template
                    preserveScope: true,
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: {
                        idea: idea
                    }
                })
                .then(function () {
                    $scope.saveComment = defaultCommentText;

                }, function () {
                    $scope.saveComment = defaultCommentText;

                });


        };



        var defaultCommentText = {
            author: -1,
            text: '',
            likeIdeaStatus: false,
            newInputStatus: false,
            troubleStatus: false,
            other: false
        };
        $scope.saveComment = defaultCommentText;

        $scope.newInputText = '';
        $scope.likeIdeaText = '';
        $scope.troubleText = '';
        $scope.otherText = '';
        // set the status of the different comment reactions
        $scope.setNewInputStatus = function () {
            $scope.saveComment.newInputStatus = !$scope.saveComment.newInputStatus;
            if ($scope.saveComment.newInputStatus) {
                $scope.newInputText = 'Explain your brilliant idea!';
            } else {
                $scope.newInputText = '';
            }
        };
        $scope.setLikeIdeaStatus = function () {
            $scope.saveComment.likeIdeaStatus = !$scope.saveComment.likeIdeaStatus;
            if ($scope.saveComment.likeIdeaStatus) {
                $scope.likeIdeaText = 'What do you like about the idea?';
            } else {
                $scope.likeIdeaText = '';
            }
        };
        $scope.setTroubleStatus = function () {
            $scope.saveComment.troubleStatus = !$scope.saveComment.troubleStatus;
            if ($scope.saveComment.troubleStatus) {
                $scope.troubleText = 'Where do you see problems?';
            } else {
                $scope.troubleText = '';
            }
        };
        $scope.setOtherComment = function () {
            $scope.saveComment.other = !$scope.saveComment.other;
            if ($scope.saveComment.other) {
                $scope.otherText = 'Something else.';
            } else {
                $scope.otherText = '';
            }

        };

        $scope.sendComment = function () {
            if (!$scope.isLoggedIn) {
                var test = false;
                test = $scope.showLoginBox();

            }

        };

    });


function IdeaPopupController($scope, $mdDialog, idea) {
    $scope.getIdea(idea._id);
    $scope.selectedIdea = idea;
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}

function ProfilePopupController($scope, $mdDialog, profile, profileService) {
    $scope.getUser(profile._id);
    $scope.user = profile;
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };


}


function HashtagPopupController($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}