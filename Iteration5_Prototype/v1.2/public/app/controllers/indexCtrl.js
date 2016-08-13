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
            name: 'Reis',
            priority: 0
        }, {
            id: 1,
            name: 'Pepperoni',
            priority: 2
        },
        {
            id: 2,
            name: 'Sausage',
            priority: 4
        },
        {
            id: 3,
            name: 'Black Olives',
            priority: 1
        },
        {
            id: 4,
            name: 'Green Peppers',
            priority: 3
        }
  ];

    $scope.selectedHashtags = [];
    $scope.setHashtags = function (id, status) {
        if (!status) {
            $scope.selectedHashtags.push(id);
        } else {
            $scope.selectedHashtags.splice($scope.selectedHashtags.indexOf(id), 1);

        }
    }
    $scope.updateDashboard = function () {
        // ToDo: es wurden neue Tags hinzugefügt bzw. entfernt und hier müsstest du mithilfe der Tags & des auswählten Sorting die Liste erneuern
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