var expect = chai.expect;

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

describe('Generating challenges in excercise', function () {
  
    var exercise;
    
    beforeEach(function () {
      // init excercise
      exercise = new Exercise(types, {
  
        numOfChallenges: 2,
        
        typesConf: [
          // one for each type
          { id: 'add2ints',
          // one for each arg
            args: [
              { min: 5, max: 9, exclude: [6], include: [1, 0] },
              { min: 3, max: 9, include: [],  exclude: [] }
            ]
          }
        ],
      });
    });
    
    it('should return 2 challanges and then null', function () {
      
      var challenge1 = exercise.nextQuestion();
      expect(challenge1).to.be.an.instanceof(Challenge);
      expect(feedCorrectAnswer(challenge1)).to.equal('correct');
      
      var challenge2 = exercise.nextQuestion();
      expect(challenge2).to.be.an.instanceof(Challenge);
      expect(feedCorrectAnswer(challenge2)).to.equal('correct');
      
      expect(exercise.nextQuestion()).to.be.an.a('null');
    });
    
    
    it('should distribute 2 items in 2 groups', function () {
      // 2 in 2 should have [1, 1]
      var sizeArray = exercise.distribute(2, 2);
      expect(sizeArray.length).to.equal(2);
      expect(sizeArray[0]).to.equal(1);
      expect(sizeArray[1]).to.equal(1);
    });
    
    it('should distribute 1 item in 2 groups', function () {
      // 2 in 2 should have [1, 0]
      var sizeArray = exercise.distribute(1, 2);
      expect(sizeArray.length).to.equal(2);
      expect(sizeArray[0]).to.equal(1);
      expect(sizeArray[1]).to.equal(0);
    });  
    
    it('should distribute 14 item in 3 groups', function () {
      // 2 in 2 should have [5, 5, 4]
      var sizeArray = exercise.distribute(14, 3);
      expect(sizeArray.length).to.equal(3);
      expect(sizeArray[0]).to.equal(5);
      expect(sizeArray[1]).to.equal(5);
      expect(sizeArray[2]).to.equal(4);
    }); 

});