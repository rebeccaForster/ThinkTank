'use strict';
angular
    .module('App')
    .controller('DashboardProfileCtrl', function ($scope, dashService, profileService, ideaService, indexData, $location, $mdDialog, $mdMedia, $timeout) {

        $scope.ideas = {};
        $scope.users = [];

        dashService
            .loadAllIdeas()
            .then(function (res) {

                $scope.ideas = res;
            });


        $scope.hashtags = [];

        indexData
            .getAllTags()
            .then(function (res) {
                $scope.hashtags = res;
            });

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

        $scope.calculateIdeaLeftDays = function (date) {
            var currentDate = new Date();
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);

            var dateParts = date.split("/");

            var createdDate = new Date(dateParts[2], (dateParts[0] - 1), dateParts[1], 0, 0, 0);
            var days = (currentDate - createdDate) / (1000 * 60 * 60 * 24); // subtraiktion sind ms und umrechnen in tage
            return days;


        }

        $scope.maxColumn = 3;
        $scope.maxProfileColumn = 2;

        $scope.commentIdea = function (index, ev) {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Comment Idea')
                .textContent('Index: ' + index)
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );

        }
        $scope.followIdea = function (index, ev) {
            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Follow Idea')
                .textContent('Index: ' + index)
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );

        }
        $scope.participateIdea = function (index, ev) {
            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Participate Idea')
                .textContent('Index: ' + index)
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );

        }

        $scope.showProfile = function (index, ev) {
            $mdDialog.show({
                    controller: ProfilePopupController,
                    templateUrl: 'app/views/profile-popup.html',
                    targetEvent: ev,
                    scope: $scope, // use parent scope in template
                    preserveScope: true,
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: {
                        profileIndex: index
                    }
                })
                .then(function () {}, function () {});


        };


        $scope.getUser = function (id) {
            profileService
                .getUser(id)
                .then(function (res) {

                    $scope.user = res; 
                });

        };
        $scope.getIdea = function (id) {
            ideaService
                .getIdea(id)
                .then(function (res) {

                    $scope.selectedIdea = res;
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
            console.log(path);
            return path;
        }
        $scope.openWhiteboard = function (id) {
            $location.url("/whiteboard" + "/" + id);

        }
        $scope.showIdea = function (index, ev) {
            $mdDialog.show({
                    controller: IdeaPopupController,
                    templateUrl: 'app/views/idea-popup.html',
                    scope: $scope, // use parent scope in template
                    preserveScope: true,
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: {
                        ideaIndex: index
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


function IdeaPopupController($scope, $mdDialog, ideaIndex) {

    $scope.getIdea(ideaIndex);
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}

function ProfilePopupController($scope, $mdDialog, profileIndex, profileService) {
    $scope.getUser(profileIndex);

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