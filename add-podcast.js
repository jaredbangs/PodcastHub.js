#!/usr/bin/env node

var addPodcast = require('./actions/add-podcast');

var rssUrl = process.argv[2];

addPodcast(rssUrl, {}, function (err) {

	if (err) {
		console.error(err);
	}
});
