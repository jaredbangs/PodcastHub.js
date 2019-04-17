var Bluebird = require('bluebird');

var fetchRss = require('./fetchRssLive');
var logger = require('../logger');
var models = require('../models');
models.sequelize.sync();

var parse = require('../parsing/parseFeedDataToPodcastModel');

var updateExistingModel = function (existingModel, temporaryModel, callback) {

	var episodes;

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
					logger.info("Added episode: " + temporaryEpisode.guid);
				}
			})
		);
	});

	Bluebird.all(episodeProcessingFunctions).then(function () {
		callback(null, existingModel);	
	});
};

module.exports = function (podcast, options, callback) {

		if (podcast === undefined || podcast === null) {
			logger.info("Podcast not valid");
		} else {

			if (options.fetchRss !== undefined) {
				fetchRss = options.fetchRss;
			}

			logger.info("Fetching " + podcast.RssUrl);
			fetchRss(podcast.RssUrl, function (err, data) {
				if (err) {
					callback(err);
				} else {

					logger.info("Parsing " + podcast.RssUrl);
					parse(data, function (err, temporaryModel) {
						if (err) {
							callback(err);
							logger.error('Parsing error', err);
						} else {

							logger.info("Updating " + podcast.RssUrl);
							updateExistingModel(podcast, temporaryModel, function (err, updatedModel) {
								temporaryModel.destroy().then(function () {
									callback(null, updatedModel);
								});
							});
						}
					});
				}
			});
		}
}
