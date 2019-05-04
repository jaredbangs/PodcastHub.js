var fetchRss = require('./fetchRssLive');
var logger = require('../logger');
var models = require('../models');
var moment = require('moment');

models.sequelize.sync();

var parse = require('../parsing/parseFeedDataToUnsavedPodcastModel');

var updateExistingModel = function (existingModel, temporaryModel) {

  return new Promise(async (resolve) => {
    
    var episodes, updatedModel;

    existingModel.LastChecked = moment.utc();
    existingModel.LastUpdated = temporaryModel.LastUpdated;
    existingModel.ParsedFeedCache = temporaryModel.ParsedFeedCache;

    episodes = await temporaryModel.getEpisodes();
    
    updatedModel = await udpateExistingModelWithCurrentEpisodes(existingModel, episodes);
    
    resolve(updatedModel);
	});
}

var udpateExistingModelWithCurrentEpisodes = function (existingModel, currentEpisodes) {

  return new Promise(async (resolve) => {
    
    var hasEpisode; 

    for (const temporaryEpisode of currentEpisodes) {

      hasEpisode = await existingModel.hasMatchingEpisode(temporaryEpisode);
      
      if (!hasEpisode[0]) {
        await existingModel.createEpisode({ guid: temporaryEpisode.guid });
        logger.info("Added episode: " + temporaryEpisode.guid + " " + temporaryEpisode.enclosureUrl);
      }
    }

    existingModel.save().then(function () {
      resolve(existingModel);	
    });

	});
};

module.exports = async function (podcast, options, callback) {

    var data, temporaryModel, updatedModel;

		if (podcast === undefined || podcast === null) {
			logger.info("Podcast not valid");
		} else {

      if (options.fetchRss !== undefined) {
        fetchRss = options.fetchRss;
      }

      logger.info("Podcast ID: " + podcast.id + " " + podcast.title + " LastChecked: " + moment(podcast.LastChecked).format("YYYY/MM/DD HH:mm"));
      
      logger.info("\tFetching " + podcast.RssUrl);
      try {
        data = await fetchRss(podcast.RssUrl);
      } catch(err) {
        console.error(err);
        callback(err);
      }
        
      logger.info("\tParsing " + podcast.RssUrl);
      try {
        temporaryModel = await parse(data);
      } catch(err) {
        console.error(err);
        callback(err);
      }

      if (temporaryModel !== undefined) {
        logger.info("\tUpdating " + podcast.RssUrl);
        updatedModel = await updateExistingModel(podcast, temporaryModel);
        callback(null, updatedModel);
      } else {
        callback(new Error("No parsed podcast model"));
      }

		}
}
