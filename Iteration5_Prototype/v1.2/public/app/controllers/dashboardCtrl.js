'use strict';
angular
    .module('App')
    // the controller is used on the dashboard and profile site the reason ist that the functionaity is the same only the font design is differnt
    .controller('DashboardCtrl', function ($scope, dashService, indexData, $location, $mdDialog, $mdMedia, $timeout) {

        $scope.ideaList = [];

        // loads all ideas from the server and save it in a variable.
        // this variable will be loaded in the html  
        dashService
            .loadAllIdeas()
            .then(function (res) {
                console.log(res);
                $scope.ideaList = res;
            });



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


        // number of columns of the dashboard site for md-cards
        $scope.maxColumn = 3;









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




        $scope.isDashbaord = true;




    });


function IdeaPopupController($scope, $mdDialog) {

    $scope.isBack = false;

    $scope.hide = function () {

        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.back = function () {
        $scope.goBackPopup();

        $mdDialog.hide();

    };
    $scope.goWhiteboard = function (id) {
       $scope.openWhiteboard(id);
                $mdDialog.hide();


    }

}

function ProfilePopupController($scope, $mdDialog) {
    $scope.isBack = false;

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.back = function () {
        $scope.goBackPopup();

        $mdDialog.hide();
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