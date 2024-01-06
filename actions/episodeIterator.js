#!/usr/bin/env node

var Bluebird = require('bluebird');

var models = require('../models');

models.sequelize.sync();

var podcastFunction = function (func, podcast, options) {

  return Bluebird.all([
    podcast.getEpisodes({where: options.episodeWhereClause, order: options.episodeOrderClause}).then(function (episodes) {
      func(podcast, episodes);
    })
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
  
  if (options.episodeWhereClause === undefined) {
    options.episodeWhereClause = {}; 
  }

  if (options.episodeOrderClause === undefined) {
    options.episodeOrderClause = [['published']]; 
  }
  
  models.Podcast.findAll({where: options.podcastWhereClause, order: options.podcastOrderClause}).then(function(podcasts) {
    podcasts.forEach(function (podcast) {
      podcast.countEpisodes().then(function () {
        podcastFunction(func, podcast, options);
      });
    });
  });

  if (options.callback !== undefined) {
    options.callback(null, null);
  }
}
