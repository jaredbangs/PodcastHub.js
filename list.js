#!/usr/bin/env node
var models = require('./models');

models.sequelize.sync();

models.Podcast.findAll().then(function(podcasts) {
	podcasts.forEach(function (podcast) {
		podcast.countEpisodes().then(function (episodeCount) {
			console.log(podcast.title + " - " + podcast.RssUrl + " - " + episodeCount + " episodes");
		});
	});
});
