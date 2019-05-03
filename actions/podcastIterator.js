#!/usr/bin/env node

var Bluebird = require('bluebird');

var id = process.argv[2];

var models = require('../models');

models.sequelize.sync();

var podcastFunction = function (func, podcast, options) {

  return Bluebird.all([
    func(podcast)
  ]);
};

module.exports = function (func, options) {

  if (options === undefined) {
    options = {};
  }

  if (options.podcastWhereClause === undefined) {
    options.podcastWhereClause = {}; 
  }
  
  if (options.podcastOrderClause === undefined) {
    options.podcastOrderClause = [['title', 'ASC']]; 
  }
  
  models.Podcast.findAll({where: options.podcastWhereClause, order: options.podcastOrderClause}).then(function(podcasts) {
    podcasts.forEach(function (podcast) {
      podcast.countEpisodes().then(function (episodeCount) {
        podcastFunction(func, podcast, options);
      });
    });
  });

  if (options.callback !== undefined) {
    callback(null, null);
  }
}
