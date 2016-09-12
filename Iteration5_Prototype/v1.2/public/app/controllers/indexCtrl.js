'use strict';
// navigationCtrl.$inject = ['$location','authentication'];

app.controller('IndexCtrl', function ($scope, $mdBottomSheet, $mdSidenav, $state, authentication, profileService, ideaService, $mdDialog, $location, $mdMedia, dashService, dataService) {
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.openWhiteboard = function (id) {
        $state.go($scope.menu[0].path, {
            ideaId: id
        });

    }
    $scope.goBackIdeaPopUp = function (id) {
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



    $scope.reactionCountLikeIdea = function () {
        var count = 0;
        if ($scope.getIdeaInfo != null) {
            var i = 0;
            while (i < $scope.getIdeaInfo.comments.length) {
                if ($scope.getIdeaInfo.comments[i].likeIdeaStatus) {
                    count++;

                }
                i++;
            }
        }
        return count;
    }


    $scope.reactionCountNewInput = function () {
        var count = 0;
        if ($scope.getIdeaInfo != null) {

            var i = 0;

            while (i < $scope.getIdeaInfo.comments.length) {
                if ($scope.getIdeaInfo.comments[i].newInputStatus) {
                    count++;

                }
                i++;
            }
        }
        return count;
    }


    $scope.reactionCountSeeTrouble = function () {
        var count = 0;
        if ($scope.getIdeaInfo != null) {

            var i = 0;
            while (i < $scope.getIdeaInfo.comments.length) {
                if ($scope.getIdeaInfo.comments[i].troubleStatus) {
                    count++;

                }
                i++;
            }
        }
        return count;
    }

    $scope.reactionCountOtherReaction = function () {
        var count = 0;
        if ($scope.getIdeaInfo != null) {

            var i = 0;
            while (i < $scope.getIdeaInfo.comments.length) {
                if ($scope.getIdeaInfo.comments[i].otherreaction) {
                    count++;

                }
                i++;
            }
        }
        return count;
    }




    $scope.navbarShort = function () {
        return ($scope.menu[0].path == $state.current.name) || !$mdMedia('gt-md');
    }
    $scope.isProfile = function () {
        return ($scope.menuAuth[2].path == $state.current.name);
    }
    $scope.isWhiteboard = function () {
        return ($scope.menu[0].path == $state.current.name);
    }
    $scope.menu = $scope.menuNonAuth;

    $scope.isLoggedIn = !authentication.isLoggedIn();
    $scope.user = '';

    $scope.setSignInStatus = function () {
        $scope.isLoggedIn = !authentication.isLoggedIn();
        if (!$scope.isLoggedIn) {
            $scope.menu = $scope.menuAuth;
            var user = authentication.currentUser();
            $scope.getSignInUser(user.id);
        } else {
            $scope.menu = $scope.menuNonAuth;
            $scope.user = {
                name: 'TUM',
                firstname: 'lfe',
                profileImg: 'app/img/lfe.jpg'
            };
        }


    }
    $scope.getSignInUser = function (id) {

        profileService
            .getUser(id)
            .then(function (res) {

                $scope.user = res;
            });
    }
    $scope.getFollowPerson = function (followPersonId) {
        if (!$scope.isLoggedIn && ($scope.user.followedpersons != null)) {

            var i = 0;
            while (i < $scope.user.followedpersons.length) {
                if ($scope.user.followedpersons[i]._id == followPersonId) {
                    return true;
                }
                i++;
            };
        }
        return false;
    }

    $scope.setFollowPerson = function (followPersonId, isFollow) {

        //check if user is logged in 
        if (!$scope.isLoggedIn) {
            //if isFollow true than delete that the user is followed and //Todo update user
            if (isFollow) {
                profileService
                    .unfollowUser(followPersonId, $scope.user)
                    .success(function (data) {

                        console.log("return data after unfollow person", data);
                        $scope.getSignInUser($scope.user._id);
                    });
            } else { // elsee add user as follow
                profileService
                    .followUser(followPersonId, $scope.user)
                    .success(function (data) {

                        console.log("return data after follow person", data);
                        $scope.getSignInUser($scope.user._id);
                    });

            }


        } else {

            // log in user,                if the loggin successfull, verify            if the user followed the person            if not follow
            $scope.showLoginBox(false, false, followPersonId);

        }
    }

    $scope.getFollowIdea = function (followIdeaId) {
        if (!$scope.isLoggedIn && ($scope.user.followedideas != null)) {
            var i = 0;
            while (i < $scope.user.followedideas.length) {
                if ($scope.user.followedideas[i]._id == followIdeaId) {
                    return true;
                }
                i++;
            };
        }
        return false;
    }

    $scope.setFollowIdea = function (followIdeaId, isFollow) {

        //check if user is logged in and update user
        if (!$scope.isLoggedIn) {
            //if isFollow true than delete that the idea is followed
            if (isFollow) {
                ideaService
                    .unFollowIdea(followIdeaId, $scope.user)
                    .success(function (data) {

                        console.log("return data after follow idea", data);
                        $scope.getSignInUser($scope.user._id);
                    });
            } else { // elsee add idea as follow

                ideaService
                    .followIdea(followIdeaId, $scope.user)
                    .success(function (data) {

                        console.log("return data after follow idea", data);
                        $scope.getSignInUser($scope.user._id);
                    });
            }


        } else {

            // log in user,                if the loggin successfull, verify            if the user followed the idea            if not follow
            $scope.showLoginBox(false, followIdeaId, false);

        }
    }
    $scope.isUserContributor = function (ideaId) {
        if (!$scope.isLoggedIn && ($scope.user.ownIdeas != null)) {

            var i = 0;
            while (i < $scope.user.ownIdeas.length) {
                if ($scope.user.ownIdeas[i]._id == ideaId) {
                    return true;
                }
                i++;
            };
        }
        return false;
    }
    $scope.hashtags = [];

    $scope.setSignInStatus();
    $scope.go = function (path) {
        //todo ändern der sorting daten in abhängigkeit vom wechsel als Event --> wie ich es beim whiteboard eigtl vorhatte
        if ($state.current.name != path) {
            // clear hashtag, if a new item in the menu is clicked
            $scope.clearSelectedHashtags();
            // clear all hashtags if the path is changed via the menu
            $scope.funqueue = [];
        }
        if ($scope.menuAuth[1].path == path) {
            $scope.sorting = $scope.sortingDashboardProfile;
            $scope.sortingType = $scope.sorting[0];

        } else if ($scope.menuAuth[4].path == path || $scope.menuAuth[3].path == path) {
            $scope.sorting = $scope.sortingContactsProfile;
            $scope.sortingType = $scope.sorting[0];

        } else {
            $scope.sorting = $scope.sortingMessages;
            $scope.sortingType = $scope.sorting[0];
        }
        $state.go(path);



    }









    $scope.ideaList = [];

    // loads all ideas from the server and save it in a variable.
    // this variable will be loaded in the html  

    $scope.updateIdeaList = function () {
        dashService
            .loadAllIdeas()
            .then(function (res) {
                $scope.ideaList = res;

            });
    }
    $scope.updateIdeaList();
    $scope.updateDashboard = function () {
        // ToDo: es wurden neue Tags hinzugefügt bzw. entfernt und hier müsstest du mithilfe der Tags & des auswählten Sorting die Liste erneuern
        // $scope.sortingType gibt den Namen der Sortierung zurück
        // $scope.selectedHashtags  gibt alle Tags IDs an, nach denen man suchen soll
        ideaService
            .searchIdeas($scope.selectedHashtags)
            .success(function (data) {
                if (data.length != 0) {
                    $scope.ideaList = data;

                } else {
                    $scope.updateIdeaList();
                }
            });
    }






    $scope.logout = function () {
        authentication.logout();
        $scope.setSignInStatus();
        if (!($scope.menu[0].path == $state.current.name)) {
            $scope.go($scope.menu[1].path);
        }

    }
    $scope.isLoadLayout = false;
    $scope.setLoadLayout = function(status){
        $scope.isLoadLayout = status;
    }
    $scope.getMenuStatus = function (path) {
        return (path == $state.current.name);
    };

    $scope.sortingDashboardProfile = ["Latest", "Most Popular", "Hall Of Fame", "Almost Expired", "Expired"];
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



    /*
             function: 
             input: id of the idea
             output:
             */
    $scope.showProfile = function (id, ev) {
        $scope.getUser(id);
        clearComment();

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
    $scope.showLoginBox = function (isSendComment, addFollowIdea, addFollowPerson, ev) {
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
                    isSendComment: isSendComment,
                    addFollowIdea: addFollowIdea,
                    addFollowPerson: addFollowPerson
                }

            })
            .then(function () {
                    if ($scope.isBack && !$scope.isLoggedIn) {
                        if (addFollowIdea && !$scope.getFollowIdea() && !$scope.isUserContributor(addFollowIdea)) {
                            $scope.setFollowIdea(addFollowIdea, false);
                        } else if (addFollowPerson && !$scope.getFollowPerson() && $scope.user._id != $scope.getProfileInfo._id) {
                            $scope.setFollowPerson(addFollowPerson, false);

                        } else if (isSendComment) {
                            $scope.sendComment(isSendComment);
                        }
                    }
                },
                function () {
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
                console.log('profile: ', res);
            });

    };

    $scope.commentAuthor = [];
    $scope.getIdea = function (id) {
        ideaService
            .getIdea(id)
            .then(function (res) {

                $scope.getIdeaInfo = res;
                var i = 0;
                while (i < $scope.getIdeaInfo.comments.length) {

                    profileService
                        .getUser($scope.getIdeaInfo.comments[i].author)
                        .then(function (res) {
                        var i= 0;
                            while (i < $scope.getIdeaInfo.comments.length) {
                                if ($scope.getIdeaInfo.comments[i].author == res._id) {
                                    $scope.commentAuthor[i] = res;
                                }
                                i++;
                            }
                        });
                    i++;
                }
            });

    }

    /*
        function: calculate the days which are left after the idea was created
        input: date when the idea was created
        output: number of days which are left after the idea was created
        */
    $scope.calculateIdeaLeftDays = function (date) {
        var currentDate = new Date();
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
        if (date != '' && date != null) {
            var dateParts = date.split(" ");

            dateParts = dateParts[0].split("/");
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
            otherreaction: false
        };
        $scope.newInputText = '';
        $scope.likeIdeaText = '';
        $scope.troubleText = '';
        $scope.otherText = '';
    }

    $scope.showIdea = function (id, ev) {
        $scope.getIdea(id);
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
                clearComment();

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

    }
    $scope.clearSelectedHashtags = function(){
        
        $scope.selectedHashtags = [];
    }
    $scope.hashtagSelected = function (name) {

        for (var i in $scope.selectedHashtags) {
            if ($scope.selectedHashtags[i] == name) {
                return true;
            }
        }
        return false;
    }
    $scope.addItemToHashtagList = function(name){
        
                $scope.hashtags.push(name);

    }
    $scope.loadHashtagList = function(){
        
         dataService
        .getAllTags()
        .then(function (res) {
            $scope.hashtags = res;
        });
    }
    $scope.selectedHashtags = [];
    $scope.setSelectedHashtags = function (name, status) {
        if (!status) {
            $scope.selectedHashtags.push(name);
        } else {
            $scope.selectedHashtags.splice($scope.selectedHashtags.indexOf(name), 1);

        }


    }


    $scope.saveComment = {
        author: -1,
        text: '',
        likeIdeaStatus: false,
        newInputStatus: false,
        troubleStatus: false,
        otherreaction: false
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
        $scope.saveComment.otherreaction = !$scope.saveComment.otherreaction;
        if ($scope.saveComment.otherreaction) {
            $scope.otherText = 'Something else.';
        } else {
            $scope.otherText = '';
        }

    };

    $scope.sendComment = function (ideaId) {
        if ($scope.isLoggedIn) {
            $scope.showLoginBox(ideaId, false, false);
        } else {
            ideaService
                .writeComment(ideaId, $scope.saveComment, $scope.user)
                .success(function (data) {
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

function LoginDialogController($scope, $mdDialog, isSendComment, addFollowIdea, addFollowPerson, authentication) {
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

                if (isSendComment || addFollowIdea || addFollowPerson) {

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
                $scope.showLoginBox(false, false, false);
            });

    };
}