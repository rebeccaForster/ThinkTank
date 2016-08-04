var app = angular.module('App', ['ui.router', 'ngMaterial', 'ngMdIcons', 'ngMessages', 'material.svgAssetsCache']);

app.config(function ($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state("whiteboard", {
        url: "/whiteboard",
        controller: "WhiteboardCtrl",
        templateUrl: "app/views/whiteboard.html"
    })
    $stateProvider.state("dashbord", {
        url: "/",
        controller: "DashboardCtrl",
        templateUrl: "app/views/dashboard.html"
    })
    $stateProvider.state("profil", {
        url: "/profil",
        controller: "ProfilCtrl",
        templateUrl: "app/views/profil.html"
    })
    $stateProvider.state("messages", {
        url: "/messages",
        controller: "MessagesCtrl",
        templateUrl: "app/views/messages.html"
    })
    $stateProvider.state("contacts", {
        url: "/contacts",
        controller: "ContactsCtrl",
        templateUrl: "app/views/contacts.html"
    })
    $stateProvider.state("settings", {
        url: "/settings",
        controller: "SettingsCtrl",
        templateUrl: "app/views/settings.html"
    })
    $stateProvider.state("logout", {
        url: "/logout",
        controller: "LogoutCtrl",
        templateUrl: "app/views/logout.html"
    })
  
});

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

