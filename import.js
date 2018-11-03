#!/usr/bin/env node

var fs = require('fs');

var addSubscription = require('./actions/addSubscription');

var importFile = process.argv[2];

var i, line, lines, subscribe;

subscribe = function () {

		i = i + 1;

		if (i >= lines.length) {
			return;
		} else {
			
			line = lines[i];
			
			if (line.indexOf('http:') === 0) {
				addSubscription(line, function (err) {
					
					if (err) {
						console.error(err);
					}

					subscribe();
				});
			} else {
				subscribe();
			}
		}
};

fs.readFile(importFile, 'utf8', function (err, data) {

	i = 0;

	lines = data.split('\n');

	subscribe();
});
