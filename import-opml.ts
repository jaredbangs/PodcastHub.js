#!/usr/bin/env node

/*
var addPodcast = require('./actions/add-podcast');

var fs = require('fs');

var importFile = process.argv[2];

var parseOpml = require('node-opml-parser');

var i, item, subscribe;

subscribe = function (items) {

		i = i + 1;

		if (i >= items.length) {
			return;
		} else {
			
			item = items[i];
			
			if (item.feedUrl !== undefined) {
				addPodcast(item.feedUrl, {}, function (err) {
					
					if (err) {
						console.error(err);
					}

					subscribe(items);
				});
			} else {
				subscribe(items);
			}
		}
};

fs.readFile(importFile, 'utf8', function (err, data) {

  parseOpml(data, function (err, parsedItems) {

    i = 0;

    if (parsedItems !== undefined && parsedItems.length !== undefined) {
      subscribe(parsedItems);
    }
  });
});
*/