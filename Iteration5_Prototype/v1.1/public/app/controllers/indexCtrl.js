'use strict';
app.controller('IndexCtrl', function ($scope, $mdBottomSheet, $mdSidenav, $state) {
$scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
};
$scope.menu = [
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
$scope.title = 'dashbord';
$scope.go = function (path, title) {
    $state.go(path);
    $scope.title = title;
}

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
$scope.sortingType = $scope.sorting[0].title;


});