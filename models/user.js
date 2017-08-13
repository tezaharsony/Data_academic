'use strict';

const generate = require('../helpers/generateSalt');
const hash = require('../helpers/hash')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: DataTypes.STRING
  },{
    hooks: {
      beforeCreate : (models) => {
        const secret = generate(); //helper
        const hashData = hash(secret, models.password);
        models.password = hashData;
        models.salt = secret;
      }
    }
  });
  return User;
};
