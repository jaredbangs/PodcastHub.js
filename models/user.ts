'use strict';

import { SavableItem } from "../repositories/savableItem";
import { UUID } from "../uuid";

export class User implements SavableItem {

  public _id: string = "";
  public email: string = "";
  public name: string = "";
  
  constructor(id: string = UUID.random()){
    this._id = id;
  }
}

/*
require('dotenv').config();


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
*/