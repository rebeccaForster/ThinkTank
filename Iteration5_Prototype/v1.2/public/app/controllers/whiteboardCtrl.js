'use strict';
app.controller('WhiteboardCtrl', function ($scope, authentication, $mdDialog, indexData, $window, ideaService, $stateParams) {
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


    $scope.contributors = [];
    $scope.contributorsList = [];
    indexData
        .loadAllUsers()
        .then(function (res) {

            $scope.contributorsList = res;
        });

    $scope.setSelectedContributors = function (name, status) {
        if (!status) {
            $scope.contributors.push(name);
        } else {
            $scope.contributors.splice($scope.contributors.indexOf(name), 1);

        }
    }
    $scope.author = '';
    $scope.desciption = "";
    $scope.milestones = [] ;
    $scope.milestoneList = [];
    $scope.ideaLifeTime = 30;
    $scope.ideaDayLeft = 0;
    
    indexData
        .loadAllMilestones()
        .then(function (res) {
            $scope.milestoneList = res;
        });

    $scope.setSelectedMilestones = function (name, status, extratime, icon) {
        var milestoneDefault = {
				name: name, 
				extratime: extratime,
				percentage: 0,
				icon: icon 
		};
        if (!status) {
            $scope.milestones.push(milestoneDefault);
        } else {
            $scope.milestones.splice($scope.milestones.indexOf(milestoneDefault), 1);

        }
    }


    //DrawingBoard
    // $localStorage.$reset(); 

    // $localStorage.$reset();

    $scope.webStorage = 'session';
    $scope.drawingMode = 'draw';
    $scope.drawColor = '#222';
    $scope.lineWidth = 4;
    $scope.backgroundColor = '#EEE';
    // todo anpassen der höhe an die größen der einzelnen verwendeten Klassen
    $scope.canvasWidth = $window.innerWidth - 90 - 100;
    $scope.canvasHeight = $window.innerHeight - 90 - 74;
    $scope.setDrawingMode = function (mode) {
        $scope.drawingboardRemote.setDrawingMode(mode);
    }
    $scope.setDrawColor = function (color) {
        $scope.drawingboardRemote.setDrawColor(color);

    }
    $scope.setCanvasStyle = function () {

        return {
            "height": $scope.canvasHeight + 'px',
            "width": $scope.canvasWidth + 'px'
        }
    }



    $scope.getDataURL = function () {
        $scope.drawingboardRemote.toDataURL('image/png');
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


    var draggable = document.getElementById('circle-menu1');
    draggable.addEventListener('touchmove', function (event) {
        var touch = event.targetTouches[0];

        // Place element where the finger is
        draggable.style.left = touch.pageX + 'px';
        draggable.style.top = touch.pageY + 'px';
        event.preventDefault();
    }, false);

    var cmenu = CMenu('#circle-menu1')
        .config({
            totalAngle: 360, //deg,
            spaceDeg: 3, //deg
            start: 0,
            background: "#737373",
            backgroundHover: '#00bcd4',
            pageBackground: "#283593",
            percent: 0.32, //%
            diameter: 250, //px
            horizontal: true,
            position: 'bottom',
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
                    icon: 'my-icon-pen',
                    click: function () {
                        $scope.setDrawingMode('draw');
                    }
                },

                {
                    icon: 'my-icon-strichstärke',
                    hideAfterClick: true,
                    menus: [
                        {
                            icon: 'my-icon-strichstärke-duenn',
                            click: function () {
                                $scope.setLineWidth(4);
                            }
                                    }, {
                            icon: 'my-icon-strichstärke-mittel',
                            click: function () {
                                $scope.setLineWidth(6);
                            }
                                    }, {
                            icon: 'my-icon-strichstärke-dick',
                            click: function () {
                                $scope.setLineWidth(10);
                            }
                                    }
                                ]
                            },
                {
                    icon: 'my-icon-color',
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
                    icon: 'my-icon-fill',

                    click: function () {
                        $scope.setDrawingMode('fill');
                    }


                                                    },
                {
                    icon: 'my-icon-eraser',
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
        });

    $scope.isToolsOpen = false;
    $scope.openTools = function () {
        if (!$scope.isToolsOpen) {
            cmenu
                .styles({
                    top: '50%',
                    left: '50%'
                })
                .show();
        } else {
            cmenu.hide();
        }
        $scope.isToolsOpen = !$scope.isToolsOpen;

    }
    $scope.setLineWidth = function (size) {
        $scope.drawingboardRemote.setLineWidth(size);
    }
    $scope.hashtags = [];
    indexData
        .getAllTags()
        .then(function (res) {
            $scope.hashtags = res;
        });
    $scope.addHashtag = '';
    $scope.addNewHastag = function () {

        // todo: add new hashtag to the list hastag list $scope.addHashtag
        // wenn das zu der Liste hinzugefügt wurde, muss auch nochmal die liste geupdatet werdne aktuell mache ich es nur lokal, dass kann dann gelöscht werden
        var dummyNewHashtag = {
            name: $scope.addHashtag,
            priority: 0 // 0 ist default wert, wenn er neu initalisiert wird
        }
        $scope.hashtags.push(dummyNewHashtag);

        $scope.setSelectedHashtags($scope.addHashtag, false);
        $scope.addHashtag = '';

        $scope.hashtagForm.$setPristine();
        $scope.hashtagForm.$setUntouched();

    }
    $scope.addHashtags = function (ev) {
        $mdDialog.show({
                controller: PopupController,
                templateUrl: 'app/views/hashtag-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {}
            })
            .then(function () {}, function () {
                $scope.updateHashtags();
            });
    }

    $scope.addDescription = function (ev) {
        $mdDialog.show({
                controller: PopupController,
                templateUrl: 'app/views/description-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {}
            })
            .then(function () {}, function () {
                $scope.updateDescription();
            });
    }

    $scope.$watch('title', function (newVal, oldVal) {
        if (newVal == '') {
            var now = new Date();
            $scope.title = now.getFullYear() + '_' + now.getDate() + '_' + now.getDay() + ' ' + now.getHours() + ':' + now.getMinutes();
        }
    });

    $scope.addMilestone = '';
    $scope.addNewMilestone = function () {

        // todo: add new milestone to the list hastag list $scope.addMilestone
        // wenn das zu der Liste hinzugefügt wurde, muss auch nochmal die liste geupdatet werdne aktuell mache ich es nur lokal, dass kann dann gelöscht werden
         var milestoneDefault = {
				name: $scope.addMilestone, 
				extratime: 0,
				icon: '' 
		};
        
        $scope.milestoneList.push(milestoneDefault);

        $scope.setSelectedMilestones($scope.addMilestone,false, 0, '');
        $scope.addMilestone = '';

        $scope.milestoneForm.$setPristine();
        $scope.milestoneForm.$setUntouched();

    }
    $scope.addMilestones = function (ev) {
        $mdDialog.show({
                controller: PopupController,
                templateUrl: 'app/views/milestone-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {}
            })
            .then(function () {}, function () {
                $scope.updateMilestones();
            });
    }

    $scope.statusMilestoneSelected = function (name) {

        for (var i in $scope.milestones) {
            if ($scope.milestones[i].name == name) {
                return true;
            }
        }
        return false;
    }


    $scope.addContributors = function (ev) {
        $mdDialog.show({
                controller: PopupController,
                templateUrl: 'app/views/contributers-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {}
            })
            .then(function () {}, function () {
                $scope.updateContributors();
            });
    }

    $scope.statusContributorsSelected = function (name) {

        for (var i in $scope.contributors) {
            if ($scope.contributors[i] == name) {
                return true;
            }
        }
        return false;
    }



    $scope.updateContributors = function() {
        //Todo hier $scope.contributors in die gespeicherte Idee updaten an den server
    }

    $scope.updateAuthor = function() {

        //Todo die registrierte Person als author der Idee registrieren und in die contributor liste hinzufügen plus updaten
    }
    $scope.updateMilestones = function() {
        //Todo hier $scope.milestones in die gespeicherte Idee updaten an den server

    }

    $scope.updateDescription = function() {
        //Todo hier $scope.desciption $scope.title in die gespeicherte Idee updaten an den server

    }
    
    $scope.updateHashtags = function() {

        //Todo hier $scope.hashtags $scope.title in die gespeicherte Idee updaten an den server

    }
    $scope.updatePrivacyStatus = function () {
        //Todo hier $scope.selectedPrivacyType  in die gespeicherte Idee updaten an den server
    }

    
    $scope.ideaId = $stateParams.ideaId || '-1';
     console.log($scope.ideaId);
    
    $scope.loadIdea = function (idea, edit) {
        //Todo diese Funktion muss alle Privacy, desciption, milesotnes, hashtags, contirbutors, whiteboard image Daten laden, 
        //Sie wird aufgerufen, wenn man auf dem Popup Idea aufs whiteboard klickt 
        // wenn man contributor ist bzw. die Idee bearbeiten möchte, ist edit true
        // Wie man die Funktion genau aufruft, weiß ich noch nicht, darüber muss ich mir noch gedanken machen

        //Frederic: die Idee bekommst du aus ideaService.getIdea(id) oder so, das baue ich gleich
        //edit bekommt man wenn man unter idea.contributors schaut ob da die currentUser.id drin ist, das müsste man hier in der Funktion kontrollieren
        console.log($scope.ideaId);
    }


    //Save New Idea serverside 
    $scope.saveNewIdea = function() {
        var user = authentication.currentUser();
        var idea = {
            title: $scope.title,
            description: $scope.desciption,
            contributors: $scope.contributors,
            milestones: $scope.milestones,
            tags: $scope.hashtags,
            scribble: $scope.drawingboardRemote.toDataURL('image/png')
        };

        ideaService.saveNewIdea(idea, user);

    };


    $scope.privacyTypesList = ["Only me & contributors", "Everyone", "Customer"];
    $scope.selectedPrivacyType = $scope.privacyTypesList[0];
    $scope.changeSortingType = function (index) {
        $scope.selectedPrivacyType = index;
        $scope.updatePrivacyStatus();
    };


    function SaveDialogController($scope, $mdDialog, authentication) {
        $scope.credentials = {
            email: "",
            password: ""
        };
        $scope.title = "";
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.save = function () {

            if(authentication.isLoggedIn()){
                //Save new idea
                $scope.saveNewIdea();
                $scope.cancel();
            } else {
                alert("Pleas log in first.");
            }

        };
    };

});


function PopupController($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}