
var types = {
  'add2ints': {
    label: '+',
    result: function() {
      return arguments[0] + arguments[1];
    },
    toString: function() {
      return arguments[0] + ' + ' + arguments[1];
    },
    params: 2
  }
};

describe('Challenge - processInput()', function () {

  it('should return correct for input "4" of 2 + 2', function () {
    var twoPlusTwo = new Challenge(types.add2ints, [2,2]);
    expect(twoPlusTwo.processInput('4')).toBe("correct");
  });
  
  it('should return "maybe", "maybe" then "correct" for input "8->0->9" of 356 + 453', function () {
    var threeDigitChallenge = new Challenge(types.add2ints, [356, 453]);
    
    expect(threeDigitChallenge.processInput('8')).toBe("maybe");
    expect(threeDigitChallenge.processInput('0')).toBe("maybe");
    expect(threeDigitChallenge.processInput('9')).toBe("correct");
  });  
});

describe('Challenge - toString()', function () {
    
  it('should return "2 + 2"', function () {
    expect(new Challenge(types.add2ints, [2,2]).toString()).toBe('2 + 2');
  });
  
  it('should return "17 + 5"', function () {
    expect(new Challenge(types.add2ints, [17,5]).toString()).toBe('17 + 5');
  });
  
  it('should return "356 + 654"', function () {
    expect(new Challenge(types.add2ints, [356, 654]).toString()).toBe('356 + 654');
  });    
});