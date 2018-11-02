var assert = require('chai').assert;
var Bluebird = require('bluebird');

var models = require('../models');

describe('models/podcast with episode', function () {

	before(function () {
		Bluebird.all([
			models.sequelize.sync()
		]);
  });

  beforeEach(function () {
		return Bluebird.all([
			models.Podcast.destroy({ truncate: true }),
		]);
  });

	describe('create', function () {
		it('creates a podcast', function () {
			return models.Podcast.create({ title: 'Phone Losers of America', RssUrl: 'http://www.phonelosers.org/feed/' }).bind(this).then(function (podcast) {
				return models.Episode.create({ title: 'Episode 1' }).bind(this).then(function (episode) {
					episode.setPodcast(podcast);
					assert.strictEqual(episode.title, 'Episode 1');

					return episode.getPodcast().bind(this).then(function (parentPodcast) {
						assert.strictEqual(parentPodcast.title, 'Phone Losers of America');
						assert.strictEqual(parentPodcast.RssUrl, 'http://www.phonelosers.org/feed/');
					});
				});
			});
		});
	});

});
