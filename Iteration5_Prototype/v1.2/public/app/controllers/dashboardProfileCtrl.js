'use strict';
angular
	.module('App')
	.controller('DashboardProfileCtrl', function ($scope, dashService, indexData, $location, $mdDialog, $mdMedia, $timeout) {
		
		$scope.ideas = {};
		$scope.users = [];

		dashService
		      .loadAllIdeas()
		      .then( function( res ) {

                $scope.ideas = res;
                console.log($scope.ideas[4].title)
            });

		indexData
		      .loadAllUsers()
		      .then( function( res ) {
		        
                $scope.users = res;
                console.log($scope.users[1].name)
		      });

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


    $scope.user = $scope.users[3];

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

    $scope.openWhiteboard = function () {
        $timeout(function() {
            var el = document.getElementById('nav-item0');
            angular.element(el).triggerHandler('click');
        }, 0);
        //$location.url("/whiteboard");

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
            .then(function () {}, function () {});
    };
});

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





        $scope.openWhiteboard = function () {
            $timeout(function () {
                var el = document.getElementById('nav-item0');
                angular.element(el).triggerHandler('click');
            }, 0);
            //$location.url("/whiteboard");

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
            if(!$scope.isLoggedIn){
                var test= false;   
                 test = $scope.showLoginBox();
                
            }
        
        };

    });
>>>>>>> 04b2a76da00dae5523f1c56470b415734ae7828f



function IdeaPopupController($scope, $mdDialog, ideaIndex) {
    $scope.selectedIdea = $scope.ideas[ideaIndex];

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}

function ProfilePopupController($scope, $mdDialog, profileIndex) {
    $scope.user = $scope.users[profileIndex];

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };


}