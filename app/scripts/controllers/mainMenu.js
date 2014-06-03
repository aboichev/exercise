'use strict';

angular.module('Controllers')
	.controller('MainMenuCtrl', function ($scope) {
    $scope.menuItems = [
			{ title: 'New Exercise', url: '#/new' },
			{	title: 'Open',	url: '#/open' },
			{ title: 'Settings', url: '#/settings' }
    ];
  });
