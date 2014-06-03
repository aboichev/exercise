'use strict';

angular.module('ChallengeTypes', []);
angular.module('Controllers', []);
angular.module('ChallengeTypes', []);
angular.module('CoreServices', []);

angular.module('ExerciseApp', [
		'ui.bootstrap',
		'ngRoute',
		'Controllers',
		'ChallengeTypes',
		'CoreServices'
  ])
	.config(function ($routeProvider, settingsProvider) {
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
		
		 // register types from types module.
		 var typesModule = angular.injector(['ChallengeTypes']);
     var add2Ints = typesModule.get('add2Ints');
		
		 //settingsProvider.register('add2Ints', add2Ints);
		 //console.log(settingsProvider.getRegistedTypes());
				
  });
