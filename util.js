function emit(arr){
  if (!arr.length){
    return;
  }

  function dispatchLightEvent(value){
    var mock = new DeviceLightEvent('devicelight', { value: value });
    window.dispatchEvent(mock);
  }

  var interval, timeout;
  var char = arr.shift();
  var duration;
  var lux;

  if (char == '.'){
    lux = 1000;
    duration = server.times.dot;
  }

  if (char == '-'){
    lux = 1000;
    duration = server.times.dash;
  }

  if (char == ' '){
    lux = 50;
    duration = server.times.break;
  }

  if (char == '|'){
    lux = 50;
    duration = server.times.charBreak;
  }

  if (char == '/'){
    lux = 50;
    duration = server.times.wordBreak;
  }

  interval = setInterval(function(){ dispatchLightEvent(lux) }, 20);
  timeout = setTimeout(function(){
    interval = clearInterval(interval);
    timeout = clearTimeout(timeout);
    // continue emitting
    emit(arr)
  }, duration);
}

function strToMorse(string){
  return string.split('').map(function(c){
    if (c === ' '){
      return '/'
    }
    return server.charToMorse(c) + ' ';
  }).join('')
}

function transform(str){
  return str.split('').map(function(c){
    if (c == '/') {
      return c
    }
    if (c === ' ') {
      return '|'
    }

    return c + ' '}).join('').split('').concat('/');
}

// USAGE -----------------------------------

// var message = strToMorse('paris');
// message = transform(message);
// emit(message);
// console.log(message)
