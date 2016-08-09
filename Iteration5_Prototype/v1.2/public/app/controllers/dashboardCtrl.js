'use strict';
angular
	.module('App')
	.controller('DashboardCtrl', function ($scope, dashService, $location, $mdDialog, $mdMedia) {
		
		$scope.ideas = {};
		$scope.users = [];

		dashService
		      .loadDashboard()
		      .then( function( res ) {
                  setTimeout(function() {
                    $scope.$apply(function() {
                        $scope.ideas = res;
                        console.log($scope.ideas[4].title)
                  });
                  }, 3000);
                  
		      });

		dashService
		      .loadUsers()
		      .then( function( res ) {
		        
                $scope.users = res;
                console.log($scope.users[1].name)
		      });

	$scope.maxColumn = 3;
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

	    $scope.showAuthor = function (ev) {
	        $mdDialog.show(
	            $mdDialog.alert()
	            .clickOutsideToClose(true)
	            .title('Show Author')
	            .textContent()
	            .ariaLabel('Alert Dialog Demo')
	            .ok('Got it!')
	            .targetEvent(ev)
	        );

	    }


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
	        $location.url("/whiteboard");
	    }
	    $scope.selectedIndex = 0;
	    $scope.showIdea = function (index, ev) {
	        $scope.selectedIndex = index;
	        $mdDialog.show({
	            controller: DialogController,
	            templateUrl: 'app/views/idea-popup.html',
	            parent: angular.element(document.body),
	            targetEvent: ev,
	            clickOutsideToClose: true,
	            fullscreen: true,
	            locals: {
	                dashboardScope: $scope
	            }
	        })


	    };

});

app.controller('gridListDemoCtrl', function ($scope) {
    this.column1 = buildGridModel(0, $scope.maxColumn, $scope.ideas);
    this.column2 = buildGridModel(1, $scope.maxColumn, $scope.ideas);
    this.column3 = buildGridModel(2, $scope.maxColumn, $scope.ideas);

    function buildGridModel(start, column, tileTmpl) {
        var it, results = [];
        var j = start;
        while (j < tileTmpl.length) {
            it = angular.extend({}, tileTmpl[j]);

            results.push(it);
            j = j + column;
        }
        return results;
    }
})




function DialogController($scope, $mdDialog, dashboardScope) {
    $scope.selectedIdea = dashboardScope.ideas[dashboardScope.selectedIndex];
    $scope.users = dashboardScope.users;

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}	


