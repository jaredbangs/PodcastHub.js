#!/usr/bin/env node
var models = require('./models');

models.sequelize.sync();

models.Podcast.findAll({order: [['title', 'ASC']]}).then(function(podcasts) {
	podcasts.forEach(function (podcast) {
		podcast.countEpisodes().then(function (episodeCount) {
			console.log(podcast.id + "\t" + podcast.title + " - " + podcast.RssUrl + " - " + episodeCount + " episodes");
		});
	});
});
