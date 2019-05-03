#!/usr/bin/env node

var models = require('../models');

models.sequelize.sync();

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
      podcast.countEpisodes().then(function () {
        func(podcast);
      });
    });
  });

  if (options.callback !== undefined) {
    options.callback(null, null);
  }
}
