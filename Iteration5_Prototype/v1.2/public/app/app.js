var app = angular.module('App', ['ui.router', 'ngMaterial', 'ngMdIcons', 'ngMessages', 'material.svgAssetsCache', 'angular-svg-round-progressbar']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider.state("whiteboard", {
        url: "/whiteboard",
        controller: "WhiteboardCtrl",
        templateUrl: "app/views/whiteboard.html"
    })
    $stateProvider.state("dashboard", {
        url: "/dashboard",
        controller: "DashboardProfileCtrl",
        templateUrl: "app/views/dashboard.html"
    })
    $stateProvider.state("profile", {
        url: "/profile",
        controller: "DashboardProfileCtrl",
        templateUrl: "app/views/profile.html"
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
    
});

app.config(function ($mdThemingProvider) {
    var background = $mdThemingProvider.extendPalette('grey', {
        'A100': 'fafafa'
    });
    $mdThemingProvider.definePalette('background', background);
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo', {
            'default': '500', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '800', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '100',
        })
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        .accentPalette('cyan', {
            'default': '500' // use shade 200 for default, and keep all other shades the same
        })
        .backgroundPalette('background')
        .warnPalette('red', {
            'default': '500' // use shade 200 for default, and keep all other shades the same
        });
    

});