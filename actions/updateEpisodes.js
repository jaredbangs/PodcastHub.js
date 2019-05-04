var Bluebird = require('bluebird');

var fetchRss = require('./fetchRssLive');
var logger = require('../logger');
var models = require('../models');
var moment = require('moment');

models.sequelize.sync();

var parse = require('../parsing/parseFeedDataToPodcastModel');

var updateExistingModel = function (existingModel, temporaryModel, callback) {

	var episodes;

	existingModel.LastChecked = moment.utc();
	existingModel.LastUpdated = temporaryModel.LastUpdated;
	existingModel.ParsedFeedCache = temporaryModel.ParsedFeedCache;

	Bluebird.all([
		temporaryModel.getEpisodes().then(function (temporaryModelEpisodes) {
			episodes = temporaryModelEpisodes;
		})
	]).then(function () {
		udpateExistingModelWithCurrentEpisodes(existingModel, episodes, callback);
	});
}

var udpateExistingModelWithCurrentEpisodes = function (existingModel, currentEpisodes, callback) {

	var episodeProcessingFunctions = [];

	currentEpisodes.forEach(function (temporaryEpisode) {
		episodeProcessingFunctions.push(
			existingModel.hasMatchingEpisode(temporaryEpisode).then(function (hasEpisode) {
				if (!hasEpisode[0]) {
					existingModel.createEpisode({ guid: temporaryEpisode.guid });
					logger.info("Added episode: " + temporaryEpisode.guid + " " + temporaryEpisode.enclosureUrl);
				}
			})
		);
	});

	Bluebird.all(episodeProcessingFunctions).then(function () {
    existingModel.save().then(function () {
      callback(null, existingModel);	
    });
	});
};

module.exports = async function (podcast, options, callback) {

    var data, temporaryModel;

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
        updateExistingModel(podcast, temporaryModel, function (err, updatedModel) {
          temporaryModel.destroy().then(function () {
            callback(null, updatedModel);
          });
        });
      }

		}
}
