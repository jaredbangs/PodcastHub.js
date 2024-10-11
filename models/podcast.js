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
		Podcast.hasMany(models.Subscription, { onDelete: 'cascade', hooks: true });
  };

	Podcast.prototype.createEpisodeFromReference = function (episode) {  
    
    return new Promise(async (resolve) => {
   
      var createdEpisode, fileSize;

      fileSize = 0;

      if (!isNaN(episode.fileSize)) {
        fileSize = episode.fileSize;
      }

      createdEpisode = await this.createEpisode({ 
        guid: episode.guid, 
        description: episode.description, 
        duration: episode.duration, 
        image: episode.image, 
        published: episode.published, 
        title: episode.title,
        enclosureType: episode.enclosureType,
        enclosureUrl: episode.enclosureUrl,
        fileSize: fileSize
      });

      resolve(createdEpisode);
    });
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
