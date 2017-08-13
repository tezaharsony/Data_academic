"use strict"

const crypto = require('crypto');

module.exports = function(pass, secret){
  const hash = crypto.createHmac('sha256', secret) //sha256 metode enkripsi
                     .update(pass)
                     .digest('hex');
  return hash;
}
