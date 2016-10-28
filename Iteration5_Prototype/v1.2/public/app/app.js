var app = angular.module('App', ['ui.router', 'ngMaterial', 'ngMdIcons', 'ngMessages', 'material.svgAssetsCache', 'angular-svg-round-progressbar', 'ng-drawingboard']);

/* routing of the menu strucutre of th eapplication*/
app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider.state("whiteboard", {
        url: "/whiteboard",
        params: {
            'ideaId': '-1'
        },
        controller: "WhiteboardCtrl",
        templateUrl: "app/views/whiteboard.html"
    })
    $stateProvider.state("dashboard", {
        url: "/dashboard",
        controller: "DashboardCtrl",
        templateUrl: "app/views/dashboard.html"
    })
    $stateProvider.state("profile", {
        url: "/profile",
        controller: "ProfileCtrl",
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

/* material design color pallete*/
app.config(function ($mdThemingProvider) {
    var background = $mdThemingProvider.extendPalette('grey', {
        'A100': 'fafafa'
    });
    $mdThemingProvider.definePalette('background', background);
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo', {
            'default': '500', // by default use shade 500 from the pink palette for primary intentions
            'hue-1': '800', // use shade 800 for the <code>md-hue-1</code> class
            'hue-2': '100',
        })
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        .accentPalette('cyan', {
            'default': '500' // use shade 500 for default, and keep all other shades the same
        })
        .backgroundPalette('background')
        .warnPalette('red', {
            'default': '500' // use shade 500 for default, and keep all other shades the same
        });


});