var app = angular.module('app', ['ngMaterial', 'ngMdIcons']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog) {
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };
    $scope.menu = [
        {
            link: '',
            title: 'Whitboard',
            icon: 'brush'
    },
        {
            link: '',
            title: 'Dashbord',
            icon: 'send'
    },
        {
            link: '',
            title: 'Profil',
            icon: 'person'
    },
        {
            link: '',
            title: 'Messages & Requests',
            icon: 'email'
    },
        {
            link: '',
            title: 'Contacts',
            icon: 'group'
    },
        {
            link: '',
            title: 'Settings',
            icon: 'settings'
    },
        {
            link: '',
            title: 'Log Out',
            icon: 'exit_to_app'
    }

  ];

    $scope.alert = '';
    $scope.sorting = [{
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
    $scope.sortingType =  $scope.sorting[0].title;
    
   
}]);


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
};



app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('indigo', {
      'default': '500', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '700', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '100',
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('cyan', {
      'default': '500' // use shade 200 for default, and keep all other shades the same
    });
});