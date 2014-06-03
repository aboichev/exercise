angular.module('CoreServices').provider('settings', function () {	
		
	var types = {};
  return {
		register: function (id, type) {
			types[id] = type;
		},
		$get: function () {
			return {
				getRegistedTypes: function () {
					return types;
				}
			}		 
		}
  };
});