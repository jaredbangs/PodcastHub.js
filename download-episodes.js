#!/usr/bin/env node

var id = process.argv[2];

var logger = require('./logger');
var models = require('./models');

var episodeIterator = require('./actions/episodeIterator');
var podcastIterator = require('./actions/podcastIterator');
//var updateEpisodes = require('./actions/update-episodes');

models.sequelize.sync();

var options = {};

options.callback = function () {
  console.log("Downloads completed.");
};

options.podcastOrderClause = [['LastChecked', 'ASC']]; 

if (id !== undefined && id !== null && id !== '') {
  options.podcastWhereClause = { id: id };
}

podcastIterator(async function (podcast) {
  
  logger.info("Checking " + podcast.id + "\t" + podcast.title + "\t" + podcast.RssUrl);
 
  episodeIterator(async function (episode) {
    logger.info("Checking " + episode.title + "\t" + episode.published + "\t" + episode.downloadedServerPath);
  }, {});

  /*
  await updateEpisodes(podcast, { }, function (err, updatedPodcastModel) {
    if (err) {
      logger.error(podcast.id + "\t" + podcast.title + "\t" + podcast.RssUrl);
      logger.error(err);
    } else {
      logger.info("Updated " + updatedPodcastModel.id + "\t" + updatedPodcastModel.title + "\t" + podcast.RssUrl);
    }
  });*/
}, options);
