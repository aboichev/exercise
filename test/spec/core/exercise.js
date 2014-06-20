var Exercise = kabanizer.core.Exercise;
var Challenge = kabanizer.core.Challenge;


describe('Generating challenges in excercise', function() {
	// helper funciton
  var feedCorrectAnswer = function (challenge, callback) {   
  	var i = 0, out, answer = (''+ challenge.typeImpl.result.apply(null, challenge.args)).split();
    for (; i < answer.length; i +=1) {
      out = challenge.processInput(answer[i]);
    }
    return out;
	},	
	types;
	
	beforeEach(function () {
		
		module('ChallengeTypes');		
		
		inject(function(add2Ints) {			
			types = {add2Ints: add2Ints};
		});
	});
	
	it('should return 2 challanges and then null', function() {

		var exercise = new Exercise(types, { 
			numOfChallenges: 2,
			types: [{
					id: 'add2Ints',
					args: [
						{include:[1]},
						{include:[1]}
					]
				}]
		});
		var challenge1 = exercise.nextQuestion();
		expect(challenge1 instanceof Challenge).toBe(true);
		expect(feedCorrectAnswer(challenge1)).toBe('correct');
		var challenge2 = exercise.nextQuestion();
		expect(challenge2 instanceof Challenge).toBe(true);
		expect(feedCorrectAnswer(challenge2)).toBe('correct');
		expect(exercise.nextQuestion()).toBeNull();
	});
	
	it('should generate questions using include list', function() {
		var exercise = new Exercise(types, { 
			numOfChallenges: 1,
			// setup 1 type 
			types: [ { 
					id: 'add2Ints',
					args: [
						{include: [3]},
						{include: [3]}  
					]
				}]
		});

		var challenge1 = exercise.nextQuestion();			

		expect(challenge1 instanceof Challenge).toBe(true);		
		expect(challenge1.args[0]).toEqual(3);
		expect(challenge1.args[1]).toEqual(3);				
	});	
	
	it('should exclude a value from include list', function() {
		debugger;
		var exercise = new Exercise(types, { 
			numOfChallenges: 1,
			// setup 1 type 
			types: [ { 
					id: 'add2Ints',
					args: [
						{ include: [2, 1, 3], exclude: [2, 1]}, // first argument
						{ include: [2, 1, 3], exclude: [2, 1]}  // second argument
					]
				}]
		});
		
		var challenge1 = exercise.nextQuestion();	
		expect(challenge1 instanceof Challenge).toBe(true);		
		expect(challenge1.args[0]).toEqual(3);
		expect(challenge1.args[1]).toEqual(3);		
		
	});

	it('should exclude a value from ranged list', function() {
		
		var exercise = new Exercise(types, { 
			numOfChallenges: 1,
			// setup 1 type 
			types: [ { 
					id: 'add2Ints',
					args: [
						{ start: 1, end: 5, exclude: [3, 1]}, // first argument
						{ start: 1, end: 5, exclude: [3, 1]}  // second argument
					]
				}]
		});
		
		var challenge1 = exercise.nextQuestion();	
		
		expect(challenge1 instanceof Challenge).toBe(true);		
		expect(challenge1.args[0]).toEqual(2);
		expect(challenge1.args[1]).toEqual(2);
	});	
	
});

describe('SettingsProvider', function() {
	
	var mySettingsProvider;
	beforeEach(function () {
		// make a test module and use .config to set up settingsProvider
		angular.module('testApp', function () {})
		.config(function (settingsProvider) {
			mySettingsProvider = settingsProvider;
		});
		// Initialize ExerciseApp injector
		module('ExerciseApp', 'testApp');
		// Kickstart the injectors previously registered with calls to angular.mock.module
		inject(function () {});
	});

	it('should be resolved', function () {
		expect(mySettingsProvider).toBeDefined();					
	});

	it('should be able to register and get type', function () {
		mySettingsProvider.register('add2Ints', {});
		expect(mySettingsProvider.$get()).toBeDefined();
		expect(mySettingsProvider.$get().getRegistedTypes).toBeDefined();
		expect(mySettingsProvider.$get().getRegistedTypes()).toBeDefined();
		expect(mySettingsProvider.$get().getRegistedTypes()['add2Ints']).toBeDefined();
	});
});	