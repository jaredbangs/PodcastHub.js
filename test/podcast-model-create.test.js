var assert = require('chai').assert;
var Bluebird = require('bluebird');

var models = require('../models');

describe('models/podcast', function () {

  before(function () {
		models.sequelize.sync();
  });

  beforeEach(function () {
		return Bluebird.all([
			models.Podcast.destroy({ truncate: true }),
		]);
  });

	describe('create', function () {
		it('creates a podcast', function () {
			return models.Podcast.create({ title: 'Phone Losers of America', RssUrl: 'http://www.phonelosers.org/feed/' }).bind(this).then(function (podcast) {
				assert.strictEqual(podcast.title, 'Phone Losers of America');
				assert.strictEqual(podcast.RssUrl, 'http://www.phonelosers.org/feed/');
			});
		});
	});

});
