'use strict';

export class Subscription {
  
  static destroy() {
    throw new Error('Method not implemented.');
  }
  
  static findAll(): Promise<Subscription[]> {
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
