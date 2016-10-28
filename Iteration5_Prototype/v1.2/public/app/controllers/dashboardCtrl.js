'use strict';
angular
    .module('App')
    // the controller is used on the dashboard and profile site the reason ist that the functionaity is the same only the font design is differnt
    .controller('DashboardCtrl', function ($scope, dashService, indexData, $location, $mdDialog, $mdMedia, $timeout, ideaService) {


        //The function is called, as soon as the dashboard html screen will be open. The goal of the function is to update idea list
        $scope.updateIdeaList();

        //The function is called, as soon as the dashboard html screen will be open. The goal of the function is to load the hashtag list
        $scope.loadHashtagList();


        /* function: open an dialog with all hashtags and selected hashtags
                            via the dialog can hashtags be added or cleared to the searchbar
                            after the dialog is closed the dashboard must be updated with
                            the selected hashtags and the sorting item of the hashtag
            input: 
                    ev: $event as input
            output: -
            */
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

        //returns true, if the dashboard controller is bind.
        $scope.isDashbaord = true;

    });


