var request = require('request');

var models = require('../models');
models.sequelize.sync();

var parse = require('../parsing/parseFeedDataToPodcastModel');

module.exports = function (rssUrl, callback) {

	models.Podcast.findOne({ where: { RssUrl: rssUrl }}).then(function (podcast) {

		if (podcast === undefined || podcast === null) {

			console.log("Fetching " + rssUrl);
			request(rssUrl, function (err, res, data) {
				if (err) {
					console.error('Network error', err);
					callback(err);
				} else {

					console.log("Parsing " + rssUrl);
					parse(data, function (err, podcastModel) {
						if (err) {
							callback(err);
							console.error('Parsing error', err);
						} else {
							
							podcastModel.RssUrl = rssUrl;

							podcastModel.save().then(function (savedPodcastModel) {
								console.log("Subscribed to " + savedPodcastModel.title);
								callback(null, savedPodcastModel);
							});
						}

					});
				}
			});

		} else {
			console.log("Already subscribed to " + podcast.title + " - " + podcast.RssUrl);
			callback(null, podcast);
		}

	}, function (err) {
		console.error(err);
		callback(err);
	});
}
