'use strict';
app.controller('WhiteboardCtrl', function ($scope, authentication, $mdDialog, $window) {
    $scope.saveScribble = function (ev) {
        $mdDialog.show({
                controller: SaveDialogController,
                templateUrl: 'app/views/whiteboard-save-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {
                    authentication: authentication

                }

            })
            .then(function () {
                return true;
            }, function () {
                return true;
            });
    };
    $scope.hashtags = [];
    $scope.contributors = [];
    $scope.desciption = "";
    $scope.milestons = [];
    $scope.title = "";


    //DrawingBoard
    // $localStorage.$reset();

    $scope.drawingModes = ['draw', 'eraser', 'fill'];
    $scope.webStorage = 'session';
    $scope.drawingMode = 'draw';
    $scope.drawColor = '#222';
    $scope.eraseColor = '#EEE';
    $scope.lineWidth = 3;
    $scope.backgroundColor = '#EEE';

    $scope.setCanvasStyle = function () {
        var height = document.getElementById('whiteboard-main').offsetHeight -5;
        console.log(height);
        var width = document.getElementById('whiteboard-main').offsetWidth -90;
         $scope.canvasWidth =  width;
    $scope.canvasHeight = height;
         $scope.clear();
        return {
            "height": height + 'px',
            "width": width+ 'px'
        }
    }

    $scope.drawingboardRemote = {
        'startDraw': function (event) {
            console.log('start drawing', event);
        },
        'endDraw': function (event) {
            console.log('end drawing', event);
        },
        'drawing': function (event) {
            //console.log('drawing', event);
        },
        'startErase': function (event) {
            console.log('start erase', event);
        },
        'endErase': function (event) {
            console.log('end erase', event);
        },
        'erasing': function (event) {
            //console.log('erasing', event);
        },
        'fill': function (event) {
            console.log('filled', event);
        }
    };

    $scope.getDataURL = function () {
        console.log($scope.drawingboardRemote.toDataURL('image/png'));
    };

    $scope.clear = function () {
        console.log($scope.drawingboardRemote.clear());
    };

    $scope.undo = function () {
        console.log($scope.drawingboardRemote.undo());
    };

    $scope.redo = function () {
        console.log($scope.drawingboardRemote.redo());
    };

    $scope.clearHistory = function () {
        console.log($scope.drawingboardRemote.clearStorage());
    };

});


function SaveDialogController($scope, $mdDialog, authentication) {
    $scope.credentials = {
        email: "",
        password: ""
    };
    $scope.placeholderTitle = "aktuells daum udn Uhrzeit";
    $scope.title = "";
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.save = function () {
        if ($scope.isLoggedIn) {
            authentication
                .login($scope.credentials)
                .then(function () {
                    $scope.cancel();
                    $scope.setSignInStatus();
                    /*Todo    erstellen einer Idee mit $scope.hashtags =[];
    $scope.contributors 
    $scope.desciption 
    $scope.milestons 
    $scope.title = 
    dem aktuellen datum und Uhrzeit 
    scribble als vektordatei
 */
                });
        } else {
            $scope.cancel();

            /*Todo    erstellen einer Idee mit $scope.hashtags =[];
    $scope.contributors 
    $scope.desciption 
    $scope.milestons 
    $scope.title = 
    dem aktuellen datum und Uhrzeit 
    scribble als vektordatei
 */
        }

    };
}