#!/usr/bin/env node

var id = process.argv[2];

var logger = require('./logger');
var models = require('./models');

var podcastIterator = require('./actions/podcastIterator');
var updateEpisodes = require('./actions/update-episodes');

models.sequelize.sync();

var options = {};

options.callback = function () {
  console.log("Update completed.");
};

options.podcastOrderClause = [['LastChecked', 'ASC']]; 

if (id !== undefined && id !== null && id !== '') {
  options.podcastWhereClause = { id: id };
}

podcastIterator(async function (podcast) {
  await updateEpisodes(podcast, { }, function (err, updatedPodcastModel) {
    if (err) {
      logger.error(podcast.id + "\t" + podcast.title + "\t" + podcast.RssUrl);
      logger.error(err);
    } else {
      logger.info("Updated " + updatedPodcastModel.id + "\t" + updatedPodcastModel.title + "\t" + podcast.RssUrl);
    }
  });
}, options);
