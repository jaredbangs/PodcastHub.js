var Bluebird = require('bluebird');

var fetchRss = require('./fetchRssLive');
var models = require('../models');
models.sequelize.sync();

var parse = require('../parsing/parseFeedDataToPodcastModel');

var updateExistingModel = function (existingModel, temporaryModel, callback) {

	var episodes;

	existingModel.LastUpdated = temporaryModel.LastUpdated;

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
					console.log("Added episode: " + temporaryEpisode.guid);
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
			console.log("Podcast not valid");
		} else {

			if (options.fetchRss !== undefined) {
				fetchRss = options.fetchRss;
			}

			console.log("Fetching " + podcast.RssUrl);
			fetchRss(podcast.RssUrl, function (err, data) {
				if (err) {
					callback(err);
				} else {

					console.log("Parsing " + podcast.RssUrl);
					parse(data, function (err, temporaryModel) {
						if (err) {
							callback(err);
							console.error('Parsing error', err);
						} else {

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
