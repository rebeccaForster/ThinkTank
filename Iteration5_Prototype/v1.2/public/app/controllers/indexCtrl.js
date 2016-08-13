'use strict';
// navigationCtrl.$inject = ['$location','authentication'];

app.controller('IndexCtrl', function ($scope, $mdBottomSheet, $mdSidenav, $state, authentication, $mdDialog, $mdMedia, login) {

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
            path: 'dashbord',
            title: 'Dashbord',
            icon: 'send'
    },
        {
            path: '#',
            title: 'Log In',
            icon: 'account_box'
    }

  ];

    $scope.menuAuth = [
        {
            path: 'whiteboard',
            title: 'Whiteboard',
            icon: 'brush'
    },
        {
            path: 'dashbord',
            title: 'Dashbord',
            icon: 'send'
    },
        {
            path: 'profil',
            title: 'Profil',
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
    },
        {
            path: 'logout',
            title: 'Log Out',
            icon: 'exit_to_app'
    }

  ];

    $scope.currentTestUser = {
        firstname: "Frederic",
        name: "Wollinger"
    };

    console.log(authentication.isLoggedIn());
    console.log("test");

    if (authentication.isLoggedIn()) {
        $scope.menu = $scope.menuAuth;
    } else {
        $scope.menu = $scope.menuNonAuth;
    }

    $scope.selectedItem = 1;

    $scope.go = function (index, path, title) {
        $state.go(path);
        $scope.title = title;

        if ($scope.selectedItem != index) {
            // clear hashtag, if a new item in the menu is clicked
            $scope.selectedHashtags = [];
        }

        $scope.selectedItem = index;

    }

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

    $scope.getStatusHashtag = function (id) {

        for (var i in $scope.selectedHashtags) {
            if ($scope.selectedHashtags[i] == id) {
                return true;
            }
        }
        return false;
    }

    $scope.sorting = [
        {
            "id": 0,
            "title": "Latest Ideas"
        }, {
            "id": 1,
            "title": "Most popular"
        }, {
            "id": 2,
            "title": "Friedhof"
        }, {
            "id": 3,
            "title": "Himmel"
        }];

    $scope.getHashtagStyle = function (priority) {

        var size = "0px";
        switch (priority) {
        case 0:
            size = "12px"
            break;
        case 1:
            size = "14px"
            break;
        case 2:
            size = "16px"
            break;
        case 3:
            size = "18px"
            break;
        case 4:
            size = "20px"
            break;

        default:
            size = "12px"
        }
        return {
            "font-size": size
        }
    }

    //init
    $scope.sortingType = $scope.sorting[0].title;

    $scope.isLoggedIn = authentication.isLoggedIn();
    $scope.currentUser = authentication.currentUser();

    // [SM]
    // vm.isLoggedIn = authentication.isLoggedIn();
    // vm.currentUser = authentication.currentUser();

    $scope.showAdvanced = function () {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

        console.log("login button pressed");
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '../views/login.view.html',
            parent: angular.element(document.body),
            targetEvent: login.onSubmit,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        });
    }

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

    $scope.hashtags = [
        {
            id: 0,
            name: 'aReis',
            priority: 0
        }, {
            id: 1,
            name: 'wPepperoni',
            priority: 2
        },
        {
            id: 2,
            name: 'eSausage',
            priority: 4
        },
        {
            id: 3,
            name: 'Black Olives',
            priority: 1
        },
        {
            id: 4,
            name: 'rGreen Peppers',
            priority: 3
        },
        {
            id: 5,
            name: 'gSausage',
            priority: 4
        },
        {
            id: 6,
            name: 'kBlack Olives',
            priority: 1
        },
        {
            id: 7,
            name: 'uGreen Peppers',
            priority: 3
        },
        {
            id: 8,
            name: 'dBlack Olives',
            priority: 1
        },
        {
            id: 9,
            name: 'hGreen Peppers',
            priority: 3
        }, {
            id: 10,
            name: 'kReis',
            priority: 0
        }, {
            id: 11,
            name: 'mvPepperoni',
            priority: 2
        },
        {
            id: 12,
            name: 'Sausage',
            priority: 4
        },
        {
            id: 13,
            name: 'vBlack Olives',
            priority: 1
        },
        {
            id: 14,
            name: 'dGreen Peppers',
            priority: 3
        }, {
            id: 15,
            name: 'rPepperoni',
            priority: 2
        },
        {
            id: 16,
            name: 'daBlack Olives',
            priority: 1
        },
        {
            id: 17,
            name: 'fGreen Peppers',
            priority: 3
        },
        {
            id: 18,
            name: 'nBlack Olives',
            priority: 1
        },
        {
            id: 19,
            name: 'gGreen Peppers',
            priority: 3
        }
  ];
    $scope.hashtagSelected = function (id) {
        for (var i in $scope.selectedHashtags) {
            if ($scope.selectedHashtags[i] == id) {
                return true;
            }
        }
        return false;
    }
    $scope.selectedHashtags = [];
    $scope.setHashtags = function (id, status) {
        if (!status) {
            $scope.selectedHashtags.push(id);
        } else {
            $scope.selectedHashtags.splice($scope.selectedHashtags.indexOf(id), 1);

        }
    }
    $scope.changeSortingType = function(index){
        $scope.sortingType= index;
        $scope.updateDashboard();
    
    }
    $scope.updateDashboard = function () {
        // ToDo: es wurden neue Tags hinzugefügt bzw. entfernt und hier müsstest du mithilfe der Tags & des auswählten Sorting die Liste erneuern
        // $scope.sortingType gibt den Namen der Sortierung zurück
        // $scope.selectedHashtags  gibt alle Tags IDs an, nach denen man suchen soll
    }

});

function HashtagPopupController($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}