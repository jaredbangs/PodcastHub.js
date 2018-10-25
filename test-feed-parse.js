var request = require('request');

var parse = require('./parse');

console.log(process.argv[2]);

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

		console.log(parsedData);
	});
});
