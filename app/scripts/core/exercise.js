'use strict';
var kabanizer = { core: {} };

(function () {

  // 1. Exercise has some number of challenges.
  // 2. Challenges can be of different types.
  // 3. For each type there is a settings for each argument of a challenge. (min, max, include, exclude)
  // 4. nextChallenge() returns a challenge of random type.

  function Challenge(type, args) {
    this.input = '';
    this.typeImpl = type;
    this.args = args;
  }
   
  Challenge.prototype.toString = function() {
    return this.typeImpl.toString.apply(null, this.args);
  };

  Challenge.prototype.processInput = function(value) {
    this.input += value;
    if(this.input.length < this.typeImpl.result.apply(null, this.args).toString().length) {
      return 'maybe';
    }
    if(this.input == this.typeImpl.result.apply(null, this.args)) {
      return 'correct';
    }
    return 'incorrect';
  };

  function Exercise(types, settings) {
  	
    var i = 0, j = 0, k = 0;
  	
  	this.defaults = {
  		numOfChallenges: 10,
  		typesConf: [ {
  				id: 'add2Ints'
  			}
  		]
  	};
  	
  	this.config = angular.extend(this.defaults, settings);
    this.challengeData = [];
    this.currIx = 0;
    this.history = [];
  	// distribute questions between diffent types
    var argsSizes = this.distribute(this.config.numOfChallenges,
  																	this.config.typesConf.length);

    for(; i < argsSizes.length; i += 1) {
  		var typeConfig = this.config.typesConf[i];
  		var type = types[typeConfig.id];
  		if (!typeConfig.args) {
  			typeConfig.args = type.defaultArgs;
  		}
  		
  		type.argsValues = [];
  		
  		for(k = 0; k < type.params; k += 1) {
  				var includedValues = this.getFromIncluded(argsSizes[i],
  																			typeConfig.args[k].include || [],
  																			typeConfig.args[k].exclude || []);
  				
  				if (includedValues.length > 0) {
  					type.argsValues.push(includedValues);
  					continue; 
  				}
  				
  			  var fromRange = this.getFromRange(argsSizes[i],
  																				typeConfig.args[k].min || 1,
  																				typeConfig.args[k].max || 9,
  																				typeConfig.args[k].exclude || []);
  			  type.argsValues.push(fromRange);
  		}
  		
  		for(j = 0; j < argsSizes[i]; j += 1) {
  			var data = {
  				type: type,	
  				args: []
  			};

  			for(k = 0; k < type.params; k += 1) {
  				data.args.push(type.argsValues[k][j]);
  			}
  			this.challengeData.push(data);			
  		}    
    }
  	
  	this.challengeData = this.shuffle(this.challengeData);
  	
    this.nextQuestion = function() {
  		
      if(this.currIx < this.challengeData.length) {
  			
        var data = this.challengeData[this.currIx];
  			
        this.currIx += 1;
        this.history.push(data);
        return new Challenge(data.type, data.args);
      }
      return null;
    };
  }

  Exercise.prototype.getFromIncluded = function(max, include, exclude) {
    var i = 0, args = [];
    for(; i < include.length && args.length < max; i += 0) {
      if(exclude.indexOf(include[i]) >= 0) {
        continue;
      }
      args.push(include[i]);
    }
    return args;
  };

  //Exercise.prototype.getRandomChallengeData = function() {
  //  var ix = Math.floor(Math.random() * this.challengeData.length);
  //  return this.challengeData[ix];
  //};

  Exercise.prototype.getFromRange = function(max, start, end, exclude) {    
    var i = start,
        args = [];
    for(; i <= end && args.length < max; i += 1) {
      if(exclude.indexOf(i) >= 0) {
        continue;
      }
      args.push(i);
    }
    return args;
  };
  // Fisher-Yates shuffle algorithm.
  Exercise.prototype.shuffle = function(arr) {
    for(var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  Exercise.prototype.distribute = function(size, groups) {
    var i = 0,
      arr = [];
  	if(groups === 0) { return arr; }
    for(; i < groups; i += 1) {
      arr.push(Math.floor(size / groups) + (i < size % groups ? 1 : 0));
    }
    return arr;
  };

  kabanizer.core.Exercise = Exercise;
  kabanizer.core.Challenge = Challenge;

  // export object
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = kabanizer.core;
  }

}());