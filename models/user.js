'use strict';
require('dotenv').config();

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

  User.loadCurrentUser = function () {
    return new Promise((resolve, reject) => {
     
      User.findOne({ where: { email: process.env.USER_EMAIL }}).then(async function(currentUser) {

        if (currentUser === undefined || currentUser === null) {
          currentUser = await User.create({ name: process.env.USER_NAME, email: process.env.USER_EMAIL });
        }

        resolve(currentUser);
      });
    });
  };

  return User;
};
