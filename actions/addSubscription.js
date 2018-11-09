var models = require('../models');
models.sequelize.sync();

var fetchRss = require('./fetchRssLive');
var parse = require('../parsing/parseFeedDataToPodcastModel');

module.exports = function (rssUrl, options, callback) {

	models.Podcast.findOne({ where: { RssUrl: rssUrl }}).then(function (podcast) {

		if (podcast === undefined || podcast === null) {

			if (options.fetchRss !== undefined) {
				fetchRss = options.fetchRss;
			}

			console.log("Fetching " + rssUrl);
			fetchRss(rssUrl, function (err, data) {
				if (err) {
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
