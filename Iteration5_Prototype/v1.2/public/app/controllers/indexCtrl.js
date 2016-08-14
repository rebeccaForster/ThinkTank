'use strict';
// navigationCtrl.$inject = ['$location','authentication'];

app.controller('IndexCtrl', function ($scope, $mdBottomSheet, $mdSidenav, $state, authentication, $mdDialog, $mdMedia) {
    
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

    if(authentication.isLoggedIn()) {
        $scope.menu = $scope.menuAuth;
    }
    else {
        $scope.menu = $scope.menuNonAuth;
    }

    $scope.selectedItem = 1;

    $scope.go = function (index, path, title) {
        $state.go(path);
        $scope.title = title;
        $scope.selectedItem = index;
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

    //init
    $scope.sortingType = $scope.sorting[0].title;

    $scope.isLoggedIn = authentication.isLoggedIn();
    $scope.currentUser = authentication.currentUser();

    // [SM]
    // vm.isLoggedIn = authentication.isLoggedIn();
    // vm.currentUser = authentication.currentUser();

    $scope.showLoginBox = function(ev) {
    
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

        console.log("login button pressed");
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'login.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: useFullScreen
        });
    };

    $scope.showRegisterBox = function(ev) {
    
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

        console.log("register button pressed");
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'resgister.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: useFullScreen
        });
    };

  function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }  




});