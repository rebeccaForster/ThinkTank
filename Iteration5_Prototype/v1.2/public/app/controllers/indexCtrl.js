'use strict';
/*this controller uses alls global variables which are used in all html pages*/
app.controller('IndexCtrl', function ($scope, $mdBottomSheet, $mdSidenav, $state, authentication, profileService, ideaService, $mdDialog, $location, $mdMedia, dashService, dataService) {

    /*Function which which open and goas to the whiteboard.
        input:
            id: default -1 but if someone whant from an id to the whiteboard, 
                the id is used to load the idea and go back via the go back buton
    */
    $scope.openWhiteboard = function (id) {
        $state.go($scope.menu[0].path, {
            ideaId: id
        });

    }


    $scope.goBackIdeaPopUp = function (id) {
        //Todo add the path from where the whiteboard is open
        // because the whiteboard can be open from 
        // idea pop-up from dashboard $scope.menu[1].path and contacts
        // at the moment the whiteboard goes always back to the dashboard $scope.menu[1].path as default
        $state.go($scope.menu[1].path);
        $scope.goBackPopup();
    }

    // variable which list the alphabet
    $scope.abcList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    // menu structure if the user is not signed in
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

    // menu structure if the user is signd in
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


    // this function counts how many user uses the like icon for the comment
    // output: number of counts of likes
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

    // this function counts how many user uses the new input icon for the comment
    // output: number of counts of new input
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

    // this function counts how many user uses the see trouble icon for the comment
    // output: number of counts of see trouble
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

    // this function counts how many user uses the other reaction icon for the comment
    // output: number of counts of other reaction
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



    // function to verify if hte whiteboard is active or the screen is to small to add the small menu
    // output: true -if whiteboard is selected or the screen is to small
    //          false - all other cases
    $scope.navbarShort = function () {
        return ($scope.menu[0].path == $state.current.name) || !$mdMedia('gt-md');
    }

    /*
    function verfiy if the profile screen is active
    output: true- if the profile screen is active
            false - all other cases
    */
    $scope.isProfile = function () {
        return ($scope.menuAuth[2].path == $state.current.name);
    }

    /*
    function verfiy if the whiteboard screen is active
    output: true- if the whiteboard screen is active
            false - all other cases
    */
    $scope.isWhiteboard = function () {
        return ($scope.menu[0].path == $state.current.name);
    }

    // loads the menu structure without the user is sign in if the website started
    $scope.menu = $scope.menuNonAuth;

    //verify if the user is logged in
    $scope.isLoggedIn = !authentication.isLoggedIn();

    // saved the sign in user structure
    $scope.user = '';

    /*
    function which set the new sign in status
    input: -
    output: -
     */
    $scope.setSignInStatus = function () {
        // get the status if an user is sign in or not
        $scope.isLoggedIn = !authentication.isLoggedIn();
        // set the in dependency of the sign in status the menu strucure
        if (!$scope.isLoggedIn) {

            $scope.menu = $scope.menuAuth;

            // get the current sign in user and get the user strucutre via the user id
            // we uses here not the structure of authentication.currentUser(), because 
            // it returns only a small part of the saved user structure on the server
            // but the variable $scope.user is also used on the profile page. 
            // and on the upper sidnav for the pic and first- and lastname
            var user = authentication.currentUser();
            // get the newest sign in user structre
            $scope.getSignInUser(user.id);
        } else {
            $scope.menu = $scope.menuNonAuth;
            //ToDO: if no user is signed in the default structure is loaded
            // for the prototype a lfe screen is developed, that is the reason why this is at the moment
            // the default struture. This should be changed.
            $scope.user = {
                name: 'TUM',
                firstname: 'lfe',
                profileImg: 'app/img/lfe.jpg'
            };
        }


    }

    /*
    function which saves the sign in structure in the $scope.user variable
    input: id: sign in user ide
    output: -
    */
    $scope.getSignInUser = function (id) {

        profileService
            .getUser(id)
            .then(function (res) {

                $scope.user = res;
            });
    }

    /*
        function which verify if the sign in user follow the person or not
        input: followPersonId: id of the user which profile pop-up is loaded
        output: true - if the sign in user follows the person
                flase - all other cases
    */
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


    /*
        function which set into the user profile, that the sign in user wants to follow a person
        if the user is not sign in first the sign in pop-up is called
        input:
            followPersonId - id of the loaded user profile
            isFollow - true: user wants to follow the person
                        flase: user wants not to follow the person
    */
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

            // log in user,               
            //if the log in is successfull, verify            
            //if the user followed the person , nothing changed          
            //if not follow, follow the user
            $scope.showLoginBox(false, false, followPersonId);

        }
    }

    /*
        function which verify if the sign in user follow the idea or not
        input: followIdeaId: id of the idea which idea pop-up is loaded
        output: true - if the sign in user follows the person
                flase - all other cases
    */
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



    /*
        function which set into the user profile, that the sign in user wants to follow an idea
        if the user is not sign in first the sign in pop-up is called
        input:
            followIdeaId - id of the loaded idea
            isFollow - true: user wants to follow the person
                        flase: user wants not to follow the person
    */
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

            // log in user,               
            //if the log in is successfull, verify            
            //if the user followed the person , nothing changed          
            //if not follow, follow the user
            $scope.showLoginBox(false, followIdeaId, false);

        }
    }

    /*
        verify if the user is contributor of the idea
        input: ideaID - id of the idea
        output: true - if the user is contributor or author
                false - all other cases
    */
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

    // save the list of the selected hashtags of the active screen
    $scope.hashtags = [];

    $scope.setSignInStatus();
    $scope.go = function (path) {
        //todo ändern der sorting daten in abhängigkeit vom wechsel als Event --> wie ich es beim whiteboard eigtl vorhatte
        if ($state.current.name != path) {
            // clear hashtag, if a new item in the menu is clicked
            $scope.clearSelectedHashtags();
            // clear all hashtags if the path is changed via the menu
            $scope.backFuncPopup = [];
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








    // variable contains the list of the idea on the dashboard
    // normally the variable should be on the dashboard controller but
    // the serach bar does not include the dashboard controller
    // for this reason the variable must be saved in the global controller
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

    // if the screen is new started the dashboard is the default screen and the idea list shall be load
    $scope.updateIdeaList();

    /*
        updat ethe dashboard after a change in the search or sorting function is done
    */
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
                    // if no data are available the normal idea list should be loaded
                    $scope.updateIdeaList();
                }
            });
    }





    /*
           function which is called to log out and set the defaults
       */
    $scope.logout = function () {
        authentication.logout();
        $scope.setSignInStatus();
        if (!($scope.menu[0].path == $state.current.name)) {
            $scope.go($scope.menu[1].path);
        }

    }

    /*status variable if page/server laoding is active*/
    $scope.isLoadLayout = false;
    $scope.setLoadLayout = function (status) {
        $scope.isLoadLayout = status;
    }


    /*
        return the selected menu
    */
    $scope.getMenuStatus = function (path) {
        return (path == $state.current.name);
    };

    // the toolbar of every screen is has as controller the indexCtrl, that is the reason
    // why all sorting function are listed here
    // if there is another way, to differ this more, it should be taken
    // Sorting structure for the dashboard screen
    $scope.sortingDashboardProfile = ["Latest Ideas", "Most popular", "Hall Of Fame"];
    // Sorting structure for the contacts screen
    $scope.sortingContactsProfile = ["Firstname", "Name"];
    // Sorting structure for the messages screen
    $scope.sortingMessages = ["Date up", "Date down", "Name up", "Name down"];
    // default sorting value is for the dahsboard
    $scope.sorting = $scope.sortingDashboardProfile;
    // always the start of ther sorting struture is the index 0
    $scope.sortingType = $scope.sorting[0];



    /*
         function: the function opens the profiel pop-up
         input: id - ID of the idea
                ev - $event
         output: -
    */
    $scope.showProfile = function (id, ev) {
        // first the user structure with all infromation must be loaded
        $scope.getUser(id);
        // furthermore, the comment strucutre must be reseted
        clearComment();
        // open dialog
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
                // normally a promise can be used, but I couldn't solved it with a promised and used a gloabal variable $scope.isBack for this, maybe this could be change with promise
                // if the variable is true, the user wants to go back and the earlier pop up should be laoded
                if (!$scope.isBack) {
                    // Wrap the function Make sure that the params are an array.. and push it to the array
                    $scope.backFuncPopup.push(wrapFunction($scope.showProfile, this, [id]));
                }


            }, function () {
                // if the pop-up is closed, the variable must be cleared because no other old pop-ups should be save
                $scope.backFuncPopup = [];

            });


    };

    /*
         function: the function opens the sign in pop-up
         input: isSendComment - true if a user wants to comment an idea
                addFollowIdea - true if a user wants to follow an idea
                addFollowPerson - true if a user wants to follow a person
                ev - $event
         output: -
    */
    $scope.showLoginBox = function (isSendComment, addFollowIdea, addFollowPerson, ev) {
        // open the dialog
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
                    // normally a promise can be used, but I couldn't solved it with a promised and used a gloabal variable $scope.isBack for this, maybe this could be change with promise
                    // if the variable $scope.isBack is true and the user is successfull singed in...
                    if ($scope.isBack && !$scope.isLoggedIn) {
                        if (addFollowIdea && !$scope.getFollowIdea() && !$scope.isUserContributor(addFollowIdea)) {
                            //.. and the user wants to follow an idea and is not contributor/author of the idea
                            // or followed the idea, the follow idea function should be call to set the new input
                            $scope.setFollowIdea(addFollowIdea, false);
                        } else if (addFollowPerson && !$scope.getFollowPerson() && $scope.user._id != $scope.getProfileInfo._id) {
                            //.. and the user wants to follow a person and actual not follow the person or it is his own profile
                            //the follow person function should be call to set the new input
                            $scope.setFollowPerson(addFollowPerson, false);

                        } else if (isSendComment) {
                            // send the comment
                            $scope.sendComment(isSendComment);
                        }
                    }
                },
                function () {
                    // if the pop-up is closed, the variable must be cleared because no other old pop-ups should be save
                    $scope.backFuncPopup = [];

                });




    };

    /*
     function: the scribble image path not includes "app" folder. so this path must be set
               maybe this problem could be fixed global
     input: img- path of image inside the app folder
     output: image path with the app folder as parent
     */
    $scope.setImgPath = function (img) {
        var path = ('app/' + img);
        return path;
    }

    /*
           function: the user structure will be get. for example by openeing the profile pop up this information are needed
           input: id - user id
           output: -
           */
    $scope.getUser = function (id) {
        profileService
            .getUser(id)
            .then(function (res) {

                $scope.getProfileInfo = res;
                console.log('profile: ', res);
            });

    };

    /*
     the array contains a structure of the author of the cemmnt of  the open idea
     Todo: return this infromation directly with the idea structure or solve the problem on another way. 
     This way is a short implementation but not a clean solution
      */
    $scope.commentAuthor = [];

    /*
     function: get idea structure to fill the idea pop-up with information
     input: id - idea id
     output: -
     */
    $scope.getIdea = function (id) {
        ideaService
            .getIdea(id) // request to server
            .then(function (res) { // get the idea structure
                // save the idea strucutre
                $scope.getIdeaInfo = res;

                /*
                        todo: solve this problem of another way, this is not a clean solution but the only possbile at this momment
                        the author strucutre  contains not in the commments of the idea . Only the id of the author is saved
                        the comment length defines how much authors are needed
                        After this a request with the uathor id is started. 
                        Independency of the uathor id the user/author strucure is save is the $scope.commentAuthor
                    */
                var i = 0;
                while (i < $scope.getIdeaInfo.comments.length) {

                    profileService
                        .getUser($scope.getIdeaInfo.comments[i].author)
                        .then(function (res) {
                            var i = 0;
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
        // get current date in the correct format without hours, minutes and seconds
        var currentDate = new Date();
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
        if (date != '' && date != null) {
            var dateParts = date.split(" ");
            // splite the input date so that only year, month, and day is extraced
            dateParts = dateParts[0].split("/");
            var createdDate = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0], 0, 0, 0);
            // calculate the  number of days which are left after the idea was created
            var days = (currentDate - createdDate) / (1000 * 60 * 60 * 24); // subtraiktion sind ms und umrechnen in tage

            return days;
        }
        return 0;

    }

    /*
        function: clears the answer of commit and the 
                    icons to default state of a idea pop up 
        input: -
        output: -
        */
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


    /*
      function: opens the idea pop-up
      input: -
      output: -
      */
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
                    $scope.backFuncPopup.push(wrapFunction($scope.showIdea, this, [id]));
                }


            }, function () {
                //close function is called and the history of the called pop-up is cleared
                $scope.backFuncPopup = [];
                // clear the comment 
                clearComment();

            });


    };



    /*
           function: opens the sign up pop-up to register as new user
           input: -
           output: -
           */
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

    /*
          function: saves the new number of the drow down menu
          input: index: number of the selected drop down menu
          output:-
          */
    $scope.changeSortingType = function (index) {
        $scope.sortingType = index;

    }


    // clear selected hashtag list
    $scope.clearSelectedHashtags = function () {

        $scope.selectedHashtags = [];
    }

    /*
        function: verify if the name of the hashtag is selected or not
        input: name: name of the selcted hashtag
        output:-
        return: bool: true if the hashtag is selected; false- all other cases
        */
    $scope.hashtagSelected = function (name) {

        for (var i in $scope.selectedHashtags) {
            if ($scope.selectedHashtags[i] == name) {
                return true;
            }
        }
        return false;
    }

    $scope.addItemToHashtagList = function (name) {

        $scope.hashtags.push(name);

    }

    $scope.loadHashtagList = function () {

        dataService
            .getAllTags()
            .then(function (res) {
                $scope.hashtags = res;
            });
    }

    // list of hashtags which are selcted
    $scope.selectedHashtags = [];

    /*
        function: select or releases hashtags from the selected hashtag list
        input: name: name of the hashtag 
                status: false- hashtag is selected and should release; true- hashtag is not selected but should
        output:-
        */
    $scope.setSelectedHashtags = function (name, status) {
        if (!status) {
            $scope.selectedHashtags.push(name);
        } else {
            $scope.selectedHashtags.splice($scope.selectedHashtags.indexOf(name), 1);

        }


    }

    // default strucutre of the idea pop-up comment function
    $scope.saveComment = {
        author: -1,
        text: '',
        likeIdeaStatus: false,
        newInputStatus: false,
        troubleStatus: false,
        otherreaction: false
    };

    //text of the idea pop-up, if new input is selected on the reaction field
    $scope.newInputText = '';
    //text of the idea pop-up, if like idea is selected on the reaction field
    $scope.likeIdeaText = '';
    //text of the idea pop-up, if see trouble is selected on the reaction field
    $scope.troubleText = '';
    //text of the idea pop-up, if other input is selected on the reaction field
    $scope.otherText = '';

    /*
         function: toggle the text of the comment area as motivation in dependency
                     if the new input icon is selcted or not
         input: -
         output:-
         */
    $scope.setNewInputStatus = function () {
        $scope.saveComment.newInputStatus = !$scope.saveComment.newInputStatus;
        if ($scope.saveComment.newInputStatus) {
            $scope.newInputText = 'Explain your brilliant idea!';
        } else {
            $scope.newInputText = '';
        }
    };

    /*
        function: toggle the text of the comment area as motivation in dependency
                    if the like idea icon is selcted or not
        input: -
        output:-
        */
    $scope.setLikeIdeaStatus = function () {
        $scope.saveComment.likeIdeaStatus = !$scope.saveComment.likeIdeaStatus;
        if ($scope.saveComment.likeIdeaStatus) {
            $scope.likeIdeaText = 'What do you like about the idea?';
        } else {
            $scope.likeIdeaText = '';
        }
    };

    /*
        function: toggle the text of the comment area as motivation in dependency
                    if the see trouble icon is selcted or not
        input: -
        output:-
        */
    $scope.setTroubleStatus = function () {
        $scope.saveComment.troubleStatus = !$scope.saveComment.troubleStatus;
        if ($scope.saveComment.troubleStatus) {
            $scope.troubleText = 'Where do you see problems?';
        } else {
            $scope.troubleText = '';
        }
    };

    /*
        function: toggle the text of the comment area as motivation in dependency
                    if the other input icon is selcted or not
        input: -
        output:-
        */
    $scope.setOtherComment = function () {
        $scope.saveComment.otherreaction = !$scope.saveComment.otherreaction;
        if ($scope.saveComment.otherreaction) {
            $scope.otherText = 'Something else.';
        } else {
            $scope.otherText = '';
        }

    };

    /*
        function: Send comment button is clicked
                    function verify if the user is sign in or not
                    if the user is not, the sign in pop-up popped up
                    and if the user sign in succesful the comment is sent
        input: -
        output:-
        */
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
    $scope.backFuncPopup = [];

    /*
        function: the back button in the pop-up is clicked
                    the function close the actual pop-up and reopen the 
                        pop-up before
        input: -
        output:-
        */
    $scope.goBackPopup = function () {
        if ($scope.backFuncPopup.length == 1) {
            ($scope.backFuncPopup.pop())();
        } else if ($scope.backFuncPopup.length) {
            ($scope.backFuncPopup.shift())();
        }
        $scope.isBack = true;
    }
});