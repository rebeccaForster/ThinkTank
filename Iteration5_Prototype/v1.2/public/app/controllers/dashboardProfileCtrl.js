'use strict';
angular
	.module('App')
	.controller('DashboardProfileCtrl', function ($scope, dashService, $location, $mdDialog, $mdMedia, $timeout) {
		
		$scope.ideas = {};
		$scope.users = [];

		dashService
		      .loadDashboard()
		      .then( function( res ) {

                $scope.ideas = res;
                console.log($scope.ideas[4].title)
		      });

		dashService
		      .loadUsers()
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

    $scope.getStatusHashtag = function (id) {

        for (var i in $scope.selectedHashtags) {
            if ($scope.selectedHashtags[i] == id) {
                return true;
            }
        }
        return false;
    }
    $scope.selectedHashtags = [];

    $scope.sorting = [
        {
            "id": 0,
            "title": "Latest Ideas"
        }, {
            "id": 1,
            "title": "Most popular"
        }, {
            "id": 2,
            "title": "Friedhof"
        }, {
            "id": 3,
            "title": "Himmel"
        }];

    $scope.getHashtagStyle = function (priority) {

        var size = "0px";
        switch (priority) {
        case 0:
            size = "12px"
            break;
        case 1:
            size = "14px"
            break;
        case 2:
            size = "16px"
            break;
        case 3:
            size = "18px"
            break;
        case 4:
            size = "20px"
            break;

        default:
            size = "12px"
        }
        return {
            "font-size": size
        }
    }

    //init
    $scope.sortingType = $scope.sorting[0].title;
    $scope.hashtags = [
        {
            id: 0,
            name: 'aReis',
            priority: 0
        }, {
            id: 1,
            name: 'wPepperoni',
            priority: 2
        },
        {
            id: 2,
            name: 'eSausage',
            priority: 4
        },
        {
            id: 3,
            name: 'Black Olives',
            priority: 1
        },
        {
            id: 4,
            name: 'rGreen Peppers',
            priority: 3
        },
        {
            id: 5,
            name: 'gSausage',
            priority: 4
        },
        {
            id: 6,
            name: 'kBlack Olives',
            priority: 1
        },
        {
            id: 7,
            name: 'uGreen Peppers',
            priority: 3
        },
        {
            id: 8,
            name: 'dBlack Olives',
            priority: 1
        },
        {
            id: 9,
            name: 'hGreen Peppers',
            priority: 3
        }, {
            id: 10,
            name: 'kReis',
            priority: 0
        }, {
            id: 11,
            name: 'mvPepperoni',
            priority: 2
        },
        {
            id: 12,
            name: 'Sausage',
            priority: 4
        },
        {
            id: 13,
            name: 'vBlack Olives',
            priority: 1
        },
        {
            id: 14,
            name: 'dGreen Peppers',
            priority: 3
        }, {
            id: 15,
            name: 'rPepperoni',
            priority: 2
        },
        {
            id: 16,
            name: 'daBlack Olives',
            priority: 1
        },
        {
            id: 17,
            name: 'fGreen Peppers',
            priority: 3
        },
        {
            id: 18,
            name: 'nBlack Olives',
            priority: 1
        },
        {
            id: 19,
            name: 'gGreen Peppers',
            priority: 3
        }
  ];
    $scope.hashtagSelected = function (id) {
        for (var i in $scope.selectedHashtags) {
            if ($scope.selectedHashtags[i] == id) {
                return true;
            }
        }
        return false;
    }
    $scope.setHashtags = function (id, status) {
        if (!status) {
            $scope.selectedHashtags.push(id);
        } else {
            $scope.selectedHashtags.splice($scope.selectedHashtags.indexOf(id), 1);

        }
    }
    $scope.changeSortingType = function(index){
        $scope.sortingType= index;
        $scope.updateDashboard();
    
    }
    $scope.updateDashboard = function () {
        // ToDo: es wurden neue Tags hinzugefügt bzw. entfernt und hier müsstest du mithilfe der Tags & des auswählten Sorting die Liste erneuern
        // $scope.sortingType gibt den Namen der Sortierung zurück
        // $scope.selectedHashtags  gibt alle Tags IDs an, nach denen man suchen soll
    }


    

});



function HashtagPopupController($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}

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