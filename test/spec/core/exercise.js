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
					typesConf: [{ id: 'add2Ints' } ]
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
					typesConf: [ { 
							id: 'add2Ints',
							args: [
								{include: [1]}, // first argument
								{include: [1]}  // second argument
							]
						}]
				});
		
				var challenge1 = exercise.nextQuestion();			
		
				expect(challenge1 instanceof Challenge).toBe(true);		
				expect(challenge1.args[0]).toEqual(1);
				expect(challenge1.args[1]).toEqual(1);				
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