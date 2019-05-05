'use strict';
var Bluebird = require('bluebird');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    // associations can be defined here
		User.hasMany(models.Subscription, { onDelete: 'cascade', hooks: true });
  };

  return User;
};
