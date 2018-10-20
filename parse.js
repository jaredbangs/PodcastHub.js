var parsePodcast = require('node-podcast-parser');

module.exports = function(data, callback) {

	var self = this;

	parsePodcast(data, function(err, parsedData) {

		if (err) {
			callback(err);
		} else {
			callback(null, parsedData);
		}
	});
};
