var assert = require('chai').assert;
var Bluebird = require('bluebird');

var models = require('../models');

describe('models/podcast', function () {

	var allPodcasts;
  
	before(function () {
		models.sequelize.sync();
  });

  beforeEach(function () {
		return Bluebird.all([
			models.Podcast.destroy({ truncate: true }),
			models.Podcast.create({ title: 'Phone Losers of America' }),
			models.Podcast.create({ title: 'This American Life' }),
			models.Podcast.findAll().then(function(podcasts) {
				allPodcasts = podcasts;
			})
		]);
  });

	describe('read', function () {

		it('count', function () {
			assert.strictEqual(allPodcasts.length, 2);
		});

		it('first entry title', function () {
			assert.strictEqual(allPodcasts[0].title, 'Phone Losers of America');
		});

	});
	
})
