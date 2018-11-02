var assert = require('chai').assert;
var Bluebird = require('bluebird');

var models = require('../models');

describe('models/podcast', function () {

	var allPodcasts;
  
	before(function () {
		return Bluebird.all([
			models.sequelize.sync()
		]);
  });

  beforeEach(function () {
		return Bluebird.all([
			models.Podcast.destroy({ truncate: true }),
			models.Podcast.create({ 
				author: 'Jared', 
				descriptionLong: 'Long', 
				descriptionShort: 'Short', 
				image: 'image 1', 
				language: 'en-us', 
				link: 'http://www.phonelosers.org', 
				title: 'Phone Losers of America', 
				updated: new Date("2018-10-16 15:03:22").d
			}),
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
			return models.Podcast.findOne({ where: { title: 'Phone Losers of America' }}).then(function (podcast) {
				assert.strictEqual(podcast.title, 'Phone Losers of America');
			});
		});

	});
	
})
