#!/usr/bin/env node

var addSubscription = require('./actions/addSubscription');

var rssUrl = process.argv[2];

addSubscription(rssUrl, function (err) {

	if (err) {
		console.error(err);
	}
});
