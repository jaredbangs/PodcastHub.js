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
			models.Podcast.create({ title: 'Phone Losers of America', RssUrl: 'http://www.phonelosers.org/feed/' }).bind(this).then(function (podcast) {
				models.Episode.create({ title: 'Episode 1' }).bind(this).then(function (episode) {
					episode.setPodcast(podcast);
				});
			})
		]);
  });

	describe('read', function () {
		it('reads a podcast with an episode', function () {
			return models.Podcast.findOne({ where: { title: 'Phone Losers of America' }}).then(function (podcast) {
				assert.strictEqual(podcast.title, 'Phone Losers of America');
				assert.strictEqual(podcast.RssUrl, 'http://www.phonelosers.org/feed/');
				return podcast.getEpisodes().then(function (episodes) {
					assert.strictEqual(episodes.length, 1);
					assert.strictEqual(episodes[0].title, 'Episode 1');
				});
			});
		});
	});

});
