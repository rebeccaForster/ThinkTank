'use strict';
// navigationCtrl.$inject = ['$location','authentication'];

app.controller('IndexCtrl', function ($scope, $mdBottomSheet, $mdSidenav, $state, authentication, profileService, ideaService, $mdDialog, $location, $mdMedia) {

    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.openWhiteboard = function (id) {
        $state.go($scope.menu[0].path, {
            ideaId: id
        });

    }
    $scope.goBackIdeaPopUp = function(id){
        $state.go($scope.menu[1].path);
        $scope.goBackPopup();
    }
    $scope.abcList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


    $scope.menuNonAuth = [
        {
            path: 'whiteboard',
            title: 'Whiteboard',
            icon: 'brush'
    },
        {
            path: 'dashboard',
            title: 'Dashboard',
            icon: 'dashboard'
    }

  ];

    $scope.menuAuth = [
        {
            path: 'whiteboard',
            title: 'Whiteboard',
            icon: 'brush'
    },
        {
            path: 'dashboard',
            title: 'Dashboard',
            icon: 'dashboard'
    },
        {
            path: 'profile',
            title: 'Profile',
            icon: 'person'
    },
        {
            path: 'messages',
            title: 'Messages & Requests',
            icon: 'email'
    },
        {
            path: 'contacts',
            title: 'Contacts',
            icon: 'group'
    },
        {
            path: 'settings',
            title: 'Settings',
            icon: 'settings'
    }

  ];


    $scope.navbarShort = function () {
        return ($scope.menuAuth[0].path == $state.current.name) || !$mdMedia('gt-md');
    }


    $scope.menu = $scope.menuNonAuth;

    $scope.isLoggedIn = !authentication.isLoggedIn();
    $scope.user = '';

    $scope.setSignInStatus = function () {
        $scope.isLoggedIn = !authentication.isLoggedIn();
        if (!$scope.isLoggedIn) {
            $scope.menu = $scope.menuAuth;
            var user = authentication.currentUser();
            profileService
                .getUser(user.id)
                .then(function (res) {

                    $scope.user = res;
                });
        } else {
            $scope.menu = $scope.menuNonAuth;
            $scope.user = '';
        }


    }
    $scope.setSignInStatus();
    $scope.go = function (path) {
        if ($state.current.name != path) {
            // clear hashtag, if a new item in the menu is clicked
            $scope.selectedHashtags = [];
            // clear all hashtags if the path is changed via the menu
            $scope.funqueue = [];
        }
        if ($scope.menuAuth[1].path == path) {
            $scope.sorting = $scope.sortingDashboardProfile;
            $scope.sortingType = $scope.sorting[0];

        } else if ($scope.menuAuth[4].path == path) {
            $scope.sorting = $scope.sortingContactsProfile;
            $scope.sortingType = $scope.sorting[0];

        } else {
            $scope.sorting = $scope.sortingMessages;
            $scope.sortingType = $scope.sorting[0];
        }
        $state.go(path);



    }

    $scope.getMenuStatus = function (path) {
        return (path == $state.current.name);
    };

    $scope.sortingDashboardProfile = ["Latest Ideas", "Most popular", "Friedhof", "Himmel"];
    $scope.sortingContactsProfile = ["Firstname", "Name"];
    $scope.sortingMessages = ["Date up", "Date down", "Name up", "Name down"];
    $scope.sorting = $scope.sortingDashboardProfile;
    $scope.sortingType = $scope.sorting[0];

    $scope.getHashtagStyle = function (priority) {

        var size = "0px";
        switch (priority) {
        case 0:
            size = "18px"
            break;
        case 1:
            size = "22px"
            break;
        case 2:
            size = "26px"
            break;
        case 3:
            size = "30px"
            break;
        case 4:
            size = "34px"
            break;

        default:
            size = "12px"
        }
        return {
            "font-size": size
        }
    }

    $scope.logout = function () {
        authentication.logout();
        $scope.setSignInStatus();
    }

    /*
             function: 
             input: id of the idea
             output:
             */
    $scope.showProfile = function (id, ev) {
        $scope.getUser(id);

        $mdDialog.show({
                controller: ProfilePopupController,
                templateUrl: 'app/views/profile-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {}
            })
            .then(function () {
                if (!$scope.isBack) {
                    // Wrap the function Make sure that the params are an array.. and push it to the array
                    $scope.funqueue.push(wrapFunction($scope.showProfile, this, [id]));
                }

            }, function () {
                $scope.funqueue = [];
            });


    };
    $scope.showLoginBox = function (isSendComment, ev) {
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
                    isSendComment: isSendComment
                }

            })
            .then(function () {
                if (!$scope.isBack && isSendComment) {
                    // Wrap the function Make sure that the params are an array.. and push it to the array
                    $scope.funqueue.push(wrapFunction($scope.showProfile, this, [id]));
                }

            }, function () {
                $scope.funqueue = [];

            });




    };
    $scope.setImgPath = function (img) {
        var path = ('app/' + img);
        return path;
    }

    /*
          function: 
          input: id of the idea
          output:
          */
    $scope.commentIdea = function (id) {


        }
        /*
          function: 
          input: id of the idea
          output:
          */
    $scope.followIdea = function (id) {

        }
        /*
          function: 
          input: id of the idea
          output:
          */
    $scope.participateIdea = function (id) {

    }
    $scope.getUser = function (id) {
        profileService
            .getUser(id)
            .then(function (res) {

                $scope.getProfileInfo = res;
            });

    };
    $scope.getIdea = function (id) {
        ideaService
            .getIdea(id)
            .then(function (res) {

                $scope.getIdeaInfo = res;
            });
    };

    /*
        function: calculate the days which are left after the idea was created
        input: date when the idea was created
        output: number of days which are left after the idea was created
        */
    $scope.calculateIdeaLeftDays = function (date) {
        var currentDate = new Date();
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
        if (date = '') {
            var dateParts = date.split("/");
            var createdDate = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0], 0, 0, 0);
            var days = (currentDate - createdDate) / (1000 * 60 * 60 * 24); // subtraiktion sind ms und umrechnen in tage

            return days;
        }
        return 0;

    }

    function clearComment() {

        $scope.saveComment = {
            author: -1,
            text: '',
            likeIdeaStatus: false,
            newInputStatus: false,
            troubleStatus: false,
            other: false
        };

    }

    $scope.showIdea = function (id, ev) {
        $scope.getIdea(id);
        clearComment();
        $mdDialog.show({
                controller: IdeaPopupController,
                templateUrl: 'app/views/idea-popup.html',
                scope: $scope, // use parent scope in template
                preserveScope: true,
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {}
            })
            .then(function () {
                if (!$scope.isBack) {
                    // Wrap the function Make sure that the params are an array.. and push it to the array
                    $scope.funqueue.push(wrapFunction($scope.showIdea, this, [id]));
                }


            }, function () {
                $scope.funqueue = [];
            });


    };






    $scope.showRegisterBox = function (ev) {
        $mdDialog.show({
                controller: RegisterDialogController,
                templateUrl: 'app/views/register-popup.html',
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


    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };


    $scope.changeSortingType = function (index) {
        $scope.sortingType = index;
        $scope.updateDashboard();

    }

    $scope.hashtagSelected = function (name) {

        for (var i in $scope.selectedHashtags) {
            if ($scope.selectedHashtags[i] == name) {
                return true;
            }
        }
        return false;
    }

    $scope.selectedHashtags = [];
    $scope.setSelectedHashtags = function (name, status) {
        if (!status) {
            $scope.selectedHashtags.push(name);
        } else {
            $scope.selectedHashtags.splice($scope.selectedHashtags.indexOf(name), 1);

        }


    }

    $scope.updateDashboard = function () {
        // ToDo: es wurden neue Tags hinzugefügt bzw. entfernt und hier müsstest du mithilfe der Tags & des auswählten Sorting die Liste erneuern
        // $scope.sortingType gibt den Namen der Sortierung zurück
        // $scope.selectedHashtags  gibt alle Tags IDs an, nach denen man suchen soll
    }
    $scope.saveComment = {
        author: -1,
        text: '',
        likeIdeaStatus: false,
        newInputStatus: false,
        troubleStatus: false,
        other: false
    };

    $scope.newInputText = '';
    $scope.likeIdeaText = '';
    $scope.troubleText = '';
    $scope.otherText = '';
    // set the status of the different comment reactions
    $scope.setNewInputStatus = function () {
        $scope.saveComment.newInputStatus = !$scope.saveComment.newInputStatus;
        if ($scope.saveComment.newInputStatus) {
            $scope.newInputText = 'Explain your brilliant idea!';
        } else {
            $scope.newInputText = '';
        }
    };
    $scope.setLikeIdeaStatus = function () {
        $scope.saveComment.likeIdeaStatus = !$scope.saveComment.likeIdeaStatus;
        if ($scope.saveComment.likeIdeaStatus) {
            $scope.likeIdeaText = 'What do you like about the idea?';
        } else {
            $scope.likeIdeaText = '';
        }
    };
    $scope.setTroubleStatus = function () {
        $scope.saveComment.troubleStatus = !$scope.saveComment.troubleStatus;
        if ($scope.saveComment.troubleStatus) {
            $scope.troubleText = 'Where do you see problems?';
        } else {
            $scope.troubleText = '';
        }
    };
    $scope.setOtherComment = function () {
        $scope.saveComment.other = !$scope.saveComment.other;
        if ($scope.saveComment.other) {
            $scope.otherText = 'Something else.';
        } else {
            $scope.otherText = '';
        }

    };

    $scope.sendComment = function (ideaId) {
        if ($scope.isLoggedIn) {
            $scope.showLoginBox(true);
        } else {
            ideaService
                .writeComment(ideaId, $scope.saveComment, $scope.user)
                .success(function (data) {
                    console.log('comment return data: ', data);
                    $scope.getIdea(ideaId);
                    clearComment();

                });

        }

    };

    // Function wrapping code.
    // fn - reference to function.
    // context - what you want "this" to be.
    // params - array of parameters to pass to function.
    var wrapFunction = function (fn, context, params) {
            return function () {
                fn.apply(context, params);
            };
        }
        // Create an array and append your functions to them
    $scope.funqueue = [];
    $scope.goBackPopup = function () {
        if ($scope.funqueue.length == 1) {
            ($scope.funqueue.pop())();
        } else if ($scope.funqueue.length) {
            ($scope.funqueue.shift())();
        }
        $scope.isBack = true;
    }
});

function LoginDialogController($scope, $mdDialog, isSendComment, authentication) {
    $scope.isBack = false;

    $scope.credentials = {
        email: "",
        password: ""
    };
    $scope.test = "";

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.login = function () {
        authentication
            .login($scope.credentials)
            .then(function () {
                $scope.setSignInStatus();

                if (isSendComment) {
                    $scope.back();
                } else {
                    $scope.cancel();
                }

            });


    };
    $scope.back = function () {
        $scope.goBackPopup();


        $mdDialog.hide();
    };
}


function RegisterDialogController($scope, $mdDialog, authentication) {
    $scope.credentials = {
        email: "",
        name: "",
        title: "",
        firstname: "",
        url: "",
        profileImg: "",
        password: ""
    };

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.register = function () {
        authentication
            .register($scope.credentials)
            .then(function () {
                $scope.cancel();
                $scope.showLoginBox(false);
            });

    };
}