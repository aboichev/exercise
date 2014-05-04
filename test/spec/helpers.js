// test helpers;

function feedCorrectAnswer (challenge, callback) {
          
    var i = 0,
        out,
        answer = ('' + challenge.typeImpl.result.apply(null, challenge.args)).split();
    for (; i < answer.length; i +=1) {
      out = challenge.processInput(answer[i]);
    }
    return out;
}