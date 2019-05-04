#!/usr/bin/env node

var models = require('../models');

models.sequelize.sync();

module.exports = async (func, options) => {

  if (options === undefined) {
    options = {};
  }

  if (options.podcastWhereClause === undefined) {
    options.podcastWhereClause = {}; 
  }
  
  if (options.podcastOrderClause === undefined) {
    options.podcastOrderClause = [['title', 'ASC']]; 
  }
 
  var podcasts = await models.Podcast.findAll({where: options.podcastWhereClause, order: options.podcastOrderClause});
  
  if (options.preIterationFunction !== undefined) {
    options.preIterationFunction(podcasts);
  }

  while (podcasts.length > 0) {

    var next = podcasts.shift();
    await func(next);
  }
  
  if (options.callback !== undefined) {
    options.callback();
  }
}
