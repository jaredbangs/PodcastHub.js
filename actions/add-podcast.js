var logger = require('../logger');
var models = require('../models');
models.sequelize.sync();

var fetchRss = require('./fetchRssLive');
var parse = require('../parsing/parseFeedDataToPodcastModel');

module.exports = function (rssUrl, options, callback) {

	models.Podcast.findOne({ where: { RssUrl: rssUrl }}).then(async function (podcast) {

    var data, podcastModel;

		if (podcast === undefined || podcast === null) {

			if (options.fetchRss !== undefined) {
				fetchRss = options.fetchRss;
			}

      logger.info("Fetching " + rssUrl);
      try {
        data = await fetchRss(rssUrl); 
      } catch(err) {
        console.error(err);
        callback(err);
      }

      logger.info("Parsing " + rssUrl);
      try {
        podcastModel = await parse(data); 
      } catch(err) {
        callback(err);
        console.error('Parsing error', err);
      }
          
      podcastModel.RssUrl = rssUrl;

      podcastModel.save().then(function (savedPodcastModel) {
        logger.info("Subscribed to " + savedPodcastModel.title);
        callback(null, savedPodcastModel);
      });

		} else {
			logger.info("Already subscribed to " + podcast.title + " - " + podcast.RssUrl);
			callback(null, podcast);
		}

	}, function (err) {
		console.error(err);
		callback(err);
	});
}
