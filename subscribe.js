var request = require('request');

var models = require('./models');
var parse = require('./parse');

models.sequelize.sync();

console.log("Subscribing to " + process.argv[2]);

request(process.argv[2], function (err, res, data) {
	if (err) {
		console.error('Network error', err);
		return;
	}

	parse(data, function (err, parsedData) {
		if (err) {
			console.error('Parsing error', err);
			return;
		}

		return models.Podcast.create({ title: 'Phone Losers of America', RssUrl: process.argv[2] }).bind(this).then(function (podcast) {
			console.log("Subscribed to " + podcast.title);
		});
	});
});
