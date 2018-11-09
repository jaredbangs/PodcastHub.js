'use strict';
var Bluebird = require('bluebird');

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

	Podcast.prototype.hasEpisodeByGuid = function (guid) {  
	
		return Bluebird.all([
			this.getEpisodes({ where: { guid: guid }}).then(function (matchingEpisodes) {
				return matchingEpisodes.length === 1;
			})
		]);
	};

	Podcast.prototype.hasMatchingEpisode = function (episode) {  
		return Bluebird.all([
			this.getEpisodes({ where: { guid: episode.guid }}).then(function (matchingEpisodes) {
				return matchingEpisodes.length === 1;
			})
		]);
	};

  return Podcast;
};
