'use strict';
// navigationCtrl.$inject = ['$location','authentication'];

app.controller('IndexCtrl', function ($scope, $mdBottomSheet, $mdSidenav, $state, authentication, indexData, $mdDialog, $mdMedia) {

    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    

    

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
        return (0 == $scope.selectedItem) || !$mdMedia('gt-md') ;
    }

    $scope.userTum = {
        name: "TUM LfE",
        profileImg: "app/img/user.jpg",
    };
    $scope.menu = $scope.menuNonAuth;

    $scope.isLoggedIn = !authentication.isLoggedIn();
    $scope.user = $scope.userTum;
    
    $scope.setSignInStatus = function () {
        $scope.isLoggedIn = !authentication.isLoggedIn();
        if (!$scope.isLoggedIn) {
            $scope.menu = $scope.menuAuth;
            $scope.user = authentication.currentUser();
            console.log($scope.user);

        } else {
            $scope.menu = $scope.menuNonAuth;
            $scope.user = $scope.userTum;
        }
    }

    $scope.setSignInStatus();

    $scope.selectedItem = 1;

    $scope.go = function (index, path, title) {
        switch (index) {
        case 1:
            $scope.sorting = $scope.sortingDashboardProfile;
            $scope.sortingType = $scope.sorting[0];

            break;
        case 2:

            break;
        case 3:
            $scope.sorting = $scope.sortingMessages;
            $scope.sortingType = $scope.sorting[0];

            break;
        case 4:

            break;

        default:
        }
        $state.go(path);
        $scope.title = title;

        if ($scope.selectedItem != index) {
            // clear hashtag, if a new item in the menu is clicked
            $scope.selectedHashtags = [];
        }

        $scope.selectedItem = index;

    }

   

    $scope.sortingDashboardProfile = ["Latest Ideas", "Most popular", "Friedhof", "Himmel"];
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

    $scope.showProfile = function (index, ev) {
        $mdDialog.show({
                controller: ProfilePopupController,
                templateUrl: 'app/views/profile-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {
                    profileIndex: index
                }
            })
            .then(function () {}, function () {});


    };
    $scope.showLoginBox = function (ev) {
        $mdDialog.show({
                controller: LoginDialogController,
                templateUrl: 'app/views/login-popup.html',
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

});

function LoginDialogController($scope, $mdDialog, authentication) {
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
                $scope.cancel();
                $scope.setSignInStatus();

            });


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
                $scope.showLoginBox();
            });

    };
}