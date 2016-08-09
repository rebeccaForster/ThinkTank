var app = angular.module('App', ['ui.router', 'ngMaterial', 'ngMdIcons', 'ngMessages', 'material.svgAssetsCache', 'angular-svg-round-progressbar']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dashbord');

    $stateProvider.state("whiteboard", {
        url: "/whiteboard",
        controller: "WhiteboardCtrl",
        templateUrl: "app/views/whiteboard.html"
    })
    $stateProvider.state("dashbord", {
        url: "/dashbord",
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
    var customBackground = {
        '50': '#ffffff',
        '100': '#ffffff',
        '200': '#ffffff',
        '300': '#ffffff',
        '400': '#ffffff',
        '500': '#F6F6F6',
        '600': '#e9e9e9',
        '700': '#dcdcdc',
        '800': '#d0d0d0',
        '900': '#c3c3c3',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#b6b6b6'
    };
    $mdThemingProvider
        .definePalette('customBackground',
            customBackground);
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
        })
        .backgroundPalette('customBackground', {
            'default': '500' // use shade 200 for default, and keep all other shades the same
        })
    $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey', {
            'default': '50', // use shade 200 for default, and keep all other shades the same
        })

});