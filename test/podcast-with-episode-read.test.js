var assert = require('chai').assert;
var Bluebird = require('bluebird');

var models = require('../models');

describe('podcast-with-episode-read', function () {

	var podcastId;

	before(function () {
		return Bluebird.all([
			models.sequelize.sync()
		]);
  });

  beforeEach(function () {
		return Bluebird.all([
			models.Episode.destroy({ truncate: true }),
			models.Podcast.destroy({ truncate: true }),
			models.Podcast.create({ title: 'podcast-with-episode-read', RssUrl: 'http://www.phonelosers.org/feed/' }).bind(this).then(function (podcast) {

				podcastId = podcast.id;

				return podcast.createEpisode({ title: 'Episode 1' }); 
			})
		]);
  });

	it('reads a podcast with an episode', function () {
		return models.Podcast.findOne({ where: { id: podcastId }}).then(function (podcast) {
			assert.strictEqual(podcast.title, 'podcast-with-episode-read');
			assert.strictEqual(podcast.RssUrl, 'http://www.phonelosers.org/feed/');
			return podcast.getEpisodes().then(function (episodes) {
				assert.strictEqual(episodes.length, 1);
				assert.strictEqual(episodes[0].title, 'Episode 1');
			});
		});
	});

});
