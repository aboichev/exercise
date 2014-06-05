describe('Distribute function in excercise', function () {   
	
  var exercise;
  var types;
	
  beforeEach(module('ChallengeTypes'));
	
  beforeEach(inject(function(add2Ints) {
    types = {'add2Ints': add2Ints};
  }));
	
  beforeEach(function () {
    // init excercise
		exercise = new kabanizer.core.Exercise(types, { types: [{ id: 'add2Ints'}]});
  });
	
	it('should distribute 2 items in 2 groups', function () {
		// 2 in 2 should have [1, 1]
		var sizeArray = exercise.distribute(2, 2);
		expect(sizeArray.length).toBe(2);
		expect(sizeArray[0]).toBe(1);
		expect(sizeArray[1]).toBe(1);
	});

	it('should distribute 1 item in 2 groups', function () {
		// 2 in 2 should have [1, 0]
		var sizeArray = exercise.distribute(1, 2);
		expect(sizeArray.length).toBe(2);
		expect(sizeArray[0]).toBe(1);
		expect(sizeArray[1]).toBe(0);
	});  

	it('should distribute 14 item in 3 groups', function () {
		// 2 in 2 should have [5, 5, 4]
		var sizeArray = exercise.distribute(14, 3);
		expect(sizeArray.length).toBe(3);
		expect(sizeArray[0]).toBe(5);
		expect(sizeArray[1]).toBe(5);
		expect(sizeArray[2]).toBe(4);
	}); 

	it('should distribute 2 item in 2 groups', function () {
		// 2 in 2 should have [5, 5, 4]
		var sizeArray = exercise.distribute(2, 2);
		expect(sizeArray.length).toBe(2);
		expect(sizeArray[0]).toBe(1);
		expect(sizeArray[1]).toBe(1);
	}); 
});