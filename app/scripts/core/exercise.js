/*
 *  1. Exercise has some number of challenges.
 *	2. Challenges can be of different types.
 *	3. For each type there is a options object for each argument of a challenge. (min, max, include, exclude)
 *	4. nextChallenge() returns a challenge of random type.
*/
'use strict';
var kabanizer = { core: {} };

(function () {
	
	var defautArgoptions = {
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
	
	// Fisher-Yates shuffle algorithm.
 	function shuffle(arr) {
    for(var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };
	
	var iteratorPrototype = {
		next: function () {
				var len = this.arr.length;
				if (this.i < len) {
					this.i += 1;
					return this.arr[this.i - 1];				
				}	
				return null;
			}		
	};
	
	function IncludedIterator(arr, shuffle) {
   this.arr = arr || [];	 
	 this.i = 0;		
	 if (shuffle) {
		 this.arr = shuffle(this.arr);
	 }
	}	
	IncludedIterator.prototype = iteratorPrototype;

	
	function RangedIterator(start, end, shuffle) { 
		var i, size;
		this.start = start !== undefined ? start : null;
		this.end = end !== undefined ? end : null;	 	
		this.arr = [];
		this.i = 0;
		if (this.start !== null && this.end !== null) {
			for(i = this.start; i <= this.end; i += 1) {
				this.arr.push(i);
			}
			if (shuffle) {
			 this.arr = shuffle(this.arr);
			}
		}
	}	
	RangedIterator.prototype = iteratorPrototype;
	
	function ArgumentGenerator (options) {
		
		this.start = options.start !== undefined ? options.start : null;
		this.end = options.end !== undefined ? options.end : null;
		this.includedIter = new IncludedIterator(options.include, options.shuffle);
		this.rangedIter = new RangedIterator(this.start, this.end, options.shuffle);
		this.excludedVals = options.exclude || [];
		this.excludedCounter = 0;
		this.counter = 0;
	}
	
	ArgumentGenerator.prototype.next = function () {
	
			var valueFromIncluded = this.includedIter.next(),
					valueFromRanged = null;
			
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
					if (this.excludedCounter < this.rangedIter.arr.length) {						
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
				this.rangedIter.i = 0;
				this.counter  = 0;
				return this.next();
			}
			return null;
	}

  function Exercise(types, options) { 	
		var i = 0, j = 0, m = 0;
  	this.types = types;
  	this.options = options;
    this.argumentVals = [];
    this.currIx = 0;
		
		if (options.types.length == 0) {
			throw new Error("types must have at least one element.");
		}
				
		// holds number of challenges needed for each type
    var typesBucket = this.distribute(this.options.numOfChallenges,
  																	  this.options.types.length);
		
		// for each type of challenge in types bucket
		for (; i < typesBucket.length; i += 1) {
			var typeOpts = options.types[i],
					size = typesBucket[i],
					args = typeOpts.args || [];

			//make generator for each argument
			for(; j < args.length; j += 1) {
					args[j].generator = new ArgumentGenerator(args[j]);					
			}
			
			// for each challenge in typeBucket
			for(j = 0; j < size; j += 1) {	
				var data = { 
					typeId: typeOpts.id,
					values: []
				};
				// for each argument get next value
				for(m = 0; m < args.length; m += 1) {
						data.values.push(args[m].generator.next()); 
				}
				this.argumentVals.push(data);			
			}
		}  	
  	this.argumentVals = shuffle(this.argumentVals);
  }
 
 	Exercise.prototype.nextQuestion = function () {
      if (this.currIx < this.argumentVals.length) {
				
        var data = this.argumentVals[this.currIx];
        this.currIx += 1;	
        return new Challenge(this.types[data.typeId], data.values);
      }
      return null;
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
	kabanizer.core.shuffle = shuffle;
	
  // export object
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = kabanizer.core;
  }

}());