#!/usr/bin/env node
var request = require('request');

var models = require('./models');
var parse = require('./parsing/parseFeedDataToPodcastModel');

var rssUrl = process.argv[2];

models.sequelize.sync();

console.log("Subscribing to " + rssUrl);

request(rssUrl, function (err, res, data) {
	if (err) {
		console.error('Network error', err);
		return;
	}

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
