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
    author: DataTypes.STRING,
    descriptionLong: DataTypes.STRING,
    descriptionShort: DataTypes.STRING,
    image: DataTypes.STRING,
    language: DataTypes.STRING,
    link: DataTypes.STRING,
    title: DataTypes.STRING
  }, {});
  Podcast.associate = function(models) {
    // associations can be defined here
		Podcast.hasMany(models.Episode, { onDelete: 'cascade', hooks: true });
  };
  return Podcast;
};
