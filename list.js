#!/usr/bin/env node
var podcastIterator = require('./actions/podcastIterator');

podcastIterator(function (podcast) {
  podcast.countEpisodes().then(function (episodeCount) {
    console.log(podcast.id + "\t" + podcast.title + " - " + podcast.RssUrl + " - " + episodeCount + " episodes");
  });
});
