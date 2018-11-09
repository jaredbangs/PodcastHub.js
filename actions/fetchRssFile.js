var fs = require('fs');
var path = require('path');

module.exports = function (testDataFileName, callback) {

	fs.readFile(path.resolve(__dirname, '../test/' + testDataFileName), 'utf8', function (err, data) {
		if (err) {
			callback(err);
		} else {
			callback(null, data);
		}
	});
}
