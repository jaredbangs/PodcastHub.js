'use strict';
module.exports = (sequelize, DataTypes) => {
  const Podcast = sequelize.define('Podcast', {
    LastChecked: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
    LastUpdated: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
    ParsedFeedCache: DataTypes.JSON,
    RssUrl: DataTypes.STRING,
    title: DataTypes.STRING
  }, {});
  Podcast.associate = function(models) {
    // associations can be defined here
		Podcast.hasMany(models.Episode);
  };
  return Podcast;
};
