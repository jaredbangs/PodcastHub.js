var assert = require('chai').assert;
var Bluebird = require('bluebird');
var chai = require('chai');
chai.use(require('chai-datetime'));

var models = require('../models');

describe('orm-model-podcast', function () {

	before(function () {
		return Bluebird.all([
			models.sequelize.sync()
		]);
  });

  beforeEach(function () {
		return Bluebird.all([
			models.Episode.destroy({ truncate: true }),
			models.Podcast.destroy({ truncate: true }),
			models.Podcast.create({ 
				author: 'Jared', 
				descriptionLong: 'Long', 
				descriptionShort: 'Short', 
				image: 'image 1', 
				language: 'en-us', 
				link: 'http://www.phonelosers.org', 
				title: 'Phone Losers of America', 
				LastUpdated: new Date("2018-10-16 15:03:22"),
				ParsedFeedCache: { author: 'Jared' }
			}),
			models.Podcast.create({ title: 'This American Life' })
		]);
  });

	it('count', function () {
		return models.Podcast.findAll().then(function(podcasts) {
			assert.strictEqual(podcasts.length, 2);
		})
	});

	it('first parsed feed cache', function () {
		return models.Podcast.findOne({ where: { title: 'Phone Losers of America' }}).then(function (podcast) {
			assert.strictEqual(podcast.ParsedFeedCache.author, 'Jared');
		});
	});

	it('first entry author', function () {
		return models.Podcast.findOne({ where: { title: 'Phone Losers of America' }}).then(function (podcast) {
			assert.strictEqual(podcast.author, 'Jared');
		});
	});
	
	it('first entry descriptionLong', function () {
		return models.Podcast.findOne({ where: { title: 'Phone Losers of America' }}).then(function (podcast) {
			assert.strictEqual(podcast.descriptionLong, 'Long');
		});
	});
	
	it('first entry descriptionShort', function () {
		return models.Podcast.findOne({ where: { title: 'Phone Losers of America' }}).then(function (podcast) {
			assert.strictEqual(podcast.descriptionShort, 'Short');
		});
	});
	
	it('first entry image', function () {
		return models.Podcast.findOne({ where: { title: 'Phone Losers of America' }}).then(function (podcast) {
			assert.strictEqual(podcast.image, 'image 1');
		});
	});
	
	it('first entry language', function () {
		return models.Podcast.findOne({ where: { title: 'Phone Losers of America' }}).then(function (podcast) {
			assert.strictEqual(podcast.language, 'en-us');
		});
	});
	
	it('first entry link', function () {
		return models.Podcast.findOne({ where: { title: 'Phone Losers of America' }}).then(function (podcast) {
			assert.strictEqual(podcast.link, 'http://www.phonelosers.org');
		});
	});
	
	it('first entry title', function () {
		return models.Podcast.findOne({ where: { title: 'Phone Losers of America' }}).then(function (podcast) {
			assert.strictEqual(podcast.title, 'Phone Losers of America');
		});
	});
	
	it('first entry LastUpdated', function () {
		return models.Podcast.findOne({ where: { title: 'Phone Losers of America' }}).then(function (podcast) {
			assert.equalDate(podcast.LastUpdated, new Date("2018-10-16 15:03:22"));
		});
	});

})
