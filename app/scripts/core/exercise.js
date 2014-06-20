/*
 *  1. Exercise has some number of challenges.
 *	2. Challenges can be of different types.
 *	3. For each type there is a options object for each argument of a challenge. (min, max, include, exclude)
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
	
	function IncludedIterator(arr) {
   this.arr = arr || [];
	 this.i = 0;		
	}
	
	IncludedIterator.prototype.next = function () {
			var len = this.arr.length;
			if (this.i < len) {
				this.i += 1;
				return this.arr[this.i - 1];				
			}	
			return null;
	};

	
	function RangedIterator(start, end) {
		this.start = start !== undefined ? start : null;
		this.end = end !== undefined ? end : null;
	 this.i = this.start;		
	}
	
	RangedIterator.prototype.next = function () {
		
		if (this.start === null || this.end === null ) {
				return null;git
		}
		if (this.i <= this.end) {
			this.i += 1;
			return this.i - 1;
		}	
		return null;
	};
	
	function ArgumentGenerator (config) {	
		this.start = config.start !== undefined ? config.start : null;
		this.end = config.end !== undefined ? config.end : null;
		this.includedIter = new IncludedIterator(config.include);
		this.rangedIter = new RangedIterator(this.start, this.end);
		this.excludedVals = config.exclude || [];
		this.excludedCounter = 0;
		this.counter = 0;
	}
	
	ArgumentGenerator.prototype.next = function () {
	
			var valueFromIncluded = this.includedIter.next(),
					valueFromRanged = null,
					rangedSize = 0;
		
			if (this.start !== null && this.end !== null) {
				rangedSize = this.end - this.start + 1;
			}
			
			if (valueFromIncluded) {				
				if (this.excludedVals.indexOf(valueFromIncluded) >= 0) {					
					return this.next();
				}
				this.counter += 1;
				return valueFromIncluded;
			}
		
			
			valueFromRanged = this.rangedIter.next();
			if (valueFromRanged != null) { // includes 0
				if (this.excludedVals.indexOf(valueFromRanged) >= 0) {
					// prevent endless loop
					this.excludedCounter += 1;
					if (this.excludedCounter < rangedSize) {
						return this.next();						
					}						
				}
				this.counter += 1;
				return valueFromRanged;				
			}
			
			// if all values depleted start over
			// only if prior to that it produced at least one value
			if (this.counter > 0) {
				this.includedIter.i = 0;
				this.rangedIter.i = this.start;
				this.counter  = 0;
				return this.next();
			}
			return null;
	}
	

  function Exercise(types, options) {  	
		
  	this.types = types;
  	this.options = options;
    this.argumentVals = [];
    this.currIx = 0;
		
		if (options.types.length == 0) {
			throw new Error("types must have at least one element.");
		}
				
		// distribute questions between differnt types from typesConf array
    var sizesByType = this.distribute(this.options.numOfChallenges,
  																	this.options.types.length);
		
		// for each type of challenge in options
		for (var i = 0; i < sizesByType.length; i += 1) {
			var typeOpts = options.types[i],
					size = sizesByType[i],
					args = typeOpts.args || [];

			//make generator for each argument
			var gens = [];
			for(var k = 0; k < args.length; k += 1) {
					gens.push(new ArgumentGenerator(args[k]));
			}
			// for each challenge in typeBucket
			for(var j = 0; j < size; j += 1) {	
				var data = { typeId: typeOpts.id,	values: [] };
				// for each argument get next value
				for(var m = 0; m < gens.length; m += 1) {
						data.values.push(gens[m].next());
				}
				this.argumentVals.push(data);			
			}
		}	
  	
  	this.argumentVals = this.shuffle(this.argumentVals);
  }
 
 	Exercise.prototype.nextQuestion = function () {
      if (this.currIx < this.argumentVals.length) {
  			
        var data = this.argumentVals[this.currIx];
        this.currIx += 1;	
        return new Challenge(this.types[data.typeId], data.values);
      }
      return null;
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
	kabanizer.core.ArgumentGenerator = ArgumentGenerator;
	
  // export object
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = kabanizer.core;
  }

}());