var assert = require('chai').assert;
var Bluebird = require('bluebird');

var models = require('../models');

describe('orm-association-podcast-episode', function () {

	var matchingEpisode, nonMatchingEpisode, podcastId;

	before(function () {
		return Bluebird.all([
			models.sequelize.sync()
		]);
  });

  beforeEach(function () {
		return Bluebird.all([
			models.Episode.destroy({ truncate: true }),
			models.Podcast.destroy({ truncate: true }),
			models.Podcast.create({ title: 'podcast-with-episode', RssUrl: 'http://www.phonelosers.org/feed/' }).then(function (podcast) {
				podcastId = podcast.id;
				return podcast.createEpisode({ title: 'Episode 1', guid: 'abcdefg' }); 
			}),
			models.Episode.create({ guid: 'abcdefg' }).then(function (episode) {
				matchingEpisode = episode;
				return;
			}),
			models.Episode.create({ guid: 'mnop' }).then(function (episode) {
				nonMatchingEpisode = episode;
				return;
			})
		]);
  });

	it('reads a podcast with an episode', function () {
		return models.Podcast.findOne({ where: { id: podcastId }}).then(function (podcast) {
			assert.strictEqual(podcast.title, 'podcast-with-episode');
			assert.strictEqual(podcast.RssUrl, 'http://www.phonelosers.org/feed/');
			return podcast.getEpisodes().then(function (episodes) {
				assert.strictEqual(episodes.length, 1);
				assert.strictEqual(episodes[0].title, 'Episode 1');
			});
		});
	});

	it('has matching episode', function () {
		return models.Podcast.findOne({ where: { id: podcastId }}).then(function (podcast) {
			return podcast.hasMatchingEpisode(matchingEpisode).then(function (hasEpisode) {
				assert.isTrue(hasEpisode[0]);
			});
		});
	});

	it('does not have matching episode', function () {
		return models.Podcast.findOne({ where: { id: podcastId }}).then(function (podcast) {
			return podcast.hasMatchingEpisode(nonMatchingEpisode).then(function (hasEpisode) {
				assert.isFalse(hasEpisode[0]);
			});
		});
	});

	it('has episode by guid', function () {
		return models.Podcast.findOne({ where: { id: podcastId }}).then(function (podcast) {
			return podcast.hasEpisodeByGuid('abcdefg').then(function(hasEpisode) {
				assert.isTrue(hasEpisode[0]);	
			});
		});
	});

	it('does not have episode by guid', function () {
		return models.Podcast.findOne({ where: { id: podcastId }}).then(function (podcast) {
			return podcast.hasEpisodeByGuid('mnop').then(function(hasEpisode) {
				assert.isFalse(hasEpisode[0]);	
			});
		});
	});
});
