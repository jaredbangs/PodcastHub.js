'use strict';

import { Subscription } from "./subscription";

export class User {
  public static async findAll(): Promise<User[]> {
	  throw new Error('Method not implemented.');
  }
  public static async loadCurrentUser(): Promise<User> {
	  throw new Error('Method not implemented.');
  }

  public static async create(name: string, email: string = ""): Promise<User> {

    const user = new User();
    user.name = name;
    user.email = email;
  
    return user;
  }

  public static destroyAll() {
    // throw new Error('Method not implemented.');
  }
  
  public static findOne(arg0: { where: { name: string; }; }): Promise<User> {
	  throw new Error('Method not implemented.' + arg0);
  }
  
  public getSubscriptions(): Promise<Subscription[]> {
	  throw new Error('Method not implemented.');
  }

  constructor() {
    this.email = "";
    this.name = "";
  }

  public email: string;
  public name: string;

}

/*
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
*/