var assert = require('chai').assert;
var Bluebird = require('bluebird');
var chai = require('chai');
chai.use(require('chai-datetime'));

var addPodcast = require('../actions/add-podcast');
var fetchRssFile = require('../actions/fetchRssFile');
var models = require('../models');
var updateEpisodes = require('../actions/update-episodes');

var fetchFirstRss = function () {
	return fetchRssFile('data-pla.xml');
}

var fetchUpdatedRss = function () {
	return fetchRssFile('data-pla-updated.xml');
}

describe('actions-update-episodes', function () {
	
	//this.timeout(30000);

  var allEpisodes, originalId, originalEpisodeCount, podcast;

  before(function (done) {

		Bluebird.all([
			models.sequelize.sync(),
			models.Episode.destroy({ truncate: true }),
			models.Podcast.destroy({ truncate: true }),
		]);

		addPodcast('http://www.phonelosers.org/feed/', { fetchRss: fetchFirstRss }, function (err, podcastModel) {
			if (err) throw err;

			originalId = podcastModel.id;

			podcastModel.countEpisodes().then(function (episodeCount) {

				originalEpisodeCount = episodeCount;

				updateEpisodes(podcastModel, { fetchRss: fetchUpdatedRss }, function (err, updatedPodcastModel) {
					if (err) throw err;
					podcast = updatedPodcastModel;
			
					updatedPodcastModel.getEpisodes().then(function (updatedEpisodes) {

						allEpisodes = updatedEpisodes;
						done();
					});
				});
			});
		});
  });

	it('original episode count', function () {
    assert.strictEqual(originalEpisodeCount, 5);
  });
  
	it('model is original model', function () {
    assert.strictEqual(podcast.id, originalId);
  });

	it('updated episode count', function () {
		console.log("Checking ep count");
    assert.strictEqual(allEpisodes.length, 11);
  });
  
	it('updated', function () {
    assert.equalDate(podcast.LastUpdated, new Date("2018-11-03 15:03:22"));
  });
})
