/*
 *  1. Exercise has some number of challenges.
 *	2. Challenges can be of different types.
 *	3. For each type there is a settings for each argument of a challenge. (min, max, include, exclude)
 *	4. nextChallenge() returns a challenge of random type.
*/
'use strict';
var kabanizer = { core: {} };

(function () {
	
	var defautArgConfig = {
			min: 1,
			max: 9,
			exclude: [],
			include: []
	};
	
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
  	
    var i = 0, j = 0, self = this;
  	
  	this.defaults = {
  		numOfChallenges: 10,
  		types: []
  	};
  	this.types = types;
  	this.config = angular.extend(this.defaults, settings);
    this.argumentVals = [];
    this.currIx = 0;
    this.history = [];
		
		if (this.config.types.length == 0) {
			throw new Error("types must have at least one element.");
		}
		// distribute questions between differnt types from typesConf array
    var argsSizes = this.distribute(this.config.numOfChallenges,
  																	this.config.types.length);
		
		// generate values for all challange arguments
    self.forEachType(types, argsSizes, function (config) {
  		var argsValues = [];
			
  		self.forEachArgument(config, function (argConfig) {
					argsValues.push(self.generateValues(argConfig, config.size));
  		});
  		// transform values
			self.forEachChallenge(argsValues, function (values) {
				self.argumentVals.push({ typeId: config.id,	values: values });		
			});
    });
  	
  	self.argumentVals = self.shuffle(self.argumentVals); 
  }
 
 	Exercise.prototype.nextQuestion = function () {
			console.log("Args Values", this.argumentVals);
      if (this.currIx < this.argumentVals.length) {
  			
        var data = this.argumentVals[this.currIx];
  			
        this.currIx += 1;
        this.history.push(data);
        return new Challenge(this.types[data.typeId], data.values);
      }
      return null;
  };

  Exercise.prototype.generateValues = function(arg, howMany) {
			var result = [],
					includedValues = this.getFromIncluded(howMany,
																								arg.include || [],
																								arg.exclude || []);
					
			if (includedValues.length > 0) {
					result.push(includedValues);
					return result; 
			}

			result.push( this.getFromRange(arg.size,
																		 arg.min || 1,
																		 arg.max || 9,
																		 arg.exclude || []));
			return result;
  };
 
  Exercise.prototype.forEachType = function (types, sizesArray, callback) {
    var i = 0, config, typeImpl;
    for(; i < sizesArray.length; i += 0) {
				config = this.config.types[i];
			  config.size = sizesArray[i];
				// if argument configs not provided, create using defaults
			  typeImpl = types[config.id];
			  if (!config.args) {
					config.args = [];
					for(i = 0; i < typeImpl.args; i += 1) {
						config.args.push(defautArgConfig);
					}
  		}
			callback(config);
		}
  };

  Exercise.prototype.forEachArgument = function (config, callback) {
    var i = 0;
    for(; i < config.args.length; i += 1) {
			callback(config.args[i]);
		}
  };

  Exercise.prototype.forEachChallenge = function (values, callback) {	
			var i = 0, j = 0, args, size = values[0].length;
			for (; i < size; i += 1) {
				args = [];
				for(; j < values.length; j += 1) {
						args.push(values[j][i]);
				}
				callback(args);
  		}
  };
	
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

	kabanizer.core.Challenge = Challenge;
  kabanizer.core.Exercise = Exercise;

  // export object
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = kabanizer.core;
  }

}());