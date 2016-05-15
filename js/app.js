var app = angular.module("app", ['ngRoute', 'firebase', 'ui.bootstrap', 'ui-notification'])

    .config(function ($routeProvider) {
        $routeProvider.when('/home', {
            controller: 'HomeController',
            templateUrl: '/templates/home.html'
        })
        .when('/history', {
            controller: 'historyController',
            templateUrl: '/templates/history.html'
        })
        .otherwise('/home', {
            controller: 'HomeController',
            templateUrl: '/templates/home.html'
        });
    });


   
 