'use strict';
// 1. Exercise has some number of challenges.
// 2. Challenges can be of different types.
// 3. For each type there is a settings for each argument of a challenge. (min, max, include, exclude)
// 4. nextChallenge() returns a challenge of random type.
// 
// 

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

function Exercise(types, conf) {
  var i = 0,
    j = 0;
  this.conf = conf;
  this.challengeData = [];
  this.currIx = 0;
  this.history = [];
  var argsSizes = this.distribute(this.conf.numOfChallenges, this.conf.typesConf.length);
  for(; i < argsSizes.length; i += 1) {
    var data = {
      type: types[this.conf.typesConf[i].id],
      args: [],
      size: argsSizes[i],
      current: 0
    };
    for(; j < data.size; j += 1) {
      data.args.push([2, 2]);
    }
    this.challengeData.push(data);
  }
  this.nextQuestion = function() {
    if(this.conf.numOfChallenges && this.currIx < this.conf.numOfChallenges) {
      var challengeData = this.getRandomChallengeData();
      var args = challengeData.args[challengeData.current];
      challengeData.current += 1;
      this.currIx += 1;
      this.history.push(challengeData);
      return new Challenge(challengeData.type, args);
    }
    return null;
  };
}
Exercise.prototype.getFromIncluded = function(max, include, exclude) {
  var i = 0,
    args = [];
  for(; i < include.length && args.length < max; i += 0) {
    if(exclude.indexOf(include[i]) >= 0) {
      continue;
    }
    args.push(include[i]);
  }
  return args;
};
Exercise.prototype.getRandomChallengeData = function() {
  var ix = Math.floor(Math.random() * this.challengeData.length);
  return this.challengeData[ix];
};
Exercise.prototype.getFromRange = function(max, start, end, include, exclude) {
  var i = start,
    args = [];
  for(; i <= end && args.length < max; i += 0) {
    if(exclude.indexOf(i) >= 0) {
      continue;
    }
    args.push(include[i]);
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