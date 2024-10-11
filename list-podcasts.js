#!/usr/bin/env node

var moment = require('moment');

var podcastIterator = require('./actions/podcastIterator');

podcastIterator(function (podcast) {
  podcast.countEpisodes().then(function (episodeCount) {
    console.log(podcast.id + "\t" + podcast.title + " - " + podcast.RssUrl + " - " + episodeCount + " episodes. Checked: " + moment(podcast.LastChecked).format("YYYY/MM/DD HH:mm") + "; Updated: " + moment(podcast.LastUpdated).format("YYYY/MM/DD HH:mm"));
  });
});
