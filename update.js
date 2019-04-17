#!/usr/bin/env node
var logger = require('./logger');
var models = require('./models');

var updateEpisodes = require('./actions/updateEpisodes');

models.sequelize.sync();

var allPodcasts;

var updateNextPodcast = function () {

	var podcast;

	if (allPodcasts.length > 0) {

		podcast = allPodcasts.shift();

		updateEpisodes(podcast, { }, function (err, updatedPodcastModel) {
			if (err) {
				logger.error(podcast.id + "\t" + podcast.title + "\t" + podcast.RssUrl);
				logger.error(err);
				updateNextPodcast();
			} else {
				logger.info("Updated " + updatedPodcastModel.id + "\t" + updatedPodcastModel.title + "\t" + podcast.RssUrl);
				updateNextPodcast();
			}
		});
	} else {
		logger.info("Update complete.");
	}
}

models.Podcast.findAll({order: [['title', 'ASC']]}).then(function(podcasts) {

	allPodcasts = podcasts;

	updateNextPodcast();
});
