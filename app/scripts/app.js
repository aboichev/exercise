'use strict';

angular
  .module('ExerciseApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/mainMenu.html',
        controller: 'MainMenuCtrl'
      })
		  .when('/new', {
        templateUrl: 'views/mainMenu.html',
        controller: 'MainMenuCtrl'
      })
		  .when('/continue', {
        templateUrl: 'views/mainMenu.html',
        controller: 'MainMenuCtrl'
      })
			.when('/open', {
        templateUrl: 'views/mainMenu.html',
        controller: 'MainMenuCtrl'
      })
			.when('/settings', {
        templateUrl: 'views/mainMenu.html',
        controller: 'MainMenuCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
