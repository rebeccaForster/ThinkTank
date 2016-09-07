'use strict';
app.controller('WhiteboardCtrl', function ($scope, authentication, $mdDialog, indexData, $window, ideaService, $stateParams, $rootScope, profileService, $mdToast, dataService) {
    $scope.saveScribble = function (ev) {

        if ($scope.ideaId == -1) {
            if ($scope.isLoggedIn) {
                $scope.login();
            } else {
                $scope.openSaveDialog();

            }
        } else {
            $scope.updateIdea();
        }

    };

    $scope.openSaveDialog = function (ev) {


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
            .then(function () {}, function () {});


    };

    $scope.login = function (ev) {

        $mdDialog.show({
                controller: LoginDialogController,
                templateUrl: 'app/views/login-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {
                    authentication: authentication,
                    isSendComment: false,
                    addFollowIdea: false,
                    addFollowPerson: false
                }

            })
            .then(function () {


            }, function () {
                $scope.openSaveDialog();

            });
    };
    $scope.contributors = [];
    $scope.contributorsId = [];
    $scope.contributorsList = [];
    profileService
        .loadAllUsers()
        .then(function (res) {

            $scope.contributorsList = res;
            console.log('contributorsList: ', $scope.contributorsList);
        });

    $scope.setSelectedContributors = function (name, id, status) {
        if (!status) {
            $scope.contributors.push(name);
            $scope.contributorsId.push(id);
        } else {
            $scope.contributors.splice($scope.contributors.indexOf(name), 1);
            $scope.contributorsId.splice($scope.contributorsId.indexOf(id), 1);

        }
    }
    $scope.changeMilestoneStatus = function (index) {
        if ($scope.milestones[index].percentage) {
            $scope.milestones[index].percentage = 0;
        } else {
            $scope.milestones[index].percentage = 1;
        }

    }
    $scope.author = '';
    $scope.desciption = "";
    $scope.milestones = [];
    $scope.milestoneList = [];
    $scope.ideaLifeTime = 30; //Angabe in Tagen, der Server speichert automatisch 30 falls nichts angegeben ist
    $scope.ideaDayLeft = 0;
    $scope.lastchanged = '';
    // indexData
    //     .loadAllMilestones()
    //     .then(function (res) {
    //         $scope.milestoneList = res;
    //     });
    dataService
        .loadAllMilestones()
        .then(function (res) {
            $scope.milestoneList = res;
        });
    console.log($scope.milestoneList);


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
        if ($scope.drawingboardRemote) {
            $scope.drawingboardRemote.clear();
        }
    };
    $scope.reloadImage = function (img) {
        if ($scope.drawingboardRemote) {

            $scope.drawingboardRemote.reloadImage(img);
        }
    };
    $scope.undo = function () {
        $scope.drawingboardRemote.undo();
    };

    $scope.redo = function () {
        $scope.drawingboardRemote.redo();
    };

    $scope.clearHistory = function () {
        if ($scope.drawingboardRemote) {

            $scope.drawingboardRemote.clearStorage();
        }
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
                    icon: 'my-icon-text',
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
                    icon: 'my-icon-voice',
                    click: function () {
                        console.log('Function keyboard_voice');
                    },
                    disabled: true
                            },
                {
                    icon: 'my-icon-video',
                    click: function () {
                        console.log('Function record');
                    },
                    disabled: true
                                },
                {
                    icon: 'my-icon-attach',
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
                controller: HashtagPopupController,
                templateUrl: 'app/views/hashtag-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {}
            })
            .then(function () {}, function () {});
    }

    $scope.addDescription = function (ev) {
        $mdDialog.show({
                controller: DescriptionPopupController,
                templateUrl: 'app/views/description-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {}
            })
            .then(function () {}, function () {});
    }


    $scope.$watch('title', function (newVal, oldVal) {
        if (newVal == '') {
            var now = new Date();
            $scope.title = now.getFullYear() + '_' + now.getDate() + '_' + now.getDay() + ' ' + now.getHours() + ':' + now.getMinutes();
        }
    });

    $scope.addMilestone = '';
    $scope.addNewMilestone = function () {
        var milestoneDefault = {
            name: $scope.addMilestone,
            extratime: 0,
            icon: ''
        };

        $scope.milestoneList.push(milestoneDefault);

        $scope.setSelectedMilestones($scope.addMilestone, false, 0, '');
        $scope.addMilestone = '';

        $scope.milestoneForm.$setPristine();
        $scope.milestoneForm.$setUntouched();

    }
    $scope.addMilestones = function (ev) {
        $mdDialog.show({
                controller: MilestonesPopupController,
                templateUrl: 'app/views/milestone-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {}
            })
            .then(function () {}, function () {});
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
                controller: ContrPopupController,
                templateUrl: 'app/views/contributers-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {}
            })
            .then(function () {}, function () {});
    }

    $scope.statusContributorsSelected = function (name) {

        for (var i in $scope.contributors) {
            if ($scope.contributors[i] == name) {
                return true;
            }
        }
        return false;
    }




    $scope.ideaId = $stateParams.ideaId;

    angular.element(document).ready(function () {
        //Todo diese Funktion muss alle Privacy, desciption, milesotnes, hashtags, contirbutors, whiteboard image Daten laden, 
        //Sie wird aufgerufen, wenn man auf dem Popup Idea aufs whiteboard klickt 
        // wenn man contributor ist bzw. die Idee bearbeiten möchte, ist edit true
        // Wie man die Funktion genau aufruft, weiß ich noch nicht, darüber muss ich mir noch gedanken machen
        console.log('state whiteboard');
        if ($scope.ideaId == -1) {
            $scope.clear();
            $scope.clearHistory();
            var now = new Date();
            $scope.title = now.getFullYear() + '_' + now.getDate() + '_' + now.getDay() + ' ' + now.getHours() + ':' + now.getMinutes();
            $scope.author = $scope.user;
        } else {
            loadIdea($scope.ideaId);
        }
    });

    function loadIdea(id) {
        ideaService
            .getIdea(id)
            .then(function (res) {
                console.log('ergebnis der idea object von deer gesuchten ide', res);
                $scope.title = res.title;
                $scope.desciption = res.description;
                var i = 0;
                while (i < res.contributors.length) {
                    $scope.contributors.push(res.contributors[i].name);
                    $scope.contributorsId.push(res.contributors[i]._id);

                    i++;
                }


                $scope.selectedHashtags = res.tags;
                $scope.ideaLifeTime = res.livetime;
                $scope.selectedPrivacyType = $scope.privacyTypesList[res.privacyType];
                $scope.milestones = res.milestones;
                $scope.reloadImage("app/" + res.scribble);
                $scope.ideaDayLeft = $scope.calculateIdeaLeftDays(res.created);
                $scope.author = res.author;
                $scope.lastchanged = res.lastchanged;

            });
    }
    $scope.updateIdea = function () {
        var i = 0;
        var indexPrivacy = 0;
        while (i < $scope.privacyTypesList.length) {
            if ($scope.selectedPrivacyType == $scope.privacyTypesList[i]) {
                indexPrivacy = i;
            }
            i++;
        }
        console.log("update idea");

        var user = authentication.currentUser();
        var idea = {
            _id: $scope.ideaId,

            title: $scope.title,
            description: $scope.desciption,
            contributors: $scope.contributorsId,
            milestones: $scope.milestones,
            tags: $scope.selectedHashtags,
            livetime: $scope.ideaLifeTime,
            privacyType: indexPrivacy,
            scribble: $scope.drawingboardRemote.toDataURL('image/png')
        };

        ideaService
            .updateIdea(idea, user)
            .success(function (retData) {
                loadIdea($scope.ideaId);
                $mdToast.show($mdToast.simple().textContent('Save idea: ' + $scope.lastchanged).hideDelay(4000));

            });

    }


    //Save New Idea serverside 
    $scope.saveNewIdea = function () {
        var user = authentication.currentUser();
        var i = 0;
        var indexPrivacy = 0;
        while (i < $scope.privacyTypesList.length) {
            if ($scope.selectedPrivacyType == $scope.privacyTypesList[i]) {
                indexPrivacy = i;
            }
            i++;
        }
        console.log("update idea");

        var user = authentication.currentUser();
        var idea = {
            _id: $scope.ideaId,
            title: $scope.title,
            description: $scope.desciption,
            contributors: $scope.contributorsId,
            milestones: $scope.milestones,
            tags: $scope.selectedHashtags,
            livetime: $scope.ideaLifeTime,
            privacyType: indexPrivacy,
            scribble: $scope.drawingboardRemote.toDataURL('image/png')
        };

        ideaService
            .saveNewIdea(idea, user)
            .then(function (res) {

                $scope.ideaId = res;

                loadIdea($scope.ideaId);

            });

    };



    $scope.privacyTypesList = ["Only me & contributors", "Everyone", "Customer"];
    $scope.selectedPrivacyType = $scope.privacyTypesList[0];
    $scope.selectedPrivacy = 0;
    //Todo: das scheint noch nicht aufgerufen zu werden
    $scope.changeSortingType = function (index) {
        $scope.selectedPrivacyType = index;
        $scope.updatePrivacyStatus();

        switch (index) {
        case "Only me & contributors":
            $scope.selectedPrivacy = 0;
            break;
        case "Everyone":
            $scope.selectedPrivacy = 1;
            break;
        case "Customer":
            $scope.selectedPrivacy = 2;
            break;
        default:
            $scope.selectedPrivacy = 0;
        }
        console.log("Privacy number: ");
        console.log($scope.selectedPrivacy);

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
            $scope.saveNewIdea();

            $scope.cancel();


        };
    };

});


function DescriptionPopupController($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}


function ContrPopupController($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}

function MilestonesPopupController($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}