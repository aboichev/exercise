var Challenge = kabanizer.core.Challenge;
var ArgumentGenerator = kabanizer.core.ArgumentGenerator;
var shuffle = kabanizer.core.shuffle;

describe('Generate arguments', function () {   
	
  var exercise;
  var types;	

  beforeEach(function () {
		
		module('ChallengeTypes');
		inject(function(add2Ints) {
    	types = {'add2Ints': add2Ints};
  	});
    // init excercise
		exercise = new Exercise(types, {
			types: [{ id: 'add2Ints' } ]			
		});
  });
	
	it('should shuffle array and have the same length', function () {
		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		var newArr = shuffle(arr);
		expect(newArr.length).toEqual(10);
	});
	
	it('should generate values using include list only', function () {
		
		var options = { include: [1, 2] };
		var gen = new ArgumentGenerator(options);
		var result = [];
		for(var i = 0; i < 4; i += 1) {
			result.push(gen.next());
		}

		expect(result.length).toEqual(4);
		expect(result[0]).toEqual(1);
		expect(result[1]).toEqual(2);
		expect(result[2]).toEqual(1);
		expect(result[3]).toEqual(2);
	});
	
	it('should generate values using single value in include list', function () {
		
		var options = { include: [7] };
		var gen = new ArgumentGenerator(options);
		var result = [];

		for(var i = 0; i < 2; i += 1) {
			result.push(gen.next());
		}

		expect(result.length).toEqual(2);
		expect(result[0]).toEqual(7);
		expect(result[1]).toEqual(7);
	});
	
	it('should generate values using include list and ranged', function () {
		
		var options = { include: [1, 2], start: 3, end: 4 };		
		var gen = new ArgumentGenerator(options);
		var result = [];

		for(var i = 0; i < 4; i += 1) {
			result.push(gen.next());
		}
		
		expect(result.length).toEqual(4);
		expect(result[0]).toEqual(1);
		expect(result[1]).toEqual(2);
		expect(result[2]).toEqual(3);
		expect(result[3]).toEqual(4);
	});
	
	it('should generate values using include list with single value and ranged', function () {
		
		var options = { include: [1], start: 2, end: 3 };		
		var gen = new ArgumentGenerator(options);
		var result = [];

		for(var i = 0; i < 3; i += 1) {
			result.push(gen.next());
		}

		expect(result.length).toEqual(3);
		expect(result[0]).toEqual(1);
		expect(result[1]).toEqual(2);
		expect(result[2]).toEqual(3);
	});
	
	it('should generate values using include list with single value and ranged start equals end', function () {
		
		var options = { include: [1], start: 2, end: 2 };		
		var gen = new ArgumentGenerator(options);
		var result = [];

		for(var i = 0; i < 4; i += 1) {
			result.push(gen.next());
		}

		expect(result.length).toEqual(4);
		expect(result[0]).toEqual(1);
		expect(result[1]).toEqual(2);
		expect(result[2]).toEqual(1);
		expect(result[1]).toEqual(2);
	});
	
	it('should generate values using include list with single value and ranged start larger then end', function () {
		
		var options = { include: [1], start: 3, end: 2 };	
		var gen = new ArgumentGenerator(options);
		var result = [];

		for(var i = 0; i < 4; i += 1) {
			result.push(gen.next());
		}

		expect(result.length).toEqual(4);
		expect(result[0]).toEqual(1);
		expect(result[1]).toEqual(1);
		expect(result[2]).toEqual(1);
		expect(result[3]).toEqual(1);
	});	
	
	it('should generate values from ranged only when start larger than end', function () {
		
		var options = { start: 3, end: 2 };
		var gen = new ArgumentGenerator(options);
		result = [];

		for(var i = 0; i < 2; i += 1) {
			result.push(gen.next());
		}

		expect(result.length).toEqual(2);
		expect(result[0]).toBe(null);
		expect(result[1]).toBe(null);
	});
	
	it('should generate values from ranged only when start is negative and end is positive', function () {
		
		var options = { start: -1, end: 1 };
		var gen = new ArgumentGenerator(options);
		result = [];

		for(var i = 0; i < 3; i += 1) {
			result.push(gen.next());
		}
		
		expect(result.length).toEqual(3);
		expect(result[0]).toEqual(-1);
		expect(result[1]).toEqual(0);
		expect(result[2]).toEqual(1);
	});
	
	
	it('should generate values from ranged only when start = 0', function () {
		
		var options = { start: 0, end: 2 };
		var gen = new ArgumentGenerator(options);
		result = [];

		for(var i = 0; i < 3; i += 1) {
			result.push(gen.next());
		}

		expect(result.length).toEqual(3);
		expect(result[0]).toEqual(0);
		expect(result[1]).toEqual(1);
		expect(result[2]).toEqual(2);
	});	


});