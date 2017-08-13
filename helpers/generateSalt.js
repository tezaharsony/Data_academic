"use strict"


module.exports = function(){
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  length =  7,
  result = '';
  
  for(var i = length; i > 0; --i){
    result += chars[Math.round(Math.random() * (chars.length -1))];
  }
  return result;
}
