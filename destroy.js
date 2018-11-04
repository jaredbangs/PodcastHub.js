#!/usr/bin/env node

var destroyPodcast = require('./actions/destroyPodcast');

var id = process.argv[2];

destroyPodcast(id, function (err, podcast) {

	if (err) {
		console.error(err);
	}
});
