'use strict';
module.exports = (sequelize, DataTypes) => {
  const Episode = sequelize.define('Episode', {
    guid: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    fileSize: DataTypes.INTEGER,
    published: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
    imageUrl: DataTypes.STRING,
    enclosureUrl: DataTypes.STRING,
    enclosureType: DataTypes.STRING
  }, {});
  Episode.associate = function(models) {
    // associations can be defined here
		Episode.belongsTo(models.Podcast);
  };
  return Episode;
};
