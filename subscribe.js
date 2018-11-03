#!/usr/bin/env node
var request = require('request');

var models = require('./models');
var parse = require('./parsing/parseFeedDataToPodcastModel');

var rssUrl = process.argv[2];

models.sequelize.sync();

models.Podcast.findOne({ where: { RssUrl: rssUrl }}).then(function (podcast) {

	if (podcast === undefined || podcast === null) {

		console.log("Fetching " + rssUrl);
		request(rssUrl, function (err, res, data) {
			if (err) {
				console.error('Network error', err);
				return;
			}

			console.log("Parsing " + rssUrl);
			parse(data, function (err, podcastModel) {
				if (err) {
					console.error('Parsing error', err);
					return;
				}

				podcastModel.RssUrl = rssUrl;

				podcastModel.save().then(function () {
					console.log("Subscribed to " + podcastModel.title);
				});

			});
		});

	} else {
		console.log("Already subscribed to " + podcast.title + " - " + podcast.RssUrl);
	}

}, function (error) {
	console.error(error);
});
