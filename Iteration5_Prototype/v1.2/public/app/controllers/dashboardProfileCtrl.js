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