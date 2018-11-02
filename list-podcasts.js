#!/usr/bin/env node
var models = require('./models');

models.sequelize.sync();

models.Podcast.findAll().then(function(podcasts) {
	podcasts.forEach(function (podcast) {
		console.log(podcast.title + " - " + podcast.RssUrl);
	});
});
