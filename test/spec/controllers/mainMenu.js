'use strict';

describe('Controller: MainMenuCtrl', function () {

	var MainCtrl, scope;
	
  // load the controller's module
  beforeEach(module('ExerciseApp'));
	
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
			scope = $rootScope.$new();

			MainCtrl = $controller('MainMenuCtrl', {
				$scope: scope
			});		
  	})
	);

  it('should attach a list of menuItems to the scope', function () {
    expect(scope.menuItems.length).toBe(3);
  });
	
});
