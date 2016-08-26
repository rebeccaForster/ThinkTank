'use strict';
app.controller('WhiteboardCtrl', function ($scope, authentication, $mdDialog) {
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

    // $localStorage.$reset();

    $scope.webStorage = 'session';
    $scope.drawingMode = 'draw';
    $scope.drawColor = '#222';
    $scope.lineWidth = 4;
    $scope.backgroundColor = '#EEE';

    $scope.setDrawingMode = function (mode) {
        $scope.drawingboardRemote.setDrawingMode(mode);
    }
    $scope.setDrawColor = function (color) {
        $scope.drawingboardRemote.setDrawColor(color);

    }
    $scope.setCanvasStyle = function () {
        var height = document.getElementById('whiteboard-main').offsetHeight - 90;
        var width = document.getElementById('whiteboard-main').offsetWidth - 90;
        $scope.canvasWidth = width;
        $scope.canvasHeight = height;
        $scope.clear();
        return {
            "height": height + 'px',
            "width": width + 'px'
        }
    }



    $scope.getDataURL = function () {
        console.log($scope.drawingboardRemote.toDataURL('image/png'));
    };

    $scope.clear = function () {
        $scope.drawingboardRemote.clear();
    };

    $scope.undo = function () {
        $scope.drawingboardRemote.undo();
    };

    $scope.redo = function () {
        $scope.drawingboardRemote.redo();
    };

    $scope.clearHistory = function () {
        $scope.drawingboardRemote.clearStorage();
    };




    var cmenu = CMenu('#circle-menu1')
        .config({
            totalAngle: 270, //deg,
            spaceDeg: 3, //deg
            start: 315,
            background: "#737373",
            backgroundHover: '#00bcd4',
            percent: 0.4, //%
            diameter: 250, //px
            horizontal: true,
            //start: -45,//deg
            animation: "into",
            hideAfterClick: false,
            menus: [
                {
                    icon: 'fa fa-font',
                    click: function () {
                        console.log('Function text input');
                    },
                    hideAfterClick: true,
                    disabled: true
                            },
                {
                    icon: 'fa fa-pencil',
                    click: function () {
                        $scope.setDrawingMode('draw');
                    },
                    hideAfterClick: true,
                    menus: [
                        {
                            title: 'dünn',
                            click: function () {
                                $scope.setLineWidth(4);
                            }
                                    }, {
                            title: 'normal',
                            click: function () {
                                $scope.setLineWidth(6);
                            }
                                    }, {
                            title: 'dick',
                            click: function () {
                                $scope.setLineWidth(10);
                            }
                                    }
                                ]
                            },
                {
                    title: 'color',
                    hideAfterClick: true,

                    menus: [
                        {
                            icon: 'circle-icon red',
                            click: function () {
                                $scope.setDrawColor('red');
                            }
                                    }, {
                            icon: 'circle-icon black',
                            click: function () {
                                $scope.setDrawColor('black');
                            }
                                    },
                        {
                            icon: 'circle-icon blue',
                            click: function () {
                                $scope.setDrawColor('blue');
                            }
                                            },
                        {
                            icon: 'circle-icon orange',
                            click: function () {
                                $scope.setDrawColor('orange');
                            }
                                                },
                        {
                            icon: 'circle-icon yellow',
                            click: function () {
                                $scope.setDrawColor('yellow');
                            }
                                                    },
                        {
                            icon: 'circle-icon white',
                            click: function () {
                                $scope.setDrawColor('white');
                            }
                                                        }
                                                            ]


                                                    },
                {
                    title: 'fill',

                    click: function () {
                        $scope.setDrawingMode('fill');
                    }


                                                    },
                {
                    icon: 'fa fa-eraser',
                    hideAfterClick: true,

                    menus: [
                        {
                            title: 'dünn',
                            click: function () {
                                $scope.setLineWidth(4);
                            }
                                    }, {
                            title: 'normal',
                            click: function () {
                                $scope.setLineWidth(6);
                            }
                                    }, {
                            title: 'dick',
                            click: function () {
                                $scope.setLineWidth(10);
                            }
                                    }
                                ],
                    click: function () {
                        $scope.setDrawingMode('eraser');
                    }
                },


                {
                    icon: 'fa fa-microphone',
                    click: function () {
                        console.log('Function keyboard_voice');
                    },
                    disabled: true
                            },
                {
                    icon: 'fa fa-video-camera',
                    click: function () {
                        console.log('Function record');
                    },
                    disabled: true
                                },
                {
                    icon: 'fa fa-paperclip',
                    click: function () {
                        console.log('Function attach file');
                    },
                    disabled: true

                                }
                                ]
        }).show();
    var isToolsOpen = false;
    $scope.openTools = function(){
        if(!isToolsOpen){
            cmenu.show();
        }
        else{
            cmenu.hide();
        }
        isToolsOpen = !isToolsOpen;
        
    }
    $scope.setLineWidth = function (size) {
        $scope.drawingboardRemote.setLineWidth(size);
    }

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