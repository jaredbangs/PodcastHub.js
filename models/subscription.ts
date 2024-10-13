'use strict';

import { Podcast } from "./podcast";
import { User } from "./user";

export class Subscription {
  save() {
    throw new Error('Method not implemented.');
  }
  public setPodcast(podcast: Podcast): void {
    throw new Error('Method not implemented.' + podcast);
  }
  public setUser(user: User): void {
    throw new Error('Method not implemented.' + user);
  }
  public static async create(): Promise<Subscription> {
    throw new Error('Method not implemented.');
  }
  
  public static async destroyAll(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  public static async findAll(): Promise<Subscription[]> {
	  throw new Error('Method not implemented.');
  }
  
  public lastUpdated: Date = new Date();
}


/*
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    lastUpdated: DataTypes.DATE
  }, {});
  Subscription.associate = function(models) {
    // associations can be defined here
		Subscription.belongsTo(models.Podcast, { onDelete: 'cascade' });
		Subscription.belongsTo(models.User, { onDelete: 'cascade' });
  };
  return Subscription;
};
*/
