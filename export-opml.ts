#!/usr/bin/env nodea

/*
var opml = require('opml-generator');
var formatXml = require('xml-formatter');

var models = require('./models');

models.sequelize.sync();

var header = {
  "title": "PodcastHub.js",
  "dateCreated": new Date(),
  "ownerName": "jaredbangs"
};

models.sequelize.sync();

var outlines = [];

var addPodcastToOutline = function (podcast) {
  outlines.push({
    id: podcast.id,
    text: podcast.title,
    title: podcast.title,
    type: "rss",
    "xmlUrl": podcast.RssUrl,
    "htmlUrl": podcast.link
  });
};

models.Podcast.findAll({order: [['title', 'ASC']]}).then(function(podcasts) {
  podcasts.forEach(function (podcast) {
    addPodcastToOutline(podcast);
  });

  var xml = formatXml(opml(header, outlines));
  console.log(xml);
  
  process.exit(0);
});
*/