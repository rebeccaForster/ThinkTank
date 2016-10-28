'use strict';
/* controller which handles all functionality of the whiteboard html screen*/
app.controller('WhiteboardCtrl', function ($scope, authentication, $mdDialog, indexData, $window, ideaService, $stateParams, $rootScope, profileService, $mdToast, dataService) {


    /* function: save all information of the whiteboard 
             if the idea a new idea will be created
             if the ide exists only the all data will be updated
     input: 
             ev: $event as input
     output: -
     */
    $scope.saveScribble = function (ev) {
        /* controller which handles all functionality of the whiteboard html screen*/
        if ($scope.ideaId == -1) {
            // if the user is not sign in the user have to sign in before the saving process will start
            if ($scope.isLoggedIn) {
                $scope.login();
            } else {
                // if the user is sign in a pop-up opens the save the information
                $scope.openSaveDialog();
            }
        } else {
            // update function for the idea
            // todo: only update the scribble without other informatoin as descirbed in the consept
            $scope.updateIdea();
        }
    };

    /* function: opens a pop-up to save a idea
      input: 
              ev: $event as input
      output: -
      */
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

    /* function: open a pop-up for the sign-in  for the save an idea process
       input: 
               ev: $event as input
       output: -
       */
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
                //if the pop-up closed the save dialog must be open
                //Todo: in general this only happens if the sign in process is sucessful
                $scope.openSaveDialog();
            });
    };

    //scope variable of the  contributor list of the idea
    $scope.contributors = [];

    //scope variable of the contributor id of the idea
    $scope.contributorsId = [];

    //list of all users in the system
    $scope.contributorsList = [];


    /* function: a new contributer is add or deleted to the list of contributors 
       input: name - name of the  ocntributor
               id - user id of hte contributor
               status - false to add contributor, true delete contributor
       output: -
       */
    $scope.setSelectedContributors = function (name, id, status) {
        if (!status) {
            // add contributor
            $scope.contributors.push(name);
            $scope.contributorsId.push(id);
        } else {
            //delete contributor
            $scope.contributors.splice($scope.contributors.indexOf(name), 1);
            $scope.contributorsId.splice($scope.contributorsId.indexOf(id), 1);

        }
    }

    /* function: change the milestone status
     input: 
             index: number of the selected milestone in the list
     output: -
     */
    $scope.changeMilestoneStatus = function (index) {
        if ($scope.milestones[index].percentage) {
            $scope.milestones[index].percentage = 0;
        } else {
            $scope.milestones[index].percentage = 1;
        }

    }

    // save name of the author of the idea
    $scope.author = '';
    // save image path of the addition image of hte idea
    $scope.img = '';
    // save desciption of an idea
    $scope.desciption = "";
    // variable which save all milestones of ht eidea
    $scope.milestones = [];
    // list of all saved milestones in the database
    $scope.milestoneList = [];
    // default life time of an idea in days
    $scope.ideaLifeTime = 30;
    // return the left days of the idea, default 0
    $scope.ideaDayLeft = 0;
    // saved the date of the last changed date of an idea
    $scope.lastchanged = '';


    /* function: add a new milestone to the milestone lsit
           input: 
                   name - name of the milestone
                   status - true milestone is finished , flase milestone is open
                   extratime - extratime for the lifetime of an idea (at the moment not implemented)
                   icon - icon of the mielostone (at the moment not implemented)
           output: -
           */
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



    //defautl values for the whiteboard
    $scope.webStorage = 'session';
    $scope.drawingMode = 'draw';
    $scope.drawColor = '#222';
    $scope.lineWidth = 2;
    $scope.backgroundColor = '#EEE';
    var isEraser = false;
    $scope.canvasWidth = $window.innerWidth - 90 - 100;
    $scope.canvasHeight = $window.innerHeight - 100 - 74;


    /* function: mode draw, fill or eraser is set in the drawing board
       input: mode- draw, fill, eraser
       output: -
       */
    $scope.setDrawingMode = function (mode) {
        $scope.drawingboardRemote.setDrawingMode(mode);
    }

    /* function: set color of the drawing
           input: color- color 
           output: -
           */
    $scope.setDrawColor = function (color) {
        $scope.drawingboardRemote.setDrawColor(color);

    }

    /* function: set style of the drawing board
          input: -
          output: -
          */
    $scope.setCanvasStyle = function () {

        return {
            "height": $scope.canvasHeight + 'px',
            "width": $scope.canvasWidth + 'px'
        }
    }



    $scope.getDataURL = function () {
        $scope.drawingboardRemote.toDataURL('image/png');
    };

    /* function: clear the scribble on the drawing board
     input: -
     output: -
     */
    $scope.clear = function () {
        if ($scope.drawingboardRemote) {
            $scope.drawingboardRemote.clear();
        }
    };

    /* function: laod scribble image into the whiteboard
       input: 
               img- saved image of the scribble in the idea
       output: -
       */
    $scope.reloadImage = function (img) {
        if ($scope.drawingboardRemote) {

            $scope.drawingboardRemote.reloadImage(img);
        }
    };

    /* function: go one step back of the scribble
       input: -
       output: -
       */
    $scope.undo = function () {
        $scope.drawingboardRemote.undo();
    };

    /* function: go one step forward of the scribble
       input: -
       output: -
       */
    $scope.redo = function () {
        $scope.drawingboardRemote.redo();
    };


    /* function: delete scribble history of the drawing board
       input: -
       output: -
       */
    $scope.clearHistory = function () {
        if ($scope.drawingboardRemote) {

            $scope.drawingboardRemote.clearStorage();
        }
    };

    // set element of the pie menu and add en event listener to move the pie menu
    var draggable = document.getElementById('circle-menu1');
    draggable.addEventListener('touchmove', function (event) {
        var touch = event.targetTouches[0];

        // Place element where the finger is
        draggable.style.left = touch.pageX + 'px';
        draggable.style.top = touch.pageY + 'px';
        event.preventDefault();
    }, false);


    // add element of the pie menu
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
                    },
                    hideAfterClick: true,
                    disabled: true
                            },
                {
                    icon: 'my-icon-pen',
                    click: function () {
                        if (isEraser) {
                            $scope.setDrawColor('black');
                            $scope.setLineWidth(2);
                            isEraser = false;
                        }

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
                                $scope.setLineWidth(2);
                            }
                                    }, {
                            icon: 'my-icon-strichstärke-mittel',
                            click: function () {
                                $scope.setLineWidth(10);
                            }
                                    }, {
                            icon: 'my-icon-strichstärke-dick',
                            click: function () {
                                $scope.setLineWidth(15);
                            }
                                    }
                                ]
                            },
                {
                    icon: 'my-icon-color',
                    hideAfterClick: true,

                    menus: [
                        {
                            icon: 'circle-icon white',
                            click: function () {
                                $scope.setDrawColor('white');
                            }
                                        }, {
                            icon: 'circle-icon black',
                            click: function () {
                                $scope.setDrawColor('black');
                            }
                                    }, {
                            icon: 'circle-icon blue',
                            click: function () {
                                $scope.setDrawColor('blue');
                            }
                                    },
                        {
                            icon: 'circle-icon green',
                            click: function () {
                                $scope.setDrawColor('green');
                            }
                                            },
                        {
                            icon: 'circle-icon yellow  ',
                            click: function () {
                                $scope.setDrawColor('yellow');
                            }
                                                },
                        {
                            icon: 'circle-icon orange',
                            click: function () {
                                $scope.setDrawColor('orange');
                            }
                                                    },
                        {
                            icon: 'circle-icon red',
                            click: function () {
                                $scope.setDrawColor('red');
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
                        $scope.setLineWidth(50);
                        $scope.setDrawingMode('eraser');
                        isEraser = true;
                    }
                                },


                {
                    icon: 'my-icon-voice',
                    click: function () {
                    },
                    disabled: true
                                },
                {
                    icon: 'my-icon-video',
                    click: function () {
                    },
                    disabled: true
                                },
                {
                    icon: 'my-icon-attach',
                    click: function () {
                    },
                    disabled: true

                                }
                                ]
        });

    // save status if the tools pie menu is open or not
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

    /* function: change drawing thick of the pen
      input: 
              size- font size of the drawing line
      output: -
      */
    $scope.setLineWidth = function (size) {
        $scope.drawingboardRemote.setLineWidth(size);
    }

    // variable to save th new hashtag name
    $scope.addHashtag = '';

    /* function: to add a new hashtag to the list
       input: -
       output: -
       */
    $scope.addNewHastag = function () {

        var dummyNewHashtag = {
            name: $scope.addHashtag,
            priority: 0 // 0 ist default wert, wenn er neu initalisiert wird
        }
        $scope.addItemToHashtagList(dummyNewHashtag);

        $scope.setSelectedHashtags($scope.addHashtag, false);
        $scope.addHashtag = '';

        $scope.hashtagForm.$setPristine();
        $scope.hashtagForm.$setUntouched();

    }


    /* function: open hashtag pop-up
     input: 
             ev: $event as input
     output: -
     */
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
            .then(function () {}, function () {
                //todo: update the hashtags to the database after the pop-up is closed and only update the information here and if a new idea is saved

            });
    }

    /* function: open idea desciption pop-up
      input: 
              ev: $event as input
      output: -
      */
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
            .then(function () {}, function () {
                //todo: update the desciption to the database after the pop-up is closed and only update the information here and if a new idea is saved

            });
    }

    /* function: watch if the title of the idea changed and if its empty add a placeholder of the date an dtime
           input: 
                  newVal- new text value
                  oldVal- old value before text is changed
           output: -
           */
    $scope.$watch('title', function (newVal, oldVal) {
        if (newVal == '') {
            var now = new Date();
            $scope.titlePlaceholder = now.getFullYear() + '_' + now.getDate() + '_' + now.getDay() + ' ' + now.getHours() + ':' + now.getMinutes();
        }
    });

    // save new milestone name
    $scope.addMilestone = '';

    /* function: add new milestone
        input: -
        output: -
        */
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

    /* function:open milestone pop-up
           input: 
                   ev: $event as input
           output: -
           */
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
            .then(function () {}, function () {
                //todo: update the hashtags to the database after the pop-up is closed and only update the information here and if a new idea is saved

            });
    }


    /* function: returns if the milestone is selected (true) or not (false) in the idea
            input: 
                    name
            output: -
            */
    $scope.statusMilestoneSelected = function (name) {

        for (var i in $scope.milestones) {
            if ($scope.milestones[i].name == name) {
                return true;
            }
        }
        return false;
    }

    /* function: opens pop-up to add/delete contributors to the idea
                input: 
                        ev: $event handler
                output: -
                */
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
            .then(function () {}, function () {
                //todo: update the hashtags to the database after the pop-up is closed and only update the information here and if a new idea is saved

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




    $scope.ideaId = $stateParams.ideaId;
    $scope.title = '';
    angular.element(document).ready(function () {
        $scope.loadHashtagList();

        loadMilsteones();
        loadContributors();
        if ($scope.ideaId == -1) {
            $scope.setLoadLayout(false);

            $scope.clear();
            $scope.clearHistory();
            var now = new Date();

            $scope.titlePlaceholder = now.getFullYear() + '_' + now.getDate() + '_' + now.getDay() + ' ' + now.getHours() + ':' + now.getMinutes();
            $scope.author = $scope.user;
        } else {
            $scope.setLoadLayout(true);

            loadIdea($scope.ideaId, 'Idea is loaded:');
        }
    });


    /* function: laods the idea with all information
          input: id - idea id
              info -
          output: -
          */
    function loadIdea(id, info) {
        ideaService
            .getIdea(id)
            .then(function (res) {
                $scope.loadHashtagList();

                loadMilsteones();
                loadContributors();
                $scope.title = res.title;
                $scope.desciption = res.description;
                $scope.img = res.img;
                var i = 0;
                $scope.contributors = [];
                $scope.contributorsId = [];
                while (i < res.contributors.length) {
                    $scope.contributors.push(res.contributors[i].name);
                    $scope.contributorsId.push(res.contributors[i]._id);

                    i++;
                }
                $scope.clearSelectedHashtags();
                while (i < res.tags.length) {
                    if (!$scope.hashtagSelected(res.tags[i])) {
                        $scope.setSelectedHashtags(res.tags[i], false);
                    }
                    i++;
                }

                $scope.ideaLifeTime = res.livetime;
                $scope.selectedPrivacyType = $scope.privacyTypesList[res.privacyType];
                $scope.milestones = res.milestones;
                $scope.reloadImage("app/" + res.scribble);
                $scope.ideaDayLeft = $scope.calculateIdeaLeftDays(res.created);
                $scope.author = res.author;
                $scope.lastchanged = res.lastchanged;
                $scope.setLoadLayout(false);

                $mdToast.show($mdToast.simple().textContent(info + $scope.lastchanged).hideDelay(4000));

            });
        $scope.getSignInUser($scope.user._id);

    }


    /* function: update the whiteboard
            input: 
            output: -
            */
    $scope.updateIdea = function () {
        $scope.setLoadLayout(true);

        var i = 0;
        var indexPrivacy = 0;
        while (i < $scope.privacyTypesList.length) {
            if ($scope.selectedPrivacyType == $scope.privacyTypesList[i]) {
                indexPrivacy = i;
            }
            i++;
        }

        var user = authentication.currentUser();
        if ($scope.title == '') {
            $scope.title = $scope.titlePlaceholder;
        }
        var idea = {
            _id: $scope.ideaId,

            title: $scope.title,

            description: $scope.desciption,
            img: $scope.img,
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
                loadIdea($scope.ideaId, 'Save idea: ');
            });

    }

    // funnction to load the milestones lsit from the server
    function loadMilsteones() {

        dataService
            .loadAllMilestones()
            .then(function (res) {
                $scope.milestoneList = res;
            });
    }

    //function to load the user list form the server
    function loadContributors() {

        profileService
            .loadAllUsers()
            .then(function (res) {

                $scope.contributorsList = res;
            });

    }

    //Save New Idea serverside 
    $scope.saveNewIdea = function () {
        $scope.setLoadLayout(true);

        var user = authentication.currentUser();
        var i = 0;
        var indexPrivacy = 0;
        while (i < $scope.privacyTypesList.length) {
            if ($scope.selectedPrivacyType == $scope.privacyTypesList[i]) {
                indexPrivacy = i;
            }
            i++;
        }
        if ($scope.title == '') {
            $scope.title = $scope.titlePlaceholder;
        }
        var user = authentication.currentUser();
        var idea = {
            _id: $scope.ideaId,
            title: $scope.title,
            description: $scope.desciption,
            img: $scope.img,
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

                loadIdea($scope.ideaId, 'Created new idea: ');

            });

    };


    // privaciy status
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

        //todo upload new privacy status into the database

    };




});