var models = require('../models');
models.sequelize.sync();

module.exports = function (id, callback) {

	models.Podcast.findByPk(id).then(function (podcast) {

		if (podcast === undefined || podcast === null) {
			
			console.log("No podcast by that id: " + id);
			callback(null, podcast);

		} else {
			
			podcast.destroy().then(function () {
				console.log("Destroyed " + podcast.title);
				callback(null, podcast);
			});
		}

	}, function (err) {
		console.error(err);
		callback(err);
	});
}
