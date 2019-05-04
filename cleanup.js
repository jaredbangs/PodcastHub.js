#!/usr/bin/env node

var models = require('./models');

models.sequelize.sync();

var podcastIterator = require('./actions/podcastIterator');

var shouldDestroy = function (podcast) { return podcast.RssUrl === undefined || podcast.RssUrl === null || podcast.RssUrl === "null"; };

var options = {};

options.callback = function () {
  console.log("Cleanup completed.");
};

options.preIterationFunction = function (podcasts) {
 
  var podcastsToDestroy = [];

  console.log("All podcasts: " + podcasts.length); 

  podcasts.forEach(function (podcast) {
    if (shouldDestroy(podcast)) {
      podcastsToDestroy.push(podcast);
    }
  });
  
  console.log("Podcasts to destroy: " + podcastsToDestroy.length); 
};

podcastIterator(async function (podcast) {

    if (shouldDestroy(podcast)) {
        var message = "Deleting " + podcast.id + "\t" + podcast.title + " - " + podcast.RssUrl;
        console.log(message);
        message = "Deleted " + podcast.id + "\t" + podcast.title + " - " + podcast.RssUrl;
        await podcast.destroy();
        console.log(message);
    }
}, options);
