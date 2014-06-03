angular.module('ChallengeTypes').factory('add2Ints', function() {
	
	var defaultArg = {
		min: 1,
		max: 9,
		exclude: [],
		include: []
  };
	
  return {
    label: '+',
    result: function() {
      return arguments[0] + arguments[1];
    },
    toString: function() {
      return arguments[0] + ' + ' + arguments[1];
    },
    params: 2,	
		defaultArgs: [defaultArg, defaultArg]
  }
});