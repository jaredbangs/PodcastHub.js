#!/usr/bin/env node

var Bluebird, models, podcastDestroyFunctions;

Bluebird = require('bluebird');
models = require('./models');

models.sequelize.sync();

podcastDestroyFunctions = [];

models.Podcast.findAll({order: [['title', 'ASC']]}).then(function(podcasts) {
	podcasts.forEach(function (podcast) {

    if (podcast.RssUrl === undefined || podcast.RssUrl === null || podcast.RssUrl === "null") {
      console.log("Queueing " + podcast.id + "\t" + podcast.title + " - " + podcast.RssUrl);
      var message = "Deleted " + podcast.id + "\t" + podcast.title + " - " + podcast.RssUrl;
      podcastDestroyFunctions.push(
        podcast.destroy().then(function () {
          console.log(message); 
        }).catch(function(e) {
          console.log(e); 
        })
      );
    }
	});
 
  Bluebird.all(podcastDestroyFunctions).then(function () {
    process.exit(0);
  });
});
