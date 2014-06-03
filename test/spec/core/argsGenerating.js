describe('Generate arguments', function () {   
	
  var exercise;
  var types;	

  beforeEach(function () {
		
		module('ChallengeTypes');
		inject(function(add2Ints) {
    	types = {'add2Ints': add2Ints};
  	});
    // init excercise
		exercise = new Exercise(types, {});
  });
	
	it('should shuffle array and have the same length', function () {
		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		var newArr = exercise.shuffle(arr);
		expect(newArr.length).toEqual(10);
	});
	
	it('should return empty array if no includes', function () {
		var includes = [];
		var excludes = [];
		var result = exercise.getFromIncluded(10, includes, excludes);
		expect(result).toBeDefined();
		expect(result.length).toEqual(0);
	});

	it('should return get 10 values from ranged', function () {
		var min = 1;
		var max = 10;
		var excludes = [];
		var result = exercise.getFromRange(10, min, max, excludes);
		
		expect(result).toBeDefined();
		expect(result.length).toEqual(10);
	});	


	it('should exclude values from ranged values', function () {
		var min = 1;
		var max = 10;
		var excludes = [3, 5];
		var result = exercise.getFromRange(10, min, max, excludes);
		
		expect(result).toBeDefined();
		expect(result.length).toEqual(8);
	});	
	
});