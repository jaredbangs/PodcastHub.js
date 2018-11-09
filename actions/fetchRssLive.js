var request = require('request');

module.exports = function (rssUrl, callback) {

	request(rssUrl, function (err, res, data) {
		if (err) {
			console.error('Network error', err);
			callback(err);
		} else {
			callback(null, data);
		}
	});
}
