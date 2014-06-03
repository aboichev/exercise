'use strict';

describe('Challenge - processInput()', function () {
	
	var currType;
	
  beforeEach(module('ChallengeTypes'));
		
  beforeEach(inject(function(add2Ints) {
    currType = add2Ints;
  }));

  it('should return correct for input "4" of 2 + 2', function () {
    var twoPlusTwo = new Challenge(currType, [2,2]);
    expect(twoPlusTwo.processInput('4')).toBe("correct");
  });
  
  it('should return "maybe", "maybe" then "correct" for input "8->0->9" of 356 + 453', function () {
    var threeDigitChallenge = new Challenge(currType, [356, 453]);
    
    expect(threeDigitChallenge.processInput('8')).toBe("maybe");
    expect(threeDigitChallenge.processInput('0')).toBe("maybe");
    expect(threeDigitChallenge.processInput('9')).toBe("correct");
  });  
    
  it('should return "2 + 2"', function () {
    expect(new Challenge(currType, [2,2]).toString()).toBe('2 + 2');
  });
  
  it('should return "17 + 5"', function () {
    expect(new Challenge(currType, [17,5]).toString()).toBe('17 + 5');
  });
  
  it('should return "356 + 654"', function () {
    expect(new Challenge(currType, [356, 654]).toString()).toBe('356 + 654');
  });    
});