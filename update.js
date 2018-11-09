#!/usr/bin/env node
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
				console.error(podcast.id + "\t" + podcast.title + "\t" + podcast.RssUrl);
				console.error(err);
				updateNextPodcast();
			} else {
				console.log("Updated " + updatedPodcastModel.title + " - " + podcast.RssUrl);
				updateNextPodcast();
			}
		});
	} else {
		console.log("Update complete.");
	}
}

models.Podcast.findAll({order: [['title', 'ASC']]}).then(function(podcasts) {

	allPodcasts = podcasts;

	updateNextPodcast();
});
