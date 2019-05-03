#!/usr/bin/env node

var episodeIterator = require('./actions/episodeIterator');

var id = process.argv[2];

var models = require('./models');

models.sequelize.sync();

var printEpisodes = function (podcast, episodes) {

  console.log(podcast.id + "\t" + podcast.title + " - " + podcast.RssUrl + " - " + episodes.length + " episodes");
  
  episodes.forEach(function (episode) {
    console.log("\t" + episode.published + "\t" + episode.title + " " + episode.enclosureType + " " + episode.enclosureUrl);
  });
};

var options = {};

options.podcastWhereClause = { id: id };

episodeIterator(printEpisodes, options);
