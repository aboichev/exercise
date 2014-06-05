angular.module('ChallengeTypes')
.factory('add2Ints', function () {	
  return {
    label: '+',
		args: 2,
    result: function () {
      return arguments[0] + arguments[1];
    },
    toString: function () {
      return arguments[0] + ' + ' + arguments[1];
    }
  };
})
.factory('subtruct2Ints', function () {	
  return {
    label: '-',
		args: 2,
    result: function () {
      return arguments[0] - arguments[1];
    },
    toString: function () {
      return arguments[0] + ' - ' + arguments[1];
    }
  };
});